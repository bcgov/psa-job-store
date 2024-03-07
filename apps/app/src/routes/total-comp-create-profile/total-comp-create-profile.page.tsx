/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../components/app/common/components/loading.component';
import '../../components/app/common/css/custom-form.css';
import '../../components/app/common/css/filtered-table.page.css';
import { useGetJobProfileQuery } from '../../redux/services/graphql-api/job-profile.api';
import { TotalCompCreateProfileComponent } from './components/total-comp-create-profile.component';

export const TotalCompCreateProfilePage = () => {
  const { id: urlId } = useParams();
  const [id, setId] = useState(urlId);

  const {
    data: jobProfileData,
    isFetching,
    refetch,
    // isLoading: isLoadingJobProfile,
    // isFetching: isFetchingJobProfile,
  } = useGetJobProfileQuery(
    { id: parseInt(id ?? '') },
    {
      skip: !id,
    },
  );

  // Refetch data when the component mounts or the id changes
  useEffect(() => {
    setId(urlId);
    if (urlId) {
      refetch();
    }
  }, [urlId, refetch]);

  if (isFetching) return <LoadingComponent />;

  return (
    <TotalCompCreateProfileComponent
      jobProfileData={jobProfileData}
      id={id}
      setId={setId}
    ></TotalCompCreateProfileComponent>
  );
};
