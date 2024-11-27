import { Card, Col, Row, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { User } from '../../../../redux/services/graphql-api/settings/dtos/user.dto';
import {
  useAssignUserRolesMutation,
  useGetRolesForSettingsQuery,
} from '../../../../redux/services/graphql-api/settings/settings.api';

const { Paragraph, Text } = Typography;

interface AssignRolesCardProps {
  user?: User;
}

export const AssignRolesCard = ({ user }: AssignRolesCardProps) => {
  const [value, setValue] = useState<string[]>(user?.roles ?? []);
  const { data: roleData, isFetching: roleDataIsFetching } = useGetRolesForSettingsQuery();
  const [assignUserRolesTrigger, { isLoading: assignUserRolesIsLoading }] = useAssignUserRolesMutation();

  const options = (roleData ?? []).map((role) => ({ label: role.replace('-', ' '), value: role }));

  useEffect(() => {
    if (user != null) {
      setValue(user.roles);
    }
  }, [user]);

  const handleChange = (values: string[]) => {
    if (user != null) {
      assignUserRolesTrigger({ id: user.id, roles: values });
    }
  };

  return (
    <Row justify="center">
      <Col xs={24} sm={16} md={16} lg={16} xl={16}>
        <Card loading={assignUserRolesIsLoading}>
          <Text strong>Roles</Text>
          <Paragraph type="secondary">Defines the features made available to the user.</Paragraph>
          <Select
            onChange={handleChange}
            allowClear
            disabled={user == null}
            loading={!user || roleDataIsFetching}
            mode="multiple"
            options={options}
            style={{ width: '100%' }}
            value={value}
          />
        </Card>
      </Col>
    </Row>
  );
};
