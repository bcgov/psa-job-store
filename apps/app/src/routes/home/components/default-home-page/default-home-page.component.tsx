import { Col, Row } from 'antd';
import { ReactFlowProvider } from 'reactflow';
import { FAQCard } from './components/faq-card.component';
import { GetStartedCard } from './components/get-started-card.component';
import { OrgChartCard } from './components/org-chart-card.component';
import { WelcomeToTheJobStoreCard } from './components/welcome-to-the-job-store.card';

export const DefaultHomePage = () => {
  return (
    <ReactFlowProvider>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <WelcomeToTheJobStoreCard />
        </Col>
        <Col xs={24} md={6}>
          <GetStartedCard />
        </Col>
        <Col xs={24} md={6}>
          <FAQCard />
        </Col>
        <Col span={24}>
          <OrgChartCard />
        </Col>
      </Row>
    </ReactFlowProvider>
  );
};
