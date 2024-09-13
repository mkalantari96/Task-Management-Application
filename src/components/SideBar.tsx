import { Drawer, Box, Typography, Grid2, Button } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import LogoIcon from "../assets/logo.png";
import TaskList from "./TaskList";
import { useDispatch, useSelector } from "react-redux";
import { SliceAction } from "../store/store";
import SearchBox from "./searchBox";

export default function SideBar() {
  const taskDataStatus = useSelector((state) => state.taskData);
  const dispatch = useDispatch();

  function handleAddNewtask() {
    dispatch(SliceAction.addNewTaskRun());
  }

  const taskList = (
    <Box role="presentation">
      <Grid2
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mb: "2rem" }}
      >
        <Grid2
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "80%",

            bgcolor: "#FFBE0B",
            py: 1,
            mt: "1rem",

            color: "grey.800",
            border: "1px solid",
            borderColor: "grey.300",
            borderRadius: 10,
          }}
        >
          <img
            src={LogoIcon}
            alt="a list of items to do"
            style={{
              width: "50%",
            }}
          />

          <Typography
            sx={{
              px: 1,
              mx: 1,
              pb: 1,
              textAlign: "center",
              fontSize: "1rem",
              fontWeight: "800",
            }}
          >
            Task Management Tools
          </Typography>
        </Grid2>

        <Button
          sx={{ mt: 3 }}
          variant="contained"
          endIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleAddNewtask}
        >
          Submit New Task
        </Button>

        {/* {taskDataStatus.filterTask.length ? (
          <SearchBox></SearchBox>
        ) : (
          <Typography>lets start define new task</Typography>
        )} */}
        <SearchBox></SearchBox>
      </Grid2>

      <TaskList
        header="Lists of Tasks"
        color="#f7f9fc"
        tasks={
          taskDataStatus.filterTask.length
            ? taskDataStatus.filterTask
            : taskDataStatus.tasks
        }
      ></TaskList>
    </Box>
  );
  return (
    <Drawer
      sx={{
        mr: "5rem",
        color: "#333333",
        width: "25%",
        flexShrink: 0,
        minWidth: "15rem",

        "& .MuiDrawer-paper": {
          width: "25%",
          bgcolor: "#f7f9fc",
          boxSizing: "border-box",
          minWidth: "15rem",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {taskList}
    </Drawer>
  );
}
