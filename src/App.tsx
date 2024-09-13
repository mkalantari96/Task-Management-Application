import { Box } from "@mui/material";
import SideBar from "./components/SideBar";
import TaskCard from "./components/TaskCard";
import { useSelector } from "react-redux";
import NewTask from "./components/NewTask";

function App() {
  const taskDataState = useSelector((state) => state.taskData);

  let content;

  if (!taskDataState.tasks.length || taskDataState.addNewTask) {
    content = <NewTask />;
  } else if (taskDataState.selectedTaskId === undefined) {
    // If no task is selected
    content = <TaskCard id={""} description={""} title={""} />;
  } else {
    // Find the selected task
    const selectedTask = taskDataState.tasks.find(
      (task) => task.id === taskDataState.selectedTaskId
    );

    // Check if a selected task is found
    if (selectedTask) {
      content = (
        <TaskCard
          id={selectedTask.id}
          description={selectedTask.description}
          title={selectedTask.title}
        />
      );
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      {content}
    </Box>
  );
}

export default App;
