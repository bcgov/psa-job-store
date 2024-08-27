import { Card, Col, Flex, Row, Switch, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { DepartmentForSettings } from '../../../../redux/services/graphql-api/settings/dtos/department-for-settings.dto';
import { useUpdateDepartmentMetadataMutation } from '../../../../redux/services/graphql-api/settings/settings.api';

const { Text } = Typography;

interface PrimaryActionsCardProps {
  department?: DepartmentForSettings;
  departmentIsLoading?: boolean;
}

export const PrimaryActionsCard = ({ department, departmentIsLoading }: PrimaryActionsCardProps) => {
  const [trigger] = useUpdateDepartmentMetadataMutation();
  const [checked, setChecked] = useState<boolean>(department?.metadata?.is_statutorily_excluded ?? false);

  useEffect(() => {
    if (department?.metadata?.is_statutorily_excluded != null) {
      setChecked(department.metadata.is_statutorily_excluded);
    }
  }, [department?.metadata?.is_statutorily_excluded]);

  useEffect(() => {
    if (department != null) {
      trigger({ department_id: department.id, is_statutorily_excluded: checked });
    }
  }, [checked, department]);

  return (
    <Row justify="center">
      <Col xs={24} sm={16} md={16} lg={16} xl={16}>
        <Card>
          <div>
            <Text strong>Statutorial Exclusion</Text>
            <br />
            <Flex gap={16} style={{ marginTop: '1rem' }}>
              <Switch
                onChange={(checked) => setChecked(checked)}
                checked={checked}
                disabled={departmentIsLoading}
                loading={departmentIsLoading}
              />
              All positions within the department should be considered statutorily excluded.
            </Flex>
          </div>
        </Card>
      </Col>
    </Row>
  );
};
