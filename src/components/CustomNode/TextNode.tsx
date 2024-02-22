import type { NodeProps } from "reactflow";
import type { NodeData } from "../../types";

import { Box, Typography, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Handle, Position } from "reactflow";

import { useAppDispatch, useAppSelector } from "src/store";
import { deleteNode, selectCurrentServiceId } from "src/store/slices/editor";

const TextNode = (props: NodeProps<NodeData>) => {
  const {
    id,
    data: { name },
  } = props;
  const dispatch = useAppDispatch();
  const currentServiceId = useAppSelector(selectCurrentServiceId);

  const handleClickDelete = () => {
    if (currentServiceId === null) {
      return;
    }

    dispatch(deleteNode({ serviceId: currentServiceId, nodeId: id }));
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: "8px 16px",
        borderRadius: "16px",
      }}
    >
      <Handle type="target" position={Position.Right} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography>{name}</Typography>
        <IconButton onClick={handleClickDelete}>
          <ClearIcon sx={{ fontSize: "16px" }} />
        </IconButton>
      </Box>

      <Handle type="source" position={Position.Left} />
    </Box>
  );
};

export default TextNode;
