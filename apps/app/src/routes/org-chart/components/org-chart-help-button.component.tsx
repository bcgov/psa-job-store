import { SettingOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useState } from 'react';
import AccessiblePopoverMenu from '../../../components/app/common/components/accessible-popover-menu';
import './org-chart-help-button.component.css';
import { OrgChartKeyboardShortcutsModal } from './org-chart-keyboard-shortcuts.modal';

export const OrgChartHelpButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <AccessiblePopoverMenu
        padding={'0px'}
        triggerButton={<Button type="link" icon={<SettingOutlined />} />}
        content={
          <Menu selectedKeys={[]} className="org-chart-help-button">
            <Menu.ItemGroup title="Org chart need updating?">
              <Menu.Item key="edit" style={{ paddingLeft: '16px' }}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://chips.gov.bc.ca/psp/CHIPSBC/EMPLOYEE/HRMS/c/TGB_SECURITY_ACCESS.TGB_POS_MGT_DUMMY.GBL"
                >
                  Visit the Position Management form
                </a>
              </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Org chart help">
              <Menu.Item key="shortcuts" onClick={showModal}>
                Keyboard Shortcuts
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        }
        ariaLabel="Org chart need updating?"
      />

      <OrgChartKeyboardShortcutsModal isVisible={isModalVisible} onClose={handleClose} />
    </>
  );
};
