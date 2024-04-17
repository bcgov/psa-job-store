import { gql } from 'graphql-request';
import { graphqlApi } from '.';
import { OrganizationModel } from './organization';

export interface DepartmentModel {
  id: string;
  name: string;
  location_id?: string;
  organization_id?: string;
  organization?: OrganizationModel;
}

export interface DepartmentWithLocationModel {
  id: string;
  name: string;
  location_id: string;
}

export interface DepartmentWithOrganizationModel {
  id: string;
  organization_id: number;
  name: string;
}

export interface GetDepartmentsResponse {
  departments: DepartmentModel[];
}

export interface GetDepartmentResponse {
  department: DepartmentModel;
}

export interface GetDepartmentsWithLocationResponse {
  departments: DepartmentWithLocationModel[];
}

export interface GetDepartmentsWithOrganizationResponse {
  departments: DepartmentWithOrganizationModel[];
}

export const departmentApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getDepartment: build.query<GetDepartmentResponse, string>({
      query: (id) => {
        return {
          document: gql`
            query Department($id: String!) {
              department(where: { id: $id }) {
                organization {
                  id
                  peoplesoft_id
                  code
                  name
                }
              }
            }
          `,
          variables: { id },
        };
      },
    }),
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
    getDepartmentsWithOrganization: build.query<GetDepartmentsWithOrganizationResponse, void>({
      query: () => {
        return {
          document: gql`
            query Departments {
              departments {
                id
                organization_id
                name
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
  useGetDepartmentsWithOrganizationQuery,
  useLazyGetDepartmentsWithOrganizationQuery,
  useGetDepartmentQuery,
  useLazyGetDepartmentQuery,
} = departmentApi;
