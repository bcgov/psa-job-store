/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FileDoneOutlined,
  FileOutlined,
  FileProtectOutlined,
  FileSearchOutlined,
  FileZipOutlined,
  HomeOutlined,
  InboxOutlined,
  PartitionOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Flex, Menu } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useLocation } from 'react-router-dom';
import { FileSettingOutlined } from '../../icons/file-setting-outlined.component';
import { PartitionSettingOutlined } from '../../icons/partition-setting-outlined.component';
import { PositionRequestOutlined } from '../../icons/position-request-outlined.component';
import { PositionRequestSettingOutlined } from '../../icons/position-request-setting-outlined.component';
import { SendSettingOutlined } from '../../icons/send-setting-outlined.component';
import { UserGroupSettingOutlined } from '../../icons/user-group-setting-outlined.component';
import { createMenuGroup, createMenuItem, createSubMenu } from '../utils/nav-menu.utils';
import { userCanAccess } from '../utils/user-has-roles.util';
import { CreateButton } from './create-button.component';
import './nav-menu.component.css';

export interface NavMenuProps {
  collapsed: boolean;
}

export const NavMenu = ({ collapsed }: NavMenuProps) => {
  const auth = useAuth();
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [initialSet, setInitialSet] = useState(false);

  // Function to get all parent keys of a menu item
  const getParentKeys = useCallback((key: string, items: any[]): string[] => {
    const findKeys = (items: any[], path: string[] = []): string[] | null => {
      for (const item of items) {
        if (item.key === key) {
          return path;
        }
        if (item.children) {
          const result = findKeys(item.children, [...path, item.key]);
          if (result) {
            return result;
          }
        }
        // Handle grouped items
        if (item.type === 'group' && item.children) {
          const result = findKeys(item.children, path);
          if (result) {
            return result;
          }
        }
      }
      return null;
    };

    const result = findKeys(items);
    return result || [];
  }, []);

  const menuItems = useMemo(
    () => [
      ...(userCanAccess(auth.user, ['hiring-manager', 'total-compensation'])
        ? [
            {
              key: 'create-button',
              className: 'create-button',
              icon: <></>,
              label: <CreateButton collapsed={collapsed} />,
              style: {
                backgroundColor: '#0057ad',
                color: 'white',
              },
            },
          ]
        : []),
      ...(userCanAccess(auth.user, ['user'])
        ? [createMenuItem({ key: '/', icon: <HomeOutlined aria-hidden />, label: 'Home' })]
        : []),
      ...(userCanAccess(auth.user, ['user'])
        ? [
            createMenuItem({
              key: '/my-departments',
              icon: <PartitionOutlined aria-hidden />,
              label: 'My departments',
            }),
          ]
        : []),
      ...(userCanAccess(auth.user, ['user', 'total-compensation'])
        ? [
            createMenuGroup({
              key: '/job-profiles',
              collapsed,
              icon: <FileOutlined />,
              label: 'Job Profiles',
              children: [
                ...(userCanAccess(auth.user, ['user'])
                  ? [
                      createMenuItem({
                        key: '/job-profiles',
                        icon: <FileSearchOutlined aria-hidden />,
                        label: 'Explore',
                      }),
                    ]
                  : []),
                ...(userCanAccess(auth.user, ['user'])
                  ? [
                      createMenuItem({
                        key: '/job-profiles/saved',
                        icon: <FileDoneOutlined aria-hidden />,
                        label: 'Saved Profiles',
                      }),
                    ]
                  : []),
                ...(userCanAccess(auth.user, ['total-compensation'])
                  ? [
                      createSubMenu({
                        key: '/job-profiles/manage',
                        icon: <FileSettingOutlined aria-hidden />,
                        label: 'Manage profiles',
                        children: [
                          createMenuItem({
                            key: '/job-profiles/manage/draft',
                            icon: <FileOutlined aria-hidden />,
                            label: 'Drafts',
                          }),
                          createMenuItem({
                            key: '/job-profiles/manage/published',
                            icon: <FileProtectOutlined aria-hidden />,
                            label: 'Published',
                          }),
                          createMenuItem({
                            key: '/job-profiles/manage/archived',
                            icon: <FileZipOutlined aria-hidden />,
                            label: 'Archived',
                          }),
                        ],
                      }),
                    ]
                  : []),
              ],
            }),
          ]
        : []),
      ...(userCanAccess(auth.user, ['hiring-manager', 'classification', 'total-compensation'])
        ? [
            createMenuGroup({
              key: '/requests',
              collapsed,
              icon: <InboxOutlined aria-hidden />,
              label: 'Requests',
              children: [
                ...(userCanAccess(auth.user, ['hiring-manager'])
                  ? [
                      createMenuItem({
                        key: '/requests/positions',
                        icon: <PositionRequestOutlined aria-hidden />,
                        label: 'New position',
                      }),
                    ]
                  : []),
                ...(userCanAccess(auth.user, ['classification', 'total-compensation'])
                  ? [
                      createSubMenu({
                        key: 'manage-requests',
                        icon: <SendSettingOutlined aria-hidden />,
                        label: 'Manage requests',
                        children: [
                          ...(userCanAccess(auth.user, ['classification'])
                            ? [
                                createMenuItem({
                                  key: '/requests/positions/manage',
                                  icon: <PositionRequestSettingOutlined aria-hidden />,
                                  label: 'New position',
                                }),
                              ]
                            : []),
                          ...(userCanAccess(auth.user, ['total-compensation'])
                            ? [
                                createMenuItem({
                                  key: '/requests/positions/manage/approved',
                                  icon: <FileDoneOutlined aria-hidden />,
                                  label: 'Approved',
                                }),
                              ]
                            : []),
                        ],
                      }),
                    ]
                  : []),
              ],
            }),
          ]
        : []),
      ...(userCanAccess(auth.user, ['super-admin'])
        ? [
            createMenuGroup({
              key: '/settings',
              collapsed,
              icon: <SettingOutlined aria-hidden />,
              label: 'Settings',
              children: [
                createMenuItem({
                  key: '/settings/departments',
                  icon: <PartitionSettingOutlined aria-hidden />,
                  label: 'Departments',
                }),
                createMenuItem({
                  key: '/settings/users',
                  icon: <UserGroupSettingOutlined aria-hidden />,
                  label: 'Users',
                }),
              ],
            }),
          ]
        : []),
    ],
    [auth.user, collapsed],
  );

  // Effect to set initial open keys based on current location
  useEffect(() => {
    if (collapsed || initialSet) return;
    const parentKeys = getParentKeys(location.pathname, menuItems);
    setOpenKeys(parentKeys);
    setInitialSet(true);
  }, [location.pathname, getParentKeys, menuItems, collapsed, initialSet]);

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Flex
      vertical
      style={{ paddingTop: 0, width: '100%' }}
      className={`${collapsed ? 'collapsed' : 'expanded'} jobstore-side-menu`}
    >
      {/* {userCanAccess(auth.user, ['hiring-manager', 'total-compensation']) && <CreateButton collapsed={collapsed} />} */}
      <Menu
        inlineIndent={16}
        mode="inline"
        selectedKeys={[location.pathname]}
        theme="light"
        items={menuItems}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      />
    </Flex>
  );
};
