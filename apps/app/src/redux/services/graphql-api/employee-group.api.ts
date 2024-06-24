import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface EmployeeGroupModel {
  id: string;
  name: string;
}

interface EmployeeGroupsArgs {
  ids: string[];
}

export interface GetEmployeeGroupsResponse {
  employeeGroups: EmployeeGroupModel[];
}

export const employeeGroupApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getEmployeeGroups: build.query<GetEmployeeGroupsResponse, EmployeeGroupsArgs>({
      query: (args) => {
        return {
          document: gql`
            query GetAllEmployeeGroups($ids: [String!]) {
              employeeGroups(where: { id: { in: $ids } }) {
                id
                name
              }
            }
          `,
          variables: {
            ids: args.ids,
          },
        };
      },
    }),
  }),
});

export const { useGetEmployeeGroupsQuery, useLazyGetEmployeeGroupsQuery } = employeeGroupApi;
