import { NodeProps } from 'reactflow';
import { OrgChartNode } from '../components/org-chart-node.component';

export const nodeTypes = {
  'org-chart-card': ({ ...props }: NodeProps) => <OrgChartNode {...props} isConnectable={false} />,
};
