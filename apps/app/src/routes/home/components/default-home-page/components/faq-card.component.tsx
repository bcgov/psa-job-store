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
        <Link to="https://compass.gww.gov.bc.ca/wp-content/uploads/2025/01/Job-Store-Refresh-FAQs.pdf">View FAQ</Link>
        <Link to="https://teams.microsoft.com/l/team/19%3ASWgLLYIHsUHnY2qVQsU6MS3coD7pfkE0oL4S7cFyfSM1%40thread.tacv2/conversations?groupId=30d29524-d012-4340-a28e-ce8fe4aaea43&tenantId=6fdb5200-3d0d-4a8a-b036-d3685e359adc">
          Go to helpdesk
        </Link>
      </Space>
    </Card>
  );
};
