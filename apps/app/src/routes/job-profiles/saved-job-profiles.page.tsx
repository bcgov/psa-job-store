import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import LoadingComponent from '../../components/app/common/components/loading.component';
import { PageHeader } from '../../components/app/page-header.component';
import ContentWrapper from '../../components/content-wrapper.component';
import { useGetSavedJobProfileIdsQuery } from '../../redux/services/graphql-api/saved-job-profile.api';
import { useTestUser } from '../../utils/useTestUser';
import JobProfiles from './components/job-profiles.component';

export const SavedJobProfilesPage = () => {
  const { number } = useParams();
  const [searchParams] = useSearchParams();
  const { data: savedJobProfileIds, isLoading: isSavedJobProfileIdsLoading, refetch } = useGetSavedJobProfileIdsQuery();
  const isTestUser = useTestUser();
  const page_size = isTestUser ? 2 : 10;

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isSavedJobProfileIdsLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <PageHeader title="Saved profiles" subTitle="View profiles that you have previously saved." />
      <ContentWrapper>
        <JobProfiles
          key={'SavedProfiles'}
          searchParams={searchParams}
          selectProfileNumber={number}
          loadProfileIds={savedJobProfileIds?.getSavedJobProfileIds}
          page_size={page_size}
        />
      </ContentWrapper>
    </>
  );
};
