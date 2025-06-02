import {
  Card,
  CardContent,
  CardHeader,
  Paper,
  Typography,
} from "@mui/material";
import styles from "./DashboardPage.module.css";
import { useGetAllTasks } from "../services/useGetTasks";
import { TasksCard } from "../components/dashboardPage/TasksCard";
import { useEffect, useState } from "react";
import { CreateTask, Task } from "../types/task";
import { useUpdateTask } from "../services/useUpdateTask";
import { useDeleteTask } from "../services/useDeleteTask";
import { useCreateTask } from "../services/useCreateTask";

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
  const {
    createTask,
    loading: createLoading,
    error: createError,
  } = useCreateTask();

  useEffect(() => {
    if (initialTasks) {
      setTasks(initialTasks);
    }
  }, [initialTasks]);

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

  const onTaskCreate = async (newTask: CreateTask) => {
    // optimistic add
    try {
      const response = await createTask(newTask);
      if (response.status >= 400) {
        console.log('an unknown error occurred while creating');
      } else {
        console.log('successfully created new task', response.data);
        setTasks(prev => [...response.data.result, ...prev])
      }
    } catch (err) {
      throw err;
    }
  };

  const createButton = (
    <div className={styles["create-button-container"]}>
      <button
        className={styles["create-button"]}
        onClick={() =>
          onTaskCreate({ name: "foo task", stage: 1, desc: "something" })
        }
      >
        create
      </button>
    </div>
  );

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
        footerComponent={createButton}
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
