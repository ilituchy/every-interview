import { useEffect, useRef } from 'react';
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
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export function SwimLane({
  title,
  todos,
  columnIndex,
  totalColumns,
  onMoveLeft,
  onMoveRight,
  onDelete,
  onEdit
}: SwimLaneProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when todos change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [todos]);

  return (
    <div className="bg-gray-50 rounded-lg shadow-sm border border-gray-200 h-[500px] flex flex-col">
      {/* Column header */}
      <h2 className="text-xl font-semibold p-6 pb-4 text-gray-800 border-b border-gray-200">
        {title}
      </h2>

      {/* Todo items - scrollable area */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 pt-4">
        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-gray-400 text-sm text-center mt-8 italic">No items</p>
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
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
