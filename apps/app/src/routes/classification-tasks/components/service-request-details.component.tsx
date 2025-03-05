/* eslint-disable @typescript-eslint/no-explicit-any */
import { CopyOutlined, ExportOutlined } from '@ant-design/icons';
import { Card, Col, Descriptions, Row, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import PositionProfile from '../../../components/shared/position-profile/positionProfile';
import { useTypedSelector } from '../../../redux/redux.hooks';
import { useGetJobProfileMetaQuery } from '../../../redux/services/graphql-api/job-profile.api';
import {
  GetPositionRequestResponse,
  GetPositionRequestResponseContent,
} from '../../../redux/services/graphql-api/position-request.api';
import { getUserRoles } from '../../../utils/get-user-roles.util';
import { formatDateTime } from '../../../utils/Utils';
import CommentsList from '../../wizard/components/comments-list.component';

type ServiceRequestDetailsProps = {
  positionRequestData: GetPositionRequestResponse;
};

const renderPositionNumber = (roles: string[], positionRequest: GetPositionRequestResponseContent) => {
  // For new positions that are created manually in org chart for display purposes
  // show as "proposed". These don't actually exist in PS.
  if (positionRequest?.position_number?.toString().padStart(8, '0') === '000000') {
    return <em>Proposed</em>;
  }

  if (roles.includes('classification') || roles.includes('total-compensation')) {
    return (
      <div>
        {positionRequest?.position_number}
        <CopyOutlined
          onClick={() => {
            navigator.clipboard.writeText(positionRequest?.position_number + '' || '');
            message.success('Position number copied to clipboard');
          }}
          style={{ cursor: 'pointer' }}
        />
      </div>
    );
  } else if (roles.includes('hiring-manager') || roles.includes('idir')) {
    // Approved is the PeopleSoft status, for positions which were created outside the Job Store
    // COMPLETED is the Job Store status, for positions which were created inside the Job Store (PS === Active, CRM === Completed)
    // todo - currently the status is always "Approved" - need to do more complex logic involving PR
    // e.g. if PS status is approved, but PR is in review, then don't show the position number
    if (['Approved', 'COMPLETED'].includes(positionRequest?.status ?? '')) {
      return (
        <div>
          {positionRequest?.position_number}
          <CopyOutlined
            onClick={() => {
              navigator.clipboard.writeText(positionRequest?.position_number + '' || '');
              message.success('Position number copied to clipboard');
            }}
            style={{ cursor: 'pointer' }}
          />
        </div>
      );
    } else {
      return <em>Pending approval</em>;
    }
  }
};

export const ServiceRequestDetails: React.FC<ServiceRequestDetailsProps> = ({ positionRequestData }) => {
  const auth = useTypedSelector((state) => state.authReducer);
  const roles: string[] = getUserRoles(auth.user);

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
      children: positionRequestData?.positionRequest?.crm_lookup_name && (
        <div>
          {positionRequestData?.positionRequest?.crm_lookup_name}{' '}
          <CopyOutlined
            onClick={() => {
              navigator.clipboard.writeText(positionRequestData?.positionRequest?.crm_lookup_name || '');
              message.success('CRM service request number copied to clipboard');
            }}
            style={{ cursor: 'pointer' }}
          />
        </div>
      ),
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
      label: 'Position number',
      children:
        positionRequestData?.positionRequest?.position_number &&
        renderPositionNumber(roles, positionRequestData?.positionRequest),
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
      children: positionRequestData?.positionRequest?.parent_job_profile?.number && (
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
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'firstLevelExcludedManager',
      label: 'Excluded manager who approved the profile',
      children: (
        <PositionProfile
          positionNumber={null}
          positionProfile={positionRequestData?.positionRequest?.excluded_manager_position}
          orgChartData={positionRequestData?.positionRequest?.orgchart_json}
        ></PositionProfile>
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
      children: (
        <div>
          {positionRequestData?.positionRequest?.classification?.employee_group_id === 'MGT' ||
          positionRequestData?.positionRequest?.classification?.employee_group_id === 'OEX'
            ? 'Excluded'
            : 'Included'}
        </div>
      ),
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
    <Row justify="center" data-testid="job-details-component">
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
