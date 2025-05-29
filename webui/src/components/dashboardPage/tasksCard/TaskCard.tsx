import { useEffect, useRef } from "react";
import { Task as TaskType } from "../../../types/task";
import styles from "./TaskCard.module.css";

export interface TaskProps {
  task: TaskType;
  index?: number;
}

export const TaskCard = ({ task, index }: TaskProps): React.ReactNode => {
  const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    const timer = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.add(styles.animate);
      }
    }, index ?? 0 * 100); // Stagger by 100ms per card

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div ref={cardRef} key={`task-${task.id}`} className={styles["task-card"]}>
      <h3>{task.name}</h3>
      {/* <div>stage - {task.stage}</div> */}
      {/* <div>{task.desc}</div> */}
      <div className={styles['controls']}>
        <button>{'<<'}</button>
        <button>{'>>'}</button>
      </div>
    </div>
  );
};
