import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import DateTaskGrid from '../components/task-grid/DateTaskGrid'
import { useUserLogged } from '../App'
import { createTask } from '../domain/Task'
import Page from '../components/Page'
import NoTaskFound from '../components/NoTaskFound'
import firebase from '../firebase'

function HistoryPage() {
    const { userLoggedIn } = useUserLogged()
    const [tasksByDate, setTasksByDate] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        function fetchTaskHistory() {
            const oneWeekInSec = 604800000
            const lastWeekUnixTime = Date.now() - oneWeekInSec
            firebase
                .firestore()
                .collection('tasks')
                .where('completedBy', '==', userLoggedIn.id)
                .where('isComplete', '==', true)
                .where('completedDate', '>=', new Date(lastWeekUnixTime))
                .orderBy('completedDate', 'desc')
                .onSnapshot((snapshot) => {
                    const taskHistory = snapshot.docs.reduce((taskHistory, doc) => {
                        const { seconds } = doc.data().completedDate
                        const startDayTime = String(seconds - seconds % (60 * 60 * 24))
                        const task = createTask({ id: doc.id, ...doc.data()})
                        return {
                            ...taskHistory,
                            [startDayTime]: (taskHistory[startDayTime]) ? [...taskHistory[startDayTime], task] : [task]
                        }
                    }, {})
                    setTasksByDate(taskHistory)
                    setIsLoading(false)
                })
        }

        fetchTaskHistory()
    }, [userLoggedIn])

    return (
        <Page isLoading={isLoading}>
            {tasksByDate && Object.keys(tasksByDate).length === 0 && <NoTaskFound description={`There are no finished tasks yet. But there's a cat`}/>}
            {tasksByDate && Object.keys(tasksByDate).sort((a, b) => b - a).map((key) => (
                <DateTaskGrid key={uuidv4()} unixTime={key} tasks={tasksByDate[key]}/>
            ))}
        </Page>
    )
}

export default HistoryPage