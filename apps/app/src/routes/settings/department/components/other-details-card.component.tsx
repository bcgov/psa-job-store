import { Card, Col, Divider, Row, Tag, Typography } from 'antd';
import { DepartmentForSettings } from '../../../../redux/services/graphql-api/settings/dtos/department-for-settings.dto';

const { Paragraph, Text } = Typography;

interface OtherDetailsCardProps {
  department?: DepartmentForSettings;
}

export const OtherDetailsCard = ({ department }: OtherDetailsCardProps) => {
  return (
    <Row justify="center">
      <Col xs={24} sm={16} md={16} lg={16} xl={16}>
        <Card title="Other Details">
          <div>
            <Paragraph strong>Department Details</Paragraph>
            <Text>{department?.name}</Text>
            <Paragraph type="secondary">
              Department ID: {department?.id}
              <br />
              Ministry: {department?.organization.name}
            </Paragraph>
          </div>
          <Divider />
          <div>
            <Paragraph strong>Location</Paragraph>
            <Paragraph type="secondary">Location ID: {department?.location_id}</Paragraph>
          </div>
          <Divider />
          <div>
            <Paragraph strong>Status</Paragraph>
            <Tag>{department?.effective_status}</Tag>
          </div>
        </Card>
      </Col>
    </Row>
  );
};
