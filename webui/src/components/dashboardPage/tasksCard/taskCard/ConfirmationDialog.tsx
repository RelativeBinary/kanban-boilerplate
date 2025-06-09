import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useOnOpen } from "../../../../hooks/useOpen";
import { CreateTaskForm } from "../../createTaskDialog/CreateTaskForm";
import styles from "./ConfirmationDialog.module.css";

export interface ConfirmationDialogProps {
  title: string;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmationDialog = ({
  title,
  open,
  onCancel,
  onConfirm,
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle id="confirmation-dialog">{title}</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this task?
        <div className={styles["actions"]}>
          <Button onClick={onConfirm}>Confirm</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
