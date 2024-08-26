import { Card, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Paragraph, Title } = Typography;

export const FAQCard = () => {
  return (
    <Card
      bordered
      style={{
        background: `linear-gradient(to bottom right, #98CCFF -40%, #F0F7FF 10%, #FFFFFF 25%)`,
        border: '1px solid #DEDEDE',
        height: '100%',
      }}
    >
      <Space direction="vertical">
        <div>❓</div>
        <Title>FAQs</Title>
        <Paragraph>Have questions? Browse the FAQs or reach out to us.</Paragraph>
        <Link to="#">View FAQs</Link>
        <Link to="#">Go to helpdesk</Link>
      </Space>
    </Card>
  );
};
