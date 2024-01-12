/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import '../../components/app/common/css/filtered-table.page.css';
import { PageHeader } from '../../components/app/page-header.component';
import ContentWrapper from '../home/components/content-wrapper.component';
import MyPositionsTable from '../my-positions/components/my-positions-table.component';
import { PositionRequestsSearch } from '../total-comp-approved-requests/components/position-requests-search.component';

export const ClassificationTasksPage = () => {
  // const ministriesData = useGetJobProfilesDraftsMinistriesQuery().data?.jobProfilesDraftsMinistries;
  // const careerGroupData = useGetJobProfilesDraftsCareerGroupsQuery().data?.jobProfilesDraftsCareerGroups;

  // const handleDataAvailability = (isDataAvailable: boolean) => {
  //   setHasData(isDataAvailable);
  // };

  // if (!ministriesData || !careerGroupData) return <>Loading..</>;

  const [hasData, setHasData] = useState(false);

  const handleDataAvailability = (isDataAvailable: boolean) => {
    setHasData(isDataAvailable);
  };

  return (
    <>
      <PageHeader title="Approved" subTitle="Job profiles available in the job store." />

      <ContentWrapper>
        {hasData && (
          <PositionRequestsSearch
            searchPlaceHolderText={'Search by job title or submission ID'}
            // additionalFilters={true}
            mode="classification"
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
          onDataAvailable={handleDataAvailability}
          tableTitle={'Requests'}
          mode="classification"
          style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}
          // handleTableChangeCallback={handleTableChangeCallback}
        ></MyPositionsTable>
      </ContentWrapper>
    </>
  );
};
