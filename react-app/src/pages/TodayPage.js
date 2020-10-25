import React, { useState, useEffect } from 'react'
import { createTask } from '../domain/Task'
import TaskGrid from '../components/task-grid/TaskGrid';

function TodayPage() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        async function fetchTasks() {
            const response = await fetch('https://us-central1-housework-60d78.cloudfunctions.net/getTodoTasks')
            const todoTasks = await response.json()

            setTasks(
                todoTasks.map((task) => createTask(task))
            )
        }
        fetchTasks()
    }, [])

    return (
        <div className='page'>
            <TaskGrid tasks={tasks}/>
        </div>
    )
}

export default TodayPage