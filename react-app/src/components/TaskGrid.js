import React, { useEffect, useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { complete, createTask } from '../domain/Task'
import FlipTaskCard from './FlipTaskCard';

const TaskHolderContext = React.createContext()

export function useTaskHolder() {
    return useContext(TaskHolderContext)
}

function TaskGrid({}) {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        setTasks([
            createTask({ id: uuidv4(), title: 'Put away old toys to white boxes on the balconey', rewardPoints: 100 }),
            createTask({ id: uuidv4(), title: 'Find dad\'s wallet', rewardPoints: 125 }),
            createTask({ id: uuidv4(), title: 'Wash the dishes', rewardPoints: 75 }),
            createTask({ id: uuidv4(), title: 'Make your bed in the morning', rewardPoints: 20 }),
            createTask({ id: uuidv4(), title: 'Fix the pillowcase', rewardPoints: 50 }),
            createTask({ id: uuidv4(), title: 'Water the plants', rewardPoints: 80 }),
        ]);

    }, []);

    function completeTask(completedTask) {

        const newTasks = tasks.map(function completeSingleTask(t) {

            if(t.id === completedTask.id) {
                t = complete(t)
            }

            return t
        })

        setTasks(newTasks);
    }

    return (
        <div className='task-grid'>
            {
                tasks && tasks.map((task) => {
                    return <FlipTaskCard key={task.id} task={task} completeTask={completeTask} />
                })
            }
        </div>
    )
}

export default TaskGrid