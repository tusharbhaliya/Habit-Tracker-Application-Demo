import axios from 'axios'
import { Task } from '../tasks/interfaces/task';

module.exports.getTasks =  async function getTasks(): Promise<Task[]> {
    try {
        const response = await axios.get("http://localhost:5000/tasks")
        const tasks = response.data.map(serverToClientTask)
        return tasks
    } catch (e) {
        console.log(e)
        return []
    }
}

module.exports.addTask =  async function addTask(task:Task):Promise<Task|null> {
    try {
        const response = await axios.post("http://localhost:5000/tasks", {task})
        return serverToClientTask(response.data.task);
    } catch (e) {
        return null;
    }
}

module.exports.updateTask =  async function updateTask(task:Task):Promise<Task|null> {
    try {
        const response = await axios.patch("http://localhost:5000/tasks", {task})
        return serverToClientTask(response.data.task);
    } catch (e) {
        return null;
    }
}

module.exports.removeTask =  async function removeTask(id:string):Promise<Boolean> {
    try {
        const response = await axios.delete(`http://localhost:5000/tasks/${id}`);
        return true;
    } catch (e) {
        return false;
    }
}


function serverToClientTask(server: { _id: string; name: string; date: number; completed: boolean; project: string; }): Task|null {
    return {
        _id: server._id,
        name: server.name,
        date: server.date,
        completed: server.completed,
        project: server.project
    }
}
