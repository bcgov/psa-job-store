import { gql } from 'graphql-request';
import { graphqlApi } from '..';
import { GetUserResponse } from './dtos/get-user-response.dto';
import { GetUsersResponse } from './dtos/get-users-response.dto';

export const settingsApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<GetUsersResponse, Record<string, never> | undefined>({
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

export const { useLazyGetUserQuery, useLazyGetUsersQuery } = settingsApi;
