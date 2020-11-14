import React from 'react'

function RoundedAvatar({ user, onImgClick, isLoading}) {
    const { name, age, image } = user

    return (
        <div className='avatar'>
            <img src={image} alt={`${name} avatar`} onClick={onImgClick} className={isLoading ? 'pulse' : ''}/>
            <div className='avatar-title'>{name}</div>
            <div className='avatar-description'>{`${age} years old`}</div>
        </div>
    )
}

export default RoundedAvatar