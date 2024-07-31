import { ReactFlowProvider } from 'reactflow';
import { OrgChartType } from '../../enums/org-chart-type.enum';
import { DynamicOrgChart, DynamicOrgChartProps } from './dynamic-org-chart.component';
import { ReadonlyOrgChart, ReadonlyOrgChartProps } from './readonly-org-chart.component';

export type OrgChartProps = DynamicOrgChartProps | ReadonlyOrgChartProps;

export const OrgChart = (props: OrgChartProps) => {
  return props.wrapProvider === false ? (
    <>{props.type === OrgChartType.DYNAMIC ? <DynamicOrgChart {...props} /> : <ReadonlyOrgChart {...props} />}</>
  ) : (
    <ReactFlowProvider>
      {props.type === OrgChartType.DYNAMIC ? <DynamicOrgChart {...props} /> : <ReadonlyOrgChart {...props} />}
    </ReactFlowProvider>
  );
};
