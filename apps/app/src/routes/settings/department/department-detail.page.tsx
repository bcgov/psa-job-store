import { Space, Spin } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../../../components/app/page-header.component';
import ContentWrapper from '../../../components/content-wrapper.component';
import { useLazyGetDepartmentForSettingsQuery } from '../../../redux/services/graphql-api/settings/settings.api';
import NotFoundComponent from '../../not-found/404';
import { OtherDetailsCard } from './components/other-details-card.component';
import { PrimaryActionsCard } from './components/primary-actions-card.component';

export const DepartmentDetailPage = () => {
  const { id } = useParams();

  const [departmentTrigger, { data, isFetching: departmentIsFetching }] = useLazyGetDepartmentForSettingsQuery();

  useEffect(() => {
    if (id != null) departmentTrigger({ where: { id } });
  }, [departmentTrigger, id]);

  return !departmentIsFetching && data && !data?.department ? (
    <NotFoundComponent entity="Department" />
  ) : (
    <>
      <PageHeader
        title={departmentIsFetching ? <Spin spinning /> : data?.department?.name}
        additionalBreadcrumb={{ title: data?.department?.name }}
      />
      <ContentWrapper>
        <Space direction="vertical" style={{ marginTop: '1rem', width: '100%' }}>
          <PrimaryActionsCard department={data?.department} departmentIsLoading={departmentIsFetching} />
          <OtherDetailsCard department={data?.department} />
        </Space>
      </ContentWrapper>
    </>
  );
};
