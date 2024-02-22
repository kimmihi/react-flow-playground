import { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface Props {
  open: boolean;
  onCreate: (name: string) => void;
  onClose: () => void;
}

const CreateNodeDialog = ({ open, onCreate, onClose }: Props) => {
  const [nodeName, setNodeName] = useState("");

  const handleChange = (newName: string) => {
    setNodeName(newName);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>새로운 노드 생성</DialogTitle>
      <DialogContent dividers>
        <TextField
          placeholder="노드 이름을 입력해주세요."
          value={nodeName}
          onChange={(e) => handleChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          취소
        </Button>
        <Button variant="contained" onClick={() => onCreate(nodeName)}>
          생성
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNodeDialog;
