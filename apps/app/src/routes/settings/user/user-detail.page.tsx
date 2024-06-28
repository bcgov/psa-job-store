import { Spin } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../../../components/app/page-header.component';
import { useGetOrganizationsQuery } from '../../../redux/services/graphql-api/organization';
import { useLazyGetUserQuery } from '../../../redux/services/graphql-api/settings/settings.api';
import ContentWrapper from '../../home/components/content-wrapper.component';
import { OrgChartAccessForm } from './components/org-chart-access-form.component';

export const UserDetailPage = () => {
  const { id } = useParams();
  const [userTrigger, { data, isFetching: userIsFetching }] = useLazyGetUserQuery();

  const { data: orgData } = useGetOrganizationsQuery();

  console.log('dta: ', orgData);

  useEffect(() => {
    if (id != null) userTrigger(id);
  }, [id]);

  console.log('data: ', data?.user);

  return (
    <>
      <PageHeader
        title={userIsFetching ? <Spin spinning /> : data?.user?.name}
        additionalBreadcrumb={{ title: data?.user?.name }}
      />

      {/* <PageHeader
        title={data?.positionRequest?.title}
        subTitle={
          <div>
            <PositionProfile
              prefix="Reporting to"
              mode="compact"
              positionNumber={data?.positionRequest?.reports_to_position_id}
              orgChartData={data?.positionRequest?.orgchart_json}
            ></PositionProfile>
          </div>
        }
        additionalBreadcrumb={{ title: data?.positionRequest?.title }}
      /> */}
      <ContentWrapper>
        <OrgChartAccessForm />
      </ContentWrapper>
    </>
  );
};
