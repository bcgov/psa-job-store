/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Descriptions, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import LoadingComponent from '../../../components/app/common/components/loading.component';
import { useGetLocationQuery } from '../../../redux/services/graphql-api/location.api';
import { PositionProfileModel, useGetPositionProfileQuery } from '../../../redux/services/graphql-api/position.api';
import { formatDateTime } from '../../../utils/Utils';

type ServiceRequestDetailsProps = {
  positionRequestData: any;
};

export const ServiceRequestDetails: React.FC<ServiceRequestDetailsProps> = ({ positionRequestData }) => {
  // console.log('ServiceRequestDetails positionRequestData: ', positionRequestData);

  const { data: reportsToInfo, isLoading: reportsToLoading } = useGetPositionProfileQuery(
    {
      positionNumber: positionRequestData?.positionRequest?.reports_to_position_id,
    },
    { skip: !positionRequestData?.positionRequest?.reports_to_position_id },
  );

  const { data: excludedMngInfo, isLoading: excludedLoading } = useGetPositionProfileQuery(
    {
      positionNumber: positionRequestData?.positionRequest?.additional_info_excluded_mgr_position_number,
    },
    { skip: !positionRequestData?.positionRequest?.additional_info_excluded_mgr_position_number },
  );

  const { data: locationInfo, isLoading: locationLoading } = useGetLocationQuery(
    {
      id: positionRequestData?.positionRequest?.additional_info_work_location_id,
    },
    { skip: !positionRequestData?.positionRequest?.additional_info_work_location_id },
  );

  // console.log('locationInfo: ', locationInfo);

  const [firstActivePosition2, setFirstActivePosition2] = useState<PositionProfileModel>();
  const [additionalPositions2, setAdditionalPositions2] = useState(0);

  useEffect(() => {
    if (reportsToInfo?.positionProfile) {
      const activePositions = reportsToInfo?.positionProfile.filter((p) => p.status === 'Active');
      setFirstActivePosition2(activePositions[0] || null);

      // Set state to the number of additional active positions
      setAdditionalPositions2(reportsToInfo?.positionProfile.length - 1);
    }
  }, [reportsToInfo]);

  const [firstActivePosition, setFirstActivePosition] = useState<PositionProfileModel>();
  const [additionalPositions, setAdditionalPositions] = useState(0);

  useEffect(() => {
    if (excludedMngInfo?.positionProfile) {
      const activePositions = excludedMngInfo?.positionProfile.filter((p) => p.status === 'Active');
      setFirstActivePosition(activePositions[0] || null);

      // Set state to the number of additional active positions
      setAdditionalPositions(excludedMngInfo?.positionProfile.length - 1);
    }
  }, [excludedMngInfo]);

  const submissionDetailsItems = [
    {
      key: 'submittedBy',
      label: 'Submitted by',
      children: <div>{positionRequestData?.positionRequest?.user_name}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'submittedAt',
      label: 'Submitted at',
      children: <div>{formatDateTime(positionRequestData?.positionRequest?.approved_at)}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'ticketId',
      label: 'CRM service request',
      children: <div>{positionRequestData?.positionRequest?.crm_id}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'submissionId',
      label: 'Submission ID',
      children: <div>{positionRequestData?.positionRequest?.submission_id}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },

    // {
    //   key: 'contactEmail',
    //   label: 'Contact Email',
    //   children: <div>{positionRequestData?.positionRequest?.email}</div>,
    //   span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    // },
    {
      key: 'positionNumber',
      label: 'Position Number',
      children: <div>{positionRequestData?.positionRequest?.position_number}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'positionStatus',
      label: 'Position status',
      children: <div>{positionRequestData?.positionRequest?.status === 'COMPLETED' ? 'Completed' : 'Proposed'}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
  ];

  const jobDetailsItems = [
    {
      key: 'jobTitle',
      label: 'Job title',
      children: <div>{positionRequestData?.positionRequest?.profile_json?.title?.value}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'expectedClassificationLevel',
      label: 'Expected classification level',
      children: <div>{positionRequestData?.positionRequest?.classification_code}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'jobStoreProfileNumber',
      label: 'Job Store profile number',
      children: <div>{positionRequestData?.positionRequest?.parent_job_profile?.number}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'reportsTo',
      label: 'Reports to',
      children: (
        <div>
          {reportsToLoading && <LoadingComponent mode="small" />}
          {firstActivePosition2 && reportsToInfo?.positionProfile && reportsToInfo?.positionProfile?.length > 0 && (
            <div>
              <p style={{ margin: 0 }}>{`${firstActivePosition2.employeeName}, ${firstActivePosition2.ministry}`}</p>
              <Typography.Paragraph type="secondary">
                {`${firstActivePosition2.positionDescription}, ${firstActivePosition2.classification}`}
                <br></br>
                {`Position No.: ${firstActivePosition2.positionNumber}`}
                {additionalPositions2 > 0 && ` +${additionalPositions2}`}
              </Typography.Paragraph>
            </div>
          )}

          {!firstActivePosition2 && reportsToInfo?.positionProfile && reportsToInfo?.positionProfile?.length == 0 && (
            <div>
              <p style={{ margin: 0 }}>
                Vacant (Position No.: {positionRequestData?.positionRequest?.reports_to_position_id})
              </p>
            </div>
          )}
        </div>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'firstLevelExcludedManager',
      label: 'First level excluded manager for this position',
      children: (
        <div>
          {excludedLoading && <LoadingComponent mode="small" />}
          {firstActivePosition && (
            <div>
              <p style={{ margin: 0 }}>{`${firstActivePosition.employeeName}, ${firstActivePosition.ministry}`}</p>
              <Typography.Paragraph type="secondary">
                {`${firstActivePosition.positionDescription}, ${firstActivePosition.classification}`}
                <br></br>
                {`Position No.: ${firstActivePosition.positionNumber}`}
                {additionalPositions > 0 && ` +${additionalPositions}`}
              </Typography.Paragraph>
            </div>
          )}
        </div>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'payListDepartmentIdNumber',
      label: 'Department ID',
      children: <div>{positionRequestData?.positionRequest?.department_id}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'includedOrExcluded',
      label: 'Included or excluded?',
      children: <div>Included</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'fullTimeOrPartTime',
      label: 'Full-time or part-time?',
      children: <div>Full-time</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'regularOrTemporary',
      label: 'Regular or temporary?',
      children: <div>Regular</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'positionLocation',
      label: 'Position location',
      children: (
        <div>
          {locationLoading && <LoadingComponent mode="small" />}
          {locationInfo?.location?.name}
        </div>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },

    {
      key: 'receivedExecutiveApproval',
      label: 'Received executive approval (Deputy Minister or delegate)',
      children: <div>Yes</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
  ];

  return (
    <Row justify="center">
      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={16}>
        <Card className="tableHeader" style={{ marginTop: '1rem' }}>
          <Row gutter={24} wrap>
            <Col span={12}>
              <h2 style={{ marginBottom: 0 }}>Job details</h2>
            </Col>
            <Col span={12}>
              <Row justify="end">
                <Col>{/* controls on the right of header go here */}</Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Descriptions
          className="descriptionsWithHeader"
          bordered
          column={24}
          items={jobDetailsItems}
          style={{ background: '#fff', marginBottom: '1rem' }}
          labelStyle={{
            fontWeight: 700,
            width: '200px',
            verticalAlign: 'top',
            background: '#FAFAFA',
          }}
          contentStyle={{
            background: '#fff',
            verticalAlign: 'top',
          }}
        />

        <Card className="tableHeader" style={{ marginTop: '1rem' }}>
          <Row gutter={24} wrap>
            <Col span={12}>
              <h2 style={{ marginBottom: 0 }}>Submission details</h2>
            </Col>
            <Col span={12}>
              <Row justify="end">
                <Col>{/* controls on the right of header go here */}</Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Descriptions
          className="descriptionsWithHeader"
          bordered
          column={24}
          items={submissionDetailsItems}
          style={{ background: '#fff', marginBottom: '1rem' }}
          labelStyle={{
            fontWeight: 700,
            // width: '300px',
            verticalAlign: 'top',
            background: '#FAFAFA',
          }}
          contentStyle={{
            background: '#fff',
            verticalAlign: 'top',
          }}
        />
      </Col>
    </Row>
  );
};
