import { Col, Row } from 'antd';
import { WelcomeToTheJobStoreCard } from './default-home-page/components/welcome-to-the-job-store.card';

export const ABCHomePage = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <WelcomeToTheJobStoreCard />
      </Col>
    </Row>
  );
};
