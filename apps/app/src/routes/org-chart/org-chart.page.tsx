import { Col, Layout, Row } from 'antd';
import { useEffect, useState } from 'react';
import { PageHeader } from '../../components/app/page-header.component';
import { useGetProfileQuery } from '../../redux/services/graphql-api/profile.api';
import { OrgChart } from './components/org-chart';
import { OrgChartContext } from './enums/org-chart-context.enum';
import { OrgChartType } from './enums/org-chart-type.enum';

const { Content } = Layout;

export const OrgChartPage = () => {
  const [departmentId, setDepartmentId] = useState<string | null | undefined>(undefined);
  const { data: profileData, isFetching: profileDataIsFetching } = useGetProfileQuery();

  useEffect(() => {
    console.log('profileDataIsFetching: ', profileDataIsFetching);
  }, [profileDataIsFetching]);

  useEffect(() => {
    setDepartmentId(profileData?.profile.department_id);
  }, [profileData?.profile.department_id]);

  return (
    <Content style={{ backgroundColor: '#FFF', display: 'flex', flex: '1 0 auto', flexDirection: 'column' }}>
      <PageHeader
        title="My organizations"
        subTitle="You are viewing the current organization structure for your base work area. To begin,  click the supervisor of the new position you would like to create."
      />
      <Row justify="center" style={{ backgroundColor: '#F0F2F5', flex: 'auto' }}>
        <Col style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
          <OrgChart
            type={OrgChartType.DYNAMIC}
            context={OrgChartContext.DEFAULT}
            setDepartmentId={setDepartmentId}
            departmentId={departmentId}
            departmentIdIsLoading={profileDataIsFetching}
            targetId="00134581"
          />
        </Col>
      </Row>
    </Content>
  );
};
