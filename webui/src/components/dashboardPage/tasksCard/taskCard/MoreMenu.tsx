import {
  ClickAwayListener,
  IconButton,
  MenuItem,
  MenuList,
  Popper,
} from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "./MoreMenu.module.css";
import { Task } from "../../../../types/task";
import { EditTaskDialog } from "./EditTaskDialog";

export interface MoreMenuProps {
  task: Task;
  onSuccessfulEdit: (updatedTask: Task) => void;
  onDelete: () => void;
}

export const MoreMenu = ({task, onSuccessfulEdit, onDelete}: MoreMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleSuccessfulEdit = (updatedTask: Task) => {
    onSuccessfulEdit(updatedTask);
    handleClose();
  };
  
  const handleDelete = () => {
    onDelete();
    handleClose();
  };
  
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <>
      <IconButton
        id={id}
        onClick={handleClick}
        className={styles["task__button"]}
      >
        <MoreVertIcon />
      </IconButton>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement={"bottom-start"}
      >
        <ClickAwayListener onClickAway={() => handleClick}>
          <MenuList className={styles["menu"]}>
            <MenuItem>
              View
            </MenuItem>
            <MenuItem>
              <EditTaskDialog
                showAsText={true}
                targetTask={task}
                onSuccessfulEdit={handleSuccessfulEdit}
              />
            </MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Popper>
    </>
  );
};
