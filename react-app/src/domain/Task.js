import { ADMIN_USER } from "./User"

export const NEW_TASK = 'NEW_TASK'
export const EDIT_TASK = 'EDIT_TASK' 
export const COMPLETE_TASK = 'COMPLETE_TASK' 
export const QUESTION_TASK = 'QUESTION_TASK' 

export function createTask({id, title, rewardPoints, isComplete, completedDate, completedBy}) {
    return {
        id,
        title,
        rewardPoints,
        colour: getColour(rewardPoints),
        isComplete: isComplete,
        completedDate: completedDate,
        completedBy: completedBy,
        status: QUESTION_TASK
    }
}

export function complete(task, userId) {
    return { ...task, isComplete: true, completedBy: userId, status: COMPLETE_TASK}
}

export function setStatus(user, task, status) {
    return { ...task, status: getValidStatus(user, task, status)}
}

export function setTaskReward(task, points) {
    return { ...task, rewardPoints: points, colour: getColour(points) } 
}

function getValidStatus(user, task, status) {
    if (user.role === ADMIN_USER) {
        if (!status) {
            return EDIT_TASK
        } else {
            if (status === NEW_TASK || status === EDIT_TASK) {
                return status
            }
        }
    } else {
        if (status === COMPLETE_TASK || status === QUESTION_TASK) {
            return status
        }
    }
    return task.status
}

function getColour(points) {
    points = (typeof points == 'number') ? points : 0
    if (points >= 125) {
        return '#FF467D'
    } else if (points >= 100 && points < 125) {
        return '#FF5F5F'
    } else if (points >= 75 && points < 100) {
        return '#FE8368'
    } else {
        return '#FFB966'
    } 
}