import { Col, Row, Space } from 'antd';
import { PageHeader } from '../../../components/app/page-header.component';

export const WizardPageWrapper = ({ title, subTitle, children }) => (
  <Space direction="vertical" style={{ width: '100%' }} size="large">
    <PageHeader title={title} subTitle={subTitle} />
    <div style={{ margin: '0 1rem 1rem' }}>
      <Row justify="center">
        <Col xs={24} md={22} lg={18}>
          {children}
        </Col>
      </Row>
    </div>
  </Space>
);
