import { useState } from "react";
import { useOnOpen } from "../../../../hooks/useOpen";
import { useCreateTask } from "../../../../services/useCreateTask";
import { Task } from "../../../../types/task";
import { useUpdateTask } from "../../../../services/useUpdateTask";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import styles from "./EditTaskDialog.module.css";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { CreateTaskForm } from "../../createTaskDialog/CreateTaskForm";
import { EditTaskForm } from "./editTaskDialog/EditTaskForm";

export interface EditTaskDialogProps {
  targetTask: Task;
  onSuccessfulEdit: (sucessfullyEditedTask: Task) => void;
}

export const EditTaskDialog = ({
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
      console.log('Successful task edit', response.result[0]);
      onSuccessfulEdit(response.result[0]);
      handleClose();
    } catch (err) {
      console.log("Error editing task:", err);
      handleClose();
    }
  };

  return (
    <>
      <IconButton className={styles["task__button"]} onClick={handleOpen}>
        <EditIcon />
      </IconButton>
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
