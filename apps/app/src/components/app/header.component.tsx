import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Layout, Menu, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../redux/redux.hooks';
import { InitialsAvatar } from '../../routes/home-old/components/initials-avatar.component';
import AccessiblePopoverMenu from './common/components/accessible-popover-menu';
import styles from './header.module.css';
import { HelpButton } from './help-button.component';

const { Header } = Layout;
const { Text } = Typography;

export interface AppHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const AppHeader = ({ collapsed, setCollapsed }: AppHeaderProps) => {
  const auth = useTypedSelector((state) => state.authReducer);

  const handleLogout = async () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/logout`;
  };

  const content = (
    <Menu selectedKeys={[]}>
      <Menu.Item key="edit" icon={<LogoutOutlined aria-hidden />} data-testid="menu-option-edit" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {import.meta.env.VITE_ENV != 'production' && (
        <Alert
          banner
          message={
            <span
              style={{
                fontWeight: 'bold',
                fontSize: '16px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              Warning: {import.meta.env.VITE_ENV ? `${import.meta.env.VITE_ENV}` : 'Unknown'} Environment
            </span>
          }
          role="alert"
          type="warning"
          className={styles.stripedAlert}
          style={{
            width: '100%',
          }}
        />
      )}
      <Header className={styles.appHeader}>
        <Row align="middle" justify="space-between" style={{ width: '100%' }} role="navigation">
          <Col className={styles.left}>
            {auth.isAuthenticated && (
              <Button
                data-testid="menu-toggle-btn"
                type="text"
                icon={<MenuOutlined aria-hidden style={{ fontSize: '1.3rem' }} />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  color: 'white',
                }}
                aria-label={collapsed ? 'Expand side navigation' : 'Collapse side navigation'}
              />
            )}

            <Link to="/" style={{ display: 'flex', alignItems: 'center' }} aria-label="Navigate to homepage">
              <img className={styles.bcLogo} src="/BC_logo.png" alt="BC Logo" />
              <div className={styles.titleContainer}>
                <Text className={styles.titleContent}>Job Store</Text>
                <Text className={styles.titleContentBeta}>βeta</Text>
              </div>
            </Link>
          </Col>

          <Col className={styles.right}>
            {auth.isAuthenticated && (
              <div className={styles.headerToolbar}>
                <div className={styles.iconWrapper}>
                  <HelpButton />
                </div>

                <AccessiblePopoverMenu
                  triggerButton={
                    <Button
                      tabIndex={-1}
                      style={{ background: 'none', border: 'none', fontWeight: '600' }}
                      icon={
                        (auth.user?.roles ?? []).includes('bceid') ? (
                          <InitialsAvatar name={auth.user?.name} size={30} fontSize="1rem" lineHeight="1.8rem" />
                        ) : (
                          <InitialsAvatar
                            name={auth.user?.given_name + ' ' + auth.user?.family_name}
                            size={30}
                            fontSize="1rem"
                            lineHeight="1.8rem"
                          />
                        )
                        // <UserOutlined style={{ color: 'white' }} aria-hidden />
                      }
                    >
                      <Text className={styles.username} style={{ color: 'white' }}>
                        {auth.user ? (auth.user.name as string) : ''}
                      </Text>
                    </Button>
                  }
                  content={content}
                  ariaLabel="Open user menu"
                ></AccessiblePopoverMenu>

                {/* <Popover content={content} trigger="click">
                <Button
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ background: 'none', border: 'none', fontWeight: '600' }}
                  icon={<UserOutlined style={{ color: 'white' }} aria-hidden />}
                >
                  <Text style={{ color: 'white' }}>{auth.user?.profile.name}</Text>
                </Button>
              </Popover> */}
              </div>
            )}
          </Col>
        </Row>
      </Header>
    </>
  );
};
