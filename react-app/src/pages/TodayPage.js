import React, { useState, useEffect } from 'react'
import { useUserLogged } from '../App'
import { createTask, setStatus } from '../domain/Task'
import TaskGrid from '../components/task-grid/TaskGrid';
import Page from '../components/Page';
import NoTaskFound from '../components/NoTaskFound';
import firebase from '../firebase'

function TodayPage() {
    const { userLoggedIn } = useUserLogged()
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        function fetchTasks() {
            firebase
                .firestore()
                .collection('tasks')
                .where('isComplete', '==', false)
                .onSnapshot((snapshot) => {
                    const todoTasks = snapshot.docs.map((doc) => setStatus(userLoggedIn, createTask({ id: doc.id, ...doc.data()})))
                    setTasks(todoTasks)
                    setIsLoading(false)
                })
        }
        fetchTasks()
    }, [])

    return (
        <Page isLoading={isLoading}>
            {(tasks.length > 0) ? (
                <TaskGrid tasks={tasks}/>
            ) : (
                <NoTaskFound description={`There are no tasks to complete yet. But there's a cat`}/>
            )}
        </Page>
    )
}

export default TodayPage