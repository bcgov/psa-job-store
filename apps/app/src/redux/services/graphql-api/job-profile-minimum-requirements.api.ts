/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface JobProfileMinimumRequirementsModel {
  id: number;
  requirement: string;
  grade: string;
}

export interface GetJobProfileMinimumRequirementsResponse {
  jobProfileMinimumRequirements: JobProfileMinimumRequirementsModel[];
}

export const jobFamilyApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getJobProfileMinimumRequirements: build.query<GetJobProfileMinimumRequirementsResponse, void>({
      query: () => {
        return {
          document: gql`
            query JobProfileMinimumRequirements {
              jobProfileMinimumRequirements {
                id
                requirement
                grade
              }
            }
          `,
        };
      },
    }),
  }),
});

export const { useGetJobProfileMinimumRequirementsQuery, useLazyGetJobProfileMinimumRequirementsQuery } = jobFamilyApi;
