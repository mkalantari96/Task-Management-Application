import { Grid, Grid2 } from "@mui/material";
import SideBar from "./components/SideBar";
import TaskCard from "./components/TaskCard";
import { useSelector } from "react-redux";
import NewTask from "./components/NewTask";
import { TaskState } from "./types";

function App() {
  const taskDataState = useSelector(
    (state: { taskData: TaskState }) => state.taskData
  );

  let content;
  if (!taskDataState.tasks.length || taskDataState.addNewTask) {
    content = <NewTask />;
  } else {
    content = <TaskCard />;
  }

  return (
    <Grid2
      container
      columnSpacing={2}
      alignItems="flex-start"
      justifyContent="center"
      size={10}
      sx={{
        flexGrow: 1,
        p: { xs: 1, sm: 0 },
        my: "2rem",
        mx: "auto",
        height: "90vh",
        overflowY: { xs: "auto", sm: "hidden" },
        bgcolor: "#cccaca",
        border: "1px solid",
        borderColor: "grey.300",
        borderRadius: 5,
      }}
    >
      <Grid2 size={{ xs: 12, sm: 3 }} container>
        <SideBar />
      </Grid2>
      <Grid2
        size={{ xs: 12, sm: 9 }}
        container
        sx={{
          flexGrow: 1,
          my: "2rem",
        }}
      >
        {content}
      </Grid2>
    </Grid2>
  );
}

export default App;
