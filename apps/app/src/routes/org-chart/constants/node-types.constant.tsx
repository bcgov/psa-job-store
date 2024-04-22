import { OrgChartNode, OrgChartNodeProps } from '../components/org-chart-node.component';

export const nodeTypes = {
  'org-chart-card': (props: OrgChartNodeProps) => <OrgChartNode {...props} isConnectable={false} />,
};
