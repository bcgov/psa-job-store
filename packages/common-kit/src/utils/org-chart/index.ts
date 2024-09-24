/* eslint-disable @typescript-eslint/no-explicit-any */
import dagre from '@dagrejs/dagre';
import { Edge, Node, Position } from 'reactflow';

export interface Elements {
  edges: Edge[];
  nodes: Node[];
}

export enum AutolayoutDirection {
  Vertical,
  Horizontal,
}

const { Top, Right, Bottom, Left } = Position;
const { Vertical } = AutolayoutDirection;

const nodeWidth = 300;
const nodeHeight = 200;

export const autolayout = (elements: Elements, direction: AutolayoutDirection = AutolayoutDirection.Vertical) => {
  const graph = new dagre.graphlib.Graph();
  graph.setDefaultEdgeLabel(() => ({}));

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

      node.height = nodeHeight;
      node.width = nodeWidth;

      return node;
    });
  }

  return clone;
};

export const updateSupervisorAndAddNewPositionNode = (
  edges: Edge[],
  nodes: Node[],
  excludedManagerId: string,
  supervisorId: any,
  positionNumber: any,
  positionTitle: any,
  classification: any,
  department: any,
) => {
  // Update supervisor, excluded manager nodes
  nodes.forEach((node) => {
    node.data = {
      ...node.data,
      isExcludedManager: node.id === excludedManagerId, // mark node as excluded manager, if matches
      isNewPosition: false, // Clear previous positions marked as new
      isSupervisor: node.id === supervisorId, // mark node as supervisor, if matches
    };
    node.selected = false; // mark all nodes as deselected
  });

  // Add edge & node for new position
  // add edge
  const edgeId = `${supervisorId}-${positionNumber}`;
  if (edges.find((edge) => edge.id === edgeId) == null) {
    edges.push({
      id: edgeId,
      source: supervisorId,
      target: positionNumber,
      style: { stroke: 'blue' },
      type: 'smoothstep',
      animated: true,
      selected: true,
    });
  }

  // add node
  const nodeId = positionNumber;
  if (nodes.find((node) => node.id === nodeId) == null) {
    nodes.push({
      id: nodeId,
      type: 'org-chart-card',
      data: {
        id: nodeId,
        isNewPosition: true,
        title: positionTitle,
        classification: {
          id: classification?.id,
          code: classification?.code,
          name: classification?.name,
        },
        department: {
          id: department.id,
          organization_id: department.organization_id,
          name: department.name,
        },
        employees: [],
      },
      position: { x: 0, y: 0 },
    });
  }
  return { edges, nodes };
};
