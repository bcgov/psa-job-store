/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface JobProfileScopeModel {
  id: number;
  name: string;
  description: string;
}

export interface GetJobProfileScopesResponse {
  jobProfileScopes: JobProfileScopeModel[];
}

export const jobScopeApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getJobProfileScopes: build.query<GetJobProfileScopesResponse, void>({
      query: () => {
        return {
          document: gql`
            query JobProfileScopes {
              jobProfileScopes {
                id
                name
                description
              }
            }
          `,
        };
      },
    }),
  }),
});

export const { useGetJobProfileScopesQuery, useLazyGetJobProfileScopesQuery } = jobScopeApi;
