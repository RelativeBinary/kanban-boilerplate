import { useEffect, useRef } from "react";
import { Task, Task as TaskType } from "../../../types/task";
import styles from "./TaskCard.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton } from "@mui/material";

export interface TaskProps {
  task: TaskType;
  index?: number;
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (targetTaskId: number) => void;
}

export const TaskCard = ({
  task,
  index,
  onTaskUpdate,
  onTaskDelete,
}: TaskProps): React.ReactNode => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.add(styles.animate);
      }
    }, index ?? 0 * 100); // Stagger by 100ms per card

    return () => clearTimeout(timer);
  }, [index]);

  const decrementTask = () => {
    if (task.stage > 1) {
      // console.log("decrement initiate", task);
      onTaskUpdate({ ...task, stage: task.stage - 1 });
    } else {
      console.log("task is already at lowest stage", task);
    }
  };

  const incrementTask = () => {
    if (task.stage < 3) {
      // console.log("increment initiate", task);
      onTaskUpdate({ ...task, stage: task.stage + 1 });
    } else {
      console.log("Task is already at highest stage", task);
    }
  };

  return (
    <div ref={cardRef} key={`task-${task.id}`} className={styles["task-card"]}>
      <div className={styles["task-header"]}>
        <h3>{task.name}</h3>
        <div className={styles["small-menu"]}>
          <IconButton className={styles["task__button"]} onClick={() => {}}>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      {/* <div>stage - {task.stage}</div> */}
      {/* <div>{task.desc}</div> */}
      <div className={styles["actions"]}>
        <div className={styles["left-right-controls"]}>
          <IconButton
            className={styles["task__button"]}
            onClick={decrementTask}
          >
            <KeyboardDoubleArrowLeftIcon />
          </IconButton>
          <IconButton
            className={styles["task__button"]}
            onClick={incrementTask}
          >
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </div>
        <div className={styles["additional-actions"]}>
          <div className={styles["view"]}>
            <IconButton className={styles["task__button"]} onClick={() => {}}>
              <EditIcon />
            </IconButton>
          </div>
          <div className={styles["delete"]}>
            <IconButton
              className={styles["task__button"]}
              onClick={() => onTaskDelete(task.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};
