import { useEffect, useRef } from "react";
import { Task, Task as TaskType } from "../../../types/task";
import styles from "./TaskCard.module.css";

export interface TaskProps {
  task: TaskType;
  index?: number;
  onTaskUpdate: (updatedTask: Task) => void;
}

export const TaskCard = ({
  task,
  index,
  onTaskUpdate,
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
      <h3>{task.name}</h3>
      {/* <div>stage - {task.stage}</div> */}
      {/* <div>{task.desc}</div> */}
      <div className={styles["controls"]}>
        <button onClick={decrementTask}>{"<<"}</button>
        <button onClick={incrementTask}>{">>"}</button>
      </div>
    </div>
  );
};
