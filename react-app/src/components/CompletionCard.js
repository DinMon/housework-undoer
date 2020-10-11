import React from 'react'
import Card from './Card'

function CompletionCard({ points }) {
    return (
        <Card colour='#FFE8DB' className='detail-task-card'>
            <div className='dash-circle-tick'>
                <svg width="100" height="100" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="33" cy="33" r="32" stroke="#FF8933" strokeDasharray="5 5"/>
                </svg>
                <svg className='tick tick-complete' width="56" height="40" viewBox="0 0 36 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.4L3.60005 13L0.800049 15.8L12 27L36 3.00001L33.2001 0.200012L12 21.4Z" fill="#FF8933"/>
                </svg>
            </div>
            <div className='complete-card-container'>
                <div className='text-emphasis'>Well done!</div>
                <div className='text-description'>You earned {points} Help Coins!</div>
            </div>
        </Card>
    )
}

export default CompletionCard