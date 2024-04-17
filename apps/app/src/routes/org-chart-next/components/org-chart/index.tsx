import { ReactFlowProvider } from 'reactflow';
import { OrgChartType } from '../../enums/org-chart-type.enum';
import { DynamicOrgChart, DynamicOrgChartProps } from './dynamic-org-chart.component';
import { ReadonlyOrgChart, ReadonlyOrgChartProps } from './readonly-org-chart.component';

type OrgChartProps = DynamicOrgChartProps | ReadonlyOrgChartProps;

export const OrgChart = (props: OrgChartProps) => {
  return props.type === OrgChartType.DYNAMIC ? (
    <ReactFlowProvider>
      <DynamicOrgChart {...props} />
    </ReactFlowProvider>
  ) : (
    <ReadonlyOrgChart {...props} />
  );
};
