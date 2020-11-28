import React, { useState } from 'react'
import CardAvatar from './CardAvatar'

function CardAvatarWrapper({children, user, signOut}) {
    const [open, setOpen] = useState(false)


    return (
        <div className='card-avatar-wrapper'>
            <CardAvatar user={user} onInteract={() => setOpen(true)} onSignOut={signOut}/>
            {open && React.Children.map(children, (child) => {
                return React.cloneElement(child, { toggleSelf: (isOpen) => setOpen(isOpen)})
            })}
        </div>
    )
}

export default CardAvatarWrapper