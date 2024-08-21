import { Col, Row, Space, Spin } from 'antd';
import { autolayout } from 'common-kit';
import Fuse from 'fuse.js';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Edge, Node, NodeProps, useEdgesState, useNodesState, useOnSelectionChange, useReactFlow } from 'reactflow';
import { useLazyGetOrgChartQuery } from '../../../../redux/services/graphql-api/org-chart.api';
import { initialElements } from '../../constants/initial-elements.constant';
import { OrgChartContext } from '../../enums/org-chart-context.enum';
import { OrgChartType } from '../../enums/org-chart-type.enum';
import { Elements } from '../../interfaces/elements.interface';
import { getFocusedElements } from '../../utils/get-focused-elements.util';
import { DepartmentFilter } from '../department-filter.component';
import { OrgChartNode } from '../org-chart-node.component';
import { PositionSearch, SearchResult } from '../position-search.component';
import DownloadButton from './download-button.component';
import './dynamic-org-chart.component.css';
import OrgChartFlow from './org-chart-flow.component';

interface BaseDynamicOrgChartProps {
  type: OrgChartType.DYNAMIC;
  setDepartmentId: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  departmentId: string | null | undefined;
  departmentIdIsLoading?: boolean;
  targetId?: string | undefined;
  wrapProvider?: boolean;
  // wizardNextHandler?: ({ switchStep }?: { switchStep?: boolean }) => Promise<string | undefined>;
}

export interface DefaultContextDynamicOrgChartProps {
  context: OrgChartContext.DEFAULT;
}

export interface WizardContextDynamicOrgChartProps {
  context: OrgChartContext.WIZARD;
  onSelectedNodeIdsChange: (ids: string[], elements: Elements) => void;
}

export type DynamicOrgChartProps = (DefaultContextDynamicOrgChartProps | WizardContextDynamicOrgChartProps) &
  BaseDynamicOrgChartProps;

