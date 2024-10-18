import React from 'react'
import Image from 'next/image'

export interface Calendar {
    name: string;
    color: string;
}
export default function CalendarAccounts({ email, calendars }: { email: string, calendars: Calendar[] }) {
    return (
        <div>
            <div className='flex gap-1 mb-2'>
                <Image src='drop_down.svg' alt='Drop Down Button' width={15} height={15} />
                <div className='text-sm'>{email}</div>
            </div>
            <div className='flex flex-col gap-3'>
                {calendars.map(c =>
                    <div key={c.name} className='flex items-center gap-2 ml-5'>
                        <div className={`w-4 h-4 bg-[${c.color}] rounded-md`}></div>
                        <div className='text-xs'>{c.name}</div>
                    </div>)}
            </div>
        </div>
    )
}
