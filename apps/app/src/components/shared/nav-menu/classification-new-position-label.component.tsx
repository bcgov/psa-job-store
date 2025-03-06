import { Badge, Tooltip } from 'antd';
import { useGetStaleUnknownPositionRequestsQuery } from '../../../redux/services/graphql-api/position-request.api';

export const ClassificationNewPositionLabel = () => {
  const { data } = useGetStaleUnknownPositionRequestsQuery();
  const staleRequests = data?.staleUnknownPositionRequests || [];

  if (!staleRequests.length) {
    return <span>New position</span>;
  }

  return (
    <span style={{ display: 'inline-block' }}>
      <Tooltip
        title={`${staleRequests.length} position request${staleRequests.length > 1 ? 's' : ''} with unknown status detected`}
        placement="right"
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          New position
          <Badge dot style={{ backgroundColor: 'rgb(197 60 53)', top: '4px' }} />
        </span>
      </Tooltip>
    </span>
  );
};
