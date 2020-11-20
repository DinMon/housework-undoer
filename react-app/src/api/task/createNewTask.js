import firebase from '../../firebase'

export default async function createNewTask(task) {
    console.log(task)
    await firebase
        .firestore()
        .collection('tasks')
        .add(task)
}