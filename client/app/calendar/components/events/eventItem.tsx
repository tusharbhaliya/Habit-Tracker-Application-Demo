import React, { useEffect } from 'react'
import { Task } from '../../../tasks/interfaces/task'

export default function EventItem({ event, setCurrentEvent }: { event: Task, setCurrentEvent: Function }) {

  const handleClick = () => {
    console.log(event.name)
    setCurrentEvent(event);
  }

  return (
    <div className='bg-gray-300 my-1 p-1 rounded hover:bg-gray-100 transition-colors hover:cursor-pointer' >
      <button type='button' onClick={handleClick}>
        {event.name}
      </button>
    </div>
  )
}
