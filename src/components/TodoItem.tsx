import { TodoStatus } from '../types';

interface TodoItemProps {
  id: number;
  text: string;
  status: TodoStatus;
}

export function TodoItem({ text }: TodoItemProps) {
  // Arrow button handlers will be added later

  return (
    <div className="border p-2 rounded bg-white">
      <div className="flex items-center justify-between">
        <span>{text}</span>
        {/* Arrow buttons will go here */}
      </div>
    </div>
  );
}
