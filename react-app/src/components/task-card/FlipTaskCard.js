import React, { useState, useEffect } from 'react'
import TaskCard from './TaskCard'
import QuestionCard from './QuestionCard'
import CompletionCard from './CompletionCard'
import ReactCardFlip from 'react-card-flip'
import { CSSTransition } from 'react-transition-group'
import { REMOVE_TASK_DELAY } from '../task-grid/TaskGrid'
import EditTaskCard from './EditTaskCard'
import { EDIT_TASK, NEW_TASK } from '../../domain/Task'

function useCardFlip(isFlippable, isCardFlip) {
    const [isFlip, setIsFlip] = useState(isCardFlip)

    function flip() {
        if (isFlippable) {
            setIsFlip(!isFlip)
        }
    }
    
    return [isFlip, flip]
}

function FlipTaskCard({ task, completeTask, isAdmin, resetNewTask, flippable = true }) {
    const [isFlip, setIsFlip] = useCardFlip(flippable, false)

    useEffect(() => {
        if (task && task.status === NEW_TASK) {
            setIsFlip(true)
        }
    }, [task])

    function handleCardClick() {
        setIsFlip(isFlip)
    }

    function handleChooseOption(isDone) {
        if (isDone) {
            completeTask(task);
        } else {
            setIsFlip(!isFlip)
        }
    }

    return (
        <CSSTransition in={task.isComplete} timeout={REMOVE_TASK_DELAY} classNames="remove-fade">
            <ReactCardFlip isFlipped={isFlip} flipDirection='horizontal'>
                <TaskCard key='front' task={task} isFlippable={flippable} onClick={handleCardClick}/>
                {(isAdmin) ? (
                    <EditTaskCard key='back' task={task} resetNewTask={resetNewTask} isExistingTask={task.status === EDIT_TASK} flipBack={() => setIsFlip(true)}/>
                ) : (
                    (task.isComplete) ? (
                        <CompletionCard key='back' points={task.rewardPoints} onClick={handleCardClick}/>
                    ) : (
                        <QuestionCard key='back' taskTitle={task.title} onChooseOption={handleChooseOption}/>
                    )
                )}
            </ReactCardFlip>
        </CSSTransition>
    )
}

export default FlipTaskCard