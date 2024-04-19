/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import '../../components/app/common/css/filtered-table.page.css';
import { PageHeader } from '../../components/app/page-header.component';
import ContentWrapper from '../home/components/content-wrapper.component';
import TotalCompProfilesTable from '../total-comp-draft-profiles/components/total-comp-draft-profiles-table.component';

export const TotalCompArchivedProfilesPage = () => {
  // const ministriesData = useGetJobProfilesDraftsMinistriesQuery().data?.jobProfilesDraftsMinistries;
  // console.log('ministriesData: ', ministriesData);
  // const careerGroupData = useGetJobProfilesDraftsCareerGroupsQuery().data?.jobProfilesDraftsCareerGroups;

  // const [hasData, setHasData] = useState(false);

  // const handleDataAvailability = (isDataAvailable: boolean) => {
  //   setHasData(isDataAvailable);
  // };

  // if (!ministriesData) return <LoadingSpinnerWithMessage />;

  return (
    <>
      <PageHeader
        title="Archived"
        subTitle="Job profiles that have been deleted but have associated Position Requests."
      />

      <ContentWrapper>
        {/* {hasData && (
          <JobProfileSearch
            searchPlaceHolderText={'Search by job title or job store number'}
            fullWidth={true}
          />
        )} */}

        <TotalCompProfilesTable
          state="DRAFT"
          is_archived={true}
          itemsPerPage={10}
          tableTitle={'Job profiles'}
          style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}
          // onDataAvailable={handleDataAvailability}
        ></TotalCompProfilesTable>
      </ContentWrapper>
    </>
  );
};
