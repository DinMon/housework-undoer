import React, { useState, useEffect } from 'react'
import SignOutIcon from '../assets/sign-out.svg'
import { ADMIN_USER } from '../domain/User'

function CardAvatar({ user, onInteract, onSignOut }) {
    const {name, image, coins} = user

    useEffect(() => {
        console.log({onSignOut})
    })

    return (
        <div className='card-avatar-container'>
            <div className='card-avatar'>
                <img src={image} alt={`${name} avatar`} />
                <div className='card-avatar-info-container'>
                    <div className='card-avatar-title'>Hello, {name}!</div>
                    {user.role === ADMIN_USER ? (
                        <button className='default-btn accent-text sub-text' onClick={onInteract}>Change password</button>
                    ) : (
                        <button className='fill-btn help-point-btn'>{coins} HC</button>
                    )}
                </div>
            </div>
            {onSignOut && 
                <button className='leave-btn' onClick={onSignOut}>
                    <div>Leave</div>
                    <img src={SignOutIcon} alt='sign out icon' />
                </button>}
        </div>
    )
}

export default CardAvatar