import React, { useState, useCallback, useRef } from "react";
import { Box } from "@mui/material";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  OnNodesChange,
  Panel,
  OnConnect,
} from "reactflow";
import "reactflow/dist/style.css";

import ServiceList from "./components/ServiceList";
import InputNode from "./components/CustomNode/InputNode";
import TextNode from "./components/CustomNode/TextNode";
import PaneContextMenu from "./components/PaneContextMenu";

import { useAppDispatch, useAppSelector } from "src/store";
import {
  selectServiceList,
  selectCurrentServiceId,
  selectCurrentNodes,
  selectCurrentEdges,
  changeNodes,
  createEdge,
} from "src/store/slices/editor";

const nodeTypes = {
  input: InputNode,
  text: TextNode,
};

function App() {
  const dispatch = useAppDispatch();
  const reactFlowWrapper = useRef<HTMLElement | null>(null);
  const currentSerivceId = useAppSelector(selectCurrentServiceId);
  const nodes = useAppSelector(selectCurrentNodes(currentSerivceId));
  const edges = useAppSelector(selectCurrentEdges(currentSerivceId));
  const [popoverControl, setPopoverControl] = useState({
    open: false,
    top: 0,
    left: 0,
  });

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

  const onNodesChange: OnNodesChange = (changes) => {
    if (currentSerivceId === null) {
      return;
    }

    const newNodes = applyNodeChanges(changes, nodes);
    dispatch(changeNodes({ serviceId: currentSerivceId, newNodes }));
  };

  const handleConnect: OnConnect = (connection) => {
    if (currentSerivceId === null) {
      return;
    }

    dispatch(createEdge({ serviceId: currentSerivceId, connection }));
  };

  const handleClosePopover = () => {
    setPopoverControl({
      open: false,
      top: 0,
      left: 0,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flex: "1 1 auto",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
        ref={reactFlowWrapper}
      >
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          // onEdgesChange={onEdgesChange}
          onPaneContextMenu={handlePaneContextMenu}
          onConnect={handleConnect}
          fitView
        >
          <Background
            style={{
              backgroundColor: "#f3f3f3",
            }}
          />
          <Panel position="top-left" style={{ width: "320px", height: "100%" }}>
            <ServiceList />
          </Panel>
          <Panel position="top-center">
            <Controls />
          </Panel>
        </ReactFlow>
        <PaneContextMenu
          open={popoverControl.open}
          top={popoverControl.top}
          left={popoverControl.left}
          onClose={handleClosePopover}
        />
      </Box>
    </div>
  );
}

export default App;
