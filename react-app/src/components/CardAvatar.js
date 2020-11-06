import React from 'react'
import SignOutIcon from '../assets/sign-out.svg'

function CardAvatar({ user, onSignOut }) {
    const {name, image, coins} = user
    return (
        <div className='card-avatar-wrapper'>
            <div className='card-avatar'>
                <img src={image} alt={`${name} avatar`} />
                <div className='card-avatar-info-container'>
                    <div className='card-avatar-title'>Hello, {name}!</div>
                    <button className='help-point-btn'>{coins} HC</button>
                </div>
            </div>
            <button className='leave-btn' onClick={onSignOut}>
                <div>Leave</div>
                <img src={SignOutIcon} alt='sign out icon' />
            </button>
        </div>
    )
}

export default CardAvatar