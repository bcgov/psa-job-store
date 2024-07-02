// TODO:
//  The instead of injecting endpoints into graphqlApi, create settingsApi so endpoints can be named properly
//    - getOrganizations
//    - getUsers
//    - getUser
//      etc...

import { gql } from 'graphql-request';
import { graphqlApi } from '..';
import { GetOrganizationsResponse } from './dtos/get-organizations-response.dto';
import { GetUserResponse } from './dtos/get-user-response.dto';
import { GetUsersResponse } from './dtos/get-users-response.dto';
import { SetUserOrgChartAccessInput } from './dtos/set-user-org-chart-access-input.dto';
import { SetUserOrgChartAccessResponse } from './dtos/set-user-org-chart-access-resposne.dto';

export const settingsApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getOrganizationsForSettings: build.query<GetOrganizationsResponse, void>({
      query: () => ({
        document: gql`
          query Organizations {
            organizations {
              id
              name
              effective_status
              departments {
                id
                name
                effective_status
              }
            }
          }
        `,
      }),
    }),
    getUsersForSettings: build.query<GetUsersResponse, void>({
      query: () => ({
        document: gql`
          query Users {
            users {
              id
              name
              username
              email
              roles
              metadata
            }
          }
        `,
      }),
    }),
    getUserForSettings: build.query<GetUserResponse, string>({
      query: (id: string) => ({
        document: gql`
          query User($id: String) {
            user(where: { id: $id }) {
              id
              name
              email
              username
              roles
              metadata
              created_at
              updated_at
              deleted_at
            }
          }
        `,
        variables: {
          id,
        },
      }),
    }),
    setUserOrgChartAccess: build.mutation<SetUserOrgChartAccessResponse, SetUserOrgChartAccessInput>({
      query: (input: SetUserOrgChartAccessInput) => ({
        document: gql`
          mutation SetUserOrgChartAccess($data: SetUserOrgChartAccessInput!) {
            setUserOrgChartAccess(data: $data) {
              id
              name
              email
              username
              roles
              metadata
              created_at
              updated_at
              deleted_at
            }
          }
        `,
        variables: {
          data: input,
        },
      }),
    }),
  }),
});

export const {
  useLazyGetOrganizationsForSettingsQuery,
  useLazyGetUserForSettingsQuery,
  useLazyGetUsersForSettingsQuery,
  useGetOrganizationsForSettingsQuery,
  useGetUserForSettingsQuery,
  useGetUsersForSettingsQuery,
  useSetUserOrgChartAccessMutation,
} = settingsApi;
