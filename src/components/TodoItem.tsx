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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <span className="flex-1 text-gray-700 line-clamp-3">{text}</span>

        <div className="flex gap-2 flex-shrink-0">
          {/* Left arrow button */}
          <button
            onClick={() => onMoveLeft(id)}
            disabled={isLeftDisabled}
            className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-md disabled:opacity-25 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            ←
          </button>

          {/* Right arrow button */}
          <button
            onClick={() => onMoveRight(id)}
            disabled={isRightDisabled}
            className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-md disabled:opacity-25 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
