import { Task } from "@/app/tasks/interfaces/task";
const api = require("../../_utils/api");

module.exports.tasksToEvents = (tasks: Task[]): Map<number, Task[]> => {
    const daysTask: Map<number, Task[]> = new Map<number, Task[]>();
    for (let task of tasks) {
        let curDate = new Date(task.date).getDate()
        if (daysTask.get(curDate) === undefined) {
            daysTask.set(curDate, [task])
        } else {
            daysTask.get(curDate)?.push(task)
        }

    }
    return daysTask;
}

module.exports.getEvents = async (setEvents: Function) => {
    const tasks: Task[] = await api.getTasks();
    setEvents(exports.tasksToEvents(tasks));
}

module.exports.removeEvent = async (event: Task) => {
    return await api.removeTask(event._id)
}

module.exports.addEvent = async (event: Task):Promise<Task> => {
    return await api.addTask(event);
}