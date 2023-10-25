import { Col, Row, Space } from 'antd';
import { ReactNode } from 'react';
import { PageHeader } from '../../../components/app/page-header.component';

interface WizardPageWrapperProps {
  title: string;
  subTitle: string;
  children: ReactNode;
}

export const WizardPageWrapper: React.FC<WizardPageWrapperProps> = ({ title, subTitle, children }) => (
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
