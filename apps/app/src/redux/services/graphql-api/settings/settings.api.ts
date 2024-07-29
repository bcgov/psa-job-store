/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO:
//  The instead of injecting endpoints into graphqlApi, create settingsApi so endpoints can be named properly
//    - getOrganizations
//    - getUsers
//    - getUser
//      etc...

import { gql } from 'graphql-request';
import { graphqlApi } from '..';
import { AssignUserRolesInput } from './dtos/assign-user-roles-input.dto';
import { AssignUserRolesResponse } from './dtos/assign-user-roles-response.dto';
import { GetOrganizationsResponse } from './dtos/get-organizations-response.dto';
import { GetRolesResponse } from './dtos/get-roles-response.dto';
import { GetUserPositionResponse } from './dtos/get-user-position-response.dto';
import { GetUserResponse } from './dtos/get-user-response.dto';
import { GetUsersResponse } from './dtos/get-users-response.dto';
import { ImportUserInput } from './dtos/import-user-input.dto';
import { ImportUserResponse } from './dtos/import-user-response.dto';
import { ImportUserSearchInput } from './dtos/import-user-search-input.dto';
import { ImportUserSearchResponse } from './dtos/import-user-search-response.dto';
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
    getRolesForSettings: build.query<string[], void>({
      query: () => ({
        document: gql`
          query GetRoles {
            getRoles
          }
        `,
      }),
      transformResponse: (response: GetRolesResponse) => response.getRoles,
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
      providesTags: (_result, _err, arg) => {
        return [{ type: 'settingsUser', id: arg as string }];
      },
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
    getUserPositionForSettings: build.query<GetUserPositionResponse, string>({
      query: (id: string) => ({
        document: gql`
          query Position($id: String) {
            position(where: { id: $id }) {
              id
              supervisor_id
              title
              classification {
                id
                employee_group_id
                peoplesoft_id
                code
                name
              }
              organization {
                id
                name
              }
              department {
                id
                name
              }
            }
          }
        `,
        variables: {
          id,
        },
      }),
    }),
    importUserSearch: build.query<ImportUserSearchResponse, ImportUserSearchInput>({
      query: (input: ImportUserSearchInput) => ({
        document: gql`
          query ImportUserSearch($data: ImportUserSearchInput!) {
            importUserSearch(data: $data) {
              id
              name
              email
              source
            }
          }
        `,
        variables: {
          data: input,
        },
      }),
      providesTags: ['importUserSearch'],
    }),
    assignUserRoles: build.mutation<AssignUserRolesResponse, AssignUserRolesInput>({
      query: (input: AssignUserRolesInput) => ({
        document: gql`
          query AssignUserRoles($data: AssignUserRolesInput!) {
            assignUserRoles(data: $data) {
              roles
            }
          }
        `,
        variables: {
          data: input,
        },
      }),
      invalidatesTags: (_result, _err, arg) => {
        return [{ type: 'settingsUser', id: arg.id }];
      },
    }),
    importUser: build.mutation<ImportUserResponse, ImportUserInput>({
      query: (input: ImportUserInput) => ({
        document: gql`
          query ImportUser($data: ImportUserInput!) {
            importUser(data: $data) {
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
      invalidatesTags: () => {
        return [{ type: 'importUserSearch' }];
      },
    }),
    setUserOrgChartAccess: build.mutation<SetUserOrgChartAccessResponse, SetUserOrgChartAccessInput>({
      invalidatesTags: ['settingsUser'],
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
  useLazyGetRolesForSettingsQuery,
  useLazyGetUserForSettingsQuery,
  useLazyGetUserPositionForSettingsQuery,
  useLazyGetUsersForSettingsQuery,
  useLazyImportUserSearchQuery,
  useGetOrganizationsForSettingsQuery,
  useGetRolesForSettingsQuery,
  useGetUserForSettingsQuery,
  useGetUsersForSettingsQuery,
  useAssignUserRolesMutation,
  useImportUserMutation,
  useSetUserOrgChartAccessMutation,
} = settingsApi;
