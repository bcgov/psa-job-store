/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import '../../components/app/common/css/filtered-table.page.css';
import { PageHeader } from '../../components/app/page-header.component';
import ContentWrapper from '../home/components/content-wrapper.component';
import MyPositionsTable from '../my-position-requests/components/my-position-requests-table.component';
import { PositionRequestsSearch } from './components/position-requests-search.component';

export const TotalCompApprovedRequestsPage = () => {
  const [hasData] = useState(true); // todo: set back to false

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
        ></MyPositionsTable>
      </ContentWrapper>
    </>
  );
};
