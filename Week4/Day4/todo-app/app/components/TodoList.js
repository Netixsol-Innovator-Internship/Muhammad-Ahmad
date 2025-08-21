'use client';

import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetTodosQuery } from '../store/todosApi';
import TodoItem from './TodoItem';

export default function TodoList() {
  const { data: apiTodos = [], error, isLoading } = useGetTodosQuery();
  const userTodos = useSelector(state => state.localTodos.userTodos);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Combine user todos (at top) with API todos
  const allTodos = useMemo(() => {
    return [...userTodos, ...apiTodos];
  }, [userTodos, apiTodos]);

  const filteredTodos = useMemo(() => {
    let filtered = allTodos;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    switch (filter) {
      case 'active':
        return filtered.filter(todo => !todo.completed);
      case 'completed':
        return filtered.filter(todo => todo.completed);
      default:
        return filtered;
    }
  }, [allTodos, filter, searchTerm]);

  const stats = useMemo(() => {
    const total = allTodos.length;
    const completed = allTodos.filter(todo => todo.completed).length;
    const active = total - completed;
    const userCreated = userTodos.length;
    const fromApi = apiTodos.length;
    return { total, completed, active, userCreated, fromApi };
  }, [allTodos, userTodos, apiTodos]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading initial todos. You can still add your own!</p>
      </div>
    );
  }

  return (
    <div>
      {/* Info about todos */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700 text-sm">
          📝 {stats.userCreated} user todos + {stats.fromApi} from API = {stats.total} total
          <br />
          <span className="text-blue-600 text-xs">
            Your todos appear at the top. Add as many as you want!
          </span>
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'active'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Active ({stats.active})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'completed'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Completed ({stats.completed})
            </button>
          </div>
        </div>
      </div>

      {/* Todo List */}
      {filteredTodos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {searchTerm
              ? 'No todos found matching your search.'
              : filter === 'all'
              ? 'No todos yet. Add one above!'
              : `No ${filter} todos.`}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTodos.map(todo => (
            <TodoItem key={`${todo.isUserCreated ? 'user' : 'api'}-${todo.id}`} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}
