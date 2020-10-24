import React from 'react'
import { useHistory } from 'react-router-dom'
import { useUser } from '../App'
import CardAvatar from './CardAvatar'

function Sidebar() {
    const history = useHistory()
    const { userLoggedIn, signUserOut } = useUser()

    function signOut() {
        signUserOut()
        history.replace('/login')
    }

    return (
        <div className='sidebar'>
            <CardAvatar user={userLoggedIn} onSignOut={signOut}/>
        </div>
    )
}

export default Sidebar