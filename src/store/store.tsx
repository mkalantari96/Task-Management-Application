import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskState, Task, TaskCreate } from "../types";

const getTasksFromLocalStorage = (): Task[] => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const saveTasksToLocalStorage = (tasks: Task[]): void => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const initialState: TaskState = {
  selectedTaskId: undefined,
  tasks: getTasksFromLocalStorage(),
  addNewTask: false,
  changeStatus: false,
  deletingTask: false,
  draggingItem: null,
  filterTask: [],
  selectedStatus: "ALL",
  editingTask: false,
  showTaskAnimation: false,
};

const taskDataSlicer = createSlice({
  name: "taskData",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<TaskCreate>) {
      const taskDataDetails: Task = {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        createDate: action.payload.createDate,
        dueDate: action.payload.dueDate,
        status: "TO DO",
      };

      state.tasks.push(taskDataDetails);
      state.selectedTaskId = action.payload.id;
      saveTasksToLocalStorage(state.tasks);
    },
    deleteTask(state) {
      const taskIndext = state.tasks.findIndex(
        (task) => task.id === state.selectedTaskId
      );
      if (taskIndext > -1) {
        state.tasks.splice(taskIndext, 1);
        saveTasksToLocalStorage(state.tasks);
        state.selectedTaskId = undefined;
      }
    },
    showChangeStatus(state) {
      if (state.changeStatus) {
        state.changeStatus = false;
      } else {
        state.changeStatus = true;
      }
    },
    showDeletingStatus(state) {
      if (state.deletingTask) {
        state.deletingTask = false;
      } else {
        state.deletingTask = true;
      }
    },
    updateStatus(state, action: PayloadAction<string>) {
      const task = state.tasks.find((task) => task.id === state.selectedTaskId);
      if (task) {
        task.status = action.payload;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    addNewTaskRun(state) {
      state.selectedTaskId = undefined;
      state.addNewTask = true;
    },
    cancelAddNewTask(state) {
      state.addNewTask = false;
    },
    showTaskSelected(state, action) {
      state.showTaskAnimation = true;
      state.addNewTask = false;
      if (state.selectedTaskId === action.payload) {
        state.selectedTaskId = undefined;
      } else {
        state.selectedTaskId = action.payload;
      }
    },
    setDragItem(state, action) {
      state.draggingItem = action.payload;
    },
    reorderTasksList(state, action) {
      if (state.selectedStatus !== "ALL") {
        state.filterTask = action.payload;
      } else {
        state.tasks = action.payload;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    filterTasks(state, action) {
      state.filterTask = [];
      state.selectedStatus = action.payload;
      console.log(action.payload);
      if (action.payload === "ALL") {
        state.filterTask = state.tasks;
      } else {
        state.filterTask = state.tasks.filter(
          (task) => task.status === action.payload
        );
      }
    },
    editingTaskMode(state) {
      if (state.editingTask) {
        state.editingTask = false;
      } else {
        state.editingTask = true;
      }
    },
    editTaskData(state, action: PayloadAction<Task>) {
      const task = state.tasks.find((task) => task.id === state.selectedTaskId);

      if (task) {
        task.title = action.payload.title;
        task.description = action.payload.description;
        task.dueDate = action.payload.dueDate;
        task.status = action.payload.status;
        saveTasksToLocalStorage(state.tasks);
      }
    },
  },
});

export const Store = configureStore({
  reducer: { taskData: taskDataSlicer.reducer },
});
export const SliceAction = taskDataSlicer.actions;
