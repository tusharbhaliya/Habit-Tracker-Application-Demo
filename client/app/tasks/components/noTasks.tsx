import React, { useEffect, useState } from 'react'
import AddTaskForm from './addTask/addTaskForm';


export default function NoTasks({addTask}:{addTask:Function}) {

    const [isAddingTask, setIsAddingTask] = useState(false);
    const cancel = () => {
        setIsAddingTask(false)
    }
    

  return (
    <main className='flex flex-col items-center h-screen justify-center'>
        <h2 className='text-3xl font-medium pb-12'>{isAddingTask ? 'New Task' :'All Done for the day!'}</h2>
        <div className='mb-24'>
        {isAddingTask ? <AddTaskForm addTask={addTask} cancel={cancel}></AddTaskForm> :<button className='py-1 px-2 border-black border-2 rounded hover:text-white hover:bg-black transition-colors duration-500 ease-out' onClick={() => setIsAddingTask(true)}>New Task</button>}
        </div>
        
      </main>
  )
}
