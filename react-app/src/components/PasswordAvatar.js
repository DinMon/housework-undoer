import React, { useState, useEffect } from 'react'
import RoundedAvatar from './RoundedAvatar'
import BackArrowImg from '../assets/back-arrow.svg'
import { signIn } from '../api/authentication/authenticateUser'
import PasswordInput from './PasswordInput'

function PasswordAvatar({ user, onBack }) {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function authenticateUser(event) {
        event.preventDefault()
        try {
            setIsLoading(true)
            await signIn(user, password)
            setIsLoading(false)
        } catch(err) {
            setError(err.message)
        }
    }

    function onPasswordChange(password) {
        setPassword(password)
    }

    return (
        <div className='password-avatar-container'>
            <button type='button' className='default-btn back-arrow-btn' onClick={onBack}>
                <img  src={BackArrowImg} alt='back arrow'/>
            </button>
            <div>
                <RoundedAvatar user={user} isLoading={isLoading} />
                <form className='password-form' onSubmit={authenticateUser}>
                    <div className='sign-in-container'>
                        <PasswordInput onPasswordChange={onPasswordChange}/>
                        <button type='submit' className='fill-btn'>Sign In</button>
                    </div>
                    {error && <div className='accent-text form-error'>* {error}</div>}
                </form>
            </div>
        </div>
    )
}

export default PasswordAvatar