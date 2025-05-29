import {
  Card,
  CardContent,
  CardHeader,
  Paper,
  Typography,
} from "@mui/material";
import styles from "./DashboardPage.module.css";
import { useGetAllTasks } from "../services/useGetTasks";
import { TaskCard } from "../components/dashboardPage/tasksCard/TaskCard";
import { TasksCard } from "../components/dashboardPage/TasksCard";

export const DashboardPage = () => {
  const { tasks, loading, error } = useGetAllTasks();

  return (
    <Paper className={styles["dashboard"]}>
      {/* turn this into a TasksCard remeber it should be repeatable for practice */}
      {/* TODO apply a staggered fade in float up animation effect with backlog first, inprog second, complete last */}
      <TasksCard title={'Backlog'} loading={loading} stageFilter={1} tasks={tasks} error={error} />
      <TasksCard title={'Inprogress'} loading={loading} stageFilter={2} tasks={tasks} error={error} />
      <TasksCard title={'Complete'} loading={loading} stageFilter={3} tasks={tasks} error={error} />
    </Paper>
  );
};
