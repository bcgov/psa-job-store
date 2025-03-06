import { ExportOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useState } from 'react';
import AccessiblePopoverMenu from '../../../components/shared/accessible-popover-menu/accessible-popover-menu';
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
        triggerButton={<Button tabIndex={-1} type="link" icon={<SettingOutlined />} />}
        content={
          <Menu selectedKeys={[]} className="org-chart-help-button" style={{ width: '400px' }}>
            <Menu.Item
              key="edit1"
              style={{
                paddingLeft: '16px',
                height: 'auto',
                whiteSpace: 'normal',
                lineHeight: '1.5',
                marginBottom: '8px',
              }}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://submit.digital.gov.bc.ca/app/form/submit?f=8c5d2b2d-a79d-413d-a15d-1f6885a83a0b"
                style={{ position: 'relative' }}
              >
                <div style={{ paddingRight: '24px', position: 'relative' }}>
                  <b>Need access to other departments?</b>
                  <ExportOutlined style={{ position: 'absolute', top: '5px', right: '0' }} />
                </div>
                Submit a Department Access Request form. You will need to provide a list of the Department IDs that have
                already been approved by your CHRO.
              </a>
            </Menu.Item>
            <Menu.Item
              key="edit2"
              style={{
                paddingLeft: '16px',
                height: 'auto',
                whiteSpace: 'normal',
                lineHeight: '1.5',
                marginBottom: '8px',
              }}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://chips.gov.bc.ca/psp/CHIPSBC/EMPLOYEE/HRMS/c/TGB_SECURITY_ACCESS.TGB_POS_MGT_DUMMY.GBL"
                style={{ position: 'relative' }}
              >
                <div style={{ paddingRight: '24px', position: 'relative' }}>
                  <b>Need to update the Organization Chart?</b>
                  <ExportOutlined style={{ position: 'absolute', top: '5px', right: '0' }} />
                </div>
                People leaders can submit a Position Management Form, which will be forwarded to the PeopleSoft
                administrators for processing.
              </a>
            </Menu.Item>
            <Menu.Item
              key="shortcuts"
              onClick={showModal}
              style={{
                paddingLeft: '16px',
                height: 'auto',
                whiteSpace: 'normal',
                lineHeight: '1.5',
              }}
            >
              <a href="#">
                <div>
                  <b>Organization Chart help</b>
                </div>
                View keyboard shortcuts
              </a>
            </Menu.Item>
          </Menu>
        }
        ariaLabel="Organization chart options"
      />

      <OrgChartKeyboardShortcutsModal isVisible={isModalVisible} onClose={handleClose} />
    </>
  );
};
