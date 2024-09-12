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
import { FileSettingOutlined } from '../../icons/file-setting-outlined';
import { PartitionSettingOutlined } from '../../icons/partition-setting-outlined';
import { PositionRequestOutlined } from '../../icons/position-request-outlined';
import { PositionRequestSettingOutlined } from '../../icons/position-request-setting-outlined';
import { SendSettingOutlined } from '../../icons/send-setting-outlined';
import { UserGroupSettingOutlined } from '../../icons/user-group-setting-outlined';
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
        ? [createMenuItem({ key: '/', icon: <HomeOutlined aria-hidden className="" />, label: 'Home' })]
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
              key: 'job-profiles',
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
                        icon: <FileSettingOutlined />,
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

  const getKeysWithChildren = useCallback((items: any[]): string[] => {
    return items.reduce((keys: string[], item) => {
      if (item.children && item.children.length > 0) {
        keys.push(item.key);
        keys.push(...getKeysWithChildren(item.children));
      } else if (item.type === 'group' && item.children) {
        keys.push(...getKeysWithChildren(item.children));
      }
      return keys;
    }, []);
  }, []);

  const [openKeys, setOpenKeys] = useState<string[]>(() => {
    // if side-menu is collapsed, do not expand any sub-menus, otherwise they just float, breaking the UI

    if (collapsed) {
      // console.log('collapsed, initialize openKeys to empty array');
      return [];
    }

    // attach parent keys of current path to openKeys
    // this way the submenu of the current path will alwys be expanded
    const parentKeys = getParentKeys(location.pathname, menuItems);
    // console.log('parentKeys: ', parentKeys);

    const savedOpenKeys = localStorage.getItem('navMenuOpenKeys');

    if (savedOpenKeys) {
      // console.log('initializing openKeys from localStorage: ', [...JSON.parse(savedOpenKeys), ...parentKeys]);
      return [...JSON.parse(savedOpenKeys), ...parentKeys];
    } else {
      // console.log('initializing openKeys getKeysWithChildren: ', getKeysWithChildren(menuItems));
      return [...getKeysWithChildren(menuItems), ...parentKeys];
    }
  });

  // store expanded sub-menus in separate state for when side-menu is expanded
  const [expandedOpenKeys, setExpandedOpenKeys] = useState<string[]>(() => {
    const savedOpenKeys = localStorage.getItem('navMenuOpenKeys');

    // attach parent keys of current path to openKeys
    // this way the submenu of the current path will alwys be expanded
    const parentKeys = getParentKeys(location.pathname, menuItems);

    if (savedOpenKeys) {
      // console.log('initializing openKeys from localStorage: ', [...JSON.parse(savedOpenKeys), ...parentKeys]);
      return [...JSON.parse(savedOpenKeys), ...parentKeys];
    } else {
      // console.log('initializing openKeys getKeysWithChildren: ', getKeysWithChildren(menuItems));
      return [...getKeysWithChildren(menuItems), ...parentKeys];
    }
  });

  // Effect to set initial localStorage openKeys
  useEffect(() => {
    if (!localStorage.getItem('navMenuOpenKeys')) {
      // console.log('== navMenuOpenKeys not in localStorage, setting..');
      const allKeys = getKeysWithChildren(menuItems);
      // console.log('allKeys: ', allKeys);
      localStorage.setItem('navMenuOpenKeys', JSON.stringify(allKeys));

      // if side menu is visible, expand all items initially
      if (!collapsed) {
        // console.log('not collapsed, setOpenKeys: ', allKeys);
        setOpenKeys(allKeys);
      }
    }
  }, [menuItems, collapsed, getKeysWithChildren]);

  const onOpenChange = (keys: string[]) => {
    // console.log('onOpenChange: ', ', collapsed: ', collapsed, 'setOpenKeys');
    setOpenKeys(keys);

    // this callback gets triggered when side menu is collapsed and expanded,
    // so update localStorage for expanded keys only in response to user expanding the sub-menus
    // otherwise will clear localStorage when side-menu is collapsed
    if (!collapsed) {
      // console.log('not collapsed, setting expandedOpenKeys: ', keys);
      localStorage.setItem('navMenuOpenKeys', JSON.stringify(keys));
      setExpandedOpenKeys(keys);
    }
  };

  useEffect(() => {
    // if user expands the side menu, recover expanded sub-menu keys
    // without this the sub-menus will be collapsed when user expands the side menu
    if (!collapsed) {
      // console.log('not collapsed, setOpenKeys from expandedOpenKeys: ', expandedOpenKeys);
      setOpenKeys(expandedOpenKeys);
    }
  }, [setOpenKeys, expandedOpenKeys, collapsed]);

  return (
    <Flex
      vertical
      style={{ paddingTop: 0, width: '100%' }}
      className={`${collapsed ? 'collapsed' : 'expanded'} jobstore-side-menu`}
    >
      {/* {userCanAccess(auth.user, ['hiring-manager', 'total-compensation']) && <CreateButton collapsed={collapsed} />} */}
      <Menu
        rootClassName="jobstore-side-menu-popup"
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
