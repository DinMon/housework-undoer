import React, { useEffect, useState } from 'react'
import { complete } from '../domain/Task'
import FlipTaskCard from './FlipTaskCard'

export const REMOVE_TASK_DELAY = 1000

function TaskGrid({ tasks, flippableTask = true, className = '' }) {
    const [taskGridtasks, setTaskGridTasks] = useState([])

    useEffect(() => {
        setTaskGridTasks(tasks)
    }, [tasks])

    function completeTask(completedTask) {
        const newTasks = taskGridtasks.map(function completeSingleTask(t) {

            if(t.id === completedTask.id) {
                t = complete(t)
            }

            return t
        })

        setTaskGridTasks(newTasks);

        function removeCompletedTask(taskList, id){
            const filteredTasks = taskList.filter(function getNonCompletedTask(task) {
                return task.id !== id
            })  

            setTaskGridTasks(filteredTasks)  
        }

        setTimeout(() => removeCompletedTask(newTasks, completedTask.id), REMOVE_TASK_DELAY)
    }

    return (
        <div className={`task-grid ${className}`}>
            {
                taskGridtasks && taskGridtasks.map((task) => {
                    return (
                        <FlipTaskCard key={task.id} task={task} completeTask={completeTask} flippable={flippableTask} />
                    ) 
                })
            }
        </div>
    )
}

export default TaskGrid