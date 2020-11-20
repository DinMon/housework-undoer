import React, { useEffect, useState } from 'react'
import { complete, createTask, setStatus, NEW_TASK, EDIT_TASK } from '../../domain/Task'
import FlipTaskCard from '../task-card/FlipTaskCard'
import { useUserLogged } from '../../App'
import firebase from '../../firebase'
import { ADMIN_USER } from '../../domain/User'
import NewTaskCard from '../task-card/NewTaskCard'

export const REMOVE_TASK_DELAY = 2000

function TaskGrid({ tasks = [], flippableTask = true, className = '' }) {
    const { userLoggedIn, setUserLoggedIn } = useUserLogged()
    const [taskGridtasks, setTaskGridTasks] = useState([])
    const [completedTask, setCompletedTask] = useState(null)
    const [newTask, setNewTask] = useState(null)

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
            const totalHelpCoins = userLoggedIn.coins + task.rewardPoints
            updateHelpCoins(totalHelpCoins)
            
        } catch (err) {
            console.log(err)
        }
    }

    function updateHelpCoins(amount) {
        firebase
            .firestore()
            .collection('users')
            .doc(userLoggedIn.id)
            .update({
                coins: amount
            })
        setUserLoggedIn({ ...userLoggedIn, coins: amount})
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

    function createNewTask() {
        const task = setStatus(userLoggedIn, createTask({ id: -1, title: '', rewardPoints: 0, isComplete: false }), NEW_TASK)
        setNewTask(task)
    }

    return (
        <div className={`task-grid ${className}`}>
            {
                taskGridtasks && ((newTask) ? [...taskGridtasks, newTask] : taskGridtasks).map((task) => {
                    return (
                        <FlipTaskCard key={task.id} resetNewTask={() => setNewTask(null)}
                            task={task} isAdmin={userLoggedIn.role === ADMIN_USER}
                            completeTask={completeTask} flippable={flippableTask} />
                    ) 
                })
            }
            {userLoggedIn.role === ADMIN_USER && <NewTaskCard onClick={createNewTask}/>}
        </div>
    )
}

export default TaskGrid