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
import { Link, Outlet, useLocation } from 'react-router-dom';
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

  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  // useEffect(() => {
  //   // Initialize or update the selectedKeys based on the current URL
  //   const path = location.pathname;
  //   setSelectedKeys([path]);
  //   // console.log(path);
  // }, [location.pathname]);
  // Function to handle menu item click
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    // Update the selectedKeys when a menu item is clicked
    console.log(e.keyPath);
    setSelectedKeys([e.key]);
  };

  useEffect(() => {
    // console.log('auth.user: ', auth.user);
    const roles = auth.user?.profile['client_roles'];
    if (roles && (roles as string[]).includes('total-compensation')) {
      setRole('total-compensation');
    } else if (roles && (roles as string[]).includes('classification')) {
      setRole('classification');
    } else if (roles && (roles as string[]).includes('hiring-manager')) {
      setRole('hiring-manager');
    } else {
      setRole('user');
    }
  }, [auth]);

  // collapsible menu

  const totalCompensationMenuItems: MenuProps['items'] = [
    getItem('Job Profiles', 'sub1', <FileSearchOutlined style={{ fontSize: '1.25rem' }} />, [
      getItem(<Link to="/draft-job-profiles">Drafts</Link>, '1', <FileOutlined style={{ fontSize: '1.25rem' }} />),
      getItem(
        <Link to="/published-job-profiles">Published</Link>,
        '2',
        <FileProtectOutlined style={{ fontSize: '1.25rem' }} />,
      ),
    ]),
  ];
  const hiringManagerMenuItems: MenuProps['items'] = [
    getItem('Hiring Manager', 'sub1', <UserAddOutlined style={{ fontSize: '1.25rem' }} />, [
      getItem(
        <Link to="/my-positions/create">Create new position</Link>,
        '3',
        <PlusCircleFilled style={{ fontSize: '1.25rem' }} />,
      ),
      getItem(
        <Link to="/org-chart">My organizations</Link>,
        '5',
        <PartitionOutlined style={{ fontSize: '1.25rem' }} />,
      ),
      getItem(<Link to="/job-profiles">Job profiles</Link>, '6', <FileTextOutlined style={{ fontSize: '1.25rem' }} />),
      getItem(<Link to="/my-positions">My positions</Link>, '7', <UserAddOutlined style={{ fontSize: '1.25rem' }} />),
    ]),
  ];

  if (role === 'user') {
    return (
      <Layout style={{ height: '100vh' }}>
        <AppHeader></AppHeader>
        <Layout style={{ height: '100%' }}>
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
  }

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
                {role === 'hiring-manager' && (
                  <>
                    {collapsed ? (
                      <SiderNavItem
                        collapsed={collapsed}
                        icon={<PlusCircleFilled style={{ fontSize: '1.25rem', color: '#1677ff' }} />}
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
                          title: 'My organizations',
                          to: '/org-chart',
                        },
                        {
                          icon: <FileTextOutlined style={{ fontSize: '1.25rem' }} />,
                          title: 'Job profiles',
                          to: '/job-profiles',
                        },
                        {
                          icon: <UserAddOutlined style={{ fontSize: '1.25rem' }} />,
                          title: 'My positions',
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
                            to: '/draft-job-profiles/create',
                            hideTitle: true,
                          },
                          {
                            icon: <FileOutlined style={{ fontSize: '1.25rem' }} />,
                            title: 'Draft job profiles',
                            to: '/draft-job-profiles',
                            hideTitle: true,
                          },
                          {
                            icon: <FileProtectOutlined style={{ fontSize: '1.25rem' }} />,
                            title: 'Published job profiles',
                            to: '/published-job-profiles',
                            hideTitle: true,
                          },
                          {
                            icon: <CheckCircleOutlined style={{ fontSize: '1.25rem' }} />,
                            title: 'Approved requests',
                            to: '/approved-requests',
                            hideTitle: true,
                          },
                          {
                            icon: <PlusCircleFilled style={{ fontSize: '1.25rem' }} />,
                            title: 'Create new position',
                            to: '/my-positions/create',
                            hideTitle: true,
                          },
                          {
                            icon: <PartitionOutlined style={{ fontSize: '1.25rem' }} />,
                            title: 'My organizations',
                            to: '/org-chart',
                            hideTitle: true,
                          },
                          {
                            icon: <FileTextOutlined style={{ fontSize: '1.25rem' }} />,
                            title: 'Job profiles',
                            to: '/job-profiles',
                            hideTitle: true,
                          },
                          {
                            icon: <UserAddOutlined style={{ fontSize: '1.25rem' }} />,
                            title: 'My positions',
                            to: '/my-positions',
                            hideTitle: true,
                          },
                        ]}
                      />
                    ) : (
                      <>
                        <div style={{ padding: '10px 10px 2px 10px' }}>
                          <Link to="/draft-job-profiles/create">
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
                          mode="inline"
                          selectedKeys={selectedKeys}
                          onClick={handleMenuClick}
                          items={totalCompensationMenuItems}
                        />

                        <Link to="/approved-requests">
                          <Menu
                            style={{ transition: 'width 0.2s ease-out', width: '200px' }}
                            mode="inline"
                            selectedKeys={selectedKeys}
                            onClick={handleMenuClick}
                          >
                            <Menu.Item
                              icon={<CheckCircleOutlined style={{ fontSize: '1.25rem' }} />}
                              key="/approved-requests"
                            >
                              Approved Reqs
                            </Menu.Item>
                          </Menu>
                        </Link>

                        <Menu
                          style={{ transition: 'width 0.2s ease-out', width: '200px', marginTop: '10px' }}
                          mode="inline"
                          selectedKeys={selectedKeys}
                          onClick={handleMenuClick}
                          items={hiringManagerMenuItems}
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
