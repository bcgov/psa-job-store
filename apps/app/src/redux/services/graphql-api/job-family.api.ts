/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface JobFamilyModel {
  id: number;
  name: string;
  code: string;
}

export interface GetJobFamilysResponse {
  jobFamilies: JobFamilyModel[];
}

export const jobFamilyApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getJobFamilies: build.query<GetJobFamilysResponse, void>({
      query: () => {
        return {
          document: gql`
            query GetAllJobFamilies {
              jobFamilies {
                id
                name
              }
            }
          `,
        };
      },
    }),
  }),
});

export const { useGetJobFamiliesQuery, useLazyGetJobFamiliesQuery } = jobFamilyApi;
