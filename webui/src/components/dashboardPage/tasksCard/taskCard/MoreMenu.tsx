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

export const MoreMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
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
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </ClickAwayListener>
      </Popper>
    </>
  );
};
