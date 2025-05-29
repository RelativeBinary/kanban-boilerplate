import {
  Card,
  CardContent,
  CardHeader,
  Paper,
  Typography,
} from "@mui/material";
import styles from "./DashboardPage.module.css";
import { useGetAllTasks } from "../services/useGetTasks";
import { TaskCard } from "../components/dashboardPage/TaskCard";

export const DashboardPage = () => {
  const { tasks, loading, error } = useGetAllTasks();

  return (
    <Paper className={styles["dashboard"]}>
      <Card variant="outlined" className={styles["backlog-card"]}>
        <CardContent className={styles["card-content"]}>
          <Typography gutterBottom>
            <h1>Backlog</h1>
          </Typography>
          {tasks && !loading && !error && tasks.map((task) => <TaskCard task={task} />)}
        </CardContent>
      </Card>
      <Card variant="outlined" className={styles["inprogress-card"]}>
        <CardContent>
          <Typography gutterBottom>
            <h1>Inprogress</h1>
          </Typography>
        </CardContent>
      </Card>
      <Card variant="outlined" className={styles["complete-card"]}>
        <CardContent>
          <Typography gutterBottom>
            <h1>Complete</h1>
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};
