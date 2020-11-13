import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createUser, ADMIN_USER } from '../domain/User'
import RoundedAvatar from '../components/RoundedAvatar'
import LoadingAnimation from '../components/LoadingAnimation'
import firebase from 'firebase'
import PasswordAvatar from '../components/PasswordAvatar';

function LoginPage({ logUserIn }) {
    const history = useHistory()
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [adminUser, setAdminUser] = useState(null)

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

    function logUser(user) {
        history.replace('/')
        logUserIn(user)
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
                                (<RoundedAvatar key={user.id} user={user} onImgClick={() => onAvatarImgClick(user)}/>))}
                        </div>
                    )
                )}
            </div>
            <div className='login-side-img'></div>
        </div>
    )
}

export default LoginPage