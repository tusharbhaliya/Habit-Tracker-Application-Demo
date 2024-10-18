import React, { useEffect, useState } from 'react'
import { Task } from '../interfaces/task'
const api = require('../../_utils/api')
import TaskItem from './taskItem'
import AddTask from './addTask/addTask'
export default function TaskList({ initTasks, project, addTask,removeTask }: { initTasks: Task[], project: string, addTask:Function,removeTask: Function }) {
    const [tasks, setTasks] = useState<Task[]>([])

    

    useEffect(() => {
        setTasks(initTasks)
    }, [initTasks])

    return (
        <div className='max-w-44'>
            <h2 className='font-bold pb-2 text-lg'>{project}</h2>
            {tasks.map(task => <TaskItem task={task} key={task.name} removeTask={removeTask}></TaskItem>)}
            <AddTask addTask={addTask} project={project}></AddTask>
        </div>
    )
}

