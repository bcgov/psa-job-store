import { Space, Spin } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../../../components/app/page-header.component';
import { useLazyGetUserForSettingsQuery } from '../../../redux/services/graphql-api/settings/settings.api';
import ContentWrapper from '../../home/components/content-wrapper.component';
import { AssignRolesCard } from './components/assign-roles-card.component';
import { OrgChartAccessCard } from './components/org-chart-access-card.component';
import { OtherDetailsCard } from './components/other-details-card.component';

export const UserDetailPage = () => {
  const { id } = useParams();
  const [userTrigger, { data, isFetching: userIsFetching }] = useLazyGetUserForSettingsQuery();

  useEffect(() => {
    if (id != null) userTrigger(id);
  }, [id]);

  return (
    <>
      <PageHeader
        title={userIsFetching ? <Spin spinning /> : data?.user?.name}
        additionalBreadcrumb={{ title: data?.user?.name }}
      />
      <ContentWrapper>
        <Space direction="vertical" style={{ marginTop: '1rem', width: '100%' }}>
          <AssignRolesCard user={data?.user} />
          <OrgChartAccessCard user={data?.user} />
          <OtherDetailsCard user={data?.user} />
        </Space>
      </ContentWrapper>
    </>
  );
};
