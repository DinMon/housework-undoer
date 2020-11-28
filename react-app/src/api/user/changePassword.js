import firebase from '../../firebase'

export default async function changePassword(password) {
    await firebase.auth().currentUser.updatePassword(password)
}