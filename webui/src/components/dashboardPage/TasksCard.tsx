import { Card, CardContent, Typography } from "@mui/material";
import { error } from "console";
import { TaskCard } from "./tasksCard/TaskCard";
import styles from './TasksCard.module.css';
import { Task } from "../../types/task";

export interface TasksCardProps {
  title: string;
  loading: boolean;
  stageFilter: number
  tasks?: Task[];
  error?: string;
}

export const TasksCard = ({title, loading, stageFilter, tasks, error, ...props}: TasksCardProps ) => {
  return (
    <Card id="cop"variant="outlined" className={styles["card"]} {...props} >
      <CardContent className={styles["card-content"]}>
        <Typography gutterBottom>
          <h1>{title}</h1>
        </Typography>
        {tasks &&
          !loading &&
          !error &&
          tasks.map((task, index) =>
            task.stage === stageFilter ? <TaskCard task={task} index={index} /> : null
          )}
      </CardContent>
    </Card>
  );
};
