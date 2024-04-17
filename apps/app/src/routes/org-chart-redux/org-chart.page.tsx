import { Col, Layout, Row } from 'antd';
import { useEffect, useState } from 'react';
import { PageHeader } from '../../components/app/page-header.component';
import { useGetProfileQuery } from '../../redux/services/graphql-api/profile.api';
import { OrgChart } from './components/org-chart';
import { OrgChartType } from './enums/org-chart-type.enum';

const { Content } = Layout;

export const OrgChartPage = () => {
  const [departmentId, setDepartmentId] = useState<string | undefined>(undefined);
  const { data: profileData, isFetching: profileDataIsFetching } = useGetProfileQuery();

  useEffect(() => {
    setDepartmentId(profileData?.profile.department_id);
  }, [profileData?.profile.department_id]);

  return (
    <Content style={{ backgroundColor: '#FFF', display: 'flex', flex: '1 0 auto', flexDirection: 'column' }}>
      <PageHeader title="Org Chart @ Redux" />
      <Row justify="center" style={{ backgroundColor: '#F0F2F5', flex: 'auto' }}>
        <Col style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
          <OrgChart
            type={OrgChartType.DYNAMIC}
            setDepartmentId={setDepartmentId}
            departmentId={departmentId}
            departmentIdIsLoading={profileDataIsFetching}
          />
        </Col>
      </Row>
    </Content>
  );
};
