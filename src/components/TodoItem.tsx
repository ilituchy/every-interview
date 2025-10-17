import { useState } from 'react';
import { TodoStatus } from '../types';
import { EditModal } from './EditModal';

interface TodoItemProps {
  id: number;
  text: string;
  status: TodoStatus;
  columnIndex: number;
  totalColumns: number;
  onMoveLeft: (id: number) => void;
  onMoveRight: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export function TodoItem({
  id,
  text,
  columnIndex,
  totalColumns,
  onMoveLeft,
  onMoveRight,
  onDelete,
  onEdit
}: TodoItemProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Determine if buttons should be disabled based on column position
  const isLeftDisabled = columnIndex === 0; // First column
  const isRightDisabled = columnIndex === totalColumns - 1; // Last column

  const handleEdit = (newText: string) => {
    onEdit(id, newText);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between gap-3">
          <span className="flex-1 text-gray-700 line-clamp-3" title={text}>
            {text}
          </span>

          <div className="flex flex-col gap-1 flex-shrink-0">
            {/* Top row: Edit and Delete buttons */}
            <div className="flex gap-1">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-2 py-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                title="Edit"
              >
                ✏️
              </button>

              <button
                onClick={() => onDelete(id)}
                className="px-2 py-1 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                title="Delete"
              >
                🗑️
              </button>
            </div>

            {/* Bottom row: Arrow buttons */}
            <div className="flex gap-1">
              <button
                onClick={() => onMoveLeft(id)}
                disabled={isLeftDisabled}
                className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-md disabled:opacity-25 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-400 transition-colors"
              >
                ←
              </button>

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
      </div>

      <EditModal
        isOpen={isEditModalOpen}
        currentText={text}
        onSave={handleEdit}
        onCancel={() => setIsEditModalOpen(false)}
      />
    </>
  );
}
