export const createTask = function userFactory({ title, taskId = undefined, rewardPoints = 0 }) {
    let id = undefined
    let isComplete = false
    const colour = getColour(rewardPoints)

    function setId(newId){
        if (!taskId) {
            id = newId
        }
    }

    function getId() {
        return id
    }

    function getIsComplete() {
        return isComplete
    }

    const complete = function completeTask() {
        isComplete = true
    }

    return { title, rewardPoints, colour, getId, getIsComplete, setId, complete }
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