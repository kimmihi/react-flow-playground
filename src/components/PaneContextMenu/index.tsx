import { useState } from "react";

import { Popover, MenuList, MenuItem, ListItemText } from "@mui/material";

import CreateNodeDialog from "./CreateNodeDialog";

import { useAppDispatch, useAppSelector } from "src/store";
import { createNode, selectCurrentServiceId } from "src/store/slices/editor";

interface Props {
  open: boolean;
  top: number;
  left: number;
  onClose: () => void;
}

const PaneContextMenu = ({ open, top, left, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const currentServiceId = useAppSelector(selectCurrentServiceId);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleCreate = (name: string) => {
    if (currentServiceId === null) {
      return;
    }

    dispatch(
      createNode({
        serviceId: currentServiceId,
        nodeName: name,
        x: left,
        y: top,
      })
    );
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
        key={`${currentServiceId}-${isOpenDialog}`}
        open={isOpenDialog}
        onClose={handleClose}
        onCreate={handleCreate}
      />
    </>
  );
};

export default PaneContextMenu;
