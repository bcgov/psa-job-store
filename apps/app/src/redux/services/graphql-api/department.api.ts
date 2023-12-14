import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface DepartmentModel {
  id: string;
  name: string;
}

export interface GetDepartmentsResponse {
  departments: DepartmentModel[];
}

export const departmentApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getDepartments: build.query<GetDepartmentsResponse, void>({
      query: () => {
        return {
          document: gql`
            query Departments {
              departments {
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

export const { useGetDepartmentsQuery, useLazyGetDepartmentsQuery } = departmentApi;
