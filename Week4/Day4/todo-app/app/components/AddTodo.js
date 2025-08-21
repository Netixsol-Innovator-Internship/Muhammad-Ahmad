'use client';

import { useState } from 'react';
import { useCreateTodoMutation } from '../store/todosApi';

export default function AddTodo() {
  const [title, setTitle] = useState('');
  const [createTodo, { isLoading }] = useCreateTodoMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        await createTodo({
          title: title.trim(),
          completed: false,
          userId: 1, // Mock user ID
        });
        setTitle('');
      } catch (error) {
        console.error('Failed to create todo:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !title.trim()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </div>
    </form>
  );
}
