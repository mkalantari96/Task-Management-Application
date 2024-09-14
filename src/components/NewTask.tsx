import { Grid2, TextField, Button, Typography, Fade } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SliceAction } from "../store/store";
import { TaskState } from "../types";
import { ChangeEvent } from "react";


export default function NewTask() {
  const taskDataStatus = useSelector(
    (state: { taskData: TaskState }) => state.taskData
  );
  const dispatch = useDispatch();

  function formatCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function handleAddnewTask(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(SliceAction.addNewTaskRun());
    const fd = new FormData(event.target);
    const taskData = {
      title: fd.get("title") as string,
      description: fd.get("description") as string | undefined,
      dueDate: fd.get("dueDate") as string | undefined,
    };

    dispatch(
      SliceAction.addTask({
        id: Date.now().toString(),
        title: taskData.title,
        description: taskData.description,
        createDate: formatCurrentDate(),
        dueDate: taskData.dueDate,
      })
    );
    dispatch(SliceAction.cancelAddNewTask());
    if (taskDataStatus.selectedStatus)
      dispatch(SliceAction.filterTasks(taskDataStatus.selectedStatus));
  }

  function handleCancelSubmit() {
    dispatch(SliceAction.cancelAddNewTask());
  }

  return (
    <Fade in={taskDataStatus.addNewTask}>
      <Grid2
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: { xs: "90%", sm: "80%" },
          px: { xs: "1rem", sm: "2rem" },
          py: "1rem",
          mx: "auto",
          bgcolor: "#ffdcb5",
          color: "grey.800",
          border: "1px solid",
          borderColor: "grey.300",
          borderRadius: 2,
          textAlign: "center",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <Typography sx={{ color: "black", fontWeight: 800, mb: "1rem" }}>
          Submit New Task
        </Typography>
        <form onSubmit={handleAddnewTask} style={{ width: "100%" }}>
          <TextField
            name="title"
            id="title"
            type="text"
            label="Task Title"
            variant="outlined"
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
            id="dueDate"
            type="date"
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            sx={{ overflow: "visible" }}
          />
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {taskDataStatus.tasks.length && (
              <Button
                type="button"
                onClick={handleCancelSubmit}
                color="secondary"
                variant="outlined"
              >
                Cancel
              </Button>
            )}

            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
          </div>
        </form>
      </Grid2>
    </Fade>
  );
}
