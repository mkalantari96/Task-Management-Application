import {
  Button,
  Typography,
  Card,
  CardContent,
  Grid2,
  Fade,
  Zoom,
} from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch, useSelector } from "react-redux";
import ChangeStatus from "./ChangeStatus";
import { SliceAction } from "../store/store";
import DeleteTaskModal from "./DeleteTaskModal";
import { TaskState } from "../types";
import EditTaskModal from "./EditTaskModal";
import NoTaskSelected from "./NoTaskSelected";

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
    const selectedTask = taskDataState.tasks.find(
      (task) => task.id === taskDataState.selectedTaskId
    );
    let cardColor;
    if (selectedTask?.status === "TO DO") {
      cardColor = "#fff8f8";
    } else if (selectedTask?.status === "IN PROGRESS") {
      cardColor = "#b6d1fc";
    } else {
      cardColor = "#06D6A0";
    }
    content = (
      <Card
        sx={{
          mx: "auto",
          width: { xs: "100%", sm: "90%" },
          px: 1,
          bgcolor: cardColor,
        }}
      >
        <CardContent>
          <Grid2 container spacing={2}>
            <Grid2
              size={{ xs: 12, sm: 10 }}
              container
              direction="column"
              sx={{ mb: 2 }}
            >
              <Typography
                variant="body2"
                sx={{
                  mt: "0.8rem",
                  color: "text.secondary",
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                }}
              >
                Task Title
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.5rem" },
                  whiteSpace: "normal",
                  overflow: "auto",
                  textOverflow: "ellipsis",
                }}
              >
                {selectedTask?.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: "0.8rem",
                  color: "text.secondary",
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                }}
              >
                Task Description
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                }}
              >
                {selectedTask?.description}
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 2 }} container direction="column">
              <Typography
                variant="body2"
                sx={{
                  mt: "0.8rem",
                  color: "text.secondary",
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                }}
              >
                Status
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.9rem", sm: "1.1rem" },
                  fontWeight: 600,
                }}
              >
                {selectedTask?.status}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  color: "text.secondary",
                }}
              >
                Create Date
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.9rem", sm: "1.1rem" },
                  fontWeight: 600,
                }}
              >
                {selectedTask?.createDate}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  color: "text.secondary",
                }}
              >
                Due Date
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.9rem", sm: "1.1rem" },
                  fontWeight: 600,
                }}
              >
                {selectedTask?.dueDate}
              </Typography>

              <Button
                sx={{
                  mt: 3,
                  fontSize: { xs: "0.6rem", sm: "0.7rem" },
                  fontWeight: 700,
                  width: "100%",
                }}
                variant="contained"
                onClick={handleChangeStatus}
              >
                Change Status
              </Button>
              <Grid2 container alignItems="center" justifyContent="center">
                <Grid2
                  size={6}
                  container
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button
                    sx={{ bgcolor: "red" }}
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
                    sx={{ bgcolor: "GrayText" }}
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
    return <NoTaskSelected />;
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
                  fontSize: { xs: "0.6rem", sm: "1rem" },
                  px: 1,
                }}
              >
                No task selected! Please select one from the list 🔎
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
      <Zoom in={taskDataState.showTaskAnimation}>{content}</Zoom>
    </>
  );
}
