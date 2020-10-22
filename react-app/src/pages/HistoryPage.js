import React, { useState } from 'react'
import CatImg from '../assets/cat.svg'
import DateTaskGrid from '../components/DateTaskGrid'

function HistoryPage() {
    const [tasksByDate, setTasksByDate] = useState({
        1603355613: [
            { id: 0, title: 'Put away old toys to white boxes on the balconey', rewardPoints: 100, completedDate: new Date(), colour: '#FF467D' },
            { id: 0, title: 'Put away old toys to white boxes on the balconey', rewardPoints: 100, completedDate: new Date(), colour: '#FF467D' },
        ],
        1602355613: [
            { id: 0, title: 'Put away old toys to white boxes on the balconey', rewardPoints: 100, completedDate: new Date(), colour: '#FF467D' },
            { id: 0, title: 'Put away old toys to white boxes on the balconey', rewardPoints: 100, completedDate: new Date(), colour: '#FF467D' },
        ]
    })

    return (
        <div className='page'>
            {tasksByDate && Object.keys(tasksByDate).length === 0 &&
            <div className='no-task-found-bg'>
                <div className='no-task-found-description'>There are no finished tasks yet. But there's a cat</div>
                <img src={CatImg} alt='cat illustration' />
            </div>}
            {tasksByDate && Object.keys(tasksByDate).sort((a, b) => b - a).map((key) => (
                <DateTaskGrid unixTime={key} tasks={tasksByDate[key]}/>
            ))}
        </div>
    )
}

export default HistoryPage