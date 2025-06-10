import { useState } from "react";
import { Task } from "../../../../../types/task";
import { Alert, TextField, Button } from "@mui/material";
import styles from "./EditTaskForm.module.css";

export interface EditTaskFormProps {
  onConfirm: () => void;
  onCancel: () => void;
  editedTask: Task;
  onChange: React.Dispatch<React.SetStateAction<Task>>;
}

export const EditTaskForm = ({
  onConfirm,
  onCancel,
  editedTask,
  onChange,
}: EditTaskFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const validate = () => {
    if (!editedTask.name || editedTask.name === "") {
      console.log("ERROR: name is required");
      setError("ERROR: name is required");
    } else {
      setError(null);
      onConfirm();
    }
  };

  return (
    <div className={styles["form"]}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        value={editedTask?.name}
        helperText={error ?? null}
        onChange={(event) =>
          onChange({ ...editedTask, name: event.target.value })
        }
      />
      <TextField
        id="name"
        label="Desc"
        variant="outlined"
        value={editedTask?.desc}
        onChange={(event) =>
          onChange({ ...editedTask, desc: event.target.value })
        }
        multiline
        minRows={4}
      />
      <div className={styles["actions"]}>
        <Button onClick={validate}>Confirm</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
};
