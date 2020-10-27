import React, { useState, useEffect } from 'react'
import { createTask } from '../domain/Task'
import TaskGrid from '../components/task-grid/TaskGrid';
import Page from '../components/Page';
import NoTaskFound from '../components/NoTaskFound';

function TodayPage() {
    const [tasks, setTasks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchTasks() {
            const response = await fetch('https://us-central1-housework-60d78.cloudfunctions.net/getTodoTasks')
            const todoTasks = await response.json()

            setTasks(
                todoTasks.map((task) => createTask(task))
            )
            setIsLoading(false)
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