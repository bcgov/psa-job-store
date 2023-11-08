import { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import { OrgChartCard } from './org-chart-card.component';

interface Props {
  edges: Edge[];
  nodes: Node[];
}

export const OrgChart = ({ edges: initialEdges, nodes: initialNodes }: Props) => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nodes) => applyNodeChanges(changes, nodes)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((edges) => applyEdgeChanges(changes, edges)),
    [setEdges],
  );

  const nodeTypes = useMemo(() => ({ 'org-chart-card': OrgChartCard }), []);

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      <Controls position="top-right" />
      <MiniMap pannable zoomable style={{ height: 100, width: 150 }} />
    </ReactFlow>
  );
};
