import React, { useEffect, useState } from 'react'
import { createUser, ADMIN_USER } from '../domain/User'
import RoundedAvatar from '../components/RoundedAvatar'
import LoadingAnimation from '../components/LoadingAnimation'
import firebase from '../firebase'
import PasswordAvatar from '../components/PasswordAvatar';
import { signIn } from '../api/authentication/authenticateUser'

function LoginPage() {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [adminUser, setAdminUser] = useState(null)
    const [signingUserId, setSigningUserId] = useState('')

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
            setAdminUser(user)
        } else {
            logUser(user)
        }
    }

    async function logUser(user) {
        setSigningUserId(user.id)
        await signIn(user)
        setSigningUserId('')
    }

    return (
        <div className='login-page'>
            <div className='login-page-main'>
                {isLoading ? (
                    <LoadingAnimation />
                ): (
                    (adminUser) ? (
						<PasswordAvatar user={adminUser} onBack={() => setAdminUser(null)}/>
                    ) : (
                        <div className='users-container'>
                            {users && users.map((user) =>
                                (<RoundedAvatar key={user.id} user={user} onImgClick={() => onAvatarImgClick(user)}
                                 isLoading={user.id === signingUserId}/>))}
                        </div>
                    )
                )}
            </div>
            <div className='login-side-img'></div>
        </div>
    )
}

export default LoginPage