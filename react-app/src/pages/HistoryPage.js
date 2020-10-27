import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import DateTaskGrid from '../components/task-grid/DateTaskGrid'
import { useUserLogged } from '../App'
import { createTask } from '../domain/Task'
import Page from '../components/Page'
import NoTaskFound from '../components/NoTaskFound'

function HistoryPage() {
    const { userLoggedIn } = useUserLogged()
    const [tasksByDate, setTasksByDate] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const url = new URL('https://us-central1-housework-60d78.cloudfunctions.net/getOneWeekTasksHistory')
        url.searchParams.set('userId', userLoggedIn.id)

        async function fetchTaskHistory(searchUrl) {
            const response = await fetch(searchUrl)
            const taskHistory = await response.json()
            setTasksByDate(
                GenerateNewTasksFromHistory(taskHistory)
            )
            setIsLoading(false)
        }

        fetchTaskHistory(url)
    }, [userLoggedIn])

    function GenerateNewTasksFromHistory(taskHistory) {
        if (taskHistory) {
            const newTaskHistory = Object.keys(taskHistory).sort((a, b) => b - a).reduce((taskAcc, key) => {
                const taskList = taskHistory[key] || []
                if (taskList.length > 0) {
                    const newTaskList = taskList.map(task => createTask(task)) 
                    return {...taskAcc, [key]: newTaskList}
                }
                return taskAcc
            }, {})
            return newTaskHistory
        }
        return Object.assign({})
    }


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