import { OrgChartType } from '../../enums/org-chart-type.enum';

export interface ReadonlyOrgChartProps {
  type: OrgChartType.READONLY;
}

export const ReadonlyOrgChart = ({ type }: ReadonlyOrgChartProps) => {
  return <span>{type}</span>;
};
