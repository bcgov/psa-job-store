import { QuestionCircleFilled } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import AcessiblePopoverMenu from '../../../components/app/common/components/accessible-popover-menu';
import './org-chart-help-button.component.css';

export const OrgChartHelpButton = () => {
  return (
    <>
      <AcessiblePopoverMenu
        padding={'0px'}
        triggerButton={<Button type="link" icon={<QuestionCircleFilled />} />}
        content={
          <Menu selectedKeys={[]} className="org-chart-help-button">
            <Menu.ItemGroup title="Org chart need updating?">
              <Menu.Item key="edit" style={{ paddingLeft: '16px' }}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://chips.gov.bc.ca:7002/psp/CHIPSBC/EMPLOYEE/HRMS/c/TGB_SECURITY_ACCESS.TGB_POS_MGT_DUMMY.GBL"
                >
                  Visit the Position Management form
                </a>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        }
        ariaLabel="Org chart need updating?"
      ></AcessiblePopoverMenu>
    </>
  );
};
