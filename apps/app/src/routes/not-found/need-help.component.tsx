import { MailOutlined } from '@ant-design/icons';
import { Card, Space, Typography } from 'antd';
import MSTeams from '../../assets/ms_teams.svg';

interface NeedHelpComponentProperties {
  noCard?: boolean;
}

export const NeedHelpComponent: React.FC<NeedHelpComponentProperties> = ({ noCard }) => {
  const { Title, Text, Link } = Typography;
  const content = (
    <Space direction="vertical" style={{ width: '100%', alignItems: 'start' }}>
      <Title level={5}>Need Help?</Title>
      <Text>Contact the Job Store team at:</Text>
      <Text>
        <MailOutlined /> Email:{' '}
        <Link href="mailto://Jobstore@gov.bc.ca" target="_blank">
          Jobstore@gov.bc.ca
        </Link>
      </Text>
      <Text>
        <img src={MSTeams} alt="Microsoft Teams" /> Microsoft Teams:{' '}
        <Link
          href="https://teams.microsoft.com/l/channel/19%3Aa135658fced7487185d182b6374cf778%40thread.tacv2/Feedback%20and%20Support?groupId=30d29524-d012-4340-a28e-ce8fe4aaea43&tenantId=6fdb5200-3d0d-4a8a-b036-d3685e359adc"
          target="_blank"
        >
          Job Store Beta Support
        </Link>
      </Text>
    </Space>
  );

  return noCard ? (
    content
  ) : (
    <Card size="default" style={{ backgroundColor: '#FFF', marginBottom: '10px' }}>
      {content}
    </Card>
  );
};
