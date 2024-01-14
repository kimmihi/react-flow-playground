export type NodeType = "text";
export type NodePosition = { x: number; y: number };

export interface Service {
  id: number;
  name: string;
  nodes: Array<Node>;
}

export interface Node {
  id: string;
  data: NodeData;
  position: NodePosition;
  type: NodeType;
}

export interface NodeData {
  name: string;
}
