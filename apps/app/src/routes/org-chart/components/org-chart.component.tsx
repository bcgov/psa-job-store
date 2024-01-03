/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dagre from '@dagrejs/dagre';
import { useMemo, useState } from 'react';
import ReactFlow, { ConnectionLineType, Controls, Edge, MiniMap, Node } from 'reactflow';
import { OrgChartCard } from './org-chart-card.component';

interface Props {
  edges: Edge[];
  nodes: Node[];
  selectedDepartment: string | null;
  onCreateNewPosition?: () => void | null;
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 300;
const nodeHeight = 200;

const getLayoutedElements = (nodes: any, edges: any, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node: any) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge: any) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node: any) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

export const OrgChart = ({
  edges: initialEdges,
  nodes: initialNodes,
  selectedDepartment,
  onCreateNewPosition,
}: Props) => {
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);

  const [nodes] = useState(layoutedNodes);
  const [edges] = useState(layoutedEdges);

  // const onNodesChange = useCallback(
  //   (changes: NodeChange[]) => setNodes((nodes: any) => applyNodeChanges(changes, nodes)),
  //   [setNodes],
  // );
  // const onEdgesChange = useCallback(
  //   (changes: EdgeChange[]) => setEdges((edges: any) => applyEdgeChanges(changes, edges)),
  //   [setEdges],
  // );
  // const onConnect = useCallback(
  //   (params: any) =>
  //     setEdges((eds: any) => addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)),
  //   [],
  // );
  // const onLayout = useCallback(
  //   (direction: any) => {
  //     const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, direction);

  //     setNodes([...layoutedNodes]);
  //     setEdges([...layoutedEdges]);
  //   },
  //   [nodes, edges],
  // );

  const nodeTypes = useMemo(
    () => ({
      'org-chart-card': (nodeProps: any) => (
        <OrgChartCard
          {...nodeProps}
          selectedDepartment={selectedDepartment}
          onCreateNewPosition={onCreateNewPosition}
        />
      ),
    }),
    [selectedDepartment, onCreateNewPosition],
  );

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      // onNodesChange={onNodesChange}
      // onEdgesChange={onEdgesChange}
      // onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
    >
      {/* <Panel position="top-left">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </Panel> */}
      <Controls position="top-right" />
      <MiniMap pannable zoomable style={{ height: 100, width: 150 }} />
    </ReactFlow>
  );
};
