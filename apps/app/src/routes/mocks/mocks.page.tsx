import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useUpdateMockIncidentByPositionRequestIdMutation } from '../../redux/services/graphql-api/mocks.api';

const MocksPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [updateMockIncidentByPositionRequestId, { data, isLoading, error }] =
    useUpdateMockIncidentByPositionRequestIdMutation();

  useEffect(() => {
    const updateIncident = async () => {
      // Get statusId from URL search params
      const searchParams = new URLSearchParams(location.search);
      const statusId = parseInt(searchParams.get('statusId') || '0');

      if (!statusId) {
        console.error('No statusId provided in URL');
        return;
      }

      try {
        await updateMockIncidentByPositionRequestId({
          id: id ?? '',
          data: {
            statusWithType: {
              status: {
                id: statusId,
              },
            },
          },
        });
      } catch (err) {
        console.error('Error updating mock incident:', err);
      }
    };

    if (id && location.search) {
      updateIncident();
    }
  }, [id, location.search, updateMockIncidentByPositionRequestId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default MocksPage;
