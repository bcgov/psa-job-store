/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import '../../components/app/common/css/custom-form.css';
import '../../components/app/common/css/filtered-table.page.css';
import LoadingComponent from '../../components/shared/loading-component/loading.component';
import { useLazyGetJobProfileQuery } from '../../redux/services/graphql-api/job-profile.api';
import NotFoundComponent from '../not-found/404';
import { TotalCompCreateProfileComponent } from './components/total-comp-create-profile.component';
import { useTCContext } from './components/total-comp-create-profile.provider';

export const TotalCompCreateProfilePage = () => {
  const { id: urlId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { setVersion, setId, id, version } = useTCContext();
  const [trigger, { data: jobProfileData, isFetching, isError, error }] = useLazyGetJobProfileQuery();
  const navigate = useNavigate();

  // Refetch data when the component mounts or the id changes
  useEffect(() => {
    setId(urlId);
    setVersion(searchParams.get('version') ?? '');

    // setSearchParams(version ?? '');
    if (urlId) {
      trigger(
        { id: parseInt(urlId ?? ''), version: version ? parseInt(version ?? '') : undefined },
        // {
        //   skip: !urlId,
        // },
      );
    }
  }, [urlId, version, setSearchParams, searchParams, trigger, id]);

  useEffect(() => {
    if (isError) {
      console.log(error);
      navigate('/not-found');
    }
  });
  if (isFetching) return <LoadingComponent />;

  return id && jobProfileData && !jobProfileData?.jobProfile && !isFetching ? (
    <NotFoundComponent entity="Profile" />
  ) : (
    <>
      {/* <TotalCompCreateProfileComponent
        jobProfileData={jobProfileData}
        id={id}
        setId={setId}
        setVersion={setVersion}
      ></TotalCompCreateProfileComponent> */}
      <TotalCompCreateProfileComponent jobProfileData={jobProfileData}></TotalCompCreateProfileComponent>
    </>
  );
};
