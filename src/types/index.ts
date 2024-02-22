import type { Edge, Node } from "reactflow";

export type NodeType = "text";
export type NodePosition = { x: number; y: number };

export interface Service {
  id: string;
  name: string;
  nodes: Array<Node<NodeData>>;
  edges: Edge[];
}

export interface NodeData {
  name: string;
}
