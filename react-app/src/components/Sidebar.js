import React from 'react'
import { useHistory } from 'react-router-dom'
import { useUserLogged } from '../App'
import CardAvatarWrapper from './CardAvatarWrapper'
import PasswordCard from './PasswordCard'

function Sidebar() {
    const history = useHistory()
    const { userLoggedIn, signUserOut } = useUserLogged()

    function signOut() {
        signUserOut()
        history.replace('/login')
    }

    return (
        <div className='sidebar'>
            <CardAvatarWrapper user={userLoggedIn} signOut={signOut}>
                <PasswordCard />
            </CardAvatarWrapper>
        </div>
    )
}

export default Sidebar