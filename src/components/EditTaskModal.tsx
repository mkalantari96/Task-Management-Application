import { TextField, Dialog, DialogTitle, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SliceAction } from "../store/store";
import { Task, TaskState } from "../types";
import { ChangeEvent } from "react";

export default function EditTaskModal() {
  const taskDataState = useSelector(
    (state: { taskData: TaskState }) => state.taskData
  );
  const dispatch = useDispatch();
  let selectedTask: Task | undefined;
  if (taskDataState.selectedTaskId) {
    selectedTask = taskDataState.tasks.find(
      (task) => task.id === taskDataState.selectedTaskId
    );
  }
  // Handle form submission
  function handleEditTask(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const taskData = {
      id: taskDataState.selectedTaskId as string,
      createDate: selectedTask?.createDate,
      title: fd.get("title") as string,
      description: fd.get("description") as string | undefined,
      dueDate: fd.get("dueDate") as string | undefined,
      status: selectedTask.status,
    };

    console.log(fd.get("status"));

    dispatch(
      SliceAction.editTaskData({
        id: taskData.id,
        title: taskData.title,
        description: taskData.description,
        createDate: taskData.createDate,
        dueDate: taskData.dueDate,
        status: taskData.status,
      })
    );
    dispatch(SliceAction.editingTaskMode());
    if (taskDataState.selectedStatus)
      dispatch(SliceAction.filterTasks(taskDataState.selectedStatus));
  }
  function handleClose() {
    dispatch(SliceAction.editingTaskMode());
  }

  return (
    <Dialog onClose={handleClose} open={taskDataState.editingTask}>
      <DialogTitle>Edit Task</DialogTitle>
      <form
        onSubmit={handleEditTask}
        style={{ padding: "1rem", position: "relative", height: "30rem" }}
      >
        <div>
          <TextField
            name="title"
            id="title"
            type="text"
            color="primary"
            label="Task Title"
            variant="outlined"
            defaultValue={selectedTask?.title}
            multiline
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="description"
            id="description"
            type="text"
            color="primary"
            label="Task Description"
            defaultValue={selectedTask?.description}
            variant="outlined"
            multiline
            rows={10}
            required
            fullWidth
          />
          <TextField
            sx={{ mt: "1rem" }}
            name="dueDate"
            label="Due Date"
            defaultValue={selectedTask?.dueDate}
            id="dueDate"
            type="date"
            required
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            sx={{ mt: "1rem" }}
            name="status"
            label="Status"
            value={selectedTask?.status}
            id="status"
            type="string"
            required
            disabled
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            sx={{ mt: "1rem" }}
            name="createDate"
            label="Create Date"
            value={selectedTask?.createDate}
            id="createDate"
            type="date"
            required
            disabled
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </div>
        <div
          style={{
            marginTop: "1rem",
            padding: "auto",
            position: "absolute",
            right: "0",
          }}
        >
          <Button
            type="button"
            sx={{ bgcolor: "gray", color: "#fff", mx: "0.5rem" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{ bgcolor: "green", color: "#fff", mx: "0.5rem" }}
          >
            Submit
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
