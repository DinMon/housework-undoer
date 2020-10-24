import LilyImg from '../assets/users/Lily@x2.png'
import MaryImg from '../assets/users/Mary@x2.png'
import JackImg from '../assets/users/Jack@x2.png'

export const ADMIN_USER = 'admin'
export const REGULAR_USER = 'regular'

export function createUser({id, name, age, role}) {
    return {
        id,
        name,
        age,
        role,
        image: getUserImage(name)
    }
}

function getUserImage(name) {
    let avatar = null
    switch (name) {
        case 'Lily':
            avatar = LilyImg        
            break
        case 'Mary':
            avatar = MaryImg        
            break
        case 'Jack':
            avatar = JackImg        
            break
        default:
            break
    }
    return avatar
}