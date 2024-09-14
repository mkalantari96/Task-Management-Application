// src/types.ts

// Type for Task
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  createDate?: string;
  dueDate?: string;
}

//type of create Task
export interface TaskCreate {
  id: string;
  title: string;
  description?: string;
  createDate?: string;
  dueDate?: string;
}
// Type for Redux State
export interface TaskState {
  selectedTaskId?: string;
  tasks: Task[];
  addNewTask: boolean;
  changeStatus: boolean;
  deletingTask: boolean;
  draggingItem: string | null;
  filterTask: Task[];
  selectedStatus: string;
  editingTask: boolean;
  showTaskAnimation: boolean;
}

// Type for Component Props
export interface TaskListProps {
  tasks: Task[];
  color: string;
  header: string;
}
