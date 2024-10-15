import { Col, Row, Switch } from 'antd';
import React from 'react';

interface ConfirmationApprovalProps {
  confirmation: boolean;
  setConfirmation: (arg0: boolean) => void;
}

const ConfirmationApproval: React.FC<ConfirmationApprovalProps> = ({ confirmation, setConfirmation }) => {
  return (
    <div style={{ paddingBottom: '10px' }}>
      <b>Confirmation</b>
      <Row>
        <Col span={2}>
          <Switch
            size="small"
            aria-labelledby="confirmation-label-id"
            data-testid="confirmation-switch"
            checked={confirmation}
            onChange={(newValue: boolean) => {
              setConfirmation(newValue);
            }}
          />
        </Col>
        <Col span={22}>
          <span id="confirmation-label-id">
            I confirm that I have received executive approval (Deputy Minister or delegate) for this new position.
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default ConfirmationApproval;
