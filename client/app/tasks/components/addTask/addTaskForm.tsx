import React, { useState } from 'react'


export interface EventFormState {
    name: string;
    date: number;
    project: string;
    time:number;
}
AddTaskForm.defaultProps = {
    project: 'School'
};
export default function AddTaskForm({ addTask, cancel, project }: { addTask: Function, cancel: Function, project: string }) {

    const [formData, setFormData] = useState<EventFormState>({ name: '', date: 0, time:0, project: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    }
    const handleChangeNumeric = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, valueAsNumber } = e.target;
        setFormData({ ...formData, [id]: valueAsNumber });
    }
    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    }

    const handleSubmit = () => {
        if (formData.name && formData.date)
            addTask({
                name: formData.name,
                date: formData.date + formData.time,
                project: !formData.project?project:formData.project
            });
    }

    const handleCancel = () => {
        cancel();
    }

    return (
        <form onSubmit={handleSubmit} className="border-2 border-slate-600 rounded p-2 my-2 flex flex-col gap-1">
            <input type="text" placeholder='Name' id="name" onChange={handleChange} />
            <input type="date" placeholder='date' id="date" className='text-xs' onChange={handleChangeNumeric} />
            <input type="time" placeholder='time' id="time" className='text-xs' onChange={handleChangeNumeric} />
            <div className="flex text-xs justify-evenly">
                <h4 className='font-bold text-sm'>Project</h4>
                <select id="project" name="project" onChange={handleChangeSelect} defaultValue={project}>
                    <option value="School">School</option>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                </select>
            </div>
            <div className='flex justify-evenly gap-1 [&>button]:px-2'>
                <button type="button" className='text-xs text-white bg-black rounded py-1' onClick={handleSubmit}>Add Task</button>
                <button type="button" className='text-xs text-white bg-black rounded py-1' onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    )
}
