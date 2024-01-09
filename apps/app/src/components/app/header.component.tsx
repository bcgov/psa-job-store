import { QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Layout, Row, Typography } from 'antd';
import { useAuth } from 'react-oidc-context';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

const { Header } = Layout;
const { Text } = Typography;

export const AppHeader = () => {
  const auth = useAuth();

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
            <div className={styles.userContainer}>
              <UserOutlined style={{ color: 'white' }} />
              <div className={styles.userTextContainer}>
                <Text className={styles.userText}>{auth.user?.profile.name}</Text>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Header>
  );
};
