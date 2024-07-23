/* eslint-disable @typescript-eslint/no-explicit-any */
import debounce from 'lodash.debounce';
import React, { useEffect, useMemo, useState } from 'react';

import { autolayout } from 'common-kit';
import LoadingComponent from '../../../../components/app/common/components/loading.component';
import { PositionProvider } from '../../../../components/app/common/contexts/position.context';
import { useLazyGetOrgChartQuery } from '../../../../redux/services/graphql-api/org-chart.api';
import { initialElements } from '../../constants/initial-elements.constant';
import { Elements } from '../../interfaces/elements.interface';
import TreeNode from './tree-node.component';
import { useSearchContext } from './tree-org-chart-search-context';

interface OrgChartProps {
  departmentId: string;
  isHorizontal?: boolean;
  departmentIdIsLoading?: boolean;
  searchTerm?: string;
}

interface HierarchicalNode {
  id: string;
  type: string;
  data: any;
  position: { x: number; y: number };
  children: HierarchicalNode[];
}

const TreeOrgChart: React.FC<OrgChartProps> = ({ departmentId, isHorizontal, departmentIdIsLoading, searchTerm }) => {
  const [getOrgChart, { currentData: orgChartData, isFetching: orgChartDataIsFetching }] = useLazyGetOrgChartQuery();
  const debounceSetElements = useMemo(() => debounce((elements: Elements) => setElements(elements), 500), []);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [elements, setElements] = useState<Elements>(initialElements);
  const [hierarchicalData, setHierarchicalData] = useState<HierarchicalNode[]>([]);
  const { setSearchResults } = useSearchContext();

  // const [isDirty, setIsDirty] = useState<boolean>(false);
  // const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  // SEARCH CODE
  useEffect(() => {
    if (searchTerm) {
      const results = searchNodes(hierarchicalData, searchTerm.toLowerCase());
      setSearchResults(results);
      highlightSearchResults(results);
    } else {
      setSearchResults([]);
      clearHighlights();
    }
  }, [searchTerm, hierarchicalData, setSearchResults]);

  const searchNodes = (nodes: HierarchicalNode[], term: string): HierarchicalNode[] => {
    let results: HierarchicalNode[] = [];
    for (const node of nodes) {
      if (
        node.id.toLowerCase().includes(term) ||
        node.data.title.toLowerCase().includes(term) ||
        (node.data.employees[0]?.name && node.data.employees[0].name.toLowerCase().includes(term))
      ) {
        results.push(node);
      }
      results = results.concat(searchNodes(node.children, term));
    }
    return results;
  };

  const highlightSearchResults = (results: HierarchicalNode[]) => {
    const pathsToExpand = results.flatMap((node) => getNodePath(hierarchicalData, node.id));
    const uniquePaths = [...new Set(pathsToExpand)];

    // Filter out nodes that are in the results but don't have matching descendants
    const newExpandedKeys = uniquePaths.filter((nodeId) => {
      const node = results.find((result) => result.id === nodeId);

      return !node || hasMatchingDescendant(node, results);
    });

    setExpandedKeys([...new Set(newExpandedKeys)]);
  };

  const getNodePath = (nodes: HierarchicalNode[], targetId: string): string[] => {
    for (const node of nodes) {
      if (node.id === targetId) {
        return [node.id];
      }
      const childPath = getNodePath(node.children, targetId);
      if (childPath.length > 0) {
        return [node.id, ...childPath];
      }
    }
    return [];
  };

  // New helper function to check if a node has any descendants in the search results
  const hasMatchingDescendant = (node: HierarchicalNode, results: HierarchicalNode[]): boolean => {
    return node.children.some(
      (child) => results.some((result) => result.id === child.id) || hasMatchingDescendant(child, results),
    );
  };

  const clearHighlights = () => {
    setExpandedKeys([]);
  };
  // END SEARCH CODE

  useEffect(() => {
    if (orgChartData?.orgChart != null) {
      debounceSetElements(autolayout(JSON.parse(JSON.stringify(orgChartData?.orgChart))));
      const hierarchical = buildHierarchy(orgChartData.orgChart);
      setHierarchicalData(hierarchical);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgChartData?.orgChart, orgChartDataIsFetching]);

  useEffect(() => {
    // setIsDirty(false);
    // setSearchTerm(undefined);

    if (departmentId == null) {
      setElements(initialElements);
    } else {
      getOrgChart(departmentId, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentId]);

  const buildHierarchy = (orgChartData: any): HierarchicalNode[] => {
    const { nodes, edges } = orgChartData;

    // Create a map of all nodes
    const nodeMap = new Map<string, HierarchicalNode>(
      nodes.map((node: any) => [
        node.id,
        { ...node, children: [] }, // Initialize children as an empty array
      ]),
    );

    // Set to keep track of child nodes
    const childNodes = new Set<string>();

    // Process edges to build the hierarchy
    edges.forEach((edge: any) => {
      const parentNode = nodeMap.get(edge.source);
      const childNode = nodeMap.get(edge.target);

      if (parentNode && childNode) {
        parentNode.children.push(childNode);
        childNodes.add(childNode.id);
      }
    });

    // Return nodes that are not children (i.e., root nodes)
    return Array.from(nodeMap.values()).filter((node) => !childNodes.has(node.id));
  };

  const findNodeById = (nodes: HierarchicalNode[], id: string): HierarchicalNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
    return null;
  };

  const handleKeyDown = (event: React.KeyboardEvent, nodeId: string) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        handleExpand(nodeId, getNodeLevel(hierarchicalData, findNodeById(hierarchicalData, nodeId)));
        break;
    }
  };

  const renderTreeNodes = (nodes: HierarchicalNode[], level: number = 0): React.ReactNode => {
    const isSearchMode = !!searchTerm;
    const expandedNodeAtThisLevel = isSearchMode ? null : nodes.find((node) => expandedKeys.includes(node.id));

    if (isSearchMode)
      return (
        <div
          className="A"
          style={{
            display: 'flex',
            flexDirection: !isHorizontal ? 'column' : 'row',
          }}
        >
          {nodes.map((node) => (
            <div
              className="B"
              key={node.id}
              style={{
                display: 'flex',
                flexDirection: !isHorizontal ? 'row' : 'column',
                marginRight: isHorizontal ? '20px' : '0',
              }}
            >
              <TreeNode
                data={node}
                expanded={expandedKeys.includes(node.id)}
                onExpand={() => handleExpand(node.id, level)}
                hasChildren={node.children.length > 0}
                faded={!isSearchMode && !!expandedNodeAtThisLevel && !expandedKeys.includes(node.id)}
                departmentId={departmentId}
                elements={elements}
                level={level}
                onKeyDown={(e) => handleKeyDown(e, node.id)}
                highlighted={
                  searchTerm &&
                  (node.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    node.data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (node.data.employees[0]?.name &&
                      node.data.employees[0].name.toLowerCase().includes(searchTerm.toLowerCase())))
                }
              />
              {expandedKeys.includes(node.id) && node.children.length > 0 && (
                <div
                  className="C"
                  style={{
                    display: 'flex',
                    flexDirection: !isHorizontal ? 'column' : 'row',
                    marginLeft: !isHorizontal ? '20px' : '0',
                    marginTop: !isHorizontal ? '0' : '20px',
                  }}
                >
                  {renderTreeNodes(node.children, level + 1)}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    else
      return (
        <div
          role="group"
          style={{
            display: 'flex',
            flexDirection: isHorizontal ? 'column' : 'row',
            alignItems: isHorizontal ? 'center' : 'flex-start', // Center nodes horizontally
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: isHorizontal ? 'row' : 'column',
              marginRight: isHorizontal ? '0' : '20px',
              marginBottom: isHorizontal ? '20px' : '0',
              justifyContent: isHorizontal ? 'center' : 'flex-start', // Center nodes horizontally
            }}
          >
            {nodes.map((node) => (
              <div
                key={node.id}
                style={{
                  marginBottom: isHorizontal ? '0' : '10px',
                  marginRight: isHorizontal ? '10px' : '0',
                }}
              >
                <TreeNode
                  data={node}
                  expanded={expandedKeys.includes(node.id)}
                  onExpand={() => handleExpand(node.id, level)}
                  hasChildren={node.children.length > 0}
                  faded={!!expandedNodeAtThisLevel && !expandedKeys.includes(node.id)}
                  departmentId={departmentId}
                  elements={elements}
                  level={level}
                  onKeyDown={(e) => handleKeyDown(e, node.id)}
                />
              </div>
            ))}
          </div>
          {nodes.map(
            (node) =>
              expandedKeys.includes(node.id) &&
              node.children.length > 0 && (
                <div key={`${node.id}-children`} role="group" aria-label={`Children of ${node.data.title}`}>
                  {renderTreeNodes(node.children, level + 1)}
                </div>
              ),
          )}
        </div>
      );
  };

  const handleExpand = (nodeId: string, level: number) => {
    setExpandedKeys((prevKeys) => {
      if (searchTerm) {
        // In search mode, simply toggle the expanded state of the clicked node
        return prevKeys.includes(nodeId) ? prevKeys.filter((key) => key !== nodeId) : [...prevKeys, nodeId];
      } else {
        // In normal mode, use the original logic
        // Collapsing. If the node is already expanded, remove it and all its descendants to collapse
        if (prevKeys.includes(nodeId)) {
          const nodeToCollapse = findNodeById(hierarchicalData, nodeId);
          if (nodeToCollapse) {
            const descendantIds = getAllDescendantIds(nodeToCollapse);
            return prevKeys.filter((key) => !descendantIds.includes(key) && key !== nodeId);
          }
          return prevKeys.filter((key) => key !== nodeId);
        }

        // If expanding, remove any other expanded nodes at the same level and their descendants
        const newKeys = prevKeys.filter((key) => {
          const keyNode = findNodeById(hierarchicalData, key);
          if (!keyNode) return false;

          const nodeLevel = getNodeLevel(hierarchicalData, keyNode);
          if (keyNode && nodeLevel === level) {
            // This node is at the same level, remove it and its descendants
            const descendantIds = getAllDescendantIds(keyNode);
            return !descendantIds.includes(key) && key !== keyNode.id;
          }

          // Keep nodes at levels above the current level
          return nodeLevel < level;
        });

        // Add the new node to expanded keys
        return [...newKeys, nodeId];
      }
    });
  };

  // Helper function to get all descendant IDs of a node
  const getAllDescendantIds = (node: HierarchicalNode): string[] => {
    let ids: string[] = [];
    for (const child of node.children) {
      ids.push(child.id);
      ids = ids.concat(getAllDescendantIds(child));
    }
    return ids;
  };

  const getNodeLevel = (nodes: HierarchicalNode[], targetNode: HierarchicalNode | null, level: number = 0): number => {
    if (!targetNode) return -1;

    for (const node of nodes) {
      if (node === targetNode) return level;
      const childLevel = getNodeLevel(node.children, targetNode, level + 1);
      if (childLevel !== -1) return childLevel;
    }
    return -1;
  };

  console.log('expandedKeys: ', expandedKeys);
  return (
    <PositionProvider>
      {departmentIdIsLoading || orgChartDataIsFetching ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <div
          style={{
            overflowX: 'auto',
            overflowY: 'auto',
            padding: '20px',
            display: isHorizontal ? 'block' : 'flex',
            flexDirection: 'column',
            alignItems: isHorizontal ? 'center' : 'flex-start',
            height: 0,
            flexGrow: 1,
          }}
        >
          <div
            style={{
              display: 'inline-block', // Allow the content to shrink-wrap
              minWidth: '100%',
            }}
            role="tree"
            aria-label="Organization Chart"
          >
            {renderTreeNodes(hierarchicalData)}
          </div>
        </div>
      )}
    </PositionProvider>
  );
};

export default TreeOrgChart;
