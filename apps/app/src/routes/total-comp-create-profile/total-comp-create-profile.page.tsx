/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import LoadingComponent from '../../components/app/common/components/loading.component';
import '../../components/app/common/css/custom-form.css';
import '../../components/app/common/css/filtered-table.page.css';
import { useLazyGetJobProfileQuery } from '../../redux/services/graphql-api/job-profile.api';
import NotFoundComponent from '../not-found/404';
import { TotalCompCreateProfileComponent } from './components/total-comp-create-profile.component';

export const TotalCompCreateProfilePage = () => {
  const { id: urlId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState(urlId);
  const [version, setVersion] = useState('');

  const [trigger, { data: jobProfileData, isFetching, isError, error }] = useLazyGetJobProfileQuery();
  const navigate = useNavigate();

  // Refetch data when the component mounts or the id changes
  useEffect(() => {
    setId(urlId);
    setVersion(searchParams.get('version') ?? '');

    // setSearchParams(version ?? '');
    if (urlId) {
      trigger(
        { id: parseInt(id ?? ''), version: version ? parseInt(version ?? '') : undefined },
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

  return !jobProfileData ? (
    <NotFoundComponent entity="profile" />
  ) : (
    <TotalCompCreateProfileComponent
      jobProfileData={jobProfileData}
      id={id}
      setId={setId}
      setVersion={setVersion}
    ></TotalCompCreateProfileComponent>
  );
};
