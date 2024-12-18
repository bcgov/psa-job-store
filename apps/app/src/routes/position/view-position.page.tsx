/* eslint-disable @typescript-eslint/no-explicit-any */
import { EllipsisOutlined, LinkOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Tabs, Typography, message } from 'antd';
import { MenuProps } from 'antd/es/menu';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinnerWithMessage from '../../components/app/common/components/loading.component';
import PositionProfile from '../../components/app/common/components/positionProfile';
import '../../components/app/common/css/filtered-table.component.css';
import { PageHeader } from '../../components/app/page-header.component';
import { DownloadJobProfileComponent } from '../../components/shared/download-job-profile/download-job-profile.component';
import { useGetPositionRequestForDeptQuery } from '../../redux/services/graphql-api/position-request.api';
import { useTestUser } from '../../utils/useTestUser';
import { JobProfileWithDiff } from '../classification-tasks/components/job-profile-with-diff.component';
import { ServiceRequestDetails } from '../classification-tasks/components/service-request-details.component';
import NotFoundComponent from '../not-found/404';
import { OrgChart } from '../org-chart/components/org-chart';
import { OrgChartType } from '../org-chart/enums/org-chart-type.enum';
import StatusIndicator from '../wizard/components/wizard-position-request-status-indicator';

// import '../wizard/wizard-review.page.css';
// import './total-comp-approved-request.page.css';
const { Text } = Typography;

// Import your API service to fetch position request

export const ViewPositionPage = () => {
  const isTestUser = useTestUser();
  const { positionRequestId } = useParams();
  const [activeTabKey, setActiveTabKey] = useState('1');

  if (!positionRequestId) throw 'No position request provided';

  const { data, isLoading } = useGetPositionRequestForDeptQuery({
    id: parseInt(positionRequestId),
  });

  // END PROFILE TAB INFO
  // const handleDownload = () => {
  //   // Implement download functionality here
  // };

  const handleCopyURL = () => {
    // Implement URL copy functionality here
    const linkToCopy = `${window.location.origin}/requests/positions/share/${data?.positionRequest?.shareUUID}`;

    // Use the Clipboard API to copy the link to the clipboard
    if (!isTestUser) copy(linkToCopy);
    message.success('Link copied to clipboard!');
  };

  const StatusIcon = ({ status }: any) => {
    // const statusInfo = statusIconColorMap[status];
    // return statusInfo?.icon ? (
    //   <Space>
    //     <span style={{ color: statusInfo.color }}>{statusInfo.icon}</span>
    //     <span style={{ color: statusInfo.textColor }}>{statusInfo.text}</span>
    //   </Space>
    // ) : null;
    return <StatusIndicator status={status} />;
  };

  // const currentStatus = data?.positionRequest?.status;
  // const statusDetails = statusIconColorMap[currentStatus as keyof typeof statusIconColorMap];

  if (!data) {
    return <LoadingSpinnerWithMessage />;
  }

  // console.log('positionRequest data: ', data);
  if (!data.positionRequest && !isLoading) return <NotFoundComponent entity="Position request" />;
  // END ACTIONS TAB DATA
  const snapshotCopy = JSON.parse(JSON.stringify(data?.positionRequest?.orgchart_json));
  const tabItems = [
    {
      key: '1',
      label: 'Job details',
      children: <ServiceRequestDetails positionRequestData={data}></ServiceRequestDetails>,
    },
    {
      key: '2',
      label: 'Organization Chart',
      children: (
        <div style={{ height: '100%' }}>
          <OrgChart
            type={OrgChartType.READONLY}
            departmentId={data.positionRequest?.department_id ?? ''}
            elements={snapshotCopy}
          />
        </div>
      ),
    },
    {
      key: '3',
      label: 'Job Profile',
      children: (
        <div style={{ padding: '0 1rem 1rem 1rem' }}>
          <JobProfileWithDiff positionRequestData={data} />
        </div>
      ),
    },
  ];

  const items: MenuProps['items'] = [
    {
      label: (
        <div>
          Copy link <LinkOutlined />
          <Text type="secondary" style={{ display: 'block' }}>
            Invite others to review the task.
          </Text>
        </div>
      ),
      key: '1',
      onClick: handleCopyURL,
    },
    {
      label: (
        <div>
          <DownloadJobProfileComponent
            positionRequest={data?.positionRequest}
            jobProfile={data.positionRequest?.profile_json}
          >
            <>
              Download job profile
              <Text type="secondary" style={{ display: 'block' }}>
                Download the attached copy of the job profile.
              </Text>
            </>
          </DownloadJobProfileComponent>
        </div>
      ),
      key: '2',
    },
    // {
    //   label: (
    //     <div>
    //       Download org chart
    //       <Text type="secondary" style={{ display: 'block' }}>
    //         Download the attached copy of the org chart.
    //       </Text>
    //     </div>
    //   ),
    //   key: '3',
    // },
  ];

  return (
    <>
      <PageHeader
        extra={
          <>
            {data?.positionRequest?.status && <StatusIcon status={data.positionRequest.status} />}

            <Divider type="vertical" />
            <Dropdown menu={{ items }} placement="bottom" trigger={['click']}>
              <Button icon={<EllipsisOutlined />}></Button>
            </Dropdown>
          </>
        }
        title={data?.positionRequest?.title}
        subTitle={
          <div>
            <PositionProfile
              prefix="Reporting to"
              mode="compact"
              positionNumber={data?.positionRequest?.reports_to_position_id}
              positionProfile={data.positionRequest?.reports_to_position}
              orgChartData={data?.positionRequest?.orgchart_json}
            />
          </div>
        }
        additionalBreadcrumb={{ title: data?.positionRequest?.title }}
      />
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => setActiveTabKey(key)}
        defaultActiveKey="1"
        items={tabItems}
        tabBarStyle={{ backgroundColor: '#fff', padding: '0 1rem 0px 1rem' }}
        style={{ backgroundColor: '#f5f5f5' }}
      />
    </>
  );
};
