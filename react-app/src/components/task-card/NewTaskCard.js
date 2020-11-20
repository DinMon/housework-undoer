import React from 'react'
import Card from './Card'

function NewTaskCard({ className, ...rest }) {
    return (
        <Card colour='#FFE8DB' className={`detail-task-card new-task-card no-box-shadow ${className}`} {...rest}>
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="51" y1="4.37114e-08" x2="51" y2="100" stroke="#FF8933" strokeWidth="1"/>
                <path d="M0 50L100 50" stroke="#FF8933" strokeWidth="1"/>
            </svg>
        </Card>
    )
}

export default NewTaskCard