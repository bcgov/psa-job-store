import { gql } from 'graphql-request';

import { graphqlApi } from '.';

export const userApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<
      { users: { id: string; name: string; email: string; roles: string[] }[] },
      Record<string, never> | undefined
    >({
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
    getUser: build.query<
      {
        user: {
          id: string;
          name: string;
          email: string;
          username: string;
          roles: string[];
          metadata: {
            crm: {
              account_id: number | null;
              contact_id: number | null;
            };
            org_chart: {
              department_ids: string;
            };
            peoplesoft: {
              employee_id: string | null;
              position_id: string | null;
              department_id: string | null;
              organization_id: string | null;
            };
          };
          created_at: Date | null;
          updated_at: Date | null;
          deleted_at: Date | null;
        };
      },
      string
    >({
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

export const { useLazyGetUsersQuery, useLazyGetUserQuery } = userApi;
