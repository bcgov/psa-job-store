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
import { useAuth } from 'react-oidc-context';
import { FileSettingOutlined } from '../../icons/file-setting-outlined.component';
import { PartitionSettingOutlined } from '../../icons/partition-setting-outlined.component';
import { PositionRequestOutlined } from '../../icons/position-request-outlined.component';
import { PositionRequestSettingOutlined } from '../../icons/position-request-setting-outlined.component';
import { SendSettingOutlined } from '../../icons/send-setting-outlined.component';
import { UserGroupSettingOutlined } from '../../icons/user-group-setting-outlined.component';
import { createMenuGroup, createMenuItem, createSubMenu } from '../utils/nav-menu.utils';
import { userCanAccess } from '../utils/user-has-roles.util';
import { CreateButton } from './create-button.component';

export interface NavMenuProps {
  collapsed: boolean;
}

export const NavMenu = ({ collapsed }: NavMenuProps) => {
  const auth = useAuth();

  return (
    <Flex vertical style={{ paddingTop: 0, width: '100%' }}>
      {userCanAccess(auth.user, ['hiring-manager', 'total-compensation']) && <CreateButton collapsed={collapsed} />}
      <Menu
        inlineIndent={16}
        mode="inline"
        selectedKeys={[]}
        theme="light"
        items={[
          ...(userCanAccess(auth.user, ['user'])
            ? [createMenuItem({ key: '/next', icon: <HomeOutlined />, label: 'Home' })]
            : []),
          ...(userCanAccess(auth.user, ['user'])
            ? [createMenuItem({ key: '/next/my-departments', icon: <PartitionOutlined />, label: 'My departments' })]
            : []),
          ...(userCanAccess(auth.user, ['user', 'total-compensation'])
            ? [
                createMenuGroup({
                  key: '/next/job-profiles',
                  collapsed,
                  icon: <FileOutlined />,
                  label: 'Job Profiles',
                  children: [
                    ...(userCanAccess(auth.user, ['user'])
                      ? [createMenuItem({ key: '/next/job-profiles', icon: <FileSearchOutlined />, label: 'Explore' })]
                      : []),
                    ...(userCanAccess(auth.user, ['user'])
                      ? [
                          createMenuItem({
                            key: '/next/job-profiles/saved',
                            icon: <FileDoneOutlined />,
                            label: 'Saved Profiles',
                          }),
                        ]
                      : []),
                    ...(userCanAccess(auth.user, ['total-compensation'])
                      ? [
                          createSubMenu({
                            key: '/next/job-profiles/manage',
                            icon: <FileSettingOutlined />,
                            label: 'Manage profiles',
                            children: [
                              createMenuItem({
                                key: '/next/job-profiles/manage/draft',
                                icon: <FileOutlined />,
                                label: 'Drafts',
                              }),
                              createMenuItem({
                                key: '/next/job-profiles/manage/published',
                                icon: <FileProtectOutlined />,
                                label: 'Published',
                              }),
                              createMenuItem({
                                key: '/next/job-profiles/manage/archived',
                                icon: <FileZipOutlined />,
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
          ...(userCanAccess(auth.user, ['hiring-manager', 'classification'])
            ? [
                createMenuGroup({
                  key: '/next/requests',
                  collapsed,
                  icon: <InboxOutlined />,
                  label: 'Requests',
                  children: [
                    ...(userCanAccess(auth.user, ['hiring-manager'])
                      ? [
                          createMenuItem({
                            key: '/next/requests/positions',
                            icon: <PositionRequestOutlined />,
                            label: 'New position',
                          }),
                        ]
                      : []),
                    ...(userCanAccess(auth.user, ['classification', 'total-compensation'])
                      ? [
                          createSubMenu({
                            key: '/next/requests/positions',
                            icon: <SendSettingOutlined />,
                            label: 'Manage requests',
                            children: [
                              ...(userCanAccess(auth.user, ['classification'])
                                ? [
                                    createMenuItem({
                                      key: '/next/requests/positions/manage',
                                      icon: <PositionRequestSettingOutlined />,
                                      label: 'New position',
                                    }),
                                  ]
                                : []),
                              ...(userCanAccess(auth.user, ['total-compensation'])
                                ? [
                                    createMenuItem({
                                      key: '/next/requests/positions/manage/approved',
                                      icon: <FileDoneOutlined />,
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
                  key: '/next/settings',
                  collapsed,
                  icon: <SettingOutlined />,
                  label: 'Settings',
                  children: [
                    createMenuItem({
                      key: '/next/settings/departments',
                      icon: <PartitionSettingOutlined />,
                      label: 'Departments',
                    }),
                    createMenuItem({
                      key: '/next/settings/users',
                      icon: <UserGroupSettingOutlined />,
                      label: 'Users',
                    }),
                  ],
                }),
              ]
            : []),
        ]}
      />
    </Flex>
  );
};
