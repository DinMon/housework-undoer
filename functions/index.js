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
        const taskHistoryDocs = await db.collection('tasks-history').limit(7).get()
        let taskHistoryWithIds = {}
        taskHistoryDocs.forEach((doc) => {
            const taskIds = doc.data().taskIds || []
            taskHistoryWithIds = {
                ...taskHistoryWithIds,
                [doc.id]: taskIds
            }
        }, {})
        const taskHistoryWithTask = Object.assign({}, 
            ...await Promise.all(Object.keys(taskHistoryWithIds).map(
                async (unixTime) => ({[unixTime]: await getAllTasks(userId, taskHistoryWithIds[unixTime])})
            )))
        response.json(taskHistoryWithTask)
    })
});

async function getAllTasks(userId, ids) {
    if (Array.isArray(ids)) {
        if (ids.length > 0) {
            const refs = ids.map(id => db.doc(`tasks/${id}`))
            const taskDocs = await db.getAll(...refs)
            return taskDocs.reduce((tasks, doc) => {
                const task = doc.data()
                if (task.completedBy === userId) {
                    return [...tasks, {...task, id: doc.id }]
                }
                return tasks
            }, [])
        }
    }
    return []
}

async function saveCompletedTask(task) {
    const { _writeTime: { _seconds } } = await db.collection('tasks').doc(task.id).update({
        isComplete: true,
        completedBy: task.completedBy,
        completedDate: admin.firestore.FieldValue.serverTimestamp()
    })
    const startDayTime = String(_seconds - _seconds % (60 * 60 * 24))
    const historyDate = await db.collection('tasks-history').doc(startDayTime).get()
    if (historyDate.exists) {
        await db.collection('tasks-history').doc(startDayTime).update({
            taskIds: admin.firestore.FieldValue.arrayUnion(task.id)
        })
    } else {
        await db.collection('tasks-history').doc(startDayTime).set({
            taskIds: admin.firestore.FieldValue.arrayUnion(task.id)
        })
    }
}

function getError(err) {
    return {
        error: err
    }
}