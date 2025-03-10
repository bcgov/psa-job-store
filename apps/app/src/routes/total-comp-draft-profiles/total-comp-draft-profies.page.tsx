/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import '../../components/app/common/css/filtered-table.page.css';
import { PageHeader } from '../../components/app/page-header.component';
import ContentWrapper from '../../components/content-wrapper.component';
import LoadingComponent from '../../components/shared/loading-component/loading.component';
import {
  useGetJobProfilesDraftsClassificationsQuery,
  useGetJobProfilesDraftsMinistriesQuery,
} from '../../redux/services/graphql-api/job-profile.api';
import { JobProfileSearch } from '../job-profiles/components/job-profile-search.component';
import { JobProfilesProvider } from '../job-profiles/components/job-profiles.context';
import TotalCompProfilesTable from './components/total-comp-draft-profiles-table.component';

export const TotalCompDraftProfilesPage = () => {
  const ministriesData = useGetJobProfilesDraftsMinistriesQuery().data?.jobProfilesDraftsMinistries;
  const classificationData = useGetJobProfilesDraftsClassificationsQuery().data?.jobProfilesDraftsClassifications;

  const [hasData, setHasData] = useState(false);

  const handleDataAvailability = (isDataAvailable: boolean) => {
    setHasData(isDataAvailable);
  };

  if (!ministriesData || !classificationData) return <LoadingComponent />;

  return (
    <>
      <PageHeader title="Drafts" subTitle="Job profiles that you are working on." />

      <ContentWrapper>
        {hasData && (
          <JobProfilesProvider>
            <JobProfileSearch
              searchPlaceHolderText={'Search by job title, keyword or job store number'}
              // additionalFilters={true}
              fullWidth={true}
              wideSearch={true}
              ministriesData={ministriesData}
              classificationData={classificationData}
            />
          </JobProfilesProvider>
        )}

        <TotalCompProfilesTable
          itemsPerPage={10}
          tableTitle={'Job profiles'}
          style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}
          onDataAvailable={handleDataAvailability}
        ></TotalCompProfilesTable>
      </ContentWrapper>
    </>
  );
};
