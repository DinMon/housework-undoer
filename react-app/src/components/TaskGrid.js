import React, { useEffect, useRef, useState, useContext } from 'react'
import { createTask } from '../domain/Task'
import { createTaskHolder, DESC } from '../domain/TaskHolder'
import TaskWrapper from './TaskWrapper';

const TaskHolderContext = React.createContext()

export function useTaskHolder() {
    return useContext(TaskHolderContext)
}

function TaskGrid({}) {
    const taskHolder = useRef(null)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        taskHolder.current = createTaskHolder()
            .add(createTask({ title: 'Find dad\'s wallet', rewardPoints: 125 }))
            .add(createTask({ title: 'Put away old toys to white boxes on the balconey', rewardPoints: 100 }))
            .add(createTask({ title: 'Wash the dishes', rewardPoints: 75 }))
            .add(createTask({ title: 'Make your bed in the morning', rewardPoints: 20 }))
            .add(createTask({ title: 'Fix the pillowcase', rewardPoints: 50 }))
            .add(createTask({ title: 'Water the plants', rewardPoints: 80 }))
            .sortBy(DESC)
    }, [])

    useEffect(() => {
        console.log('complete')
        setTasks(taskHolder.current.getTasks())
    }, [taskHolder.current && taskHolder.current.getTasks()])

    return (
        <TaskHolderContext.Provider value={taskHolder.current}>
            <div className='task-grid'>
                {
                    tasks && tasks.map((task, i) => {
                        return <TaskWrapper key={i} task={task}/>
                    })
                }
            </div>
        </TaskHolderContext.Provider>
    )
}

export default TaskGrid