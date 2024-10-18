import React, { useState } from 'react';

const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];


export default function MiniCalendar() {

    const [currentDate, setCurrentDate] = useState(new Date());
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
            days.push(<div></div>);
        }

        for (let day: number = 1; day <= daysInMonth; day++) {
            days.push(<div className={`${currentDate.getDate() == day ? 'bg-accent rounded-lg text-Pwhite font-bold':''}`}>{day}</div>);
        }

        return days;
    };
    return (
        <div className="grid grid-cols-7 text-center [&>*]:py-1 [&>*]:px-1 text-xs">
            {daysOfWeek.map((day) => (
                <div key={day} className="">
                    {day}
                </div>
            ))}
            {renderDays()}
        </div>
    )

}
