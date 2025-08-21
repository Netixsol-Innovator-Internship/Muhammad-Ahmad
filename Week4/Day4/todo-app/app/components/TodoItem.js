'use client';

import { useState } from 'react';
import { useUpdateTodoMutation, useDeleteTodoMutation } from '../store/todosApi';

export default function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();

  const handleToggleComplete = async () => {
    try {
      await updateTodo({
        id: todo.id,
        title: todo.title,
        completed: !todo.completed,
        userId: todo.userId,
      });
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleEdit = async () => {
    if (isEditing) {
      if (editTitle.trim() && editTitle !== todo.title) {
        try {
          await updateTodo({
            id: todo.id,
            title: editTitle.trim(),
            completed: todo.completed,
            userId: todo.userId,
          });
        } catch (error) {
          console.error('Failed to update todo:', error);
          setEditTitle(todo.title);
        }
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <button
        onClick={handleToggleComplete}
        disabled={isUpdating}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-green-500'
        }`}
      >
        {todo.completed && (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEdit();
              if (e.key === 'Escape') handleCancel();
            }}
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span
            className={`${
              todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleEdit}
              disabled={isUpdating}
              className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-2 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              disabled={isUpdating || isDeleting}
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isUpdating || isDeleting}
              className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
