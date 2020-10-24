import React from 'react'

function RoundedAvatar({ user, onImgClick}) {
    const { name, age, image } = user

    return (
        <div className='avatar'>
            <img src={image} alt={`${name} avatar`} onClick={onImgClick} />
            <div className='avatar-title'>{name}</div>
            <div className='avatar-description'>{`${age} years old`}</div>
        </div>
    )
}

export default RoundedAvatar