import firebase from '../../firebase'
import { createUser } from '../../domain/User'

async function getUser(id) {
    const snapshot = await firebase
        .firestore()
        .collection('users')
        .doc(id)
        .get()

    return createUser({
        id,
        ...snapshot.data()
    })
}

export default getUser