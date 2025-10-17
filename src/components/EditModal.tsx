import { useState, useEffect } from 'react';

interface EditModalProps {
  isOpen: boolean;
  currentText: string;
  onSave: (newText: string) => void;
  onCancel: () => void;
}

export function EditModal({ isOpen, currentText, onSave, onCancel }: EditModalProps) {
  const [text, setText] = useState(currentText);

  // Update text when currentText prop changes
  useEffect(() => {
    setText(currentText);
  }, [currentText]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (text.trim()) {
      onSave(text.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Edit Todo</h2>
        </div>

        <div className="p-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] resize-none"
            autoFocus
          />
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-2 justify-end rounded-b-lg">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
