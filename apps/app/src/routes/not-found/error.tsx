import { Button, Card, Col, Divider, message, Result, Row } from 'antd';
import React, { useEffect, useRef } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';
import { NeedHelpComponent } from './need-help.component';

// eslint-disable-next-line react-hooks/rules-of-hooks

const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      message.success('Error message copied!');
    })
    .catch((err) => {
      console.error('Failed to copy: ', err);
    });
};

const GlobalError: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const location = useLocation();
  const errorLocation = useRef(location.pathname);
  useEffect(() => {
    if (location.pathname !== errorLocation.current) {
      resetErrorBoundary();
    }
  }, [location.pathname, resetErrorBoundary]);
  return (
    <Row justify="center" align="middle" style={{ height: '100%', justifyContent: 'center', background: '#f5f5f5' }}>
      <Col span={12}>
        <Result
          style={{ textAlignLast: 'start' }}
          icon={<h1>Application error</h1>}
          title={
            <>
              There was a problem loading the application.{' '}
              <Button type="default" onClick={() => copyToClipboard(error)}>
                Copy Error Message
              </Button>
            </>
          }
          extra={
            <>
              <Card style={{ marginTop: 24 }} title="Suggestions to help you find what you were looking for:">
                <ul style={{ alignItems: 'start' }}>
                  <li>Try Refreshing the page after 30 seconds</li>
                  <li>Go back and try attempting again</li>
                </ul>
                <Divider />
                <NeedHelpComponent noCard={true} />
              </Card>
            </>
          }
        ></Result>{' '}
      </Col>
    </Row>
  );
};

export const ErrorBoundaryLayout = () => (
  <ErrorBoundary FallbackComponent={GlobalError}>
    <Outlet />
  </ErrorBoundary>
);
