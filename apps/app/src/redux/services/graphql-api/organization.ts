/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface OrganizationModel {
  id?: number;
  peoplesoft_id?: string;
  code?: string;
  name?: string;
  departments?: DepartmentModel[];
}

export interface DepartmentModel {
  id?: number;
  name?: string;
}

export interface GetOrganizationsResponse {
  organizations: OrganizationModel[];
}

export interface GetOrganizationResponse {
  organization: OrganizationModel | null;
}

export interface GetOrganizationArgs {
  id: string;
}

export const organizationApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getOrganizations: build.query<GetOrganizationsResponse, void>({
      query: () => {
        return {
          document: gql`
            query GetOrganizations {
              organizations(orderBy: { name: asc }, where: { effective_status: { equals: "Active" } }) {
                id
                name
              }
            }
          `,
        };
      },
    }),
    getOrganization: build.query<GetOrganizationResponse, GetOrganizationArgs>({
      query: ({ id }) => {
        return {
          document: gql`
            query GetOrganization($id: String!) {
              organization(where: { id: $id }) {
                id
                name
                departments {
                  id
                  name
                }
              }
            }
          `,
          variables: { id },
        };
      },
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useLazyGetOrganizationsQuery,
  useGetOrganizationQuery,
  useLazyGetOrganizationQuery,
} = organizationApi;
