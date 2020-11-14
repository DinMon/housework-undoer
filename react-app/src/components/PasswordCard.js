import React, { useState } from 'react'
import PasswordInput from './PasswordInput'
import Button from './Button'
import changePassword from '../api/user/changePassword'

function PasswordCard({ toggleSelf }) {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function onPasswordChange(password) {
        setPassword(password)
    }

    async function savePassword() {
        try {
            setLoading(true)
            await changePassword(password)
            toggleSelf(false)
            setLoading(false)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className='password-card-container'>
            <div className='form-label'>New Password:</div>
            <PasswordInput onPasswordChange={onPasswordChange} error={error}/>
            {error && <div className='accent-text form-error'>{error}</div>}
            <div className='password-card-btn-stack'>
                <Button className='empty-btn' onClick={() => toggleSelf(false)}>Cancel</Button>
                <Button className='fill-btn extended-btn' onClick={savePassword} isLoading={loading}>Save</Button>
            </div>
        </div>
    )
}

export default PasswordCard