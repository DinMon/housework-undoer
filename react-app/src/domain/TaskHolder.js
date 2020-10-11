export const DESC = 'DESCENDING'

export const createTaskHolder = function taskHolderFactory() {
    let tasks = []
    let countId = 0
    let hasAnyChange = false

    function getTasks() {
        return tasks
    }

    function getHasAnyChange() {
        return hasAnyChange
    }

    const completeTask = function changeTaskStatus(id) {
        if (typeof id == 'number') {
            const taskIndex = tasks.findIndex(function getTaskCompleteIndex(task) {
                return task.getId() === id
            })
            if (taskIndex !== -1) {
                let task = tasks[taskIndex] 
                if (task) {
                    task.complete()
                    hasAnyChange = !hasAnyChange
                }
                tasks = [...tasks.slice(0, taskIndex), task, ...tasks.slice(taskIndex + 1)]
            }
        }
    }

    function addTask(taskList) {
        return function add(task) {
            hasAnyChange = !hasAnyChange
            task.setId(countId++)
            tasks = [...taskList, task]
            return { getTasks, add: addTask(tasks), sortBy, completeTask, getHasAnyChange }
        }
    }

    const sortBy = function sortTask(sortOrder) {
        if (typeof sortOrder == 'string') {
            hasAnyChange = !hasAnyChange
            let sortFunc
            if (sortOrder == DESC) {
                sortFunc = (task1, task2) => task2.reward - task1.reward
            }
            tasks = [...tasks].sort(sortFunc)
        }
        return { getTasks, add: addTask(tasks), sortBy, completeTask, getHasAnyChange }
    }

    return { getTasks, add: addTask(tasks), sortBy, completeTask, getHasAnyChange }
}