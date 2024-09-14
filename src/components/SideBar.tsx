import { Box, Grid2, Button, Divider } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import TaskList from "./TaskList";
import { useDispatch, useSelector } from "react-redux";
import { SliceAction } from "../store/store";
import SearchBox from "./SearchBox";
import { TaskState } from "../types";
import LogoAndTitle from "./LogoAndTitle";

export default function SideBar() {
  const taskDataStatus = useSelector(
    (state: { taskData: TaskState }) => state.taskData
  );
  const dispatch = useDispatch();

  function handleAddNewTask() {
    dispatch(SliceAction.addNewTaskRun());
  }

  return (
    <Box
      sx={{
        bgcolor: "#f7f9fc",
        my: 0,
        height: "90vh",
        overflowY: "scroll",
        mx: { xs: "auto", sm: 0 },
      }}
    >
      <Grid2
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mb: "1rem", bgcolor: "#f7f9fc" }}
      >
        <LogoAndTitle />
        <Button
          sx={{ my: 3 }}
          variant="contained"
          endIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleAddNewTask}
        >
          Submit New Task
        </Button>
        <SearchBox />
      </Grid2>
      <Divider />
      <TaskList
        header="List of Tasks"
        color="#f7f9fc"
        tasks={
          taskDataStatus.filterTask.length
            ? taskDataStatus.filterTask
            : taskDataStatus.tasks
        }
      />
    </Box>
  );
}
