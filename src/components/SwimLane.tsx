import { TodoItem } from './TodoItem';
import { Todo, TodoStatus } from '../types';

interface SwimLaneProps {
  title: string;
  todos: Todo[];
  status: TodoStatus;
  columnIndex: number;
  totalColumns: number;
  onMoveLeft: (id: number) => void;
  onMoveRight: (id: number) => void;
}

export function SwimLane({
  title,
  todos,
  columnIndex,
  totalColumns,
  onMoveLeft,
  onMoveRight
}: SwimLaneProps) {
  return (
    <div className="bg-white p-4 rounded">
      {/* Column header */}
      <h2 className="text-lg font-bold mb-4">{title}</h2>

      {/* Todo items */}
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-gray-400 text-sm">No items</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              status={todo.status}
              columnIndex={columnIndex}
              totalColumns={totalColumns}
              onMoveLeft={onMoveLeft}
              onMoveRight={onMoveRight}
            />
          ))
        )}
      </div>
    </div>
  );
}
