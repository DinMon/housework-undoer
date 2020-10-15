import React from 'react'
import Card from './Card'

function QuestionCard({ taskTitle, onChooseOption, className = '' }) {

    return (
        <Card colour='#FFE8DB' className={`detail-task-card ${className}`}>
            <div className='detail-task-title'>Did you {taskTitle}?</div>
            <div className='task-options'>
                <button className='task-option-btn cross-option' onClick={() => onChooseOption(false)}>
                    <svg className='cross' width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M37.0833 4.55916L33.4408 0.916656L19 15.3575L4.55913 0.916656L0.916626 4.55916L15.3575 19L0.916626 33.4408L4.55913 37.0833L19 22.6425L33.4408 37.0833L37.0833 33.4408L22.6425 19L37.0833 4.55916Z" fill="#555555"/>
                    </svg>
                    <div>No, maybe later</div>
                </button>
                <button className='task-option-btn tick-option' onClick={() => onChooseOption(true)}>
                    <div className='dash-circle-tick'>
                        <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="33" cy="33" r="32" stroke="#FF8933" strokeDasharray="5 5"/>
                        </svg>
                        <svg className='tick' width="36" height="27" viewBox="0 0 36 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.4L3.60005 13L0.800049 15.8L12 27L36 3.00001L33.2001 0.200012L12 21.4Z" fill="#FF8933"/>
                        </svg>
                    </div>
                    <div>Yes, I did!</div>
                </button>
            </div>
        </Card>
    )
}

export default QuestionCard