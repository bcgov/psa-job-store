import { Edge, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { useElementSize } from 'usehooks-ts';
import { PageHeader } from '../../components/app/page-header.component';
import { OrgChart } from './components/org-chart.component';

interface Data {
  title: string;
  classification: string;
  number: string;
  employee_name: string;
}

const initialNodes: Node<Data>[] = [
  {
    id: '1',
    type: 'org-chart-card',
    data: {
      title: 'Exec Director, Exchange Lab',
      classification: 'Band 5',
      number: '1',
      employee_name: 'Chloe Clarkson',
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: '2',
    type: 'org-chart-card',
    data: {
      title: 'Sr Director, Digital Portfolio',
      classification: 'Band 4',
      number: '2',
      employee_name: 'Samantha Mackay',
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: '3',
    type: 'org-chart-card',
    data: { title: 'Sr. Product Manager', classification: 'Band 3', number: '3', employee_name: 'Joan Welch' },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: '4',
    type: 'org-chart-card',
    data: { title: 'Full Stack Developer', classification: 'ISL 27R', number: '4', employee_name: 'Kylie Cameron' },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: '5',
    type: 'org-chart-card',
    data: {
      title: 'Sr Director, Digital Portfolio',
      classification: 'Band 4',
      number: '5',
      employee_name: 'Nathan Hill',
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: '6',
    type: 'org-chart-card',
    data: { title: 'Product Manager', classification: 'ISL 30R', number: '6', employee_name: 'Zoe Gill' },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: '7',
    type: 'org-chart-card',
    data: {
      title: 'Service Design Specialist',
      classification: 'ISL 24R',
      number: '7',
      employee_name: 'Jasmine North',
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: '8',
    type: 'org-chart-card',
    data: { title: 'Full Stack Developer', classification: 'ISL 30R', number: '8', employee_name: 'Felicity Kerr' },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: '9',
    type: 'org-chart-card',
    data: {
      title: 'Site Reliability Specialist',
      classification: 'ISL 27R',
      number: '9',
      employee_name: 'Anna Greene',
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: '10',
    type: 'org-chart-card',
    data: {
      title: 'Full Stack Developer - Level 4',
      classification: 'ISL 27R',
      number: '10',
      employee_name: 'Diane Churchill',
    },
    position: {
      x: 0,
      y: 0,
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: '1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
  },
  {
    id: '2-3',
    source: '2',
    target: '3',
    type: 'smoothstep',
  },
  {
    id: '3-4',
    source: '3',
    target: '4',
    type: 'smoothstep',
  },

  {
    id: '1-5',
    source: '1',
    target: '5',
    type: 'smoothstep',
  },
  {
    id: '5-6',
    source: '5',
    target: '6',
    type: 'smoothstep',
  },
  {
    id: '6-7',
    source: '6',
    target: '7',
    type: 'smoothstep',
  },
  {
    id: '5-8',
    source: '5',
    target: '8',
    type: 'smoothstep',
  },
  {
    id: '8-9',
    source: '8',
    target: '9',
    type: 'smoothstep',
  },
  {
    id: '8-10',
    source: '8',
    target: '10',
    type: 'smoothstep',
  },
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
