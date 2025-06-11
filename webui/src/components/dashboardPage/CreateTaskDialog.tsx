import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { useCreateTask } from "../../services/useCreateTask";
import styles from "./CreateTaskDialog.module.css";
import { CreateTask, Task } from "../../types/task";
import { loadEnvFile } from "process";
import { useOnOpen } from "../../hooks/useOpen";
import { CreateTaskForm } from "./createTaskDialog/CreateTaskForm";
import { MoreMenu } from "./tasksCard/taskCard/MoreMenu";

export interface CreateTaskDialogProps {
  /**
   * Dialog to call this function to update the consumers state with the created task (if successful)
   * @param newTask the new task
   * @returns
   */
  onTaskCreate: (newTask: Task) => void;
}

// not sure how i feel about this
const defaultValue: CreateTask = {
  name: '',
  stage: 1,
}

export const CreateTaskDialog = ({ onTaskCreate }: CreateTaskDialogProps) => {
  const { open, handleOpen, handleClose } = useOnOpen();
  const [newTask, setNewTask] = useState<CreateTask>(defaultValue);
  const {
    createTask,
    loading: createLoading,
    error: createError,
  } = useCreateTask();

  const onCreate = async () => {
    // optimistic add
    if (!newTask) {
      console.log("error no new task set");
      return;
    }
    try {
      const response = await createTask(newTask);
      onTaskCreate(response.data.result[0]);
      handleClose();
    } catch (err) {
      console.log("Error creating task:", err);
      handleClose();
    } finally {
      setNewTask(defaultValue);
    }
  };

  return (
    <>
      <div className={styles["create-button-container"]}>
        <button
          disabled={createLoading}
          className={styles["create-button"]}
          onClick={() => handleOpen()}
        >
          {createLoading ? "creating..." : "Create task"}
        </button>
      </div>
      <Dialog open={open} onClose={handleClose} className={styles['dialog']}>
        <DialogTitle id="alert-dialog-title">Create task</DialogTitle>
        <DialogContent>
          <CreateTaskForm
            onCreate={onCreate}
            onCancel={handleClose}
            newTask={newTask}
            setNewTask={setNewTask}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
