import { CopyOutlined, ExportOutlined, MailOutlined, QuestionCircleOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Dropdown, message } from 'antd';

export const HelpButton = () => {
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: '1',
            icon: <MailOutlined />,
            label: (
              <a
                onClick={() => {
                  navigator.clipboard.writeText('Jobstore@gov.bc.ca');
                  message.success('Email copied to clipboard');
                }}
              >
                <>Jobstore@gov.bc.ca </>
                <CopyOutlined style={{ cursor: 'pointer' }} />
              </a>
            ),
          },
          {
            key: '2',
            icon: <TeamOutlined />,
            label: (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://teams.microsoft.com/l/team/19%3ASWgLLYIHsUHnY2qVQsU6MS3coD7pfkE0oL4S7cFyfSM1%40thread.tacv2/conversations?groupId=30d29524-d012-4340-a28e-ce8fe4aaea43&tenantId=6fdb5200-3d0d-4a8a-b036-d3685e359adc"
              >
                Help desk <ExportOutlined style={{ cursor: 'pointer', float: 'right' }} />
              </a>
            ),
          },
        ],
      }}
      trigger={['click']}
    >
      <Button type="link" icon={<QuestionCircleOutlined />} style={{ color: 'white' }} />
    </Dropdown>
  );
};
