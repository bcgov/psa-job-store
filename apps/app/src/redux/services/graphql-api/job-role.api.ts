/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface JobRoleModel {
  id: number;
  name: string;
  code: string;
}

export interface GetJobRolesResponse {
  jobRoles: JobRoleModel[];
}

export const jobRoleApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getJobRoles: build.query<GetJobRolesResponse, null>({
      query: () => {
        return {
          document: gql`
            query GetAllJobRoles {
              jobRoles {
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

export const { useGetJobRolesQuery, useLazyGetJobRolesQuery } = jobRoleApi;
