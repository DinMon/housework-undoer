import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { createTask } from '../domain/Task'
import TaskGrid from '../components/TaskGrid';

function TodayPage() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        setTasks([
            createTask({ id: uuidv4(), title: 'Put away old toys to white boxes on the balconey', rewardPoints: 100 }),
            createTask({ id: uuidv4(), title: 'Find dad\'s wallet', rewardPoints: 125 }),
            createTask({ id: uuidv4(), title: 'Wash the dishes', rewardPoints: 75 }),
            createTask({ id: uuidv4(), title: 'Make your bed in the morning', rewardPoints: 20 }),
            createTask({ id: uuidv4(), title: 'Fix the pillowcase', rewardPoints: 50 }),
            createTask({ id: uuidv4(), title: 'Water the plants', rewardPoints: 80 }),
        ])
    }, [])

    return (
        <div className='page'>
            <TaskGrid tasks={tasks}/>
        </div>
    )
}

export default TodayPage