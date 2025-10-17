import { useState } from 'react';
import { SwimLane } from './components/SwimLane';
import { TodoInputForm } from './components/TodoInputForm';
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

  // Helper function to get todos for a specific column
  const getTodosByStatus = (status: TodoStatus): Todo[] => {
    return todos.filter((todo) => todo.status === status);
  };

  // Add new todo
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(), // Simple ID generation
      text: text.trim(),
      status: 'todo',
    };

    setTodos([...todos, newTodo]);
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
      <TodoInputForm onAddTodo={addTodo} />
    </div>
  );
}
