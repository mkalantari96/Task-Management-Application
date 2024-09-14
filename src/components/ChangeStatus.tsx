import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NotStartedOutlinedIcon from "@mui/icons-material/NotStartedOutlined";
import DownloadingIcon from "@mui/icons-material/Downloading";
import { useDispatch, useSelector } from "react-redux";
import { SliceAction } from "../store/store";
import { TaskState } from "../types";

const status = ["TO DO", "IN PROGRESS", "DONE"];

export default function ChangeStatus() {
  const taskDataState = useSelector(
    (state: { taskData: TaskState }) => state.taskData
  );
  const dispatch = useDispatch();

  function handleListItemClick(status: string) {
    dispatch(SliceAction.updateStatus(status));
    dispatch(SliceAction.showChangeStatus());
    if (taskDataState.selectedStatus)
      dispatch(SliceAction.filterTasks(taskDataState.selectedStatus));
  }

  function handleClose() {
    dispatch(SliceAction.showChangeStatus());
  }

  return (
    <Dialog onClose={handleClose} open={taskDataState.changeStatus}>
      <DialogTitle>Choose Status</DialogTitle>
      <List sx={{ pt: 0, px: "0.7rem" }}>
        {status.map((status) => (
          <ListItem disableGutters key={status}>
            <ListItemButton onClick={() => handleListItemClick(status)}>
              <ListItemAvatar>
                {status === "DONE" && <CheckCircleOutlineIcon />}
                {status === "TO DO" && <NotStartedOutlinedIcon />}
                {status === "IN PROGRESS" && <DownloadingIcon />}
              </ListItemAvatar>
              <ListItemText primary={status} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
