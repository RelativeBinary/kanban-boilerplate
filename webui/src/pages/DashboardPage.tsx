import { Card, CardContent, CardHeader, Paper, Typography } from "@mui/material";
import styles from './DashboardPage.module.css'
import { useGetAllTasks } from "../services/useGetTasks";


export const DashboardPage = () => {
  const {tasks, loading, error} = useGetAllTasks();
  console.log('tasks', tasks);
  return (
    <Paper className={styles['dashboard']}>
      <Card variant="outlined" className={styles['backlog-card']}>
        <CardContent>
          <Typography gutterBottom>
            This is a task card
          </Typography>
           {tasks && tasks.map((task) => {return (
              <div key={`task-${task.id}`}>{task.name} : stage - ${task.stage}</div>
            )})}
        </CardContent>
      </Card>
       <Card variant="outlined" className={styles['inprogress-card']}>
        <CardContent>
          <Typography gutterBottom>
            This is a task card
          </Typography>
        </CardContent>
      </Card>
       <Card variant="outlined" className={styles['complete-card']}>
        <CardContent>
          <Typography gutterBottom>
            This is a task card
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};
