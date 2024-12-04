import { FileAddOutlined, FileOutlined } from '@ant-design/icons';
import { Button, Flex, Menu } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';
import { useMemo } from 'react';
import { useAuth } from 'react-oidc-context';
import { Link, NavLink } from 'react-router-dom';
import { PositionRequestOutlined } from '../../icons/position-request-outlined';
import AccessiblePopoverMenu from '../common/components/accessible-popover-menu';
import { createMenuItem } from '../utils/nav-menu.utils';
import { userCanAccess } from '../utils/user-has-roles.util';
export type CreateButtonProps = { collapsed: boolean };

export const CreateButton = ({ collapsed }: CreateButtonProps) => {
  const auth = useAuth();

  const menuItems: MenuItemType[] = useMemo(
    () => [
      ...(userCanAccess(auth.user, ['hiring-manager'])
        ? [
            createMenuItem({
              key: '/requests/positions/create',
              icon: <PositionRequestOutlined aria-hidden />,
              label: 'New position',
              title: 'new position',
            }),
          ]
        : []),
      ...(userCanAccess(auth.user, ['total-compensation'])
        ? [
            createMenuItem({
              key: '/job-profiles/manage/create',
              icon: <FileOutlined aria-hidden />,
              label: 'Job profile',
              title: 'job profile',
            }),
          ]
        : []),
    ],
    [auth.user],
  );

  const renderButton = useMemo(
    () => (menuItems: MenuItemType[]) => (
      <Flex
        data-testid="create-new-btn"
        justify={collapsed ? 'left' : 'center'}
        style={{ width: '100%' }}
        role="button"
        aria-label={menuItems.length === 1 ? `Create ${menuItems[0]?.title}` : 'Create'}
        title={menuItems.length === 1 ? `Create ${menuItems[0]?.title}` : 'Create'}
        tabIndex={0}
      >
        <FileAddOutlined aria-hidden />
        <span>{menuItems.length === 1 ? `Create ${menuItems[0]?.title}` : 'Create'}</span>
      </Flex>
    ),
    [collapsed],
  );

  return menuItems.length > 0 ? (
    <div style={{ width: '100%' }}>
      {menuItems.length === 1 ? (
        <NavLink to={menuItems[0]?.key as string}>{renderButton(menuItems)}</NavLink>
      ) : (
        <>
          {/* If current solution is found to lack accessibility, implement something like below */}
          <AccessiblePopoverMenu
            // Menu is intended to be navigated with arrow keys, disable tabbing onto the button
            focusable={false}
            borderFocus={true}
            compact
            triggerButton={
              <Button
                tabIndex={-1}
                style={{ width: '100%', height: '100%' }}
                icon={<FileAddOutlined aria-hidden />}
                type="primary"
                title="Create"
              >
                {!collapsed ? 'Create' : ''}
              </Button>
              // renderButton
            }
            placement={collapsed ? 'right' : 'bottom'}
            ariaLabel="Create new request"
            content={
              <Menu selectedKeys={[]} className="create-menu" rootClassName="create-menu-root" inlineCollapsed={false}>
                {userCanAccess(auth.user, ['hiring-manager']) && (
                  <Menu.Item key="/requests/positions/create" icon={<PositionRequestOutlined aria-hidden />} title="">
                    <Link aria-label={'Create new position'} to="/requests/positions/create">
                      New position
                    </Link>
                  </Menu.Item>
                )}
                {userCanAccess(auth.user, ['total-compensation']) && (
                  <Menu.Item key="/job-profiles/manage/create" icon={<FileOutlined aria-hidden />} title="">
                    <Link aria-label={'Create job profile'} to="/job-profiles/manage/create">
                      Job profile
                    </Link>
                  </Menu.Item>
                )}
              </Menu>
              // <Menu className="wizard-menu">
              //   <Menu.Item key="save">
              //     <div style={{ padding: '5px 0' }}>Save and quit</div>
              //   </Menu.Item>
              //   <Menu.Item key="delete">
              //     <div style={{ padding: '5px 0' }}>Delete</div>
              //   </Menu.Item>
              // </Menu>
            }
          ></AccessiblePopoverMenu>
        </>
      )}
    </div>
  ) : (
    <></>
  );
};
