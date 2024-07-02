import { Spin } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../../../components/app/page-header.component';
import { useLazyGetUserForSettingsQuery } from '../../../redux/services/graphql-api/settings/settings.api';
import ContentWrapper from '../../home/components/content-wrapper.component';
import { OrgChartAccessForm } from './components/org-chart-access-form.component';

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
        <OrgChartAccessForm />
      </ContentWrapper>
    </>
  );
};
