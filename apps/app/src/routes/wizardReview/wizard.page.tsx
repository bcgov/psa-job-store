import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import { Button, Col, Modal, Row, Space } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobProfile } from '../job-profiles/components/job-profile.component';
import { WizardSteps } from '../wizard/components/wizard-steps.component';

export const WizardReviewPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate('/wizard-result');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <PageHeader title="Review and submit" subTitle="Review the profile before creating a new position" />
      <div style={{ margin: '0 1rem 1rem' }}>
        <Row justify="center">
          <Col xs={24} md={22} lg={18}>
            <WizardSteps current={2}></WizardSteps>
            <JobProfile id="a0539fb2-938a-48b9-9ddb-3f9e7a508b09" />
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button onClick={handleBackClick}>Go Back</Button>
              <Button type="primary" onClick={showModal}>
                Create Position
              </Button>
            </div>
            {/* </form> */}
          </Col>
        </Row>
      </div>
      <Modal
        title="Affirmation"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Review details again
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Create Position
          </Button>,
        ]}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <ExclamationCircleOutlined style={{ color: 'orange', fontSize: '24px', marginRight: '16px' }} />
          <div>
            <p>By clicking “Create Position” I affirm that:</p>
            <ul>
              <li>
                The reporting relationship, job accountabilities, and scope of work reflected in this job profile is the
                actual work performed of the position(s).
              </li>
              <li>I will be accountable for risks and decisions.</li>
              <li>I will respond to audits in a timely manner.</li>
              <li>I will abide by Public Service Act.</li>
            </ul>
          </div>
        </div>
      </Modal>
    </Space>
  );
};
