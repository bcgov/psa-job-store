import { useEffect, useState } from 'react';
import { Edge, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { useElementSize } from 'usehooks-ts';
import { PageHeader } from '../../components/app/page-header.component';
import { useLazyGetOrgChartQuery } from '../../redux/services/graphql-api/org-chart.api';
import { OrgChart } from './components/org-chart.component';

export const OrgChartPage = () => {
  // const [triggerGetClassificationData, { data: classificationsData, isLoading: classificationsDataIsLoading }] =
  // useLazyGetClassificationsQuery();
  const [edges, setEdges] = useState<Edge[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);

  const [trigger, { data }] = useLazyGetOrgChartQuery();
  const [ref] = useElementSize();

  useEffect(() => {
    trigger('112-0074');
  }, []);

  useEffect(() => {
    if (data?.orgChart != null) {
      setEdges([...JSON.parse(JSON.stringify(data.orgChart.edges))]);
      setNodes([...JSON.parse(JSON.stringify(data.orgChart.nodes))]);
    }
  }, [data]);

  return (
    <>
      <PageHeader title="Org Chart" />
      <div ref={ref} style={{ flex: 'auto', flexGrow: 'auto' }}>
        {edges.length > 0 && nodes.length > 0 && <OrgChart edges={edges} nodes={nodes} />}
        {/* {data?.orgChart && <OrgChart edges={data.orgChart.edges} nodes={data.orgChart.nodes} />} */}
      </div>
    </>
  );
};
