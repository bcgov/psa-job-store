import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingComponent from '../../components/app/common/components/loading.component';
import { PageHeader } from '../../components/app/page-header.component';
import { useGetSavedJobProfileIdsQuery } from '../../redux/services/graphql-api/saved-job-profile.api';
import ContentWrapper from '../home/components/content-wrapper.component';
import JobProfiles from './components/job-profiles.component';

export const SavedJobProfilesPage = () => {
  const [searchParams] = useSearchParams();
  const { data: savedJobProfileIds, isLoading: isSavedJobProfileIdsLoading, refetch } = useGetSavedJobProfileIdsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isSavedJobProfileIdsLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <PageHeader title="Saved profiles" />
      <ContentWrapper>
        <JobProfiles
          key={'SavedProfiles'}
          searchParams={searchParams}
          loadProfileIds={savedJobProfileIds?.getSavedJobProfileIds}
        />
      </ContentWrapper>
    </>
  );
};
