import firebase from '../../firebase'

export default async function deleteTask(id) {
    console.log(id)
    await firebase
        .firestore()
        .collection('tasks')
        .doc(id)
        .delete()
}