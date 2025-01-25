import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { useTypedSelector } from '../../redux/redux.hooks';
import { ErrorBoundaryLayout } from '../../routes/not-found/error';
import { AppHeader } from '../app/header.component';
import { useWindowWidth } from './common/hooks/use-window-width';
import { NavMenu } from './components/nav-menu.component';
import styles from './sider.module.css';

const { Content, Sider } = Layout;

const RenderOutlet = () => {
  const auth = useTypedSelector((state) => state.authReducer);
  const location = useLocation();

  // Render the <Outlet /> if user is on the login/logout page, or is logged in.
  return ['/auth/login', '/auth/logout'].some((path) => path.includes(location.pathname)) || auth.isAuthenticated ? (
    <ErrorBoundaryLayout />
  ) : (
    <></>
  );
};

const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

export const AppLayout = () => {
  const auth = useTypedSelector((state) => state.authReducer);
  const [desktopCollapsed, setDesktopCollapsed] = useLocalStorage('sider-collapsed', false);
  const [mobileCollapsed, setMobileCollapsed] = useState(true);
  const location = useLocation();

  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 768;
  const scrollY = useScrollPosition();

  const collapsed = isMobile ? mobileCollapsed : desktopCollapsed;
  const setCollapsed = isMobile ? setMobileCollapsed : setDesktopCollapsed;

  const siderScrolledPastHeader = import.meta.env.VITE_ENV == 'production' ? scrollY > 61 : scrollY > 102;

  useEffect(() => {
    if (isMobile) {
      setMobileCollapsed(true);
    }
  }, [location, isMobile]);

  const handleOverlayClick = () => {
    if (isMobile) {
      setMobileCollapsed(true);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }} id="layout">
      <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout hasSider style={{ flex: '1' }} id="layout2">
        {isMobile && !collapsed && <div className={styles.overlay} onClick={handleOverlayClick} role="presentation" />}
        {auth.isAuthenticated && (
          <Sider
            onCollapse={setCollapsed}
            collapsed={collapsed}
            collapsible
            role="navigation"
            className={`${styles.sider} ${collapsed ? styles.collapsed : styles.expanded} ${import.meta.env.VITE_ENV != 'production' ? styles.siderdev : ''} ${siderScrolledPastHeader ? styles.scrolled : ''}`}
            theme="light"
            trigger={<></>}
            // trigger={
            //   !isMobile ? (
            //     <Button
            //       data-testid="menu-toggle-btn"
            //       aria-label={collapsed ? 'Expand side navigation' : 'Collapse side navigation'}
            //       icon={collapsed ? <MenuUnfoldOutlined aria-hidden /> : <MenuFoldOutlined aria-hidden />}
            //       onClick={() => setCollapsed(!collapsed)}
            //       type="link"
            //       style={{
            //         color: '#000',
            //         fontSize: '16px',
            //         margin: '0.5rem 0 0.5rem 0.75rem',
            //       }}
            //     />
            //   ) : null
            // }
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
