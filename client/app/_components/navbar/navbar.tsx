import React from 'react';
import Image from 'next/image';
import MiniCalendar from './miniCalendar';
import CalendarAccounts, { Calendar } from './calendarAccounts';

interface CalendarAccount {
  email:string;
  calendars:Calendar[];
}

export default function Navbar() {

  const calendars: CalendarAccount[] = [
    {
      email: 'henrymprof@gmail.com',
      calendars: [
        {
          name: 'Main',
          color: '#156bff'
        },
        {
          name: 'University',
          color: '#156bff'
        }
      ]
    }
  ]

  return (
    <nav className=' bg-Pwhite border-r-[1px] border-Pblack [&>*]:p-2 min-h-screen'>
      <div className='flex items-center gap-4 border-b-[1px] border-Pblack '>
        <Image src="settings.svg" alt="settings" width={20} height={20} />
        <div className='flex gap-1'><Image src='drop_down.svg' alt='Drop Down Button' width={15} height={15} />Calendar</div>
      </div>
      <div className='border-b-[1px] border-Pblack'>
        <MiniCalendar></MiniCalendar>
      </div>
      <div>
        {calendars.map((c)=> <CalendarAccounts key={c.email} email={c.email} calendars={c.calendars}/>)}
      </div>
    </nav >
  )
}
