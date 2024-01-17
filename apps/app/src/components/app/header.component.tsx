import { LogoutOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Layout, Popover, Row, Typography } from 'antd';
import { useAuth } from 'react-oidc-context';
import { Link } from 'react-router-dom';
import { useLazyLogoutQuery } from '../../redux/services/graphql-api/profile.api';
import styles from './header.module.css';

const { Header } = Layout;
const { Text } = Typography;

export const AppHeader = () => {
  const auth = useAuth();
  const [triggerLogout] = useLazyLogoutQuery();

  const handleLogout = async () => {
    try {
      // Sign out from the API
      await triggerLogout().unwrap();
      // Also, sign out from OIDC if necessary
      auth.signoutSilent(); // can also do signoutPopup to show popup. signoutRedirect() is inconvinient as it stays on "you have been logged out" page

      window.location.reload();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const content = (
    <div>
      <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );

  return (
    <Header className={styles.appHeader}>
      <Row align="middle" justify="space-between" style={{ width: '100%' }}>
        <Col className={styles.left}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img className={styles.bcLogo} src="/BC_logo.png" alt="BC Logo" />
            <div className={styles.titleContainer}>
              <Text className={styles.titleContent}>Job Store</Text>
              <Text className={styles.titleContentBeta}>βeta</Text>
            </div>
          </Link>
        </Col>

        <Col className={styles.right}>
          <div className={styles.headerToolbar}>
            <div className={styles.iconWrapper}>
              <QuestionCircleOutlined style={{ color: 'white' }} />
            </div>
            {/* <div className={styles.userContainer}>
              <UserOutlined style={{ color: 'white' }} />
              <div className={styles.userTextContainer}>
                <Text className={styles.userText}>{auth.user?.profile.name}</Text>
              </div>
            </div> */}

            <Popover content={content} trigger="click">
              <Button
                aria-haspopup="true"
                aria-expanded="false"
                style={{ background: 'none', border: 'none', fontWeight: '600' }}
                icon={<UserOutlined style={{ color: 'white' }} />}
              >
                <Text style={{ color: 'white' }}>{auth.user?.profile.name}</Text>
              </Button>
            </Popover>
          </div>
        </Col>
      </Row>
    </Header>
  );
};
