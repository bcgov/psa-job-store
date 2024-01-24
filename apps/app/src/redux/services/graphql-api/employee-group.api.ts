import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface EmployeeGroupModel {
  id: string;
  name: string;
}

export interface GetEmployeeGroupsResponse {
  employeeGroups: EmployeeGroupModel[];
}

export const employeeGroupApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getEmployeeGroups: build.query<GetEmployeeGroupsResponse, void>({
      query: () => {
        return {
          document: gql`
            query GetAllEmployeeGroups {
              employeeGroups {
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

export const { useGetEmployeeGroupsQuery, useLazyGetEmployeeGroupsQuery } = employeeGroupApi;
