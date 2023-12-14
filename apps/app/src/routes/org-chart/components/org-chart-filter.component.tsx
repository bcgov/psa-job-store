import { Col, Row, Select, Space } from 'antd';
import { useGetDepartmentsQuery } from '../../../redux/services/graphql-api/department.api';

interface OrgChartFilterProps {
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string | null>>;
}

// const { Text } = Typography;

export const OrgChartFilter = ({ setSelectedDepartment }: OrgChartFilterProps) => {
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
            style={{ width: 200 }}
            placeholder="Choose a Department"
            optionFilterProp="children"
            onSelect={setSelectedDepartment}
            onClear={() => setSelectedDepartment(null)}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={data?.departments.map((department) => ({
              value: department.id,
              label: department.name,
            }))}
          />
        </Space>
      </Col>
    </Row>
  );
};
