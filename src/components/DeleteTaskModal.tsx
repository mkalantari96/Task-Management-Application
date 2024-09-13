import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { useDispatch, useSelector } from "react-redux";
import { SliceAction } from "../store/store";

const status = ["YES", "NO"];

export default function DeleteTaskModal() {
  const taskDataState = useSelector((state) => state.taskData);
  const dispatch = useDispatch();

  function handleListItemClick(status) {
    if (status === "YES") {
      dispatch(SliceAction.deleteTask());
      dispatch(SliceAction.showDeletingStatus());
      if (taskDataState.selectedStatus)
        dispatch(SliceAction.filterTasks(taskDataState.selectedStatus));
    } else {
      dispatch(SliceAction.showDeletingStatus());
    }
  }

  function handleClose() {
    dispatch(SliceAction.showDeletingStatus());
  }

  return (
    <Dialog onClose={handleClose} open={taskDataState.deletingTask}>
      <DialogTitle>Choose Status</DialogTitle>
      <List sx={{ pt: 0, px: "0.7rem" }}>
        {status.map((status) => (
          <ListItem disableGutters key={status}>
            <ListItemButton onClick={() => handleListItemClick(status)}>
              <ListItemAvatar>
                {status === "YES" && <ThumbUpAltOutlinedIcon />}
                {status === "NO" && <ThumbDownOutlinedIcon />}
              </ListItemAvatar>
              <ListItemText primary={status} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
