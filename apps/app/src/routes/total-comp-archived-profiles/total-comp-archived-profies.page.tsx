/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import '../../components/app/common/css/filtered-table.page.css';
import { PageHeader } from '../../components/app/page-header.component';
import ContentWrapper from '../../components/content-wrapper.component';
import TotalCompProfilesTable from '../total-comp-draft-profiles/components/total-comp-draft-profiles-table.component';

export const TotalCompArchivedProfilesPage = () => {
  return (
    <>
      <PageHeader
        title="Archived"
        subTitle="Job profiles that have been deleted but have associated Position Requests."
      />

      <ContentWrapper>
        <TotalCompProfilesTable
          state="DRAFT"
          is_archived={true}
          itemsPerPage={10}
          tableTitle={'Job profiles'}
          style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        ></TotalCompProfilesTable>
      </ContentWrapper>
    </>
  );
};
