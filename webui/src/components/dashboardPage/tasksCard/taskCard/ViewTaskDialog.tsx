import { useOnOpen } from "../../../../hooks/useOpen";
import { Task } from "../../../../types/task";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import styles from "./ViewTaskDialog.module.css";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

export interface ViewTaskDialogProps {
  showAsText: boolean;
  targetTask: Task;
  onHandleClose: () => void;
}

export const ViewTaskDialog = ({
  showAsText,
  targetTask,
  onHandleClose,
}: ViewTaskDialogProps) => {
  const { open, handleOpen, handleClose } = useOnOpen();

  return (
    <>
      {showAsText ? (
        <div className={styles["task__button"]} onClick={handleOpen}>
          {"View"}
        </div>
      ) : (
        <IconButton className={styles["task__button"]} onClick={handleOpen}>
          <VisibilityIcon />
        </IconButton>
      )}
      <Dialog
        open={open}
        onClose={() => {
          onHandleClose();
          handleClose();
        }}
        className={styles["dialog"]}
      >
        <DialogTitle
          id="view-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 1,
          }}
        >
          {targetTask.name}
          <IconButton
            onClick={() => {
              onHandleClose();
              handleClose();
            }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className={styles["task-description"]}>
            {targetTask.desc || "No description available"}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
