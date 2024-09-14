import {
  Grid2,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SliceAction } from "../store/store";
import { TaskState } from "../types";
import { useMemo } from "react";

export default function SearchBox() {
  const taskDataState = useSelector(
    (state: { taskData: TaskState }) => state.taskData
  );
  const dispatch = useDispatch();

  const uniqueStatuses = useMemo(
    () => [...new Set(taskDataState.tasks.map((task) => task.status))],
    [taskDataState.tasks]
  );

  function handleSelectedTasks(event: SelectChangeEvent) {
    dispatch(SliceAction.filterTasks(event.target.value));
  }

  if (!uniqueStatuses.length) {
    return (
      <Grid2
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          px: "2rem",
          mx: 1,
          py: 1,
          minHeight: { xs: "8vh", sm: "10vh", md: "13vh" },

          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            color: "text.secondary",

            fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" },
          }}
        >
          By submitting a new task, you can filter tasks by their status🥳🥳
        </Typography>
      </Grid2>
    );
  }

  return (
    <Grid2
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{
        px: { xs: 1, sm: 2 },
        mx: { xs: "auto", sm: 1 },
        py: { xs: 1, sm: 2 },
        my: 1,
        maxHeight: { xs: "10vh", sm: "13vh" },
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        textAlign: "center",
      }}
    >
      <FormControl
        variant="standard"
        sx={{
          minWidth: { xs: 90, sm: 120 },
          width: "100%",
          mb: 1,
        }}
      >
        <InputLabel id="statusSelected">Choose Status</InputLabel>
        <Select
          labelId="statusSelected"
          id="statusSelected"
          value={taskDataState.selectedStatus || ""}
          label="Status"
          sx={{ width: "100%" }}
          onChange={handleSelectedTasks}
        >
          <MenuItem value={"ALL"}>ALL</MenuItem>
          {uniqueStatuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: "0.4rem", sm: "0.5rem" },
          }}
        >
          Note: Only in "ALL" drag and drop is available
        </Typography>
      </FormControl>
    </Grid2>
  );
}
