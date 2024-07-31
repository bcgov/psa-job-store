import { Space } from 'antd';
import { PageHeader } from '../../../components/app/page-header.component';
import ContentWrapper from '../../home/components/content-wrapper.component';
import { DepartmentTable } from './components/department.table';

export const DepartmentListPage = () => {
  return (
    <>
      <PageHeader title="Departments" subTitle="Manage departments" />
      <ContentWrapper>
        <Space direction="vertical" style={{ marginTop: '1rem', width: '100%' }}>
          <DepartmentTable />
        </Space>
      </ContentWrapper>
    </>
  );
};
