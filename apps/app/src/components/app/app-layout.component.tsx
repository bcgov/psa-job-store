import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { useAuth } from 'react-oidc-context';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { ErrorBoundaryLayout } from '../../routes/not-found/error';
import { AppHeader } from '../app/header.component';
import { NavMenu } from './components/nav-menu.component';

const { Content, Sider } = Layout;

const RenderOutlet = () => {
  const auth = useAuth();
  const location = useLocation();

  // Render the <Outlet /> if user is on the login/logout page, or is logged in.
  return ['/auth/login', '/auth/logout'].some((path) => path.includes(location.pathname)) || auth.isAuthenticated ? (
    <ErrorBoundaryLayout />
  ) : (
    <></>
  );
};

export const AppLayout = () => {
  const auth = useAuth();
  const [collapsed, setCollapsed] = useLocalStorage('sider-collapsed', false);

  return (
    <Layout style={{ minHeight: '100vh' }} id="layout">
      <AppHeader />
      <Layout hasSider style={{ flex: '1' }} id="layout2">
        {auth.isAuthenticated && (
          <Sider
            onCollapse={setCollapsed}
            collapsed={collapsed}
            collapsible
            role="navigation"
            style={{ boxShadow: '2px 0 5px 0 #CCC', zIndex: 1000 }}
            theme="light"
            trigger={
              <Button
                data-testid="menu-toggle-btn"
                aria-label={collapsed ? 'Expand side navigation' : 'Collapse side navigation'}
                icon={collapsed ? <MenuUnfoldOutlined aria-hidden /> : <MenuFoldOutlined aria-hidden />}
                onClick={() => setCollapsed(!collapsed)}
                type="link"
                style={{
                  color: '#000',
                  fontSize: '16px',
                  margin: '0.5rem 0 0.5rem 0.75rem',
                }}
              />
            }
          >
            <NavMenu collapsed={collapsed} />
          </Sider>
        )}
        <Layout>
          <Content style={{ display: 'flex', flexDirection: 'column' }} id="content">
            <RenderOutlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
