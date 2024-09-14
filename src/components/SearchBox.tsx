import {
  Grid2,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { SliceAction } from "../store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { TaskState } from "../types";

export default function SearchBox() {
  const taskDataState = useSelector(
    (state: { taskData: TaskState }) => state.taskData
  );
  const dispatch = useDispatch();

  let uniqueStatuses = [
    ...new Set(taskDataState.tasks.map((task) => task.status)),
  ];
  useEffect(() => {
    uniqueStatuses = [
      ...new Set(taskDataState.tasks.map((task) => task.status)),
    ];
  }, [taskDataState.tasks]);

  function handleSelectedTasks(event: SelectChangeEvent) {
    console.log(event.target.value);
    // Dispatch action to add the new task
    dispatch(SliceAction.filterTasks(event.target.value));
  }
  if (!uniqueStatuses.length)
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
          minHeight: "13vh",
          "@media (max-width:600px)": {
            minHeight: "10vh",
          },
          "@media (max-width:400px)": {
            minHeight: "8vh",
          },

          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "0.8rem",
            "@media (max-width:600px)": {
              fontSize: "0.6rem",
            },
            "@media (max-width:400px)": {
              fontSize: "0.4rem",
            },
          }}
        >
          By submit new task, you can filter tasks by their status🥳🥳
        </Typography>
      </Grid2>
    );

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

        maxHeight: "13vh",

        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <FormControl
        variant="standard"
        sx={{
          minWidth: 120,
          "@media (max-width:600px)": {
            minWidth: 90,
          },
          "@media (max-width:400px)": {
            minWidth: 40,
          },
        }}
      >
        <InputLabel id="statusSelected">Choose Status</InputLabel>
        <Select
          labelId="statusSelected"
          id="statusSelected"
          value={
            taskDataState.selectedStatus ? taskDataState.selectedStatus : ""
          }
          label="Status"
          sx={{ width: "100%" }}
          onChange={handleSelectedTasks}
        >
          <MenuItem value={"ALL"}>ALL</MenuItem>
          {uniqueStatuses.map((state) => (
            <MenuItem value={state}>{state}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography sx={{ color: "text.secondary", fontSize: "0.5rem" }}>
        Note: Only in "ALL" drag and drop is avalaible
      </Typography>
    </Grid2>
  );
}
