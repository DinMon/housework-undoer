import React, { useState, useEffect } from 'react'
import RoundedAvatar from './RoundedAvatar'
import BackArrowImg from '../assets/back-arrow.svg'
import ShowPasswordImg from '../assets/show-password.svg'
import { signIn } from '../api/authentication/authenticateUser'

function PasswordAvatar({ user, signUserIn, onBack }) {
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')

    async function authenticateUser(event) {
        event.preventDefault()
        try {
            await signIn(user, password)
        } catch(err) {
            setError(err.message)
        }
    }

    function onPasswordChange(event) {
        setPassword(event.target.value)
    }

    return (
        <div className='password-avatar-container'>
            <button type='button' className='default-btn back-arrow-btn' onClick={onBack}>
                <img  src={BackArrowImg} alt='back arrow'/>
            </button>
            <div>
                <RoundedAvatar user={user} />
                <form className='password-form' onSubmit={authenticateUser}>
                    <div className='sign-in-container'>
                        <div className='password-textbox-container'>
                            <input className='textbox password-textbox' type={(showPassword) ? 'text' : 'password'} name='password' onChange={onPasswordChange} required/>
                            <button type='button' className={`default-btn show-password-btn ${(showPassword) ? '' : 'visible'}`} onMouseDown={() => setShowPassword(!showPassword)}>
                                <img  src={ShowPasswordImg} alt='show password'/>
                            </button>
                        </div>
                        <button type='submit' className='btn'>Sign In</button>
                    </div>
                    {error && <div className='form-error'>* {error}</div>}
                </form>
            </div>
        </div>
    )
}

export default PasswordAvatar