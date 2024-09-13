import {
  Grid2,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { SliceAction } from "../store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function SearchBox() {
  const taskDataState = useSelector((state) => state.taskData);
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
  if (!uniqueStatuses.length) return;

  return (
    <Grid2
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        px: "2rem",
        py: "1rem",

        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
    </Grid2>
  );
}
