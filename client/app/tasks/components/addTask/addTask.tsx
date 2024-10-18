import React, { useState } from 'react'
import AddTaskForm, { EventFormState } from './addTaskForm'

export default function AddTask({ addTask, project }: { addTask: Function, project:string }) {

  const [isAddingTask, setIsAddingTask] = useState(false)

  const startAddingTask = () => {
    setIsAddingTask(true)
  }
  const addTaskEvent = (formTask:EventFormState) => {
    addTask(formTask);
    setIsAddingTask(false)
  }
  const cancelAddTask = () => {
    setIsAddingTask(false)
  }

  if (!isAddingTask) {
    return (
      <div className='text-xs pl-2 hover:text-slate-600 hover:cursor-pointer transition-colors' onClick={startAddingTask}>New Task</div>
    )
  } else {
    return (
    <AddTaskForm addTask={addTaskEvent} cancel={cancelAddTask} project={project}></AddTaskForm>
    )
  }
}
