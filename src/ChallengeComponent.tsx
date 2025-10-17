// Type Definitions
type TodoStatus = 'todo' | 'inProgress' | 'done';

interface Todo {
  id: number;
  text: string;
  status: TodoStatus;
}

interface Column {
  id: TodoStatus;
  title: string;
}

// Column configuration
const COLUMNS: Column[] = [
  { id: 'todo', title: 'Todo' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

export function ChallengeComponent() {
  // State will go here
  // - todos: Todo[]
  // - inputValue: string

  // Functions will go here
  // - addTodo: (text: string) => void
  // - moveRight: (id: number) => void
  // - moveLeft: (id: number) => void

  return (
    <>
      <h2 className="text-center py-48 text-xl text-gray-700">
        Starting component "Hello world"
      </h2>
    </>
  );
}
