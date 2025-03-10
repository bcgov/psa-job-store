import { CopyOutlined, MailOutlined, QuestionCircleOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Menu, message } from 'antd';
import AccessiblePopoverMenu from '../shared/accessible-popover-menu/accessible-popover-menu';

export const HelpButton = () => {
  const content = (
    <Menu selectedKeys={[]}>
      <Menu.Item
        key="email"
        icon={<MailOutlined aria-hidden />}
        onClick={() => {
          navigator.clipboard.writeText('Jobstore@gov.bc.ca');
          message.success('Email copied to clipboard');
        }}
      >
        <>
          Jobstore@gov.bc.ca <CopyOutlined style={{ cursor: 'pointer' }} aria-hidden />
        </>
      </Menu.Item>
      <Menu.Item key="teams" icon={<TeamOutlined aria-hidden />}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://teams.microsoft.com/l/team/19%3ASWgLLYIHsUHnY2qVQsU6MS3coD7pfkE0oL4S7cFyfSM1%40thread.tacv2/conversations?groupId=30d29524-d012-4340-a28e-ce8fe4aaea43&tenantId=6fdb5200-3d0d-4a8a-b036-d3685e359adc"
        >
          Help desk
        </a>
      </Menu.Item>
      <Menu.Item key="feedback" icon={<QuestionCircleOutlined aria-hidden />}>
        <a target="_blank" rel="noopener noreferrer" href="https://jobstore-feedback.apps.silver.devops.gov.bc.ca/">
          Share feedback
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <AccessiblePopoverMenu
      triggerButton={
        <Button
          type="link"
          icon={<QuestionCircleOutlined style={{ fontSize: '1.3rem' }} aria-hidden />}
          style={{ color: 'white' }}
          tabIndex={-1}
        />
      }
      content={content}
      ariaLabel="Open help menu"
    />
  );
};
