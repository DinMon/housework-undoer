import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createUser, ADMIN_USER } from '../domain/User'
import RoundedAvatar from '../components/RoundedAvatar'
import LoadingAnimation from '../components/LoadingAnimation'

function LoginPage({ logUserIn }) {
    const history = useHistory()
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchUsers() {
            const response = await fetch('https://us-central1-housework-60d78.cloudfunctions.net/getUsers')
            const fetchedUsers = await response.json()

            setUsers(
                fetchedUsers.map((user) => createUser(user))
            )
            setIsLoading(false)
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
                {isLoading ? (
                    <LoadingAnimation />
                ): (
                    <div className='users-container'>
                        {users && users.map((user) =>
                            (<RoundedAvatar key={user.id} user={user} onImgClick={() => onAvatarImgClick(user)}/>))}
                    </div>
                )}
            </div>
            <div className='login-side-img'></div>
        </div>
    )
}

export default LoginPage