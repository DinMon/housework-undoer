const cors = require('cors')({origin: true});
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp()

const db = admin.firestore()

exports.getTodoTasks = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        const data = await db.collection('tasks').where('isComplete', '==', false).get()
        let tasks = []
        data.forEach((doc) => {
            id = doc.id
            tasks = [...tasks, {
                id: doc.id,
                title: doc.data().title,
                rewardPoints: doc.data().rewardPoints,
                isCompleted:  doc.data().isComplete,
                completedDate: doc.data().completedDate, 
                completedBy: doc.data().completedBy, 
            }]
        })
        response.json(tasks)
    })
});
