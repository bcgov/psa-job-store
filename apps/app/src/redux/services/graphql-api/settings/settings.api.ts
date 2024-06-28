import { gql } from 'graphql-request';
import { graphqlApi } from '..';
import { GetOrganizationsResponse } from './dtos/get-organizations-response.dto';
import { GetUserResponse } from './dtos/get-user-response.dto';
import { GetUsersResponse } from './dtos/get-users-response.dto';

export const settingsApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getOrganizations: build.query<GetOrganizationsResponse, undefined>({
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
    getUsers: build.query<GetUsersResponse, undefined>({
      query: () => ({
        document: gql`
          query Users {
            users {
              id
              name
              username
              email
              roles
            }
          }
        `,
      }),
    }),
    getUser: build.query<GetUserResponse, string>({
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
  }),
});

export const {
  useLazyGetOrganizationsQuery,
  useGetOrganizationsQuery,
  useLazyGetUserQuery,
  useGetUserQuery,
  useLazyGetUsersQuery,
  useGetUsersQuery,
} = settingsApi;
