import { Col, Row, Space, Tag } from 'antd';
import { OrgChartType } from '../../enums/org-chart-type.enum';
import { DepartmentFilter } from '../department-filter.component';

export interface DynamicOrgChartProps {
  type: OrgChartType.DYNAMIC;
  setDepartmentId: React.Dispatch<React.SetStateAction<string | undefined>>;
  departmentId: string | undefined;
  departmentIdIsLoading?: boolean;
}

export const DynamicOrgChart = ({ setDepartmentId, departmentId, departmentIdIsLoading }: DynamicOrgChartProps) => {
  const [getOrgChart, { currentData: orgChartData, isFetching: orgChartDataIsFetching }] = useLazyGetOrgChartQuery();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <Row gutter={[8, 8]} justify="space-between" style={{ margin: '0.5rem 1rem' }}>
        <Col span={24}>
          <Tag>Filters</Tag>
          {/* <Tag color={isDirty ? 'red' : 'green'}>Is Dirty?: {isDirty === true ? 'true' : 'false'}</Tag> */}
          <Tag color="green">Department ID: {departmentId ?? ''}</Tag>
          {/* <Tag color="green">Search Term: {searchTerm ?? ''}</Tag>
          <Tag color="green">Search Results: {searchResultNodes?.length}</Tag> */}
        </Col>
        <Col xs={24} md={{ offset: 12, span: 12 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <DepartmentFilter
              setDepartmentId={setDepartmentId}
              departmentId={departmentId}
              loading={departmentIdIsLoading}
            />
          </Space>
        </Col>
      </Row>
    </div>
  );
};
