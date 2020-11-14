import firebase from '../../firebase'

export default async function updateTask(task) {
    const { id, title, rewardPoints } = task
    await firebase
        .firestore()
        .collection('tasks')
        .doc(id)
        .update({
            title,
            rewardPoints
        })
}