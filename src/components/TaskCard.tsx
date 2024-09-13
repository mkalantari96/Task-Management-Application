import { Button, Typography, Card, CardContent, Grid2 } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import ChangeStatus from "./ChangeStatus";
import { SliceAction } from "../store/store";
import DeleteTaskModal from "./DeleteTaskModal";

export default function TaskCard() {
  const taskDataState = useSelector((state) => state.taskData);
  const dispatch = useDispatch();
  function handleChangeStatus() {
    dispatch(SliceAction.showChangeStatus());
  }
  function handleDeleteTask() {
    dispatch(SliceAction.showDeletingStatus());
  }
  let content;
  if (taskDataState.selectedTaskId) {
    const task = taskDataState.tasks.find(
      (task) => task.id === taskDataState.selectedTaskId
    );
    let cardColor;
    if (task.status === "TO DO") {
      cardColor = "#fff8f8";
    } else if (task.status === "IN PROGRESS") {
      cardColor = "#b6d1fc";
    } else {
      cardColor = "#06D6A0";
    }
    content = (
      <Card sx={{ mt: "14rem", width: "60%", px: 1, bgcolor: cardColor }}>
        <CardContent>
          <Grid2 container spacing={2}>
            <Grid2 size={10}>
              <Typography
                variant="body2"
                sx={{ mt: "0.8rem", color: "text.secondary" }}
              >
                Task Title
              </Typography>
              <Typography variant="h5" component="div">
                {task.title}
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
                {task.description}
              </Typography>
            </Grid2>
            <Grid2 size={2}>
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
                {task.status}
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
                {task.createDate}
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
                {task.dueDate}
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
              <Button
                sx={{
                  mt: 3,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  width: "100%",
                  bgcolor: "red",
                }}
                variant="contained"
                onClick={handleDeleteTask}
              >
                Delete Task
              </Button>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    );
  } else {
    content = (
      <Card sx={{ mt: "14rem", width: "60%", mr: "1rem", bgcolor: "#ffe4b3" }}>
        <Typography
          sx={{
            my: 2,

            mr: "auto",
            color: "#333333",
            textAlign: "center",
            fontWeight: "600",
            fontSize: "1rem",
          }}
        >
          No task selected! Please select one from list 🔎
        </Typography>
      </Card>
    );
  }

  return (
    <>
      <DeleteTaskModal />
      <ChangeStatus />
      {content}
    </>
  );
}
