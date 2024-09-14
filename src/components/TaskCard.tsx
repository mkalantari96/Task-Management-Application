import { Button, Typography, Card, CardContent, Grid2 } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch, useSelector } from "react-redux";
import ChangeStatus from "./ChangeStatus";
import { SliceAction } from "../store/store";
import DeleteTaskModal from "./DeleteTaskModal";
import { TaskState } from "../types";
import EditTaskModal from "./EditTaskModal";

export default function TaskCard() {
  const taskDataState = useSelector(
    (state: { taskData: TaskState }) => state.taskData
  );
  const dispatch = useDispatch();
  function handleChangeStatus() {
    dispatch(SliceAction.showChangeStatus());
  }
  function handleDeleteTask() {
    dispatch(SliceAction.showDeletingStatus());
  }
  function handleEditTask() {
    dispatch(SliceAction.editingTaskMode());
  }
  let content;
  if (taskDataState.selectedTaskId) {
    const task = taskDataState.tasks.find(
      (task) => task.id === taskDataState.selectedTaskId
    );
    let cardColor;
    if (task?.status === "TO DO") {
      cardColor = "#fff8f8";
    } else if (task?.status === "IN PROGRESS") {
      cardColor = "#b6d1fc";
    } else {
      cardColor = "#06D6A0";
    }
    content = (
      <Card sx={{ mx: "auto", width: "90%", px: 1, bgcolor: cardColor }}>
        <CardContent>
          <Grid2 container spacing={2}>
            <Grid2 size={10} direction={"column"} container>
              <Typography
                variant="body2"
                sx={{ mt: "0.8rem", color: "text.secondary" }}
              >
                Task Title
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  whiteSpace: "normal", // This allows wrapping to the next line
                  overflow: "hidden", // Keeps the text within the container
                  textOverflow: "ellipsis", // Shows "..." when text is truncated
                }}
              >
                {task?.title.length > 30
                  ? task?.title.slice(0, 30) + "..."
                  : task?.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: "0.8rem", color: "text.secondary" }}
              >
                Task Description
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "text.secondary" }}
              >
                {task?.description}
              </Typography>
            </Grid2>
            <Grid2 size={2} direction={"column"} container>
              <Typography
                variant="body2"
                sx={{ mt: "0.8rem", color: "text.secondary" }}
              >
                Status
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "text.secondary",
                  width: "100%",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {task?.status}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: "0.8rem", color: "text.secondary" }}
              >
                Create Date
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {task?.createDate}
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: "0.8rem", color: "text.secondary" }}
              >
                Due Date
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {task?.dueDate}
              </Typography>

              <Button
                sx={{
                  mt: 3,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  width: "100%",
                }}
                variant="contained"
                onClick={handleChangeStatus}
              >
                Change Status
              </Button>
              <Grid2
                container
                alignItems="center"
                justifyContent="center"
                sx={{ mt: 2 }}
              >
                <Grid2
                  size={6}
                  container
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button
                    sx={{
                      bgcolor: "red",
                    }}
                    variant="contained"
                    onClick={handleDeleteTask}
                  >
                    <DeleteForeverOutlinedIcon />
                  </Button>
                </Grid2>
                <Grid2
                  size={6}
                  container
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button
                    sx={{
                      bgcolor: "GrayText",
                    }}
                    variant="contained"
                    onClick={handleEditTask}
                  >
                    <EditOutlinedIcon />
                  </Button>
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    );
  } else {
    content = (
      <Card sx={{ mx: "auto", px: 1, bgcolor: "#fff8f8" }}>
        <CardContent>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <Typography
                sx={{
                  color: "#333333",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "1rem",
                  "@media (max-width:600px)": {
                    fontSize: "0.6rem",
                  },
                  "@media (max-width:400px)": {
                    fontSize: "0.4rem",
                  },
                }}
              >
                No task selected! Please select one from list 🔎
              </Typography>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <DeleteTaskModal />
      <ChangeStatus />
      <EditTaskModal />
      {content}
    </>
  );
}
