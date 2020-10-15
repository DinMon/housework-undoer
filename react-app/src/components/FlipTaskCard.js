import React, { useState } from 'react'
import TaskCard from './TaskCard'
import QuestionCard from './QuestionCard'
import CompletionCard from './CompletionCard'


function FlipTaskCard({ task, completeTask }) {
    const [isFlip, setIsFlip] = useState(false)

    function handleCardClick() {
        setIsFlip(!isFlip)
    }

    function handleChooseOption(isDone) {
        if (isDone) {
            completeTask(task);
        } else {
            setIsFlip(!isFlip)
        }
    }

    return (

        <div className={`flip-card-container ${isFlip ? 'card-flipped' : ''}`}>
            <div className='flip-card-inner'>
                <TaskCard task={task} onClick={handleCardClick} className='flip-card-front'/>
                {
                    (isFlip) ? (
                        (task.isComplete) ? (
                            <CompletionCard points={task.rewardPoints} className='flip-card-back' onClick={handleCardClick}/>
                        ) : (
                            <QuestionCard taskTitle={task.title} onChooseOption={handleChooseOption} className='flip-card-back'/>
                        )
                    ) : null
                }
            </div>
        </div>
    )
}

export default FlipTaskCard