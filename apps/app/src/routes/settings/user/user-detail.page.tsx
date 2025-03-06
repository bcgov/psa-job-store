import { Space, Spin } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../../../components/app/page-header.component';
import ContentWrapper from '../../../components/content-wrapper.component';
import { useLazyGetUserByEmployeeIdQuery } from '../../../redux/services/graphql-api/settings/settings.api';
import NotFoundComponent from '../../not-found/404';
import { AssignRolesCard } from './components/assign-roles-card.component';
import { OrgChartAccessCard } from './components/org-chart-access-card.component';
import { OtherDetailsCard } from './components/other-details-card.component';

export const UserDetailPage = () => {
  const { employeeId } = useParams();
  const [userTrigger, { data, isFetching: userIsFetching }] = useLazyGetUserByEmployeeIdQuery();

  useEffect(() => {
    if (employeeId != null) userTrigger(employeeId);
  }, [employeeId]);
  console.log('data: ', data);

  return !userIsFetching && data && !data?.userByEmployeeId ? (
    <NotFoundComponent entity="User" />
  ) : (
    <>
      <PageHeader
        title={userIsFetching ? <Spin spinning /> : data?.userByEmployeeId?.name}
        additionalBreadcrumb={{ title: data?.userByEmployeeId?.name }}
      />
      <ContentWrapper>
        <Space direction="vertical" style={{ marginTop: '1rem', width: '100%' }}>
          <AssignRolesCard user={data?.userByEmployeeId} />
          <OrgChartAccessCard user={data?.userByEmployeeId} />
          <OtherDetailsCard user={data?.userByEmployeeId} />
        </Space>
      </ContentWrapper>
    </>
  );
};
