import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo App</h1>
          <p className="text-gray-600">
            Built with Next.js, Redux Toolkit & RTK Query
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <AddTodo />
          <TodoList />
        </div>
      </div>
    </div>
  );
}
