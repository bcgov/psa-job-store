import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useAuth } from 'react-oidc-context';
import { Outlet } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { AppHeader } from '../app/header.component';
import { NavMenu } from './components/nav-menu.component';

const { Content, Sider } = Layout;

export const AppLayout = () => {
  const auth = useAuth();
  const [collapsed, setCollapsed] = useLocalStorage('sider-collapsed', true);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader />
      <Layout hasSider style={{ height: '100%' }}>
        {auth.isAuthenticated && (
          <Sider
            onCollapse={setCollapsed}
            collapsed={collapsed}
            collapsible
            role="navigation"
            style={{ boxShadow: '2px 0 5px 0 #CCC', zIndex: 1000 }}
            theme="light"
            trigger={collapsed ? <MenuUnfoldOutlined aria-hidden /> : <MenuFoldOutlined aria-hidden />}
          >
            <NavMenu collapsed={collapsed} />
          </Sider>
        )}
        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
