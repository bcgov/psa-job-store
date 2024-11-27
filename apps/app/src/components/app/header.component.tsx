import { LogoutOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Layout, Menu, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../redux/redux.hooks';
import { InitialsAvatar } from '../../routes/home-old/components/initials-avatar.component';
import AccessiblePopoverMenu from './common/components/accessible-popover-menu';
import styles from './header.module.css';
import { HelpButton } from './help-button.component';

const { Header } = Layout;
const { Text } = Typography;

export const AppHeader = () => {
  const auth = useTypedSelector((state) => state.authReducer);

  const handleLogout = async () => {
    window.location.href = 'http://localhost:3000/api/auth/logout';
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
                <div className={styles.iconWrapper} style={{ marginTop: '7px' }}>
                  <HelpButton />
                </div>

                <AccessiblePopoverMenu
                  triggerButton={
                    <Button
                      tabIndex={-1}
                      style={{ background: 'none', border: 'none', fontWeight: '600' }}
                      icon={
                        <InitialsAvatar
                          name={auth.user?.given_name + ' ' + auth.user?.family_name}
                          size={30}
                          fontSize="1rem"
                          lineHeight="1.8rem"
                        />

                        // <UserOutlined style={{ color: 'white' }} aria-hidden />
                      }
                    >
                      <Text style={{ color: 'white' }}>{auth.user ? (auth.user.name as string) : ''}</Text>
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
