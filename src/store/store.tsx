import NotStartedOutlinedIcon from "@mui/icons-material/NotStartedOutlined";

import { configureStore, createSlice } from "@reduxjs/toolkit";

const getTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

// Helper function to save tasks to local storage
const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const taskDataSlicer = createSlice({
  name: "taskData",
  initialState: {
    selectedTaskId: undefined,
    tasks: getTasksFromLocalStorage(),
    addNewTask: false,
    changeStatus: false,
    deletingTask: false,
    draggingItem: null,
    filterTask: [],
    selectedStatus: "ALL",
  },
  reducers: {
    addTask(state, action) {
      const taskDataDetails = {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        status: "TO DO",
        createDate: action.payload.createDate,
        dueDate: action.payload.dueDate,
        icon: <NotStartedOutlinedIcon />,
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
    updateStatus(state, action) {
      const task = state.tasks.find((task) => task.id === state.selectedTaskId);
      if (task) {
        task.status = action.payload;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    addNewTaskRun(state) {
      state.addNewTask = true;
    },
    cancelAddNewTask(state) {
      state.addNewTask = false;
    },
    showTaskSelected(state, action) {
      console.log(action.payload);
      state.addNewTask = false;
      state.selectedTaskId = action.payload;
    },
    setDragItem(state, action) {
      state.draggingItem = action.payload;
    },
    reorderTasksList(state, action) {
      state.tasks = action.payload;
      saveTasksToLocalStorage(state.tasks);
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
  },
});

// Corrected store configuration
export const Store = configureStore({
  reducer: { taskData: taskDataSlicer.reducer },
});
export const SliceAction = taskDataSlicer.actions;
