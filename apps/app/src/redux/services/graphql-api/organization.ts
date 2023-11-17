/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface OrganizationModel {
  id: number;
  name: string;
}

export interface GetOrganizationsResponse {
  organizations: OrganizationModel[];
}

export const organizationApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getOrganizations: build.query<GetOrganizationsResponse, void>({
      query: () => {
        return {
          document: gql`
            query GetOrganizations {
              organizations(orderBy: { name: asc }) {
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

export const { useGetOrganizationsQuery, useLazyGetOrganizationsQuery } = organizationApi;
