import { useState } from 'react';
import { SwimLane } from './components/SwimLane';
import { Todo, TodoStatus, Column } from './types';

// Column configuration
const COLUMNS: Column[] = [
  { id: 'todo', title: 'Todo' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

export function ChallengeComponent() {
  // State management
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Helper function to get todos for a specific column
  const getTodosByStatus = (status: TodoStatus): Todo[] => {
    return todos.filter((todo) => todo.status === status);
  };

  // Add new todo
  const addTodo = (text: string) => {
    if (text.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(), // Simple ID generation
      text: text.trim(),
      status: 'todo',
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(inputValue);
  };

  // Movement functions will be added here
  // const moveLeft = (id: number) => { ... }
  // const moveRight = (id: number) => { ... }

  return (
    <div className="p-8">
      {/* Three column layout */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {COLUMNS.map((column) => (
          <SwimLane
            key={column.id}
            title={column.title}
            todos={getTodosByStatus(column.id)}
            status={column.id}
          />
        ))}
      </div>

      {/* Add todo form */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
