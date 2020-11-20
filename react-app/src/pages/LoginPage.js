import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createUser, ADMIN_USER } from '../domain/User'
import RoundedAvatar from '../components/RoundedAvatar'
import LoadingAnimation from '../components/LoadingAnimation'
import firebase from 'firebase'

function LoginPage({ logUserIn }) {
    const history = useHistory()
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        function fetchUsers() {
            firebase
                .firestore()
                .collection('users')
                .onSnapshot((snapshot) => {
                    const fetchedUsers = snapshot.docs.map((doc) => createUser({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setUsers(fetchedUsers)
                    setIsLoading(false)
                })
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