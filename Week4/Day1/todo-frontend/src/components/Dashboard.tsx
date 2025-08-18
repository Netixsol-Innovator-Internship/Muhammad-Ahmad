import React, { useState } from 'react';
import Task from './Task';


const Dashboard: React.FC = () => {

    // Manage Tasks
    const [tasks, setTasks] = useState<{ title: string; completed: boolean }[]>([]);
    const [filter, setFilter] = useState<string>("all");
    const [taskInput, setTaskInput] = useState("");

    const handleDeleteTask = (id: number) => {
        setTasks(tasks.filter((_, idx) => idx !== id));
    };

    const handleToggleCompleted = (id: number) => {
        setTasks(tasks.map((task, idx) => idx === id ? { ...task, completed: !task.completed } : task));
    };

    const handleAddTask = () => {
        if (taskInput.trim() === "") return;
        setTasks([...tasks, { title: taskInput, completed: false }]);
        setTaskInput("");
    };

    const filterTasks = (filter: string) => {
        setFilter(filter);
    };

    return (
        <div className='max-w-screen-lg mx-auto px-6'>
            <h1 className='font-bold mt-4 text-center text-4xl'>TODO APP</h1>

            <div className='my-6 flex gap-2 justify-center'>
                <input
                    type="text"
                    name="task"
                    id="task"
                    className='border-1 px-2'
                    placeholder='Enter your task'
                    value={taskInput}
                    onChange={e => setTaskInput(e.target.value)}
                />
                <button className='bg-blue-700 text-white px-2 py-1 rounded' onClick={handleAddTask}>Add Task</button>
            </div>

            {/* Tasks Container */}
            <div>
                {/* Header */}
                <div className='my-6 flex justify-between'>
                    <h2 className='font-bold text-xl my-2'>Tasks</h2>
                    <div className='space-x-1'>
                        <button className='bg-green-500 text-white px-2 py-1 rounded' onClick={() => filterTasks("completed")}>Completed Tasks</button>
                        <button className='bg-red-500 text-white px-2 py-1 rounded' onClick={() => filterTasks("pending")}>Pending Tasks</button>
                        <button className='bg-gray-500 text-white px-2 py-1 rounded' onClick={() => filterTasks("all")}>All Tasks</button>
                    </div>
                </div>
                {/* Tasks Component */}
                {tasks
                    .filter(task => {
                        if (filter === "completed") return task.completed;
                        if (filter === "pending") return !task.completed;
                        return true;
                    })
                    .map((task, idx) => (
                        <Task
                            key={idx}
                            id={idx}
                            title={task.title}
                            onDelete={handleDeleteTask}
                            completed={task.completed}
                            onToggleCompleted={handleToggleCompleted}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Dashboard;
