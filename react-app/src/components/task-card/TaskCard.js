import React from 'react'
import Card from './Card'

function TaskCard({ task, isFlippable, ...rest }) {
    const { title, rewardPoints, colour } = task
    
    return (
        <Card colour={colour} className={(isFlippable) ? 'pointer': ''} {...rest}>
            <div className='reward'><span className='reward-points'>{rewardPoints}</span></div>
            <div className='task-title'>{title}</div>
        </Card>
    )
}

export default TaskCard