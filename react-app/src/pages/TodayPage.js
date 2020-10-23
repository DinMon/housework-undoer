import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { createTask } from '../domain/Task'
import TaskGrid from '../components/TaskGrid';

function TodayPage() {
    const [tasks, setTasks] = useState([])

    useEffect(async () => {
        const url = 'https://us-central1-housework-60d78.cloudfunctions.net/getTodoTasks'
        const response = await fetch(url)
        console.log(response)
        const todoTasks = await response.json()

        setTasks(
            todoTasks.map((task) => createTask(task))
        )
    }, [])

    return (
        <div className='page'>
            <TaskGrid tasks={tasks}/>
        </div>
    )
}

export default TodayPage