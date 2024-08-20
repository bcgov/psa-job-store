import { FileAddOutlined, FileOutlined } from '@ant-design/icons';
import { Dropdown, Flex } from 'antd';
import { useMemo } from 'react';
import { useAuth } from 'react-oidc-context';
import { NavLink } from 'react-router-dom';
import { PositionRequestOutlined } from '../../icons/position-request-outlined.component';
import { createMenuItem } from '../utils/nav-menu.utils';
import { userCanAccess } from '../utils/user-has-roles.util';

export type CreateButtonProps = { collapsed: boolean };

export const CreateButton = ({ collapsed }: CreateButtonProps) => {
  const auth = useAuth();

  const menuItems = useMemo(
    () => [
      ...(userCanAccess(auth.user, ['hiring-manager'])
        ? [
            createMenuItem({
              key: '/next/requests/positions/create',
              icon: <PositionRequestOutlined />,
              label: 'New position',
              title: '',
            }),
          ]
        : []),
      ...(userCanAccess(auth.user, ['total-compensation'])
        ? [
            createMenuItem({
              key: '/next/job-profiles/manage/create',
              icon: <FileOutlined />,
              label: 'Job profile',
              title: '',
            }),
          ]
        : []),
    ],
    [auth.user],
  );

  const renderButton = useMemo(
    () => (
      <Flex justify={collapsed ? 'left' : 'center'} style={{ width: '100%' }}>
        <FileAddOutlined />
        <span>Create</span>
      </Flex>
    ),
    [collapsed],
  );

  return menuItems.length > 0 ? (
    <div style={{ width: '100%' }}>
      {menuItems.length === 1 ? (
        <NavLink to={menuItems[0].key as string}>{renderButton}</NavLink>
      ) : (
        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
          {renderButton}
        </Dropdown>
      )}
    </div>
  ) : (
    <></>
  );
};
