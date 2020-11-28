import React, { useState } from 'react'
import ShowPasswordImg from '../assets/show-password.svg'

function PasswordInput({ onPasswordChange }) {
    const [showPassword, setShowPassword] = useState(false)

    function setPassword(event) {
        onPasswordChange(event.target.value)
    }
    return (
        <div className='password-textbox-container'>
            <input className='textbox password-textbox' type={(showPassword) ? 'text' : 'password'} name='password' onChange={setPassword} required/>
            <button type='button' className={`default-btn show-password-btn ${(showPassword) ? 'visible' : ''}`} onMouseDown={() => setShowPassword(!showPassword)}>
                <img  src={ShowPasswordImg} alt='show password'/>
            </button>
        </div>
    )
}

export default PasswordInput