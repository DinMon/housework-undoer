import React from 'react'
import CatImg from '../assets/cat.svg'

function NoTaskFound({ description }) {
    return (
        <div className='no-task-found-bg'>
            <div className='no-task-found-description-container'>
                <div className='no-task-found-description'>{description}</div>
            </div>
            <img src={CatImg} alt='cat illustration' />
        </div>
    )
}

export default NoTaskFound