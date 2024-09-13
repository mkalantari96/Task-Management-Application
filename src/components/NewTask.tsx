import { Grid2, TextField, Button, InputLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import { SliceAction } from "../store/store"; // Import the actions from your store
import { useSelector } from "react-redux";

export default function NewTask() {
  const taskDataStatus = useSelector((state) => state.taskData);
  const dispatch = useDispatch();

  function formatCurrentDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so add 1 and pad with leading zero
    const day = String(currentDate.getDate()).padStart(2, "0"); // Pad with leading zero

    return `${year}-${month}-${day}`;
  }

  // Handle form submission
  function handleAddnewTask(event) {
    event.preventDefault(); // Prevent form from refreshing the page
    const fd = new FormData(event.target);
    const taskData = Object.fromEntries(fd.entries()); // Convert form data to an object
    console.log(taskData);
    // Dispatch action to add the new task
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

  return (
    <Grid2
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        mt: "10rem",
        width: "1fr",
        px: "2rem",
        py: "1rem",

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
          <Button
            type="button"
            sx={{ bgcolor: "gray", color: "#fff", mx: "0.5rem" }}
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
    </Grid2>
  );
}
