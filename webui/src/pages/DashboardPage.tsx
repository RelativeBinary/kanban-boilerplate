import {
  Paper,
} from "@mui/material";
import styles from "./DashboardPage.module.css";
import { useGetAllTasks } from "../services/useGetTasks";
import { TasksCard } from "../components/dashboardPage/TasksCard";
import { useEffect, useState } from "react";
import { Task } from "../types/task";
import { useUpdateTask } from "../services/useUpdateTask";
import { useDeleteTask } from "../services/useDeleteTask";
import { CreateTaskDialog } from "../components/dashboardPage/CreateTaskDialog";

export const DashboardPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { tasks: initialTasks, loading, error } = useGetAllTasks();
  const {
    updateTask,
    loading: updateLoading,
    error: updateError,
  } = useUpdateTask();
  const {
    deleteTask,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteTask();

  useEffect(() => {
    if (initialTasks) {
      setTasks(initialTasks);
    }
  }, [initialTasks]);

  useEffect(() => {
      alert('Please refresh the page if no tasks load. \nThis demo runs on free platforms a may a minute before the backend api is up and running');
  }, []);

  const onTaskUpdate = async (updatedTask: Task) => {
    let targetTask: Task | undefined = tasks.find(
      (task) => task.id === updatedTask.id
    );

    if (!targetTask) {
      console.log("task not found");
      return;
    }
    // optimistic update
    setTasks([
      updatedTask,
      ...tasks.filter((task) => task.id !== updatedTask.id),
    ]);

    try {
      await updateTask(updatedTask);
    } catch (err) {
      // rollback, i actually dont see how this would restore the exact original but w/e
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? targetTask : task
        )
      );
      console.log("Failed to update task:", updateError || err);
    }
  };

  const onTaskDelete = async (targetTaskId: number) => {
    // TODO add confirmation dialog
    let targetTask = tasks.find((task) => task.id === targetTaskId);
    if (!targetTask) {
      console.log("task not found");
      return;
    }

    // optimistic delete
    setTasks((prevTasks) =>
      prevTasks.filter((tasks) => tasks.id !== targetTaskId)
    );

    try {
      await deleteTask(targetTaskId);
    } catch (err) {
      setTasks([
        targetTask,
        ...tasks.filter((task) => task.id !== targetTask.id),
      ]);
    }
  };

  const onTaskCreate = async (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  // TODO update the stage of a task
  return (
    <Paper className={styles["dashboard"]}>
      {/* turn this into a TasksCard remeber it should be repeatable for practice */}
      {/* TODO apply a staggered fade in float up animation effect with backlog first, inprog second, complete last */}
      <TasksCard
        title={"Planned"}
        loading={loading}
        stageFilter={1}
        tasks={tasks}
        error={error}
        onTaskUpdate={onTaskUpdate}
        onTaskDelete={onTaskDelete}
        topRightComponent={<CreateTaskDialog onTaskCreate={onTaskCreate} />}
      />
      <TasksCard
        title={"Inprogress"}
        loading={loading}
        stageFilter={2}
        tasks={tasks}
        error={error}
        onTaskUpdate={onTaskUpdate}
        onTaskDelete={onTaskDelete}
      />
      <TasksCard
        title={"Complete"}
        loading={loading}
        stageFilter={3}
        tasks={tasks}
        error={error}
        onTaskUpdate={onTaskUpdate}
        onTaskDelete={onTaskDelete}
      />
    </Paper>
  );
};
