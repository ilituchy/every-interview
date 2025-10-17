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

  // Move todo to the right (next status)
  const moveRight = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;

        // Find current column index
        const currentIndex = COLUMNS.findIndex((col) => col.id === todo.status);

        // If not at the last column, move to next
        if (currentIndex < COLUMNS.length - 1) {
          return { ...todo, status: COLUMNS[currentIndex + 1].id };
        }

        return todo; // Already at last column
      })
    );
  };

  // Move todo to the left (previous status)
  const moveLeft = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;

        // Find current column index
        const currentIndex = COLUMNS.findIndex((col) => col.id === todo.status);

        // If not at the first column, move to previous
        if (currentIndex > 0) {
          return { ...todo, status: COLUMNS[currentIndex - 1].id };
        }

        return todo; // Already at first column
      })
    );
  };

  return (
    <div className="p-8">
      {/* Three column layout */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {COLUMNS.map((column, index) => (
          <SwimLane
            key={column.id}
            title={column.title}
            todos={getTodosByStatus(column.id)}
            status={column.id}
            columnIndex={index}
            totalColumns={COLUMNS.length}
            onMoveLeft={moveLeft}
            onMoveRight={moveRight}
          />
        ))}
      </div>

      {/* Add todo form */}
      <TodoInputForm onAddTodo={addTodo} />
    </div>
  );
}
