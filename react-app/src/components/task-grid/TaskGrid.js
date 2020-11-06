import React, { useEffect, useState } from 'react'
import { complete } from '../../domain/Task'
import FlipTaskCard from '../task-card/FlipTaskCard'
import { useUserLogged } from '../../App'
import firebase from '../../firebase'

export const REMOVE_TASK_DELAY = 2000

function TaskGrid({ tasks = [], flippableTask = true, className = '' }) {
    const { userLoggedIn } = useUserLogged()
    const [taskGridtasks, setTaskGridTasks] = useState([])
    const [completedTask, setCompletedTask] = useState(null)

    useEffect(() => {
        if (!completedTask) {
            setTaskGridTasks(tasks)
        } else {
            if (tasks.includes(completedTask)) {
                setTaskGridTasks(tasks)
            }
        }
    }, [tasks])

    function syncCompletedTask(task) {
        try {
            firebase
                .firestore()
                .collection('tasks')
                .doc(task.id)
                .update({
                    isComplete: true,
                    completedBy: task.completedBy,
                    completedDate: firebase.firestore.FieldValue.serverTimestamp()
                })
        } catch (err) {
            console.log(err)
        }
    }

    function completeTask(task) {
        setCompletedTask(task)
        const newTasks = taskGridtasks.map(function completeSingleTask(t) {

            if (t.id === task.id) {
                const newCompletedTask = complete(t, userLoggedIn && userLoggedIn.id)
                syncCompletedTask(newCompletedTask)
                return newCompletedTask
            }

            return t
        })

        setTaskGridTasks(newTasks)  

        setTimeout(() => removeCompletedTask(newTasks, task.id), REMOVE_TASK_DELAY)
    }

    function removeCompletedTask(taskList, id){
        const filteredTasks = taskList.filter(function getNonCompletedTask(task) {
            return task.id !== id
        })  

        setCompletedTask(null)
        setTaskGridTasks(filteredTasks)  
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