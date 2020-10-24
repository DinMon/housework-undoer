import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createUser, ADMIN_USER } from '../domain/User'
import RoundedAvatar from '../components/RoundedAvatar'

function LoginPage({ logUserIn }) {
    const history = useHistory()
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchUsers() {
            const url = 'https://us-central1-housework-60d78.cloudfunctions.net/getUsers'
            const response = await fetch(url)
            const fetchedUsers = await response.json()

            setUsers(
                fetchedUsers.map((user) => createUser(user))
            )
        }
        fetchUsers()
    }, [])

    function onAvatarImgClick(user) {
        if (user.role === ADMIN_USER) {
            history.push('/secure-login')
        } else {
            history.replace('/')
        }
        logUserIn(user)
    }

    return (
        <div className='login-page'>
            <div className='login-page-main'>
                <div className='users-container'>
                    {users && users.map((user) =>
                        (<RoundedAvatar key={user.id} user={user} onImgClick={() => onAvatarImgClick(user)}/>))}
                </div>
            </div>
            <div className='login-side-img'></div>
        </div>
    )
}

export default LoginPage