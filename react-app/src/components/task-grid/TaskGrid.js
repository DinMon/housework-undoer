import React, { useEffect, useState } from 'react'
import { complete } from '../../domain/Task'
import FlipTaskCard from '../task-card/FlipTaskCard'
import { useUserLogged } from '../../App'

export const REMOVE_TASK_DELAY = 2000

function TaskGrid({ tasks, flippableTask = true, className = '' }) {
    const { userLoggedIn } = useUserLogged()
    const [taskGridtasks, setTaskGridTasks] = useState([])

    useEffect(() => {
        setTaskGridTasks(tasks)
    }, [tasks])

    async function syncCompletedTask(task) {
        try {
            const response = await fetch('https://us-central1-housework-60d78.cloudfunctions.net/completeTask', {
                method: 'POST',
                body: JSON.stringify(task)
            })
            if (!response.ok) {
                const errorMsg = await response.json()
                console.error(errorMsg)
                return false
            }
        } catch (err) {
            console.error(err)
            return false
        }
        return true
    }

    async function completeTask(completedTask) {
        let taskCompletedSuccess = false
        const newTasks = await Promise.all(taskGridtasks.map(async function completeSingleTask(t) {

            if(t.id === completedTask.id) {
                const newCompletedTask = complete(t, userLoggedIn && userLoggedIn.id)
                taskCompletedSuccess = await syncCompletedTask(newCompletedTask)
                t = taskCompletedSuccess ? newCompletedTask : t
            }

            return t
        }))

        if (taskCompletedSuccess) {
            setTaskGridTasks(newTasks);

            setTimeout(() => removeCompletedTask(newTasks, completedTask.id), REMOVE_TASK_DELAY)
        }

        function removeCompletedTask(taskList, id){
            const filteredTasks = taskList.filter(function getNonCompletedTask(task) {
                return task.id !== id
            })  

            setTaskGridTasks(filteredTasks)  
        }
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