export type TodoStatus = 'todo' | 'inProgress' | 'done';

export interface Todo {
  id: number;
  text: string;
  status: TodoStatus;
}

export interface Column {
  id: TodoStatus;
  title: string;
}
