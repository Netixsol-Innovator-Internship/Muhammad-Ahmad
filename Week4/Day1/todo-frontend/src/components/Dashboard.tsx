import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';


const Dashboard: React.FC = () => {

    // Manage Tasks

    interface TaskType {
        id: string;
        title: string;
        description?: string;
        completed: boolean;
    }

    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [filter, setFilter] = useState<string>("all");
    const [taskInput, setTaskInput] = useState("");

    // Fetch tasks from backend
    useEffect(() => {
        axios.get<TaskType[]>('http://localhost:4000/api/tasks')
            .then(res => setTasks(res.data))
            .catch(() => setTasks([]));
    }, []);

    const handleDeleteTask = async (id: string) => {
        try {
            await axios.delete(`http://localhost:4000/api/tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {}
    };

    const handleToggleCompleted = async (id: string) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;
        try {
            const res = await axios.put<TaskType>(`http://localhost:4000/api/tasks/${id}`, {
                completed: !task.completed
            });
            setTasks(tasks.map(t => t.id === id ? res.data : t));
        } catch (err) {}
    };

    const handleAddTask = async () => {
        if (taskInput.trim() === "") return;
        try {
            const res = await axios.post<TaskType>('http://localhost:4000/api/tasks', {
                title: taskInput
            });
            setTasks([...tasks, res.data]);
            setTaskInput("");
        } catch (err) {}
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
                    .map((task) => (
                        <Task
                            key={task.id}
                            id={task.id}
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
