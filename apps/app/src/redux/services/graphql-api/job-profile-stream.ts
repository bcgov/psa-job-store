/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface JobProfileStreamModel {
  id: number;
  job_family_id: number;
  name: string;
}

export interface GetJobProfileStreamsResponse {
  jobProfileStreams: JobProfileStreamModel[];
}

export const jobFamilyApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getJobProfileStreams: build.query<GetJobProfileStreamsResponse, void>({
      query: () => {
        return {
          document: gql`
            query JobProfileStreams {
              jobProfileStreams {
                id
                job_family_id
                name
              }
            }
          `,
        };
      },
    }),
  }),
});

export const { useGetJobProfileStreamsQuery, useLazyGetJobProfileStreamsQuery } = jobFamilyApi;
