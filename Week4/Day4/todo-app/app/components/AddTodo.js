'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserTodo } from '../store/localTodosSlice';

export default function AddTodo() {
  const [title, setTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      const todoTitle = title.trim();
      setTitle(''); // Clear input immediately for better UX
      setIsAdding(true);
      
      // Add to local state (instant)
      dispatch(addUserTodo({ title: todoTitle }));
      
      // Simulate brief loading state for visual feedback
      setTimeout(() => {
        setIsAdding(false);
      }, 200);
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
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          disabled={isAdding}
        />
        <button
          type="submit"
          disabled={isAdding || !title.trim()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
        >
          {isAdding ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Adding...
            </div>
          ) : (
            'Add'
          )}
        </button>
      </div>
    </form>
  );
}
