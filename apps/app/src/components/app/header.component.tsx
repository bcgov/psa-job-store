import { LogoutOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Layout, Menu, Row, Typography } from 'antd';
import { useAuth } from 'react-oidc-context';
import { Link } from 'react-router-dom';
import { useLazyLogoutQuery } from '../../redux/services/graphql-api/profile.api';
import { InitialsAvatar } from '../../routes/home-old/components/initials-avatar.component';
import AccessiblePopoverMenu from './common/components/accessible-popover-menu';
import styles from './header.module.css';
import { HelpButton } from './help-button.component';

const { Header } = Layout;
const { Text } = Typography;

export const AppHeader = () => {
  const auth = useAuth();
  const [triggerLogout] = useLazyLogoutQuery();

  const handleLogout = async () => {
    try {
      // Sign out from the API
      try {
        await triggerLogout().unwrap();
      } catch (e) {
        // may fail because user is already logged out, just reload the page then
        // console.log(e);
      }
      const origin = window.location.origin;
      // const loginUrl = import.meta.env.VITE_KEYCLOAK_REDIRECT_URL;

      // Also, sign out from OIDC if necessary
      auth.signoutRedirect({
        post_logout_redirect_uri: origin + '/auth/logout',
        redirectMethod: 'replace',
      }); // can also do signoutPopup to show popup. signoutRedirect() is inconvinient as it stays on "you have been logged out" page
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const content = (
    // <div>
    //   <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
    //     Logout
    //   </Button>
    // </div>

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
        <span dangerouslySetInnerHTML={{ __html: `<!-- reduced dept version -->` }} />
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
                          name={auth.user?.profile.given_name + ' ' + auth.user?.profile.family_name}
                          size={30}
                          fontSize="1rem"
                          lineHeight="1.8rem"
                        />

                        // <UserOutlined style={{ color: 'white' }} aria-hidden />
                      }
                    >
                      <Text style={{ color: 'white' }}>{auth.user?.profile.name}</Text>
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
