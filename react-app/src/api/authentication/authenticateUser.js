import firebase from '../../firebase'
import getUser from '../user/getUser'

const EMAIL_DOMAIN = 'housework.com'
const DUMMY_PASSWORD = 'password'

export async function signIn(user, password = '') {
    await firebase
        .auth()
        .signInWithEmailAndPassword(`${String(user.name).toLowerCase()}@${EMAIL_DOMAIN}`, (password) ? password : DUMMY_PASSWORD )
}

export function signOut(user = null) {
    firebase.auth().signOut()
}

export async function authListener(setUser) {
    firebase.auth().onAuthStateChanged(async user => {
        if (user) {
            setUser(
                await getUser(user.uid)
            )
        } else {
            setUser(null)
        }
    })
}