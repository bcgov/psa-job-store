import {
  BookOutlined,
  FileAddOutlined,
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
import { Divider, Flex, Menu } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTypedSelector } from '../../../redux/redux.hooks';
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
  const auth = useTypedSelector((state) => state.authReducer);
  const location = useLocation();
  const params = useParams<Record<string, string>>();

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

  // Extract the Help and Docs menu item
  const helpMenuItem = useMemo(() => {
    if (userCanAccess(auth.user, ['bceid', 'idir'])) {
      return createMenuItem({
        key: '/help',
        icon: <BookOutlined aria-hidden />,
        label: 'Help and Docs',
        title: 'Help and Docs',
      });
    }
    return null;
  }, [auth.user]);

  // Main menu items without the Help and Docs item
  const menuItems = useMemo(
    () => [
      ...(userCanAccess(auth.user, ['hiring-manager']) || userCanAccess(auth.user, ['total-compensation'])
        ? userCanAccess(auth.user, ['hiring-manager']) && userCanAccess(auth.user, ['total-compensation']) && collapsed
          ? [
              createMenuGroup({
                className: 'create-menu-button',
                key: 'create-menu',
                collapsed,
                icon: <FileAddOutlined aria-hidden style={{ color: 'white' }} />,
                style: {
                  backgroundColor: '#0057ad',
                  color: 'white',
                  margin: '0 5px',
                },
                label: 'Create',
                children: [
                  ...(userCanAccess(auth.user, ['hiring-manager'])
                    ? [
                        createMenuItem({
                          key: '/requests/positions/create',
                          icon: <PositionRequestOutlined aria-hidden />,
                          label: 'New position',
                        }),
                      ]
                    : []),
                  ...(userCanAccess(auth.user, ['total-compensation'])
                    ? [
                        createMenuItem({
                          key: '/job-profiles/manage/create',
                          icon: <FileOutlined aria-hidden />,
                          label: 'Job profile',
                        }),
                      ]
                    : []),
                ],
              }),
            ]
          : [
              // This is used to render create button only when one option is available
              // (total-comp OR hiring-manager)
              {
                key: 'create-button',
                className: 'create-button',
                icon: <></>,
                label: <CreateButton collapsed={collapsed} />,
                title: userCanAccess(auth.user, ['hiring-manager']) ? 'Create new position' : 'Create job profile',
                onFocus: (e: any) => {
                  if (e.nativeEvent.target.classList.contains('create-button')) {
                    // redirect focus on the trigger, otherwise won't open the popover
                    // get .popover-trigger that's inside .create-button and focus on it
                    const popoverTrigger = document.querySelector('.create-button .popover-trigger');
                    // focus on it
                    (popoverTrigger as HTMLElement)?.focus();
                  }
                },
                style: {
                  backgroundColor: '#0057ad',
                  color: 'white',
                  ...(!collapsed ? { paddingLeft: '0' } : {}),
                },
              },
            ]
        : []),
      ...(userCanAccess(auth.user, ['bceid', 'idir'])
        ? [createMenuItem({ key: '/', icon: <HomeOutlined aria-hidden className="" />, label: 'Home', title: 'Home' })]
        : []),
      ...(userCanAccess(auth.user, ['idir'])
        ? [
            createMenuItem({
              key: '/my-departments',
              icon: <PartitionOutlined aria-hidden />,
              label: 'My departments',
              title: 'My departments',
            }),
          ]
        : []),
      ...(userCanAccess(auth.user, ['bceid', 'idir', 'total-compensation'])
        ? [
            createMenuGroup({
              key: 'job-profiles',
              collapsed,
              icon: <FileOutlined aria-hidden />,
              label: 'Job Profiles',
              children: [
                ...(userCanAccess(auth.user, ['bceid', 'idir'])
                  ? [
                      createMenuItem({
                        key: '/job-profiles',
                        icon: <FileSearchOutlined aria-hidden />,
                        label: 'Explore',
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

      ...(userCanAccess(auth.user, ['super-admin', 'hiring-manager'])
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
      // Removed the Help and Docs menu item from here
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
    // If side-menu is collapsed, do not expand any sub-menus, otherwise they just float, breaking the UI
    if (collapsed) {
      return [];
    }

    // Attach parent keys of current path to openKeys
    // This way the submenu of the current path will always be expanded
    const parentKeys = getParentKeys(location.pathname, menuItems);
    const savedOpenKeys = localStorage.getItem('navMenuOpenKeys');

    if (savedOpenKeys) {
      return [...JSON.parse(savedOpenKeys), ...parentKeys];
    } else {
      return [...getKeysWithChildren(menuItems), ...parentKeys];
    }
  });

  // Store expanded sub-menus in separate state for when side-menu is expanded
  const [expandedOpenKeys, setExpandedOpenKeys] = useState<string[]>(() => {
    const savedOpenKeys = localStorage.getItem('navMenuOpenKeys');
    const parentKeys = getParentKeys(location.pathname, menuItems);

    if (savedOpenKeys) {
      return [...JSON.parse(savedOpenKeys), ...parentKeys];
    } else {
      return [...getKeysWithChildren(menuItems), ...parentKeys];
    }
  });

  // Effect to set initial localStorage openKeys
  useEffect(() => {
    if (!localStorage.getItem('navMenuOpenKeys')) {
      const allKeys = getKeysWithChildren(menuItems);
      localStorage.setItem('navMenuOpenKeys', JSON.stringify(allKeys));

      // If side menu is visible, expand all items initially
      if (!collapsed) {
        setOpenKeys(allKeys);
      }
    }
  }, [menuItems, collapsed, getKeysWithChildren]);

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);

    // Update localStorage for expanded keys only in response to user expanding the sub-menus
    if (!collapsed) {
      localStorage.setItem('navMenuOpenKeys', JSON.stringify(keys));
      setExpandedOpenKeys(keys);
    }
  };

  useEffect(() => {
    // If user expands the side menu, recover expanded sub-menu keys
    if (!collapsed) {
      setOpenKeys(expandedOpenKeys);
    }
  }, [setOpenKeys, expandedOpenKeys, collapsed]);

  // Combine the selected keys for both menus
  const selectedKeys = useMemo(() => {
    if (location.pathname === '/requests/positions/create' || location.pathname === '/job-profiles/manage/create') {
      return [];
    }
    return [Object.values(params).reduce((path, param) => path?.replace('/' + param, ''), location.pathname) ?? '/'];
  }, [location.pathname, params]);

  return (
    <Flex
      vertical
      style={{ paddingTop: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
      className={`${collapsed ? 'collapsed' : 'expanded'} jobstore-side-menu`}
      data-testid="menu-options"
    >
      {/* Main Menu */}
      <Menu
        aria-label="Main menu - use arrow keys to navigate"
        rootClassName="jobstore-side-menu-popup"
        inlineIndent={16}
        mode="inline"
        selectedKeys={selectedKeys}
        theme="light"
        items={menuItems}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ flex: '1 1 auto' }} // Make the main menu take available space
      />
      {/* Help and Docs Menu Item */}
      {helpMenuItem && (
        <>
          <Divider />
          <Menu
            aria-label="Help and Docs menu - use arrow keys to navigate"
            inlineIndent={16}
            mode="inline"
            selectedKeys={selectedKeys}
            theme="light"
            items={[helpMenuItem]}
            openKeys={[]}
            style={{ flex: '0 0 auto' }} // Ensure it doesn't grow
          />
        </>
      )}
    </Flex>
  );
};
