import { Card, Col, Row, Typography } from 'antd';

const { Paragraph, Text } = Typography;

export const OrgChartAccessForm = () => {
  return (
    <Row justify="center">
      <Col xs={24} sm={16} md={16} lg={16} xl={16}>
        <Card>
          <Text strong>Departments</Text>
          <Paragraph type="secondary">
            By default, users have access to their base department as defined in PeopleSoft. You can provide access to
            additional departments below.
          </Paragraph>
        </Card>
      </Col>
    </Row>
  );
};
