import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import 'reactflow/dist/style.css';
import { PageHeader } from '../../components/app/page-header.component';
import { useGetProfileQuery } from '../../redux/services/graphql-api/profile.api';
import { OrgChartFilter } from './components/org-chart-filter.component';
import OrgChartWrapped from './components/org-chart-wrapped.component';

export const OrgChartPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const { data: profileData } = useGetProfileQuery();

  useEffect(() => {
    if (profileData?.profile.department_id != null) {
      setSelectedDepartment(profileData.profile.department_id);
    }
  }, [profileData]);

  return (
    <div style={{ height: 'calc(100% - 82px)' }}>
      <PageHeader
        title="My organizations"
        subTitle="You are viewing the current organization structure for your base work area. To begin,  click the supervisor of the new position you would like to create."
      />
      <Row justify="center" style={{ padding: '0 1rem', backgroundColor: 'rgb(240, 242, 245)', height: '100%' }}>
        <Col
          xs={24}
          md={24}
          lg={24}
          xl={24}
          xxl={24}
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <OrgChartFilter
            setSelectedDepartment={setSelectedDepartment}
            selectedDepartment={selectedDepartment}
            defaultValue={null}
          />
          <div
            style={{
              overflow: 'hidden',
              position: 'relative',
              height: '100%',
              background: 'rgb(240, 242, 245)',
              marginLeft: '-1rem',
              marginRight: '-1rem',
              marginTop: '-1px',
            }}
          >
            <OrgChartWrapped selectedDepartment={selectedDepartment} />
          </div>
        </Col>
      </Row>
    </div>
  );
};
