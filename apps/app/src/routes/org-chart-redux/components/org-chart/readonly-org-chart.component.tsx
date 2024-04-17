import { OrgChartType } from '../../enums/org-chart-type.enum';
import { Elements } from '../../interfaces/elements.interface';

export interface ReadonlyOrgChartProps {
  type: OrgChartType.READONLY;
  elements: Elements;
}

export const ReadonlyOrgChart = ({ elements }: ReadonlyOrgChartProps) => {
  return JSON.stringify(elements);
};
