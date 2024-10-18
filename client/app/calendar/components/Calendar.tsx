import React, { useEffect, useState } from 'react';
const eventAPI =require('../interfaces/event');
import { Task } from '@/app/tasks/interfaces/task';
import DayItem from './events/dayItem'
import AddEventForm from './events/addEventForm';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// const newDay = (day: number, content:string[]) => newDayObject(day.toString() + content, day.toString());
// const newDayObject = (day:number, content: Task[], key: string) => 
//     <div key={key} className="p-2 border border-gray-200 h-[15vh]">
//         {content}
//     </div>;

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentEvent, setCurrentEvent] = useState<Task | null>(null);
    const [events, setEvents] = useState<Map<number, Task[]>>();

    const addEvent = async (task: Task) => {
        console.log(task)   
        const newTask = await eventAPI.addEvent(task);
        eventAPI.getEvents(setEvents);
    }

    const removeCurrentEvent = async ()=> {
        if (currentEvent === null) return;
        console.log(currentEvent)   
        await eventAPI.removeEvent(currentEvent);
        setCurrentEvent(null);
        eventAPI.getEvents(setEvents);
    }

    const getDaysInMonth = (year: number, month: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number): number => {
        return new Date(year, month, 1).getDay();
    };

    const renderDays = () => {
        const year: number = currentDate.getFullYear();
        const month: number = currentDate.getMonth();
        const daysInMonth: number = getDaysInMonth(year, month);
        const firstDay: number = getFirstDayOfMonth(year, month);

        const days = [];
        for (let i: number = 0; i < firstDay; i++) {
            days.push(<DayItem key={i}></DayItem>);
        }

        for (let day: number = 1; day <= daysInMonth; day++) {
            days.push(<DayItem key={day + firstDay - 1} date={day} events={(events as Map<number, Task[]>).get(day)} setCurrentEvent={setCurrentEvent}></DayItem>);
        }
        for (let i: number = 0; i < 7 - (firstDay + daysInMonth) % 7; i++) {
            days.push(<DayItem key={i + daysInMonth + firstDay}></DayItem>);
        }

        return days;
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    //   <button onClick={handlePrevMonth} className="px-4 py-2 bg-blue-500 text-white rounded">Prev</button>
    {/* <button onClick={handleNextMonth} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button> */ }

    // const handleCurrentEventChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { id, value } = event.target
    //     if (currentEvent === null) return;
    //     console.log(currentEvent)
    // }

    const changeCurrentEvent = (event: Task) => {
        console.log(currentEvent)
        if (currentEvent !== null) {
            eventAPI.updateEvent(currentEvent);
        }
        setCurrentEvent(event);
    }

    useEffect(() => {
        eventAPI.getEvents(setEvents);
        // setCurrentEvent({name:'Test',date:new Date('07-14-2024'), completed:false, _id:'0', project:'School'})
    }, [])

    if (!events) {
        return (<div className='p-6'>Loading</div>)
    }
    return (
        <section className='flex h-screen'>
            <div className=" p-4 bg-white flex-grow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                </div>
                <div className="grid grid-cols-7">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="p-2 font-bold text-center border border-gray-200">
                            {day}
                        </div>
                    ))}
                    {renderDays()}
                </div>
            </div>
            <AddEventForm addEvent={addEvent} removeEvent={removeCurrentEvent} initialEvent={currentEvent}></AddEventForm>
        </section>
    );
};

export default Calendar;