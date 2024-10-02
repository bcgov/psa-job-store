/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExportOutlined } from '@ant-design/icons';
import { Card, Col, Descriptions, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import PositionProfile from '../../../components/app/common/components/positionProfile';
import { useGetJobProfileMetaQuery } from '../../../redux/services/graphql-api/job-profile.api';
import { GetPositionRequestResponse } from '../../../redux/services/graphql-api/position-request.api';
import { formatDateTime } from '../../../utils/Utils';
import CommentsList from '../../wizard/components/comments-list.component';

type ServiceRequestDetailsProps = {
  positionRequestData: GetPositionRequestResponse;
};

export const ServiceRequestDetails: React.FC<ServiceRequestDetailsProps> = ({ positionRequestData }) => {
  const { data: jobProfileMeta } = useGetJobProfileMetaQuery(
    positionRequestData?.positionRequest?.parent_job_profile_id ?? -1,

    { skip: !positionRequestData?.positionRequest?.additional_info?.work_location_id },
  );
  const currentVersion =
    positionRequestData?.positionRequest?.parent_job_profile_version ==
    jobProfileMeta?.jobProfileMeta.versions.map((v) => v.version).sort((a, b: number) => b - a)[0];
  // console.log('locationInfo: ', locationInfo);

  const submissionDetailsItems = [
    {
      key: 'submittedBy',
      label: 'Submitted by',
      children: <div>{positionRequestData?.positionRequest?.user?.name}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'submittedAt',
      label: 'Submitted at',
      children: (
        <div>
          {positionRequestData?.positionRequest?.submitted_at &&
            formatDateTime(positionRequestData?.positionRequest?.submitted_at)}
        </div>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'ticketId',
      label: 'CRM service request',
      children: <div>{positionRequestData?.positionRequest?.crm_lookup_name}</div>,
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
      children: <div>{positionRequestData?.positionRequest?.profile_json?.title?.text}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'expectedClassificationLevel',
      label: 'Expected classification level',
      children: <div>{positionRequestData?.positionRequest?.classification?.code}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'jobStoreProfileNumber',
      label: 'Job Store profile number',
      children: (
        <div>
          <div>{positionRequestData?.positionRequest?.parent_job_profile?.number}</div>

          <Link
            to={`/job-profiles/${positionRequestData?.positionRequest?.parent_job_profile?.number}?id=${positionRequestData?.positionRequest?.parent_job_profile_id}&version=${positionRequestData?.positionRequest?.parent_job_profile_version}`}
          >
            <Typography.Text type="secondary">
              Version {positionRequestData?.positionRequest?.parent_job_profile_version} {currentVersion && '(Latest) '}
            </Typography.Text>
            <ExportOutlined />
          </Link>
        </div>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'reportsTo',
      label: 'Reports to',
      children: (
        <PositionProfile
          positionNumber={null}
          positionProfile={positionRequestData?.positionRequest?.reports_to_position}
          orgChartData={positionRequestData?.positionRequest?.orgchart_json}
        ></PositionProfile>

        // <div>
        //   {reportsToLoading && <LoadingComponent mode="small" />}
        //   {firstActivePosition2 && reportsToInfo?.positionProfile && reportsToInfo?.positionProfile?.length > 0 && (
        //     <div>
        //       <p style={{ margin: 0 }}>{`${firstActivePosition2.employeeName}, ${firstActivePosition2.ministry}`}</p>
        //       <Typography.Paragraph type="secondary">
        //         {`${firstActivePosition2.positionDescription}, ${firstActivePosition2.classification}`}
        //         <br></br>
        //         {`Position No.: ${firstActivePosition2.positionNumber}`}
        //         {additionalPositions2 > 0 && ` +${additionalPositions2}`}
        //       </Typography.Paragraph>
        //     </div>
        //   )}

        //   {!firstActivePosition2 && reportsToInfo?.positionProfile && reportsToInfo?.positionProfile?.length == 0 && (
        //     <div>
        //       <p style={{ margin: 0 }}>
        //         Vacant (Position No.: {positionRequestData?.positionRequest?.reports_to_position_id})
        //       </p>
        //     </div>
        //   )}
        // </div>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'firstLevelExcludedManager',
      label: 'First level excluded manager for this position',
      children: (
        <PositionProfile
          positionNumber={null}
          positionProfile={positionRequestData?.positionRequest?.excluded_manager_position}
          orgChartData={positionRequestData?.positionRequest?.orgchart_json}
        ></PositionProfile>
        // <div>
        //   {excludedLoading && <LoadingComponent mode="small" />}
        //   {firstActivePosition && (
        //     <div>
        //       <p style={{ margin: 0 }}>{`${firstActivePosition.employeeName}, ${firstActivePosition.ministry}`}</p>
        //       <Typography.Paragraph type="secondary">
        //         {`${firstActivePosition.positionDescription}, ${firstActivePosition.classification}`}
        //         <br></br>
        //         {`Position No.: ${firstActivePosition.positionNumber}`}
        //         {additionalPositions > 0 && ` +${additionalPositions}`}
        //       </Typography.Paragraph>
        //     </div>
        //   )}
        // </div>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'payListDepartmentIdNumber',
      label: 'Department ID',
      children: (
        <div>
          <div>{positionRequestData?.positionRequest?.additional_info?.department_id}</div>
          {positionRequestData?.positionRequest?.additional_info?.branch && (
            <div>
              <Typography.Text type="secondary">
                Branch: {positionRequestData?.positionRequest?.additional_info?.branch}
              </Typography.Text>
            </div>
          )}
          {positionRequestData?.positionRequest?.additional_info?.division && (
            <div>
              <Typography.Text type="secondary">
                Division: {positionRequestData?.positionRequest?.additional_info?.division}
              </Typography.Text>
            </div>
          )}
        </div>
      ),
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
      children: <div>{positionRequestData.positionRequest?.additional_info?.work_location_name}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },

    {
      key: 'receivedExecutiveApproval',
      label: 'Received executive approval (Deputy Minister or delegate)',
      children: <div>Yes</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'comments',
      label: 'Comments',
      children: (
        <CommentsList positionRequestId={positionRequestData?.positionRequest?.id ?? -1} showCollapse={false} />
      ),
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
