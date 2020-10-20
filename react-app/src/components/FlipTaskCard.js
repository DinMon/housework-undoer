import React, { useState, useRef } from 'react'
import TaskCard from './TaskCard'
import QuestionCard from './QuestionCard'
import CompletionCard from './CompletionCard'


function FlipTaskCard({ task, completeTask }) {
    const ref = useRef(null);

    function handleCardClick() {
        ref.current.classList.add('card-flipped');
    }

    function handleChooseOption(isDone) {
        if (isDone) {
            completeTask(task);
        } else {
            // setIsFlip(!isFlip)
            ref.current.classList.remove('card-flipped');
        }
    }


    return (
        <div ref={ref} className='flip-card-container'>
            <div className='flip-card-inner'>
                {!task.isComplete && (
                    <>
                        <TaskCard task={task} onClick={handleCardClick} className='flip-card-front'/>
                        <QuestionCard taskTitle={task.title} onChooseOption={handleChooseOption} className='flip-card-back' />
                    </>
                )}
                {(task.isComplete) && (
                    <CompletionCard points={task.rewardPoints} className='flip-card-back' onClick={handleCardClick}/>
                )}
            </div>
        </div>
    )
}

export default FlipTaskCard