import {
  FileTextOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PartitionOutlined,
  PlusCircleFilled,
  UserAddOutlined,
} from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { AppHeader } from './header.component';
import { SiderNavItem } from './sider-nav/sider-nav-item.component';
import { SiderNav } from './sider-nav/sider-nav.component';

const { Content, Sider } = Layout;

export const AppLayout = () => {
  const [collapsed, setCollapsed] = useLocalStorage('sider-collapsed', true);

  return (
    <Layout style={{ height: '100vh' }}>
      <AppHeader></AppHeader>
      <Layout hasSider style={{ height: '100%' }}>
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
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', flex: 'auto' }}>
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
                  // {
                  //   icon: <StarOutlined style={{ fontSize: '1.25rem' }} />,
                  //   title: 'Wizard',
                  //   to: '/wizard',
                  // },
                ]}
              />
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
