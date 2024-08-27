import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { useAuth } from 'react-oidc-context';
import { Outlet, useLocation } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { AppHeader } from '../app/header.component';
import { NavMenu } from './components/nav-menu.component';

const { Content, Sider } = Layout;

const RenderOutlet = () => {
  const auth = useAuth();
  const location = useLocation();

  // Render the <Outlet /> if user is on the login/logout page, or is logged in.
  return ['/auth/login', '/auth/logout'].some((path) => path.includes(location.pathname)) || auth.isAuthenticated ? (
    <Outlet />
  ) : (
    <></>
  );
};

export const AppLayout = () => {
  const auth = useAuth();
  const [collapsed, setCollapsed] = useLocalStorage('sider-collapsed', false);

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
          <Content style={{ display: 'flex', flexDirection: 'column' }}>
            <RenderOutlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
