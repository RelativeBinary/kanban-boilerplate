import { Alert, Button, Input, TextField } from "@mui/material";
import styles from "./CreateTaskForm.module.css";
import { useState } from "react";
import { CreateTask } from "../../types/task";

export interface CreateTaskFormProps {
  onCreate: () => void;
  onCancel: () => void;
  newTask: CreateTask;
  setNewTask: React.Dispatch<React.SetStateAction<CreateTask>>;
}

export const CreateTaskForm = ({
  onCreate,
  onCancel,
  newTask,
  setNewTask,
}: CreateTaskFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const validate = () => {
    if (!newTask.name || newTask.name === '') {
      console.log('ERROR: name is required');
      setError('ERROR: name is required');
    } else {
      setError(null);
      onCreate();
    }
  }

  return (
    <div className={styles["form"]}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        value={newTask?.name}
        helperText={error ?? null}
        onChange={(event) =>
          setNewTask({ ...newTask, name: event.target.value })
        }
      />
      <TextField
        id="name"
        label="Desc"
        variant="outlined"
        value={newTask?.desc}
          onChange={(event) =>
          setNewTask({ ...newTask, desc: event.target.value })
        }
        multiline
        minRows={4}
      />
      <div className={styles["actions"]}>
        <Button onClick={validate}>Create</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
};
