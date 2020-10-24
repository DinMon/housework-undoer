import React from 'react'
import Card from './Card'

function TaskCard({ task, ...rest }) {
    const { title, rewardPoints, colour } = task
    return (
        <Card colour={colour} {...rest}>
            <div className='reward'><span className='reward-points'>{rewardPoints}</span></div>
            <div className='task-title'>{title}</div>
        </Card>
    )
}

export default TaskCard