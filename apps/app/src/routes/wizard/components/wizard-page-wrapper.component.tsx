import { Col, Row, Space } from 'antd';
import { ReactNode } from 'react';
import { PageHeader } from '../../../components/app/page-header.component';

interface WizardPageWrapperProps {
  title: string;
  subTitle: string;
  children: ReactNode;
  xxl?: number;
  xl?: number;
  lg?: number;
  hpad?: boolean;
}

export const WizardPageWrapper: React.FC<WizardPageWrapperProps> = ({
  title,
  subTitle,
  children,
  xxl = 24,
  xl = 24,
  lg = 24,
}) => (
  <Space direction="vertical" style={{ width: '100%' }} size="large">
    <PageHeader title={title} subTitle={subTitle} />
    <Row justify="center" style={{ padding: '0 1rem' }}>
      <Col xs={24} md={24} lg={lg} xl={xl} xxl={xxl}>
        {children}
      </Col>
    </Row>
  </Space>
);
