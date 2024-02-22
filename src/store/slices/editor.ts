import type { Node, Edge, Connection } from "reactflow";
import type { RootState } from "..";
import type { Service, NodeData } from "../../types";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import uuid from "../../utils/uuid";

interface EditorState {
  currentSerivceId: string | null;
  services: {
    [serviceId: string]: Pick<Service, "id" | "name">;
  };
  nodes: {
    [serviceId: string]: Array<Node<NodeData>>;
  };
  edges: {
    [serviceId: string]: Array<Edge>;
  };
}

const initialState: EditorState = {
  currentSerivceId: null,
  services: {},
  nodes: {},
  edges: {},
};

const editorSlice = createSlice({
  name: "edtior",
  initialState,
  reducers: {
    createService: (state, action: PayloadAction<{ serviceName: string }>) => {
      const { serviceName } = action.payload;
      const serviceId = `service-${uuid()}`;
      const newNodes: Array<Node<NodeData>> = [];
      const newEdges: Array<Edge> = [];
      return {
        ...state,
        currentSerivceId: serviceId,
        services: {
          ...state.services,
          [serviceId]: {
            id: serviceId,
            name: serviceName,
          },
        },
        nodes: {
          ...state.nodes,
          [serviceId]: newNodes,
        },
        edges: {
          ...state.edges,
          [serviceId]: newEdges,
        },
      };
    },
    changeCurrentSerivce: (state, action: PayloadAction<string>) => {
      const serviceId = action.payload;
      return {
        ...state,
        currentSerivceId: serviceId,
      };
    },
    createNode: (
      state,
      action: PayloadAction<{
        serviceId: string;
        nodeName: string;
        x: number;
        y: number;
      }>
    ) => {
      const { serviceId, nodeName, x, y } = action.payload;
      const nodeId = `node-${uuid()}`;
      const newNode: Node<NodeData> = {
        id: nodeId,
        data: {
          name: nodeName,
        },
        position: { x, y },
        type: "text",
      };
      const newNodeList = [...state.nodes[serviceId], newNode];
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [serviceId]: newNodeList,
        },
      };
    },
    changeNodes: (
      state,
      action: PayloadAction<{ serviceId: string; newNodes: Node<NodeData>[] }>
    ) => {
      const { serviceId, newNodes } = action.payload;
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [serviceId]: newNodes,
        },
      };
    },
    createEdge: (
      state,
      action: PayloadAction<{ serviceId: string; connection: Connection }>
    ) => {
      const { serviceId, connection } = action.payload;

      if (connection.source === null || connection.target === null) {
        return { ...state };
      }

      const edgeId = `edge-${uuid()}`;
      const newEdge: Edge = {
        id: edgeId,
        source: connection.source,
        target: connection.target,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
      };

      const newEdges = [...state.edges[serviceId], newEdge];
      return {
        ...state,
        edges: {
          ...state.edges,
          [serviceId]: newEdges,
        },
      };
    },
  },
});

export const {
  createService,
  changeCurrentSerivce,
  createNode,
  changeNodes,
  createEdge,
} = editorSlice.actions;

export const selectServiceList = (state: RootState) => {
  const { services } = state.editor;
  return Object.values(services);
};
export const selectCurrentServiceId = (state: RootState) =>
  state.editor.currentSerivceId;
export const selectCurrentNodes =
  (serviceId: string | null) => (state: RootState) =>
    serviceId ? state.editor.nodes[serviceId] : [];
export const selectCurrentEdges =
  (serviceId: string | null) => (state: RootState) =>
    serviceId ? state.editor.edges[serviceId] : [];

export default editorSlice.reducer;
