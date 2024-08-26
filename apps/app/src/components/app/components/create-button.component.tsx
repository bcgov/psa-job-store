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
              key: '/requests/positions/create',
              icon: <PositionRequestOutlined aria-hidden />,
              label: 'New position',
              title: '',
            }),
          ]
        : []),
      ...(userCanAccess(auth.user, ['total-compensation'])
        ? [
            createMenuItem({
              key: '/job-profiles/manage/create',
              icon: <FileOutlined aria-hidden />,
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
      <Flex
        justify={collapsed ? 'left' : 'center'}
        style={{ width: '100%' }}
        role="button"
        aria-label="Create"
        title="Create"
        tabIndex={0}
      >
        <FileAddOutlined aria-hidden />
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
        <>
          {/* If current solution is found to lack accessibility, implement something like below */}
          {/* <AccessiblePopoverMenu
            compact
            triggerButton={
              // <Button tabIndex={-1} style={{}} icon={<FileAddOutlined aria-hidden />} type="primary">
              //   Create
              // </Button>
              renderButton
            }
            ariaLabel="Create new request"
            content={
              <Menu selectedKeys={[]}>
                {userCanAccess(auth.user, ['hiring-manager']) && (
                  <Menu.Item key="/requests/positions/create" icon={<PositionRequestOutlined />}>
                    <Link to="/requests/positions/create">New position</Link>
                  </Menu.Item>
                )}
                {userCanAccess(auth.user, ['total-compensation']) && (
                  <Menu.Item key="/job-profiles/manage/create" icon={<FileOutlined />}>
                    <Link to="/job-profiles/manage/create">Job profile</Link>
                  </Menu.Item>
                )}
              </Menu>
            }
          ></AccessiblePopoverMenu> */}

          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            {renderButton}
          </Dropdown>
        </>
      )}
    </div>
  ) : (
    <></>
  );
};