export const DynamicOrgChart = ({
  type,
  setDepartmentId,
  departmentId,
  departmentIdIsLoading,
  targetId,
  // wizardNextHandler,
  ...props
}: DynamicOrgChartProps) => {
  const [elements, setElements] = useState<Elements>(initialElements);
  const debounceSetElements = useMemo(() => debounce((elements: Elements) => setElements(elements), 500), []);

  const [getOrgChart, { currentData: orgChartData, isFetching: orgChartDataIsFetching }] = useLazyGetOrgChartQuery();
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>(targetId != null ? [targetId] : []);
  const [searchResultCount, setSearchResultCount] = useState<number>(0);

  const { fitView, setCenter } = useReactFlow();
  // const [dataUpdated, setDataUpdated] = useState<boolean>(true);
  const [edges, setEdges] = useEdgesState([]);
  const [nodes, setNodes] = useNodesState([]);
  // const [treeviewInFocus, setTreeviewInFocus] = useState<boolean>(false);
  // const treeViewInFocus = useRef(false);
  const isKeyboardNav = useRef(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    setIsDirty(false);
    setSearchTerm(undefined);

    if (departmentId == null) {
      setElements(initialElements);
    } else {
      getOrgChart(departmentId, false);
    }
  }, [departmentId]);

  useEffect(() => {
    // if (orgChartDataIsFetching) setDataUpdated(false);
    // // setTimeout(() => {
    // else setDataUpdated(true);
    // // }, 2000);

    if (orgChartData?.orgChart != null) {
      const elements = autolayout(orgChartData?.orgChart);

      if (targetId != null) {
        const targetIndex = elements.nodes.findIndex((node: Node) => node.id === targetId);
        if (targetIndex >= 0) {
          const targetNode = elements.nodes[targetIndex];
          targetNode.selected = true;
          elements.nodes[targetIndex] = targetNode;
        }
      }

      // console.log('setElements: ', elements);
      const els = JSON.parse(JSON.stringify(elements));
      debounceSetElements(els);
      renderDefault(els);
    }
  }, [orgChartData?.orgChart, orgChartDataIsFetching]);

  const search = useCallback(
    (searchTerm: string | undefined) => {
      if (searchTerm == null) return [];

      // For the ID search, don't include positions where position_status === 'PROPOSED'
      const approvedPositionNodes = elements.nodes.filter((node) => node.data.position_status === 'Approved');
      const idSearch = new Fuse(approvedPositionNodes, {
        keys: ['id'],
        includeMatches: true,
        includeScore: true,
        threshold: 0,
      });

      const stringSearch = new Fuse(elements.nodes, {
        keys: ['data.title', 'data.employees.name'],
        includeMatches: true,
        includeScore: true,
        threshold: 0.25,
      });

      const idResults = idSearch.search(searchTerm);
      const stringResults = stringSearch.search(searchTerm);

      return [...idResults.map((r) => r.item), ...stringResults.map((r) => r.item)].flatMap((node) => node.id);
    },
    [elements.nodes],
  );

  useEffect(() => {
    if (type === OrgChartType.DYNAMIC && props.context === OrgChartContext.WIZARD) {
      // do not clear selection unless user actually clicked on the pane
      // this prevents clearing of selection when the org chart is first loaded with a targetId set
      if (selectedNodeIds.length == 0 && !isDirty) {
        return;
      }
      props.onSelectedNodeIdsChange(selectedNodeIds, { edges, nodes });
    }
  }, [props.context, edges, nodes, selectedNodeIds]);

  const renderSelectedNodes = useCallback(
    (sNodeIds: string[]) => {
      console.log('renderSelectedNodes: ', sNodeIds);

      const { edges, nodes } = JSON.parse(JSON.stringify(elements));
      const focusedElements = [
        ...getFocusedElements(
          nodes.filter((node: Node) => sNodeIds.includes(node.id)),
          elements,
          true,
        ),
        ...getFocusedElements(
          nodes.filter((node: Node) => sNodeIds.includes(node.id)),
          elements,
          false,
        ),
      ];
      const focusedElementIds = focusedElements.flatMap((el) => el.id);

      edges.forEach((edge: Edge) => {
        edge.animated = focusedElementIds.includes(edge.id);
        // edge.selected = focusedElementIds.includes(edge.id);

        edge.style = {
          ...edge.style,
          stroke: focusedElementIds.includes(edge.id) ? 'blue' : '#B1B1B1',
        };
      });
      nodes.forEach((node: Node) => {
        node.data = {
          ...node.data,
          isAdjacent: focusedElementIds.includes(node.id),
          isSearchResult: false,
        };
        node.selected = sNodeIds.includes(node.id);
        // node.data.selectedRender = sNodeIds.includes(node.id);
        node.style = {
          ...node.style,
          opacity:
            sNodeIds.length > 0 ? (sNodeIds.includes(node.id) || focusedElementIds.includes(node.id) ? 1 : 0.25) : 1,
        };
      });
      console.log('setNodes renderSelectedNodes');
      setEdges(edges);
      setNodes(nodes);
    },
    [elements, selectedNodeIds],
  );

  const renderDefault = useCallback((els: Elements) => {
    // console.log('renderDefault', els);
    const { edges, nodes } = els;

    edges.forEach((edge: Edge) => {
      edge.animated = false;
      edge.selected = false;
      edge.style = {
        stroke: '#B1B1B1',
      };
    });

    nodes.forEach((node: Node) => {
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
    // console.log('setNodes renderDefault: ', nodes);
    setEdges(edges);
    setNodes(nodes);
  }, []);

  // useEffect(() => {
  //   console.log('useEffect [isDirty, elements, searchTerm, selectedNodeIds]');

  //   if (searchTerm != null && searchTerm.length > 0) return;

  //   if (selectedNodeIds.length > 0) {
  //     // selectedNodeIds is set - select those elements
  //     renderSelectedNodes()
  //   } else {
  //     // no selectedNodeIds - render default
  //     renderDefault();
  //   }
  // }, [isDirty, elements, searchTerm, selectedNodeIds]);

  //  [elements, searchTerm]
  // [isDirty, elements, searchTerm, selectedNodeIds]

  useEffect(() => {
    console.log('useEffect nodes: ', nodes);
    const searchResultNodes = nodes.filter((node) => node.data.isSearchResult === true);
    const selectedNodes = nodes.filter((node) => node.selected === true);
    // const adjacentNodes = selectedNodes.length > 0 ? nodes.filter((node) => node.data.isAdjacent === true) : [];

    if (selectedNodes.length > 0) {
      // console.log('fitView A: ', selectedNodes, adjacentNodes);
      // fitView({ duration: 800, nodes: [...selectedNodes, ...adjacentNodes] });
    } else if (searchResultNodes.length > 0) {
      // if there's only one result, we will select that node
      if (searchResultNodes.length != 1) {
        console.log('fitView B: ', searchResultNodes);
        fitView({ duration: 800, nodes: searchResultNodes });
      }
    } else {
      if (isDirty === false) {
        console.log('fitView C: ', nodes);
        fitView({ duration: 800, nodes });
      }
    }
  }, [nodes]);

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      console.log('useOnSelectionChange onChange: ', nodes);
      if (nodes.length > 0) {
        setIsDirty(true);
        // setSearchTerm(undefined);
      }

      const nodeIds = nodes.flatMap((node) => node.id);
      // console.log('useOnSelectionChange onChange setSelectedNodeIds: ', nodeIds, selectedNodeIds);
      if (JSON.stringify(nodeIds) != JSON.stringify(selectedNodeIds)) {
        console.log('CHANGED: ', nodeIds);
        setSelectedNodeIds(nodeIds);
        setSelectedNodeId(nodeIds[0]);

        if (searchTerm != null && searchTerm.length > 0 && nodeIds.length === 0) {
          // this is to handle when user selected a node, then did a search
          // search will clear the selected nodes, so we want to show search results instead of default
          console.log('onSearch');
          onSearch(searchTerm, { source: 'input' });
        } else {
          // if user is navigating using keyboard throughout the treeview, do not run this
          // since we want to focus on the individual single node to bring into focus
          // if (!treeViewInFocus.current)
          renderSelectedNodes(nodeIds);
        }
      }
    },
  });

  const nodeTypes = useMemo(() => {
    return {
      'org-chart-card': ({ ...nodeProps }: NodeProps) => (
        <OrgChartNode
          {...nodeProps}
          isConnectable={false}
          orgChartData={{ edges: elements.edges, nodes: elements.nodes }}
          orgChartContext={props.context}
          orgChartType={type}
        />
      ),
    };
  }, [props.context, elements, type]);

  // console.log('nodes/edges: ', nodes, edges);

  const onSearch = (term: string, source?: { source?: 'input' | 'clear' }) => {
    // console.log('onSearch: ', term, source);

    const { edges, nodes } = JSON.parse(JSON.stringify(elements));
    const sSearchTerm = source?.source === 'clear' ? undefined : term.length > 0 ? term : undefined;
    setSearchTerm(sSearchTerm);

    if (sSearchTerm != null && sSearchTerm.length > 0) {
      const searchResultIds = search(sSearchTerm);

      const results = nodes
        .filter((node: Node) => searchResultIds.includes(node.id))
        .map((node: Node) => {
          const employeeName =
            node.data.employees && node.data.employees.length > 0 ? node.data.employees[0].name : 'Vacant';
          const classification = node.data.classification?.code || 'N/A';
          const positionNumber = node.data.id || 'N/A';

          return {
            id: node.id,
            title: `${employeeName} - ${node.data.title || node.id} (${classification}) - ${positionNumber}`,
          };
        });
      setSearchResults(results);

      edges.forEach((edge: Edge) => {
        edge.animated = false;
        edge.selected = false;
        edge.style = {
          ...edge.style,
          stroke: '#B1B1B1',
        };
      });

      nodes.forEach((node: Node) => {
        node.data = {
          ...node.data,
          isAdjacent: false,
          isSearchResult: searchResultIds.includes(node.id),
        };
        node.selected = false;
        node.style = {
          ...node.style,
          opacity: 1,
        };
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setSearchResultCount(nodes.filter((node: any) => node.data.isSearchResult === true).length);
    } else {
      setSearchResults([]);
      setSearchResultCount(0);
    }
    console.log('setNodes onsearch');
    setEdges(edges);
    setNodes(nodes);
    // console.log('onsearch done');
  };

  // const treeViewInFocusCallback = (inFocus: boolean) => {
  //   // console.log('treeViewInFocusCallback: ', inFocus);
  //   treeViewInFocus.current = inFocus;
  //   // setTreeviewInFocus(inFocus);
  // };

  const handleSelectResult = (id: string) => {
    console.log('handleSelectResult: ', id);
    setSelectedNodeIds([id]);
    setSelectedNodeId(id);
    renderSelectedNodes([id]);
    const node = nodes.find((node) => node.id === id);
    if (node) {
      setCenter(node.position.x + (node.width ?? 0) / 2, node.position.y + (node.height ?? 0) / 2, {
        zoom: 1,
        duration: 0,
      });
      setTimeout(() => {
        const nodeElement = document.getElementById(`node-${id}`);
        console.log('nodeElement: ', nodeElement);
        if (nodeElement) {
          nodeElement.focus();
        }
      }, 600);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <Row gutter={[8, 8]} justify="space-between" style={{ margin: '0.5rem 1rem' }}>
        <Col xs={24} md={{ offset: 12, span: 12 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <DepartmentFilter
              setDepartmentId={setDepartmentId}
              departmentId={departmentId}
              loading={departmentIdIsLoading}
              // focusable={false}
            />
            <PositionSearch
              // setSearchTerm={setSearchTerm}
              onSearch={onSearch}
              disabled={departmentId == null || departmentIdIsLoading}
              searchResultsCount={searchTerm ? searchResultCount : null}
              searchTerm={searchTerm}
              searchResults={searchResults}
              onSelectResult={handleSelectResult}
              // focusable={false}
            />
            <div style={{ position: 'absolute', bottom: '-32px', right: '0', zIndex: '1' }}>
              <DownloadButton />
            </div>
          </Space>
        </Col>
      </Row>
      {orgChartDataIsFetching ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
          <Spin spinning style={{ margin: 'auto' }} />
        </div>
      ) : (
        <>
          <OrgChartFlow
            edges={edges}
            nodes={nodes}
            nodeTypes={nodeTypes}
            // departmentId={departmentId ?? ''}
            // wizardNextHandler={wizardNextHandler}
            // searchTerm={searchTerm}
            // loading={!dataUpdated}
            // treeViewInFocusCallback={treeViewInFocusCallback}
            setSelectedNodeId={setSelectedNodeId}
            selectedNodeId={selectedNodeId}
            isKeyboardNav={isKeyboardNav}
            onPaneClick={() => {
              console.log('onPaneClick, searchTerm: ', searchTerm);
              setIsDirty(true);
              // setSearchTerm(undefined);
              setSelectedNodeIds([]);

              if (searchTerm != null && searchTerm.length > 0) {
                onSearch(searchTerm, { source: 'input' });
              } else {
                renderSelectedNodes([]);
              }
            }}
          />
        </>
      )}
    </div>
  );
};
