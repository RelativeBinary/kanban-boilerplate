import {
  Button,
  ClickAwayListener,
  IconButton,
  MenuItem,
  MenuList,
  Popper,
} from "@mui/material";
import { useOnOpen } from "../../../../hooks/useOpen";
import { useRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from './MoreMenu.module.css';

export const MoreMenu = () => {
  const { open, handleOpen, handleClose } = useOnOpen();
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <IconButton ref={anchorRef} onClick={handleOpen} className={styles["task__button"]}>
        <MoreVertIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement={"bottom-start"}
        transition
        disablePortal
      >
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList className={styles['menu']}>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Popper>
    </>
  );
};
