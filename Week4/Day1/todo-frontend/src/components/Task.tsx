import React from 'react'

interface myTaskProps {
    title: string;
    id: string;
    onDelete: (id: string) => void | Promise<void>;
    completed: boolean;
    onToggleCompleted: (id: string) => void | Promise<void>;
}

const Task: React.FC<myTaskProps> = (props) => {
    return (
        <>
            <div className='flex gap-2 items-center justify-between'>
                <div className='flex gap-4'>
                    <input
                        type="checkbox"
                        checked={props.completed}
                        onChange={() => props.onToggleCompleted(props.id)}
                        value="completed"
                        name="completed"
                        id="completed"
                    />
                    <p>{props.title}</p>
                </div>
                <button className='text-red-600 cursor-pointer' onClick={() => props.onDelete(props.id)}>Delete</button>
            </div>
        </>
    )
}

export default Task
