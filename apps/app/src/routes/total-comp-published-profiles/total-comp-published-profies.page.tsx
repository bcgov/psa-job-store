/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import '../../components/app/common/css/filtered-table.page.css';
import { PageHeader } from '../../components/app/page-header.component';
import ContentWrapper from '../../components/content-wrapper.component';
import { JobProfileSearch } from '../job-profiles/components/job-profile-search.component';
import { JobProfilesProvider } from '../job-profiles/components/job-profiles.context';
import TotalCompProfilesTable from '../total-comp-draft-profiles/components/total-comp-draft-profiles-table.component';

export const TotalCompPublishedProfilesPage = () => {
  // const ministriesData = useGetJobProfilesDraftsMinistriesQuery().data?.jobProfilesDraftsMinistries;
  // console.log('ministriesData: ', ministriesData);
  // const careerGroupData = useGetJobProfilesDraftsCareerGroupsQuery().data?.jobProfilesDraftsCareerGroups;

  const [hasData, setHasData] = useState(false);

  const handleDataAvailability = (isDataAvailable: boolean) => {
    setHasData(isDataAvailable);
  };

  // if (!ministriesData) return <LoadingSpinnerWithMessage />;

  return (
    <>
      <PageHeader title="Published profiles" subTitle="Job profiles available in the job store." />

      <ContentWrapper>
        {hasData && (
          <JobProfilesProvider>
            <JobProfileSearch
              searchPlaceHolderText={'Search by job title, keyword or job store number'}
              // additionalFilters={true}
              fullWidth={true}
              wideSearch={true}
              // ministriesData={ministriesData}
              // careerGroupData={careerGroupData}
            />
          </JobProfilesProvider>
        )}

        <TotalCompProfilesTable
          state="PUBLISHED"
          itemsPerPage={10}
          tableTitle={'Job profiles'}
          style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}
          onDataAvailable={handleDataAvailability}
        ></TotalCompProfilesTable>
      </ContentWrapper>
    </>
  );
};
