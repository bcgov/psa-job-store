import { Col, Row, Select, Space, Typography } from 'antd';
import { useGetDepartmentsQuery } from '../../../redux/services/graphql-api/department.api';

interface OrgChartFilterProps {
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string | null>>;
  selectedDepartment: string | null;
  defaultValue: string | null;
}

// const { Text } = Typography;

export const OrgChartFilter = ({ setSelectedDepartment, selectedDepartment, defaultValue }: OrgChartFilterProps) => {
  const { data, isLoading } = useGetDepartmentsQuery();

  return (
    <Row
      style={{
        borderTop: '1px solid #CCC',
        borderBottom: '1px solid #CCC',
        padding: '0.5rem 1rem',
      }}
    >
      <Col span={24}>
        <Space direction="horizontal" style={{ width: '100%', justifyContent: 'end' }} size="small">
          {/* <Text disabled={true}>Choose a Department</Text> */}
          <Select
            allowClear={true}
            loading={isLoading}
            showSearch
            style={{ width: 250 }}
            placeholder="Choose a Department"
            optionFilterProp="children"
            onSelect={setSelectedDepartment}
            onClear={() => setSelectedDepartment(null)}
            filterOption={(input, option) => (option?.filterKey ?? '').toLowerCase().includes(input.toLowerCase())}
            filterSort={(optionA, optionB) =>
              (optionA?.sortKey ?? '').toLowerCase().localeCompare((optionB?.sortKey ?? '').toLowerCase())
            }
            options={data?.departments.map((department) => ({
              value: department.id,
              label: (
                <span title={`${department.name} (${department.id})`}>
                  {department.name} <Typography.Text type="secondary">({department.id})</Typography.Text>
                </span>
              ),
              sortKey: department.name.toLowerCase(), // Additional property for sorting
              filterKey: department.name.toLowerCase() + ' ' + department.id, // Additional property for filtering
            }))}
            value={selectedDepartment}
            defaultValue={defaultValue}
          />
        </Space>
      </Col>
    </Row>
  );
};
