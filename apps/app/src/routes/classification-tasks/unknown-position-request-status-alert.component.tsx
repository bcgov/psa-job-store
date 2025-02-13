import { Alert, Collapse } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PositionRequestWithUnknownState,
  useGetStaleUnknownPositionRequestsQuery,
} from '../../redux/services/graphql-api/position-request.api';
import './unknown-position-request-status-alert.component.css';
const { Panel } = Collapse;

const StaleUnknownPositionRequestsAlert = () => {
  const { data, isLoading } = useGetStaleUnknownPositionRequestsQuery();
  const [staleRequests, setStaleRequests] = useState([] as PositionRequestWithUnknownState[]);

  useEffect(() => {
    if (data) {
      setStaleRequests(data?.staleUnknownPositionRequests);
    }
  }, [data]);

  console.log('staleRequests: ', staleRequests);
  if (isLoading || !staleRequests.length) {
    return null;
  }

  return (
    <Collapse style={{ marginBottom: '0px', border: '0' }} className="unknown_prs_collapse">
      <Panel
        className="unknown_prs_panel"
        header={
          <Alert
            message={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span>
                  {`${staleRequests.length} position request${staleRequests.length > 1 ? 's' : ''} with unknown status detected. Please verify that the CRM and PeopleSoft status combination is valid.`}{' '}
                </span>
                <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>Click to view details</span>
              </div>
            }
            type="error"
            showIcon
            style={{ margin: 0, borderRadius: '0px' }}
          />
        }
        showArrow={false}
        key="1"
      >
        <div style={{ padding: '0px' }}>
          {staleRequests.map((request) => {
            const metadata = request.unknownStateMetadata;
            return (
              <div
                key={request.id}
                style={{ marginBottom: '16px', borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}
              >
                <div style={{ marginBottom: '8px' }}>
                  <Link to={`/requests/positions/manage/${request.id}`}>
                    <strong>Request #{request.id}</strong>
                  </Link>
                </div>
                {metadata && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'max-content max-content',
                      columnGap: '24px',
                      rowGap: '4px',
                      fontSize: '14px',
                    }}
                  >
                    <div>
                      <strong>CRM Status:</strong> <span>{metadata.crm_status || 'N/A'}</span>
                    </div>
                    <div>
                      <strong>PeopleSoft Status:</strong> <span>{metadata.ps_status || 'N/A'}</span>
                    </div>
                    <div>
                      <strong>CRM Category:</strong> <span>{metadata.crm_category || 'N/A'}</span>
                    </div>
                    <div>
                      <strong>PS Effective Status:</strong> <span>{metadata.ps_effective_status || 'N/A'}</span>
                    </div>
                    <div>
                      <strong>CRM ID:</strong> <span>{metadata.crm_id || 'N/A'}</span>
                    </div>
                    <div>
                      <strong>CRM Lookup:</strong> <span>{metadata.crm_lookup_name || 'N/A'}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Panel>
    </Collapse>
  );
};

export default StaleUnknownPositionRequestsAlert;
