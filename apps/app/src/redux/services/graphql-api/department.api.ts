import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface DepartmentModel {
  id: string;
  name: string;
}

export interface DepartmentWithLocationModel {
  id: string;
  name: string;
  location_id: string;
}

export interface GetDepartmentsResponse {
  departments: DepartmentModel[];
}

export interface GetDepartmentsWithLocationResponse {
  departments: DepartmentWithLocationModel[];
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
    getDepartmentsWithLocation: build.query<GetDepartmentsWithLocationResponse, void>({
      query: () => {
        return {
          document: gql`
            query Departments {
              departments {
                id
                name
                location_id
              }
            }
          `,
        };
      },
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useLazyGetDepartmentsQuery,
  useGetDepartmentsWithLocationQuery,
  useLazyGetDepartmentsWithLocationQuery,
} = departmentApi;
