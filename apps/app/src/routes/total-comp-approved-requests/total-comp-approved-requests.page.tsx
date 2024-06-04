/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../components/app/common/css/filtered-table.page.css';
import { PageHeader } from '../../components/app/page-header.component';
import ContentWrapper from '../home/components/content-wrapper.component';
import MyPositionsTable from '../my-position-requests/components/my-position-requests-table.component';
import { PositionRequestsSearch } from './components/position-requests-search.component';

interface Selection {
  value: string;
  type: string;
}

export const TotalCompApprovedRequestsPage = () => {
  const [hasData] = useState(true); // todo: set back to false
  const [allSelections, setAllSelections] = useState<Selection[]>([]); // holds tags from all filters

  const navigate = useNavigate();
  const location = useLocation();
  const getBasePath = useCallback((path: string) => {
    const pathParts = path.split('/');
    // Check if the last part is a number (ID), if so, remove it
    if (!isNaN(Number(pathParts[pathParts.length - 1]))) {
      pathParts.pop(); // Remove the last part (job profile ID)
    }
    return pathParts.join('/');
  }, []);

  const clearFilters = () => {
    // Update the URL parameters
    setAllSelections([]);

    const basePath = getBasePath(location.pathname);

    navigate(
      {
        pathname: basePath,
      },
      { replace: true },
    );
  };
  return (
    <>
      <PageHeader title="Approved" subTitle="List of job profiles instantly approved by the JobStore." />

      <ContentWrapper>
        {hasData && (
          <PositionRequestsSearch
            searchPlaceHolderText={'Search by job title or submission ID'}
            // additionalFilters={true}
            fullWidth={true}
            // ministriesData={ministriesData}
            // careerGroupData={careerGroupData}
            allSelections={allSelections}
            setAllSelections={setAllSelections}
          />
        )}

        {/* <TotalCompProfilesTable
          state="PUBLISHED"
          itemsPerPage={2}
          tableTitle={'Job profiles'}
          style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}
          onDataAvailable={handleDataAvailability}
        ></TotalCompProfilesTable> */}

        <MyPositionsTable
          tableTitle={'Requests'}
          mode="total-compensation"
          style={{ marginTop: '1rem', flexGrow: '1', display: 'flex', flexDirection: 'column' }}
          // handleTableChangeCallback={handleTableChangeCallback}
          clearFilters={clearFilters}
        ></MyPositionsTable>
      </ContentWrapper>
    </>
  );
};
