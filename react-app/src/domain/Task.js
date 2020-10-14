export function createTask({id, title, rewardPoints}) {
    return {
        id,
        title,
        rewardPoints,
        colour: getColour(rewardPoints),
        isComplete: false
    }
}

export function complete(task) {
    return { ...task, isComplete: true}
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