import { Node } from 'reactflow';
import { Elements } from '../interfaces/elements.interface';
import { getFocusedElements } from './get-focused-elements.util';

export const styleElements = (
  elements: Elements,
  searchResultNodes: Node[],
  selectedNodes: Node[],
  searchTerm: string | undefined,
) => {
  const { edges, nodes } = JSON.parse(JSON.stringify(elements)) as Elements;

  if (searchTerm == null && searchResultNodes.length === 0 && selectedNodes.length === 0) {
    // Regular styling
    edges.forEach((edge) => {
      edge.animated = false;
      edge.selected = false;
      edge.style = {
        ...edge.style,
        stroke: '#B1B1B1',
      };
    });

    nodes.forEach((node) => {
      node.data = {
        ...node.data,
        isAdjacent: false,
        isSearchResult: false,
      };
      node.selected = false;
      node.style = {
        ...node.style,
        opacity: 1,
      };
    });
  } else if (searchTerm != null && searchResultNodes.length > 0) {
    // Search results
    const searchResultNodeIds = searchResultNodes.flatMap((node) => node.id);

    edges.forEach((edge) => {
      edge.animated = false;
      edge.selected = false;
      edge.style = {
        ...edge.style,
        stroke: '#B1B1B1',
      };
    });

    nodes.forEach((node) => {
      node.data = {
        ...node.data,
        isAdjacent: false,
        isSearchResult: searchResultNodeIds.includes(node.id),
      };
      node.selected = false;
      node.style = {
        ...node.style,
        opacity: 1,
      };
    });
  } else if (selectedNodes.length > 0) {
    // Nodes have been selected
    const selectedNodeIds = selectedNodes.flatMap((node) => node.id);
    const focusedElements = [
      ...getFocusedElements(selectedNodes, elements, true),
      ...getFocusedElements(selectedNodes, elements, false),
    ];
    const focusedElementIds = focusedElements.flatMap((el) => el.id);

    edges.forEach((edge) => {
      edge.animated = focusedElementIds.includes(edge.id);
      edge.selected = focusedElementIds.includes(edge.id);
      edge.style = {
        ...edge.style,
        stroke: focusedElementIds.includes(edge.id) ? 'blue' : '#B1B1B1',
      };
    });

    nodes.forEach((node) => {
      node.data = {
        ...node.data,
        isAdjacent: focusedElementIds.includes(node.id),
        isSearchResult: false,
      };
      node.selected = selectedNodeIds.includes(node.id);
      node.style = {
        ...node.style,
        opacity:
          selectedNodeIds.length > 0
            ? selectedNodeIds.includes(node.id) || focusedElementIds.includes(node.id)
              ? 1
              : 0.25
            : 1,
      };
    });
  }

  return { edges, nodes };
};
