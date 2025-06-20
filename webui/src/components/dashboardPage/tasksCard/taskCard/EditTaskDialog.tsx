import { useState } from "react";
import { useOnOpen } from "../../../../hooks/useOpen";
import { useCreateTask } from "../../../../services/useCreateTask";
import { Task } from "../../../../types/task";
import { useUpdateTask } from "../../../../services/useUpdateTask";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import styles from "./EditTaskDialog.module.css";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { CreateTaskForm } from "../../createTaskDialog/CreateTaskForm";
import { EditTaskForm } from "./editTaskDialog/EditTaskForm";

export interface EditTaskDialogProps {
  showAsText: boolean;
  targetTask: Task;
  onSuccessfulEdit: (sucessfullyEditedTask: Task) => void;
}

export const EditTaskDialog = ({
  showAsText,
  targetTask,
  onSuccessfulEdit,
}: EditTaskDialogProps) => {
  // console.log('target task: ', targetTask);
  const { open, handleOpen, handleClose } = useOnOpen();
  const [editedTask, setEditedTask] = useState<Task>(targetTask);
  const { updateTask, loading, error } = useUpdateTask();

  const onSubmitEdit = async () => {
    try {
      const response = await updateTask(editedTask);
      onSuccessfulEdit(response);
      handleClose();
    } catch (err) {
      console.log("Error editing task:", err);
      handleClose();
    }
  };

  return (
    <>
      {showAsText ? (
        <div className={styles["task__button"]} onClick={handleOpen}>
          {"Edit"}
        </div>
      ) : (
        <IconButton className={styles["task__button"]} onClick={handleOpen}>
          {showAsText ? "Edit" : <EditIcon />}
        </IconButton>
      )}
      <Dialog open={open} onClose={handleClose} className={styles["dialog"]}>
        <DialogTitle id="alert-dialog-title">Edit task</DialogTitle>
        <DialogContent>
          <EditTaskForm
            onConfirm={onSubmitEdit}
            onCancel={() => {
              setEditedTask(targetTask);
              handleClose();
            }}
            editedTask={editedTask}
            onChange={setEditedTask}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
