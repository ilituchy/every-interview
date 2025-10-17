import { useState } from 'react';

interface TodoInputFormProps {
  onAddTodo: (text: string) => void;
}

export function TodoInputForm({ onAddTodo }: TodoInputFormProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="flex gap-2 bg-white p-3 rounded-lg border border-gray-200">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-3 py-2 text-sm border-none focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  );
}
