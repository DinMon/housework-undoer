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

exports.getUsers = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        const data = await db.collection('users').get()
        let users = []
        data.forEach((doc) => {
            id = doc.id
            users = [...users, {
                id: doc.id,
                name: doc.data().name,
                age: doc.data().age,
                role: doc.data().role
            }]
        })
        response.json(users)
    })
});

exports.completeTask = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        const task = JSON.parse(request.body)
        try {
            const { id , completedBy } = task
            if (!id) {
                response.status(400).json(getError('No task Id found!'))
            } else if(!completedBy) {
                response.status(400).json(getError('The person who completed the task is not found!'))
            }
            await saveCompletedTask(task)
            response.status(201).end()
        } catch (err) {
            response.status(400).end()
            console.error(err)
        }
    })
});

exports.getOneWeekTasksHistory = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        const userId = request.query.userId
        if (userId) {
            try {
                const oneWeekInSec = 604800000
                const lastWeekUnixTime = Date.now() - oneWeekInSec
                const taskDocs = await db.collection('tasks')
                    .where('completedBy', '==', userId)
                    .where('isComplete', '==', true)
                    .where('completedDate', '>=', new Date(lastWeekUnixTime))
                    .get()
                let taskHistory = {}
                taskDocs.forEach((doc) => {
                    const { _seconds } = doc.data().completedDate
                    const startDayTime = String(_seconds - _seconds % (60 * 60 * 24))
                    taskHistory = {
                        ...taskHistory,
                        [startDayTime]: (taskHistory[startDayTime]) ? [...taskHistory[startDayTime], doc.data()] : [doc.data()]
                    }
                })
                response.json(taskHistory)
            } catch (err) {
                response.status(500).end()
                console.error(err)
            }
        } else {
            response.status(400).end()
        }
    })
});

async function saveCompletedTask(task) {
    await db.collection('tasks').doc(task.id).update({
        isComplete: true,
        completedBy: task.completedBy,
        completedDate: admin.firestore.FieldValue.serverTimestamp()
    })
}

function getError(err) {
    return {
        error: err
    }
}