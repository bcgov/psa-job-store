import { FileOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
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
              key: '/requests/positions/create',
              icon: <PositionRequestOutlined />,
              label: 'New position',
              title: '',
            }),
          ]
        : []),
      ...(userCanAccess(auth.user, ['total-compensation'])
        ? [
            createMenuItem({
              key: '/job-profiles/manage/create',
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
      <Button icon={<PlusOutlined />} style={{ width: '100%' }} type="primary">
        {!collapsed && 'Create'}
      </Button>
    ),
    [collapsed],
  );

  return menuItems.length > 0 ? (
    <div style={{ margin: '8px 8px 0 8px' }}>
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
