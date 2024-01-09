/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import '../../components/app/common/css/filtered-table.page.css';
import { PageHeader } from '../../components/app/page-header.component';
import {
  useGetJobProfilesDraftsCareerGroupsQuery,
  useGetJobProfilesDraftsMinistriesQuery,
} from '../../redux/services/graphql-api/job-profile.api';
import ContentWrapper from '../home/components/content-wrapper.component';
import { JobProfileSearch } from '../job-profiles/components/job-profile-search.component';
import TotalCompProfilesTable from './components/total-comp-draft-profiles-table.component';

export const TotalCompDraftProfilesPage = () => {
  const ministriesData = useGetJobProfilesDraftsMinistriesQuery().data?.jobProfilesDraftsMinistries;
  const careerGroupData = useGetJobProfilesDraftsCareerGroupsQuery().data?.jobProfilesDraftsCareerGroups;

  const [hasData, setHasData] = useState(false);

  const handleDataAvailability = (isDataAvailable: boolean) => {
    setHasData(isDataAvailable);
  };

  if (!ministriesData || !careerGroupData) return <>Loading..</>;

  return (
    <>
      <PageHeader title="Drafts" subTitle="Job profiles that you are working on." />

      <ContentWrapper>
        {hasData && (
          <JobProfileSearch
            searchPlaceHolderText={'Search by job title or job store number'}
            additionalFilters={true}
            fullWidth={true}
            ministriesData={ministriesData}
            careerGroupData={careerGroupData}
          />
        )}

        <TotalCompProfilesTable
          itemsPerPage={2}
          tableTitle={'Job profiles'}
          style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}
          onDataAvailable={handleDataAvailability}
        ></TotalCompProfilesTable>
      </ContentWrapper>
    </>
  );
};
