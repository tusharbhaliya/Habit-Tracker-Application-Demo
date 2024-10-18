'use client'
import { processDate } from '@/app/_utils/util';
import { Task } from '@/app/tasks/interfaces/task'
import React, { useEffect, useState } from 'react'

AddEventForm.defaultProps = {
  initialEvent: null
}

interface EventFormState{
  name:string;
  date:string;
}

export default function AddEventForm({ addEvent,removeEvent,initialEvent }: { addEvent: Function,removeEvent:Function,initialEvent:Task|null }) { //{ currentEvent }: { currentEvent: Task | null }

  const [formData, setFormData] = useState<EventFormState>({ name: '', date: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  }

  const handleSubmit = () => {
    const d:Date = new Date(formData.date)

    if (formData.name && formData.date)
      addEvent({
        name: formData.name,
        date: d.valueOf() + 3600*1000*5,
        project: 'School'
      });
    setFormData({name:'',date:''})
    if (initialEvent)
    {
      removeEvent()
    }
  }

  // const handleCancel = () => {
  //     cancel();
  // }

  useEffect(()=>{
    if (initialEvent) {
      setFormData({name:initialEvent.name,date:processDate(initialEvent.date)})
    }
  },[initialEvent])

  return (
    <form className='p-10 bg-gray-300 w-64 '>
      <h3>Event</h3>
      <input type="text" placeholder='Name' id="name" name='name' value={formData.name} onChange={(handleChange)} />
      <input type="date" placeholder='date' id="date" name='name' value={formData.date} className='text-xs' onChange={handleChange} />
      <div className='flex justify-evenly gap-1 [&>button]:px-2'>
        <button type="button" className='text-xs text-white bg-black rounded py-1' onClick={handleSubmit}>{!initialEvent ?'Add Event':'Update Event'}</button>
      </div>
    </form>
  )
}
// <form onSubmit={handleSubmit} className="border-2 border-slate-600 rounded p-2 my-2 flex flex-col gap-1">
//     <input type="text"  placeholder='Name' id="name" onChange={handleChange}/>
//     <input type="date"  placeholder='date' id="date" className='text-xs' onChange={handleChange}/>
//     <div className='flex justify-evenly gap-1 [&>button]:px-2'>
//         <button type="button" className='text-xs text-white bg-black rounded py-1' onClick={handleSubmit}>Add Task</button>
//         <button type="button" className='text-xs text-white bg-black rounded py-1' onClick={handleCancel}>Cancel</button>
//     </div>
// </form>