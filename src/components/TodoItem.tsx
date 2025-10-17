import { TodoStatus } from '../types';

interface TodoItemProps {
  id: number;
  text: string;
  status: TodoStatus;
  columnIndex: number;
  totalColumns: number;
  onMoveLeft: (id: number) => void;
  onMoveRight: (id: number) => void;
}

export function TodoItem({
  id,
  text,
  columnIndex,
  totalColumns,
  onMoveLeft,
  onMoveRight
}: TodoItemProps) {
  // Determine if buttons should be disabled based on column position
  const isLeftDisabled = columnIndex === 0; // First column
  const isRightDisabled = columnIndex === totalColumns - 1; // Last column

  return (
    <div className="border p-2 rounded bg-white">
      <div className="flex items-center justify-between gap-2">
        <span className="flex-1">{text}</span>

        <div className="flex gap-1">
          {/* Left arrow button */}
          <button
            onClick={() => onMoveLeft(id)}
            disabled={isLeftDisabled}
            className="px-2 py-1 text-sm border rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            ←
          </button>

          {/* Right arrow button */}
          <button
            onClick={() => onMoveRight(id)}
            disabled={isRightDisabled}
            className="px-2 py-1 text-sm border rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
