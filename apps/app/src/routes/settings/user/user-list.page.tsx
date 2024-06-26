import { PageHeader } from '../../../components/app/page-header.component';
import ContentWrapper from '../../home/components/content-wrapper.component';

export const UserListPage = () => {
  return (
    <>
      <PageHeader title="Users" subTitle={'Manage user details'} />
      <ContentWrapper>Hello, world!</ContentWrapper>
    </>
  );
};
