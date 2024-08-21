import { Card, Space, Typography } from 'antd';

const { Paragraph, Title } = Typography;

export const WelcomeToTheJobStoreCard = () => {
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
        <div>👋</div>
        <Title>Welcome to the Job Store</Title>
        <Paragraph>
          The Job Store is an integral resource to assist managers in quickly filling common public service positions.
          It provides a one-stop-source for pre-written and pre-approved generic job profiles that exist across the
          public service as well as pattern jobs for specific Ministries.
        </Paragraph>
      </Space>
    </Card>
  );
};
