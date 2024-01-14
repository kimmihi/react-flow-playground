import type { NodeProps } from "reactflow";
import type { NodeData } from "../../types";

import { Box, Typography } from "@mui/material";

import { Handle, Position } from "reactflow";

const TextNode = (props: NodeProps<NodeData>) => {
  const {
    data: { name },
  } = props;
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: "8px 16px",
        borderRadius: "16px",
      }}
    >
      <Handle type="target" position={Position.Right} />
      <Typography>{name}</Typography>
      <Handle type="source" position={Position.Left} />
    </Box>
  );
};

export default TextNode;
