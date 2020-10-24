import React, { useState } from 'react'
import TaskCard from './TaskCard'
import QuestionCard from './QuestionCard'
import CompletionCard from './CompletionCard'
import ReactCardFlip from 'react-card-flip'
import { CSSTransition } from 'react-transition-group'
import { REMOVE_TASK_DELAY } from '../task-grid/TaskGrid'

function useCardFlip(isFlippable, isCardFlip) {
    const [isFlip, setIsFlip] = useState(isCardFlip)

    function flip() {
        if (isFlippable) {
            setIsFlip(!isFlip)
        }
    }
    
    return [isFlip, flip]
}

function FlipTaskCard({ task, completeTask, flippable = true }) {
    const [isFlip, setIsFlip] = useCardFlip(flippable, false)
    const [isAboutRemove, setIsAboutRemove] = useState(false)

    function handleCardClick() {
        setIsFlip(isFlip)
    }

    function handleChooseOption(isDone) {
        if (isDone) {
            completeTask(task);
            setIsAboutRemove(true)
        } else {
            setIsFlip(!isFlip)
        }
    }


    return (
        <CSSTransition in={isAboutRemove} timeout={REMOVE_TASK_DELAY} classNames="remove-fade">
            <ReactCardFlip isFlipped={isFlip} flipDirection='horizontal' infinite={true}>
                <TaskCard key='front' task={task} onClick={handleCardClick}/>
                {(task.isComplete) ? (
                    <CompletionCard key='back' points={task.rewardPoints} onClick={handleCardClick}/>
                ) : (
                    <QuestionCard key='back' taskTitle={task.title} onChooseOption={handleChooseOption}/>
                )}
            </ReactCardFlip>
        </CSSTransition>
    )
}

export default FlipTaskCard