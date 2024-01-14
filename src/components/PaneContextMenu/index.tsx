import { useState } from "react";

import { Popover, MenuList, MenuItem, ListItemText } from "@mui/material";

import CreateNodeDialog from "./CreateNodeDialog";

interface Props {
  open: boolean;
  top: number;
  left: number;
  onCreate: (top: number, left: number, name: string) => void;
  onClose: () => void;
}

const PaneContextMenu = ({ open, top, left, onCreate, onClose }: Props) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleCreate = (name: string) => {
    onCreate(top, left, name);
    handleClose();
    onClose();
  };

  const handleOpen = () => {
    setIsOpenDialog(true);
  };

  const handleClose = () => {
    setIsOpenDialog(false);
  };

  return (
    <>
      <Popover
        open={open}
        anchorPosition={{
          top,
          left,
        }}
        anchorReference="anchorPosition"
        onClose={onClose}
      >
        <MenuList>
          <MenuItem>
            <ListItemText onClick={handleOpen}>+ Create New Node</ListItemText>
          </MenuItem>
        </MenuList>
      </Popover>
      <CreateNodeDialog
        open={isOpenDialog}
        onClose={handleClose}
        onCreate={handleCreate}
      />
    </>
  );
};

export default PaneContextMenu;
