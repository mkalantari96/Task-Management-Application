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

  function handleEditTask(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const taskData:Task = {
      id: taskDataState.selectedTaskId as string,
      createDate: selectedTask?.createDate,
      title: fd.get("title") as string,
      description: fd.get("description") as string | undefined,
      dueDate: fd.get("dueDate") as string | undefined,
      status: selectedTask?.status,
    };

    dispatch(SliceAction.editTaskData(taskData));
    dispatch(SliceAction.editingTaskMode());
    if (taskDataState.selectedStatus)
      dispatch(SliceAction.filterTasks(taskDataState.selectedStatus));
  }

  function handleClose() {
    dispatch(SliceAction.editingTaskMode());
  }

  return (
    <Dialog
      onClose={handleClose}
      open={taskDataState.editingTask}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit Task</DialogTitle>
      <form onSubmit={handleEditTask} style={{ padding: "1rem" }}>
        <TextField
          name="title"
          id="title"
          type="text"
          label="Task Title"
          variant="outlined"
          defaultValue={selectedTask?.title}
          multiline
          required
          fullWidth
          margin="normal"
          sx={{ overflow: "visible" }}
        />
        <TextField
          name="description"
          id="description"
          type="text"
          label="Task Description"
          defaultValue={selectedTask?.description}
          variant="outlined"
          multiline
          rows={4}
          required
          fullWidth
          margin="normal"
          sx={{ overflow: "visible" }}
        />
        <TextField
          name="dueDate"
          label="Due Date"
          defaultValue={selectedTask?.dueDate}
          id="dueDate"
          type="date"
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          sx={{ overflow: "visible" }}
        />
        <TextField
          name="status"
          label="Status"
          value={selectedTask?.status}
          id="status"
          type="text"
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          disabled
          sx={{ overflow: "visible" }}
        />
        <TextField
          name="createDate"
          label="Create Date"
          value={selectedTask?.createDate}
          id="createDate"
          type="date"
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          disabled
          sx={{ overflow: "visible" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "1rem",
          }}
        >
          <Button
            type="button"
            onClick={handleClose}
            color="secondary"
            variant="outlined"
            style={{ marginRight: "1rem" }}
          >
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
