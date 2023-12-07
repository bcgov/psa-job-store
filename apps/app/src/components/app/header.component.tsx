import { QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Layout, Row, Typography } from 'antd';
import { useAuth } from 'react-oidc-context';
import styles from './header.module.css';

const { Header } = Layout;
const { Text } = Typography;

export const AppHeader = () => {
  const auth = useAuth();

  return (
    <Header className={styles.appHeader}>
      <Row align="middle" justify="space-between" style={{ width: '100%' }}>
        <Col className={styles.left}>
          <img className={styles.bcLogo} src="src/assets/BC_logo.png" alt="BC Logo" />
          <div className={styles.titleContainer}>
            <Text className={styles.titleContent}>Job Store</Text>
            <Text className={styles.titleContentBeta}>βeta</Text>
          </div>
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
