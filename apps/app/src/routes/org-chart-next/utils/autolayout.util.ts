import dagre from '@dagrejs/dagre';
import { Edge, Node, Position } from 'reactflow';
import { Elements } from '../interfaces/elements.interface';

export enum AutolayoutDirection {
  Vertical,
  Horizontal,
}

const { Top, Right, Bottom, Left } = Position;
const { Vertical } = AutolayoutDirection;

const graph = new dagre.graphlib.Graph();
graph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 300;
const nodeHeight = 200;

export const autolayout = (elements: Elements, direction: AutolayoutDirection = AutolayoutDirection.Vertical) => {
  graph.setGraph({});

  const clone: Elements = {
    edges: elements.edges.map((edge) => ({ ...edge })),
    nodes: elements.nodes.map((node) => ({ ...node })),
  };

  if (clone.edges.length > 0 && clone.nodes.length > 0) {
    const { edges, nodes } = clone;

    edges.forEach((edge: Edge) => {
      graph.setEdge(edge.source, edge.target);
    });

    nodes.forEach((node: Node) => {
      graph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    dagre.layout(graph);

    clone.nodes = nodes.map((node: Node) => {
      const match = graph.node(node.id);

      node.targetPosition = direction === Vertical ? Top : Left;
      node.sourcePosition = direction === Vertical ? Bottom : Right;

      // Shift dagre node position (anchor=center center) to (anchor=top left)
      // so it matches the ReactFlow node anchor point
      node.position = {
        x: match.x - nodeWidth / 2,
        y: match.y - nodeHeight / 2,
      };

      return node;
    });
  }

  return clone;
};
