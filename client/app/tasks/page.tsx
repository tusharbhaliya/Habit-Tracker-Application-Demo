import React, { useEffect, useState } from 'react'
import TaskList from './components/taskList'
import { Task, tasksToMap } from './interfaces/task'
import AddTaskForm from './components/addTask/addTaskForm'
import NoTasks from './components/noTasks'
const api = require('../_utils/api')
export default function Page() {

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskMap, setTaskMap] = useState<Map<string, Task[]>>()


  const load = async () => {
    const apiTasks = await api.getTasks()
    setTasks(apiTasks);
    setIsLoading(false);
  }

  const refresh = () => {
    setTaskMap(tasksToMap(tasks))
  }

  const addTask = async (task: Task) => {
    const newTask = await api.addTask(task);
    setTasks(tasks.concat(newTask))
  }

  const removeTask = async (id: string) => {
    await api.removeTask(id);
    setTasks(tasks.filter(t => t._id !== id))
  }

  useEffect(() => {
    refresh();
  }, [tasks])
  useEffect(() => {
    load();
  }, [])

  if (isLoading || taskMap === undefined) {
    return (<main className='p-6'>Loading</main>)
  }
  if (tasks.length === 0) {
    return (
      <NoTasks addTask={addTask}></NoTasks>
    )
  }
  return (
    <main className='p-6 flex gap-10'>
      {Array.from((taskMap).keys()).toSorted().map(key => <TaskList key={key} initTasks={taskMap.get(key) as Task[]} project={key} addTask={addTask} removeTask={removeTask}></TaskList>)}
    </main>
  )
}
