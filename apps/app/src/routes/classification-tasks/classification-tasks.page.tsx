/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../components/app/common/css/filtered-table.page.css';
import { PageHeader } from '../../components/app/page-header.component';
import ContentWrapper from '../../components/content-wrapper.component';
import MyPositionsTable from '../my-position-requests/components/my-position-requests-table.component';
import { PositionRequestsSearch } from '../total-comp-approved-requests/components/position-requests-search.component';

interface Selection {
  value: string;
  type: string;
}
export const ClassificationTasksPage = () => {
  const [hasData, setHasData] = useState(false);
  const [allSelections, setAllSelections] = useState<Selection[]>([]); // holds tags from all filters

  const handleDataAvailability = (isDataAvailable: boolean) => {
    setHasData(isDataAvailable);
  };
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
      <PageHeader title="My tasks" subTitle="List of job profiles that need review." />

      <ContentWrapper>
        {hasData && (
          <PositionRequestsSearch
            searchPlaceHolderText={'Search by job title or submission ID'}
            // additionalFilters={true}
            mode="classification"
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
          onDataAvailable={handleDataAvailability}
          tableTitle={'Requests'}
          mode="classification"
          style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}
          // handleTableChangeCallback={handleTableChangeCallback}
          clearFilters={clearFilters}
        ></MyPositionsTable>
      </ContentWrapper>
    </>
  );
};
