import { Col, Layout, Row, Typography } from 'antd';
import styles from './footer.module.css';

const { Footer } = Layout;
const { Text } = Typography;

export const AppFooter = () => {
  return (
    <Footer className={styles.footer}>
      <Row gutter={16} justify="space-between">
        <Col>
          <Text className={styles.footerText}>Home</Text>
        </Col>
        <Col>
          <Text className={styles.footerText}>Disclaimer</Text>
        </Col>
        <Col>
          <Text className={styles.footerText}>Privacy</Text>
        </Col>
        <Col>
          <Text className={styles.footerText}>Accountability</Text>
        </Col>
        <Col>
          <Text className={styles.footerText}>Copyright</Text>
        </Col>
        <Col>
          <Text className={styles.footerText}>Contact Us</Text>
        </Col>
        <Col>
          <Text className={styles.footerText}>Fair Use</Text>
        </Col>
        <Col>
          <div className={styles.footerImage}>
            <img src="src/assets/BCDevExchange_Logo.png" alt="BCDevExchange Logo" />
          </div>
        </Col>
      </Row>
    </Footer>
  );
};
