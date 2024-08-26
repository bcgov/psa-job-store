import { Edge, Node, isEdge, isNode } from 'reactflow';
import { initialElements } from '../constants/initial-elements.constant';
import { Elements } from '../interfaces/elements.interface';

const getAdjacentElements = (target: Edge | Node | undefined, elements: Elements, isIncoming: boolean): Elements => {
  if (target == null || (!isEdge(target) && !isNode(target))) return initialElements;

  const edges = elements.edges.filter((el) => {
    const id = isIncoming ? el.target : el.source;
    return id === target.id;
  });

  const nodes = elements.nodes.filter((el) => edges.map((e) => (isIncoming ? e.source : e.target)).includes(el.id));

  return { edges, nodes };
};

// Function to get focused elements (connected nodes and edges)
export const getFocusedElements = (
  selectedNodes: (Edge | Node)[],
  elements: Elements,
  isIncoming: boolean,
  previousFocusedElements: (Edge | Node)[] = [],
) => {
  const edges: Edge[] = [];
  const nodes: Node[] = [];

  // Get adjacent elements for each selected node
  selectedNodes.forEach((el: Edge | Node) => {
    const adjacent = getAdjacentElements(el, elements, isIncoming);
    edges.push(...adjacent.edges);
    nodes.push(...adjacent.nodes);
  });

  // Recursively get connected elements
  return [...edges, ...nodes].reduce(
    (memo, adjacentElement) => {
      memo.push(adjacentElement);

      // If the adjacent element hasn't been processed before, continue searching
      if (previousFocusedElements.findIndex((el) => el.id === adjacentElement.id) === -1) {
        previousFocusedElements.push(adjacentElement);

        // Recursively get focused elements for the adjacent element
        getFocusedElements([adjacentElement], elements, isIncoming, previousFocusedElements).forEach((match) => {
          memo.push(match);

          // Add newly found elements to the previousFocusedElements array
          if (previousFocusedElements.findIndex((n) => n.id === match.id) === -1) {
            previousFocusedElements.push(match);
          }
        });
      }

      return memo;
    },
    [] as (Edge | Node)[],
  );
};
