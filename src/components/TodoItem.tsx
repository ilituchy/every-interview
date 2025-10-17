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
      <div className="bg-white p-3 rounded-md border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
        <div className="flex items-start justify-between gap-2">
          <span className="flex-1 text-sm text-gray-800 line-clamp-3" title={text}>
            {text}
          </span>

          <div className="flex flex-col gap-1.5 flex-shrink-0">
            {/* Top row: Edit and Delete buttons */}
            <div className="flex gap-1">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="p-1 text-base hover:bg-gray-100 rounded transition-colors"
                title="Edit"
              >
                ✏️
              </button>

              <button
                onClick={() => onDelete(id)}
                className="p-1 text-base hover:bg-gray-100 rounded transition-colors"
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
                className="px-2 py-1 text-xs font-medium bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
              >
                ←
              </button>

              <button
                onClick={() => onMoveRight(id)}
                disabled={isRightDisabled}
                className="px-2 py-1 text-xs font-medium bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
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
