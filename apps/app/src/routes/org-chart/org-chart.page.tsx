import { Edge, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { useElementSize } from 'usehooks-ts';
import { PageHeader } from '../../components/app/page-header.component';
import { OrgChart } from './components/org-chart.component';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },

  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
  {
    id: '4',
    type: 'org-chart-card',
    data: { label: 'Output Node' },
    position: { x: 250, y: 400 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep' },
];

export const OrgChartPage = () => {
  const [ref] = useElementSize();

  return (
    <>
      <PageHeader title="Org Chart" />
      <div ref={ref} style={{ flex: 'auto', flexGrow: 'auto' }}>
        <OrgChart edges={initialEdges} nodes={initialNodes} />
      </div>
    </>
  );
};
