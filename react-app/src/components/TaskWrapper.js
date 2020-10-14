import React, { useState } from 'react'
import TaskCard from './TaskCard'
import QuestionCard from './QuestionCard'
import CompletionCard from './CompletionCard'


function TaskWrapper({ task, completeTask }) {
    const [isOpen, setIsOpen] = useState(false)

    function handleCardClick() {
        setIsOpen(!isOpen)
    }

    function handleChooseOption(isDone) {
        if (isDone) {
            completeTask(task);
        }
    }

    return (

        <div className='taskwrapper-container'>
            <TaskCard task={task} onClick={handleCardClick} />
            {
                isOpen && !task.isComplete &&
                    <QuestionCard taskTitle={task.title} onChooseOption={handleChooseOption}/>
            }
            {
                isOpen && task.isComplete &&
                    <CompletionCard points={task.rewardPoints}/>
            }
        </div>
    )
}

export default TaskWrapper