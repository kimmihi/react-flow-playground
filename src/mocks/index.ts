import type { Service } from "../types";
export const serviceList: Service[] = [
  {
    id: 1,
    name: "apple",
    nodes: [
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
    ],
  },
  {
    id: 2,
    name: "banana",
    nodes: [
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
    ],
  },
  {
    id: 3,
    name: "carrot",
    nodes: [
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
    ],
  },
];
