export function createTask({id, title, rewardPoints, isComplete, completedDate, completedBy}) {
    return {
        id,
        title,
        rewardPoints,
        colour: getColour(rewardPoints),
        isComplete: isComplete,
        completedDate: completedDate,
        completedBy: completedBy
    }
}

export function complete(task, userId) {
    return { ...task, isComplete: true, completedBy: userId}
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