import { Col, Row } from 'antd';
import { ReactNode } from 'react';
import { PageHeader } from '../../../components/app/page-header.component';
import './wizard-page-wrapper.component.css';

interface WizardPageWrapperProps {
  title: ReactNode;
  subTitle?: ReactNode;
  children: ReactNode;
  xxl?: number;
  xl?: number;
  lg?: number;
  hpad?: boolean;
  pageHeaderExtra?: ReactNode[];
  grayBg?: boolean;
  additionalBreadcrumb?: { title: string | undefined; path?: string; icon?: React.ReactNode };
}

export const WizardPageWrapper: React.FC<WizardPageWrapperProps> = ({
  title,
  subTitle,
  children,
  xxl = 24,
  xl = 24,
  lg = 24,
  pageHeaderExtra = null,
  grayBg = false,
  additionalBreadcrumb,
}) => (
  <>
    <PageHeader title={title} subTitle={subTitle} extra={pageHeaderExtra} additionalBreadcrumb={additionalBreadcrumb} />
    <Row
      justify="center"
      style={{ padding: '0 1rem', backgroundColor: grayBg ? '#f5f5f5' : 'white', flex: '1' }}
      id="wrapper-row"
    >
      <Col xs={24} md={24} lg={lg} xl={xl} xxl={xxl} style={{ display: 'flex', flexDirection: 'column' }}>
        {children}
      </Col>
    </Row>
  </>
);
