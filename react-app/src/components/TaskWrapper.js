import React, { useState, useEffect } from 'react'
import TaskCard from './TaskCard'
import QuestionCard from './QuestionCard'
import CompletionCard from './CompletionCard'
import { useTaskHolder } from './TaskGrid'


function TaskWrapper({ task }) {
    const taskHolder = useTaskHolder()

    const [isOpen, setIsOpen] = useState(false)

    function handleCardClick() {
        setIsOpen(!isOpen)
    }

    function handleChooseOption(isDone) {
        if (isDone) {
            taskHolder.completeTask(task.getId())
        }
    }

    useEffect(() => {
        console.log(task.getIsComplete())
    }, [task.getIsComplete()])

    return (
        <div className='taskwrapper-container'>
            <TaskCard task={task} onClick={handleCardClick} />
            {
                isOpen && !task.getIsComplete() &&
                    <QuestionCard taskTitle={task.title} onChooseOption={handleChooseOption}/>
            }
            {
                isOpen && task.getIsComplete() &&
                    <CompletionCard points={task.rewardPoints}/>
            }
        </div>
    )
}

export default TaskWrapper