import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Grid2,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NotStartedOutlinedIcon from "@mui/icons-material/NotStartedOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import { useDispatch } from "react-redux";
import { SliceAction } from "../store/store";
import { useSelector } from "react-redux";

export default function TaskList({ tasks, color, header }) {
  const taskDataState = useSelector((state) => state.taskData);
  const dispatch = useDispatch();
  let dataOfTasks;
  function handleClickTask(id) {
    console.log(id);
    dispatch(SliceAction.showTaskSelected(id));
  }

  function handleOnDragStart(
    e: React.DragEvent<HTMLDivElement>,
    taskID: number | string
  ) {
    e.dataTransfer.setData("text/plain", "");
    dispatch(SliceAction.setDragItem(taskID));
  }

  function handleOnDragEnd() {
    dispatch(SliceAction.setDragItem(null));
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleOnDrop(
    e: React.DragEvent<HTMLDivElement>,
    dropId: number | string
  ) {
    if (!taskDataState.draggingItem) return;

    const draggedIndex = tasks.findIndex(
      (task) => task.id === taskDataState.draggingItem
    );
    const dropIndex = tasks.findIndex((task) => task.id === dropId);

    console.log(draggedIndex);
    console.log(dropIndex);
    if (draggedIndex !== -1 && dropIndex !== -1) {
      const updatedTasks = [...tasks];
      const [draggedTask] = updatedTasks.splice(draggedIndex, 1);
      updatedTasks.splice(dropIndex, 0, draggedTask);
      dispatch(SliceAction.reorderTasksList(updatedTasks));
    }

    dispatch(SliceAction.setDragItem(null));
  }

  if (!tasks.length) {
    dataOfTasks = (
      <Typography
        sx={{
          mt: 2,
          pb: 2,
          color: "#333333",
          textAlign: "center",
          fontWeight: "600",
          fontSize: "0.6rem",
        }}
      >
        EMPTY
      </Typography>
    );
  } else {
    dataOfTasks = (
      <List sx={{ pl: "0.8rem" }}>
        {tasks.map(({ title, id, status }) => (
          <div
            key={Number(id)}
            draggable="true"
            onDragStart={(e) => handleOnDragStart(e, id)}
            onDragEnd={handleOnDragEnd}
            onDragOver={handleDragOver}
            onDrop={(e) => handleOnDrop(e, id)}
            style={{
              backgroundColor:
                taskDataState.selectedTaskId === id ? "GrayText" : "inherit",
              marginRight: "0.5rem",
              padding: "0.5rem",
              borderRadius: "4px",
              cursor: "grab",
            }}
          >
            <ListItem key={id} disablePadding>
              <ListItemButton onClick={() => handleClickTask(id)}>
                <ListItemText
                  primary={title}
                  sx={{
                    color:
                      taskDataState.selectedTaskId === id ? "White" : "#333333",

                    "& .MuiTypography-root": {
                      color:
                        taskDataState.selectedTaskId === id
                          ? "White"
                          : "#333333",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  }}
                />
                <ListItemAvatar>
                  {status === "DONE" && (
                    <CheckCircleOutlineIcon
                      sx={{
                        color:
                          taskDataState.selectedTaskId === id
                            ? "White"
                            : "#333333",
                      }}
                    />
                  )}
                  {status === "TO DO" && (
                    <StopCircleOutlinedIcon
                      sx={{
                        color:
                          taskDataState.selectedTaskId === id
                            ? "White"
                            : "#333333",
                      }}
                    />
                  )}
                  {status === "IN PROGRESS" && (
                    <NotStartedOutlinedIcon
                      sx={{
                        color:
                          taskDataState.selectedTaskId === id
                            ? "White"
                            : "#333333",
                      }}
                    />
                  )}
                </ListItemAvatar>
              </ListItemButton>
            </ListItem>
          </div>
        ))}
      </List>
    );
  }
  return (
    <Grid2 spacing={2} sx={{ bgcolor: color }}>
      <Divider />

      <Typography
        sx={{
          mt: 2,
          color: "#333333",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        {header}
      </Typography>
      {dataOfTasks}
    </Grid2>
  );
}
