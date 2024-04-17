import { useEffect } from 'react';
import ReactFlow, { Background, Controls, MiniMap, useEdgesState, useNodesState, useReactFlow } from 'reactflow';
import { nodeTypes } from '../../constants/node-types.constant';
import { Elements } from '../../interfaces/elements.interface';

interface OrgChartImplProps {
  onPaneClick: ((event: React.MouseEvent<Element, MouseEvent>) => void) | undefined;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  elements: Elements;
  isDirty: boolean;
  loading: boolean;
}

export const OrgChartImpl = ({ onPaneClick, elements, isDirty }: OrgChartImplProps) => {
  const { fitView } = useReactFlow();
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);

  useEffect(() => {
    setEdges(elements.edges);
    setNodes(elements.nodes);
  }, [setEdges, setNodes, elements]);

  useEffect(() => {
    const focusedNodes = nodes.filter((node) => node.data.isAdjacent === true);
    const searchResultNodes = nodes.filter((node) => node.data.isSearchResult === true);
    const selectedNodes = nodes.filter((node) => node.selected === true);

    if (searchResultNodes.length > 0) {
      fitView({ duration: 800, nodes: searchResultNodes });
    } else if (selectedNodes.length > 0) {
      fitView({ duration: 800, nodes: [...selectedNodes, ...focusedNodes] });
    } else {
      if (isDirty === false) {
        // Only zoom out to fit all nodes if isDirty === false
        fitView({ duration: 800, nodes });
      }
    }
  }, [nodes]);

  return (
    <ReactFlow
      onEdgesChange={onEdgesChange}
      onNodesChange={onNodesChange}
      onPaneClick={onPaneClick}
      edges={edges}
      elevateEdgesOnSelect
      minZoom={0.1}
      nodeTypes={nodeTypes}
      nodes={nodes}
      nodesConnectable={false}
      nodesDraggable={false}
    >
      <Background />
      <Controls position="top-right" />
      <MiniMap nodeStrokeWidth={3} pannable style={{ border: '1px solid #B1B1B1', height: 100, width: 150 }} zoomable />
    </ReactFlow>
  );
};
