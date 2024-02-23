import { Card, Col, Divider, Row, Typography } from 'antd';
import { Component, ReactNode } from 'react';
import { sendLogToServer } from '../../redux/services/loggerService';
import ContentWrapper from '../home/components/content-wrapper.component';
const { Title, Text } = Typography;

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    sendLogToServer(error);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <>
          <ContentWrapper>
            <Row
              justify="center"
              align="middle"
              style={{ height: '100%', paddingLeft: '20%', paddingRight: '20%', paddingTop: 120, paddingBottom: 120 }}
            >
              <Col span={24} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Title level={2} style={{ fontWeight: '500', marginBottom: 0 }}>
                  Application error
                </Title>
                <Text style={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.64)' }}>
                  There was a problem loading the application.
                </Text>

                <Card style={{ borderRadius: 8, border: '1px solid #D9D9D9' }}>
                  <Title level={4} style={{ fontWeight: '500' }}>
                    Suggestions to help you find what you’re looking for:
                  </Title>
                  <ul>
                    <li> refreshing the page after 30 seconds</li>
                    <li> Go back and try attempting the action again</li>
                  </ul>
                  <Divider />
                  <Title level={4} style={{ fontWeight: '500' }}>
                    Need Help?
                  </Title>
                  <Text>
                    Contact the Digital Talent team at:
                    <br />
                    Email: <a href="mailto:digital.talent@gov.bc.ca">digital.talent@gov.bc.ca</a>
                    <br />
                    Website: <a href="https://talent.digital.gov.bc.ca">talent.digital.gov.bc.ca</a>
                  </Text>
                </Card>

                {/* <Text style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Error code: 0xffffffffff</Text> */}
              </Col>
            </Row>
          </ContentWrapper>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
