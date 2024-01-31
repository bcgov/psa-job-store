import {
  CheckCircleOutlined,
  FileAddFilled,
  FileAddOutlined,
  FileOutlined,
  FileProtectOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PartitionOutlined,
  PlusCircleFilled,
  UserAddOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { Link, Outlet } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { AppHeader } from './header.component';
import { SiderNavItem } from './sider-nav/sider-nav-item.component';
import { SiderNav } from './sider-nav/sider-nav.component';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
  onTitleClick?: () => void,
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    onTitleClick,
  } as MenuItem;
}

export const AppLayout = () => {
  const auth = useAuth();
  const [collapsed, setCollapsed] = useLocalStorage('sider-collapsed', true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // console.log('auth.user: ', auth.user);
    const roles = auth.user?.profile['client_roles'];
    if (roles && (roles as string[]).includes('total-compensation')) {
      setRole('total-compensation');
    } else if (roles && (roles as string[]).includes('classification')) {
      setRole('classification');
    } else {
      setRole('user');
    }
  }, [auth]);

  // collapsible menu

  const totalCompensationMenuItems: MenuProps['items'] = [
    getItem('Job Profiles', 'sub1', <FileSearchOutlined style={{ fontSize: '1.25rem' }} />, [
      getItem(
        <Link to="/total-compensation/profiles/drafts">Drafts</Link>,
        '1',
        <FileOutlined style={{ fontSize: '1.25rem' }} />,
      ),
      getItem(
        <Link to="/total-compensation/profiles/published">Published</Link>,
        '2',
        <FileProtectOutlined style={{ fontSize: '1.25rem' }} />,
      ),
    ]),
  ];

  // console.log('role: ', role);
  return (
    <Layout style={{ height: '100vh' }}>
      <AppHeader></AppHeader>
      <Layout hasSider style={{ height: '100%' }}>
        {auth.isAuthenticated && (
          <Sider
            collapsible
            collapsed={collapsed}
            collapsedWidth="3.5rem"
            onCollapse={setCollapsed}
            trigger={null}
            style={{
              boxShadow: '2px 0 5px 0 #CCC',
              zIndex: 1000,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div
                style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', flex: 'auto' }}
              >
                {role === 'user' && (
                  <>
                    {collapsed ? (
                      <SiderNavItem
                        collapsed={collapsed}
                        icon={<PlusCircleFilled style={{ fontSize: '1.25rem' }} />}
                        key={'Create new position'}
                        title={'Create new position'}
                        to={'/my-positions/create'}
                        hideTitle={true}
                      />
                    ) : (
                      <div style={{ padding: '10px 10px 2px 10px' }}>
                        <Link to="/my-positions/create">
                          <Button type="primary">Create new position</Button>
                        </Link>
                      </div>
                    )}
                    <SiderNav
                      collapsed={collapsed}
                      items={[
                        {
                          icon: <HomeOutlined style={{ fontSize: '1.25rem' }} />,
                          title: 'Home',
                          to: '/',
                        },
                        {
                          icon: <PartitionOutlined style={{ fontSize: '1.25rem' }} />,
                          title: 'Org Chart',
                          to: '/org-chart',
                        },
                        {
                          icon: <FileTextOutlined style={{ fontSize: '1.25rem' }} />,
                          title: 'Job Profiles',
                          to: '/job-profiles',
                        },
                        {
                          icon: <UserAddOutlined style={{ fontSize: '1.25rem' }} />,
                          title: 'My Positions',
                          to: '/my-positions',
                        },
                      ]}
                    />
                  </>
                )}
                {role === 'total-compensation' && (
                  <>
                    {collapsed ? (
                      <SiderNav
                        collapsed={collapsed}
                        items={[
                          {
                            icon: <FileAddFilled style={{ fontSize: '1.25rem', color: '#1677ff' }} />,
                            title: 'Create new profile',
                            to: '/total-compensation/create-profile',
                            hideTitle: true,
                          },
                          {
                            icon: <FileOutlined style={{ fontSize: '1.25rem' }} />,
                            title: 'Draft job profiles',
                            to: '/total-compensation/profiles/drafts',
                            hideTitle: true,
                          },
                          {
                            icon: <FileProtectOutlined style={{ fontSize: '1.25rem' }} />,
                            title: 'Published job profiles',
                            to: '/total-compensation/profiles/published',
                            hideTitle: true,
                          },
                          {
                            icon: <CheckCircleOutlined style={{ fontSize: '1.25rem' }} />,
                            title: 'Approved requests',
                            to: '/total-compensation/approved-requests',
                            hideTitle: true,
                          },
                        ]}
                      />
                    ) : (
                      <>
                        <div style={{ padding: '10px 10px 2px 10px' }}>
                          <Link to="/total-compensation/create-profile">
                            <Button
                              type="primary"
                              icon={<FileAddOutlined style={{ fontSize: '1.25rem' }} />}
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              Create new profile
                            </Button>
                          </Link>
                        </div>

                        <Menu
                          style={{ transition: 'width 0.2s ease-out', width: '200px' }}
                          defaultOpenKeys={['sub1']}
                          mode="inline"
                          items={totalCompensationMenuItems}
                        />

                        <SiderNav
                          collapsed={collapsed}
                          items={[
                            {
                              icon: <CheckCircleOutlined style={{ fontSize: '1.25rem' }} />,
                              title: 'Approved Reqs',
                              to: '/total-compensation/approved-requests',
                            },
                          ]}
                        />
                      </>
                    )}
                  </>
                )}
                {role === 'classification' && (
                  <>
                    <SiderNav
                      collapsed={collapsed}
                      items={[
                        {
                          icon: <CheckCircleOutlined style={{ fontSize: '1.25rem' }} />,
                          title: 'My tasks',
                          to: '/',
                        },
                      ]}
                    />
                  </>
                )}
              </div>
              <div style={{ borderTop: '1px solid #CCC', flexShrink: 0 }}>
                <Button
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  type="link"
                  style={{
                    color: '#000',
                    fontSize: '16px',
                    margin: '0.5rem 0 0.5rem 0.75rem',
                  }}
                />
              </div>
            </div>
          </Sider>
        )}
        <Layout>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
            <Content style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#FFF', flex: '1 0 auto' }}>
              <Outlet />
            </Content>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};
