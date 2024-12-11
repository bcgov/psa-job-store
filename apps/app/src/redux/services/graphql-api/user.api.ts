import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface UserSearchResult {
  position_number: string;
  name: string;
}

export interface UserSearchResponse {
  searchUsers: {
    numberOfResults: number;
    results: UserSearchResult[];
  };
}

export const userApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    searchUsers: build.query<UserSearchResponse, string>({
      query: (search: string) => {
        return {
          document: gql`
            query SearchUsers($search: String!) {
              searchUsers(search: $search) {
                numberOfResults
                results {
                  position_number
                  name
                }
              }
            }
          `,
          variables: { search },
        };
      },
    }),
  }),
});

export const { useSearchUsersQuery, useLazySearchUsersQuery } = userApi;
