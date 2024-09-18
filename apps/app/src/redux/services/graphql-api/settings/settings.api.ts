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
import { GetDepartmentForSettingsArgs } from './dtos/get-department-for-settings-args.dto';
import { GetDepartmentForSettingsResponse } from './dtos/get-department-for-settings-response.dto';
import { GetDepartmentsForSettingsArgs } from './dtos/get-departments-for-settings-args.dto';
import { GetDepartmentsForSettingsResponse } from './dtos/get-departments-for-settings-response.dto';
import { GetOrganizationsPicklistResponse } from './dtos/get-organizations-picklist-response.dto';
import { GetOrganizationsResponse } from './dtos/get-organizations-response.dto';
import { GetRolesResponse } from './dtos/get-roles-response.dto';
import { GetUserPositionResponse } from './dtos/get-user-position-response.dto';
import { GetUserResponse } from './dtos/get-user-response.dto';
import { GetUsersForSettingsArgs } from './dtos/get-users-for-settings-args.dto';
import { GetUsersForSettingsResponse } from './dtos/get-users-for-settings-response.dto';
import { GetUsersResponse } from './dtos/get-users-response.dto';
import { ImportUserInput } from './dtos/import-user-input.dto';
import { ImportUserResponse } from './dtos/import-user-response.dto';
import { ImportUserSearchInput } from './dtos/import-user-search-input.dto';
import { ImportUserSearchResponse } from './dtos/import-user-search-response.dto';
import { SetUserOrgChartAccessInput } from './dtos/set-user-org-chart-access-input.dto';
import { SetUserOrgChartAccessResponse } from './dtos/set-user-org-chart-access-resposne.dto';
import { UpdateDepartmentMetadataInput } from './dtos/update-department-metadata-input.dto';
import { UpdateDepartmentMetadataResponse } from './dtos/update-department-metadata-response.dto';

export const settingsApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getDepartmentsForSettings: build.query<
      GetDepartmentsForSettingsResponse,
      GetDepartmentsForSettingsArgs | undefined
    >({
      query: (args: GetDepartmentsForSettingsArgs) => ({
        document: gql`
          query GetDepartmentsForSettings(
            $where: DepartmentWhereInput
            $orderBy: [DepartmentOrderByWithRelationAndSearchRelevanceInput!]
            $take: Int
            $skip: Int
          ) {
            departmentsWithCount(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
              data {
                id
                name
                organization {
                  name
                }
                effective_status
              }
              pageInfo {
                page
                pageCount
                pageSize
                totalCount
              }
            }
          }
        `,
        variables: {
          where: args.where,
          orderBy: args.orderBy,
          take: args.take,
          skip: args.skip,
        },
      }),
    }),
    getDepartmentForSettings: build.query<GetDepartmentForSettingsResponse, GetDepartmentForSettingsArgs>({
      providesTags: (_result, _err, arg) => {
        return [{ type: 'settingsDepartment', id: arg.where.id }];
      },
      query: (args: GetDepartmentForSettingsArgs) => ({
        document: gql`
          query Department($where: DepartmentWhereUniqueInput!) {
            department(where: $where) {
              id
              location_id
              effective_status
              name
              metadata {
                is_statutorily_excluded
              }
              organization {
                name
              }
            }
          }
        `,
        variables: {
          where: args.where,
        },
      }),
    }),
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
    getOrganizationsPicklistForSettings: build.query<GetOrganizationsPicklistResponse, void>({
      query: () => ({
        document: gql`
          query OrganizationsPicklist {
            organizations(orderBy: [{ name: asc }]) {
              id
              name
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
    getUsersForSettings2: build.query<GetUsersForSettingsResponse, GetUsersForSettingsArgs | undefined>({
      query: (args: GetUsersForSettingsArgs) => ({
        document: gql`
          query GetUsersForSettings(
            $where: UserWhereInput
            $orderBy: [UserOrderByWithRelationAndSearchRelevanceInput!]
            $take: Int
            $skip: Int
          ) {
            usersWithCount(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
              data {
                id
                name
                email
                roles
                metadata
              }
              pageInfo {
                page
                pageCount
                pageSize
                totalCount
              }
            }
          }
        `,
        variables: {
          where: args.where,
          orderBy: args.orderBy,
          take: args.take,
          skip: args.skip,
        },
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
    updateDepartmentMetadata: build.mutation<UpdateDepartmentMetadataResponse, UpdateDepartmentMetadataInput>({
      query: (input: UpdateDepartmentMetadataInput) => ({
        document: gql`
          mutation UpdateDepartmentMetadata($data: UpdateDepartmentMetadataInput!) {
            updateDepartmentMetadata(data: $data) {
              id
              metadata {
                is_statutorily_excluded
              }
            }
          }
        `,
        variables: {
          data: input,
        },
      }),
      invalidatesTags: (_result, _err, arg) => {
        return [{ type: 'settingsDepartment', id: arg.department_id }];
      },
    }),
  }),
});

export const {
  useLazyGetDepartmentForSettingsQuery,
  useLazyGetDepartmentsForSettingsQuery,
  useLazyGetOrganizationsForSettingsQuery,
  useLazyGetOrganizationsPicklistForSettingsQuery,
  useLazyGetRolesForSettingsQuery,
  useLazyGetUserForSettingsQuery,
  useLazyGetUserPositionForSettingsQuery,
  useLazyGetUsersForSettingsQuery,
  useLazyGetUsersForSettings2Query,
  useLazyImportUserSearchQuery,
  useGetOrganizationsForSettingsQuery,
  useGetOrganizationsPicklistForSettingsQuery,
  useGetDepartmentForSettingsQuery,
  useGetDepartmentsForSettingsQuery,
  useGetRolesForSettingsQuery,
  useGetUserForSettingsQuery,
  useGetUsersForSettingsQuery,
  useGetUsersForSettings2Query,
  useAssignUserRolesMutation,
  useImportUserMutation,
  useSetUserOrgChartAccessMutation,
  useUpdateDepartmentMetadataMutation,
} = settingsApi;
