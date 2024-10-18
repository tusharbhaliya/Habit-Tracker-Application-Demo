import React from 'react'
import { Task } from '../../../tasks/interfaces/task'
import EventItem from './eventItem'

DayItem.defaultProps = {
    date: -1,
    events: [],
    setCurrentEvent: null
}

export default function DayItem({ date, events, setCurrentEvent }: { date: number, events: Task[], setCurrentEvent: Function | null }) {

    if (date <= -1) {
        return (<div className="p-2 border border-gray-200 h-[15vh]">

        </div>)
    }


    if (!setCurrentEvent) {
        return (
            <div className="p-2 border border-gray-200 h-[15vh]">
                <h3>{date}</h3>
            </div>
        )
    }
    return (
        <div className="p-2 border border-gray-200 h-[15vh]">
            <h3>{date}</h3>
            {events.map(e => <EventItem key={e._id} event={e} setCurrentEvent={setCurrentEvent}></EventItem>)}
        </div>
    )
}
