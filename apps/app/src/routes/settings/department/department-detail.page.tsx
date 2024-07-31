import { PageHeader } from '@ant-design/pro-layout';
import { Space } from 'antd';
import ContentWrapper from '../../home/components/content-wrapper.component';

export const DepartmentDetailPage = () => {
  return (
    <>
      <PageHeader title="" />
      <ContentWrapper>
        <Space direction="vertical" style={{ marginTop: '1rem', width: '100%' }}></Space>
      </ContentWrapper>
    </>
  );
};
