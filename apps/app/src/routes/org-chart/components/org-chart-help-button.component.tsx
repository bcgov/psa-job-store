import { QuestionCircleFilled } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';

export const OrgChartHelpButton = () => {
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: '1',
            type: 'group',
            label: 'Org chart need updating?',
            children: [
              {
                key: '1-1',
                label: (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://chips.gov.bc.ca:7002/psp/CHIPSBC/EMPLOYEE/HRMS/c/TGB_SECURITY_ACCESS.TGB_POS_MGT_DUMMY.GBL"
                  >
                    Visit the Position Management form
                  </a>
                ),
              },
            ],
          },
        ],
      }}
      trigger={['click']}
    >
      <Button type="link" icon={<QuestionCircleFilled />} />
    </Dropdown>
  );
};
