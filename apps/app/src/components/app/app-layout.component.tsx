import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { SiderNav } from './sider-nav/sider-nav.component';

const { Content, Footer, Sider } = Layout;

export const AppLayout = () => {
  const [collapsed, setCollapsed] = useLocalStorage('sider-collapsed', true);

  return (
    <Layout hasSider style={{ height: '100vh' }}>
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
          <Avatar shape="square" style={{ margin: '0.5rem 0 0.5rem 0.75rem', flexShrink: 0 }}>
            PSA
          </Avatar>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', flex: 'auto' }}>
            <SiderNav
              collapsed={collapsed}
              items={[
                {
                  icon: <HomeOutlined style={{ fontSize: '1.25rem' }} />,
                  title: 'Home',
                  to: '/',
                },
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
      <Layout style={{ height: '100vh' }}>
        {/* Header */}
        {/* <div style={{ height: '3.5rem' }}>
          <div style={{ margin: 'auto', height: '100%' }}>Header</div>
        </div> */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
          <Content style={{ flex: '1 0 auto' }}>
            <Outlet />
          </Content>
          <Footer style={{ flexShrink: 0, padding: '1rem' }}>Footer</Footer>
        </div>
      </Layout>
    </Layout>
  );
};
