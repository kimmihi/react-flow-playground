import type { NodeData } from "./types";
import React, { useState, useCallback, useRef } from "react";
import { Box } from "@mui/material";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  useNodesState,
  useEdgesState,
  Panel,
  Node,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import { serviceList } from "./mocks";

import ServiceList from "./components/ServiceList";
import InputNode from "./components/CustomNode/InputNode";
import TextNode from "./components/CustomNode/TextNode";
import PaneContextMenu from "./components/PaneContextMenu";

const initialNodes = [
  {
    id: "1",
    data: { name: "Hello" },
    position: { x: 0, y: 0 },
    type: "text",
  },
  {
    id: "2",
    data: { name: "World" },
    position: { x: 100, y: 100 },
    type: "text",
  },
];

const initialEdges = [{ id: "1-2", source: "1", target: "2", type: "step" }];

const nodeTypes = {
  input: InputNode,
  text: TextNode,
};

function App() {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [currentService, setCurrentService] = useState<number | null>(
    serviceList[0].id
  );
  const [popoverControl, setPopoverControl] = useState({
    open: false,
    top: 0,
    left: 0,
  });
  const [nodes, setNodes, onNodesChange] =
    useNodesState<NodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handlePaneContextMenu = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      event.preventDefault();
      if (!reactFlowWrapper.current) return;

      setPopoverControl({
        open: true,
        top: event.clientY,
        left: event.clientX,
      });
    },

    []
  );

  const handleCreateNewNode = useCallback(
    (top: number, left: number, name: string) => {
      if (popoverControl.open === false) return;

      const newNode = {
        id: `${new Date().getTime()}`,
        data: { name },
        position: { x: left, y: top },
        type: "text",
      };

      setNodes((prevNodes) => [...prevNodes, newNode]);
      handleClosePopover();
    },
    [popoverControl.open, setNodes]
  );

  const handleClosePopover = () => {
    setPopoverControl({
      open: false,
      top: 0,
      left: 0,
    });
  };

  const handleChangeService = (serviceId: number) => {
    setCurrentService(serviceId);
  };

  return (
    <div
      style={{
        display: "flex",
        flex: "1 1 auto",
        width: "100%",
        flexDirection: "column",
        minWidth: "1200px",
        maxWidth: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
        ref={reactFlowWrapper}
      >
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onPaneContextMenu={handlePaneContextMenu}
          fitView
        >
          <Background
            style={{
              backgroundColor: "#f3f3f3",
            }}
          />
          <Panel position="top-left" style={{ width: "320px", height: "100%" }}>
            <ServiceList list={serviceList} onSelect={handleChangeService} />
          </Panel>
          <Panel position="top-center">
            <Controls />
          </Panel>
        </ReactFlow>
        <PaneContextMenu
          open={popoverControl.open}
          top={popoverControl.top}
          left={popoverControl.left}
          onCreate={handleCreateNewNode}
          onClose={handleClosePopover}
        />
      </Box>
    </div>
  );
}

export default App;
