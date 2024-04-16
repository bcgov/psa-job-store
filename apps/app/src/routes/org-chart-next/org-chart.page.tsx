import { Col, Layout, Row } from 'antd';
import { PageHeader } from '../../components/app/page-header.component';

const { Content } = Layout;

export const OrgChartPage = () => {
  return (
    <Content style={{ backgroundColor: '#FFF', display: 'flex', flex: '1 0 auto', flexDirection: 'column' }}>
      <PageHeader title="Org Chart @ Next" />
      <Row justify="center" style={{ backgroundColor: '#F0F2F5', flex: 'auto' }}>
        <Col style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}></Col>
      </Row>
    </Content>
  );
};
