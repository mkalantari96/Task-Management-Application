import { Grid2, TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { SliceAction } from "../store/store"; // Import the actions from your store
import { useSelector } from "react-redux";
import { TaskState } from "../types";
import { ChangeEvent } from "react";
import LogoAndTitle from "./LogoAndTitle";

export default function NewTask() {
  const taskDataStatus = useSelector(
    (state: { taskData: TaskState }) => state.taskData
  );
  const dispatch = useDispatch();
  dispatch(SliceAction.addNewTaskRun());
  console.log(taskDataStatus.addNewTask);

  function formatCurrentDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); //
    const day = String(currentDate.getDate()).padStart(2, "0"); // Pad

    return `${year}-${month}-${day}`;
  }

  // Handle form submission
  function handleAddnewTask(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const taskData = {
      title: fd.get("title") as string,
      description: fd.get("description") as string | undefined,
      dueDate: fd.get("dueDate") as string | undefined,
    };

    dispatch(
      SliceAction.addTask({
        id: Date.now().toString(), // Generate a unique ID for the task
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
    return (
      <div>
        <LogoAndTitle />
      </div>
    );
  }

  return (
    <Grid2
      container
      spacing={2}
      direction="column"
      alignItems="flex-start" // Prevent vertical movement
      justifyContent="center"
      sx={{
        flexGrow: 0,
        width: "80%",
        px: "2rem",
        py: "1rem",
        mx: "auto",

        bgcolor: "#ffdcb5",
        color: "grey.800",
        border: "1px solid",
        borderColor: "grey.300",
        borderRadius: 2,
        textAlign: "center",
        fontSize: "0.875rem",
        fontWeight: "800",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <Typography sx={{ color: "black", fontWeight: 800 }}>
        Submit New Task
      </Typography>
      <form onSubmit={handleAddnewTask}>
        <div>
          <TextField
            name="title"
            id="title"
            type="text"
            color="primary"
            label="Task Title"
            variant="standard"
            multiline
            required
            fullWidth
          />
          <TextField
            name="description"
            id="description"
            type="text"
            color="primary"
            label="Task Description"
            variant="standard"
            multiline
            rows={10}
            required
            fullWidth
          />

          <TextField
            sx={{ mt: "1rem" }}
            name="dueDate"
            label="Due Date"
            id="dueDate"
            type="date"
            required
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          {taskDataStatus.selectedTaskId ? (
            <Button
              type="button"
              sx={{ bgcolor: "gray", color: "#fff", mx: "0.5rem" }}
              onClick={handleCancelSubmit}
            >
              Cancel
            </Button>
          ) : (
            <></>
          )}
          <Button
            type="submit"
            sx={{ bgcolor: "green", color: "#fff", mx: "0.5rem" }}
          >
            Submit
          </Button>
        </div>
      </form>
    </Grid2>
  );
}
