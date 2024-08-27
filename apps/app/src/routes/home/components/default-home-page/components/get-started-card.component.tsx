import { Card, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Paragraph, Title } = Typography;

export const GetStartedCard = () => {
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
        <div>🎬</div>
        <Title>Get Started</Title>
        <Paragraph>Learn more about the Job Store and it's features.</Paragraph>
        <Link to="#">View documentation</Link>
      </Space>
    </Card>
  );
};
