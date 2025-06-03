import { Card, CardContent, Typography } from "@mui/material";
import { error } from "console";
import { TaskCard } from "./tasksCard/TaskCard";
import styles from "./TasksCard.module.css";
import { Task } from "../../types/task";

export interface TasksCardProps {
  title: string;
  loading: boolean;
  stageFilter: number;
  tasks?: Task[];
  error?: string;
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (targetTaskId: number) => void;
  footerComponent?: React.ReactNode;
  topRightComponent?: React.ReactNode;
}

export const TasksCard = ({
  title,
  loading,
  stageFilter,
  tasks,
  error,
  onTaskUpdate,
  onTaskDelete,
  footerComponent,
  topRightComponent,
  ...props
}: TasksCardProps) => {
  return (
    <Card id="cop" variant="outlined" className={styles["card"]} {...props}>
      <CardContent className={styles["card-content"]}>
        <div className={styles["card-header"]}>
          <h1>{title}</h1>
          {topRightComponent}
        </div>
        {tasks &&
          !loading &&
          !error &&
          tasks.map((task, index) =>
            task.stage === stageFilter ? (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onTaskUpdate={onTaskUpdate}
                onTaskDelete={onTaskDelete}
              />
            ) : null
          )}
      </CardContent>
      <div>
        {footerComponent}
      </div>
    </Card>
  );
};
