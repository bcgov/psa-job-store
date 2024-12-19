import { gql } from 'graphql-request';
import { Edge, Node } from 'reactflow';
import { graphqlApi } from '.';

export interface OrgChartDepartmentFilterModel {
  label: string;
  value: string;
  selectable: boolean;
  children: { label: string; value: string; filterString: string }[];
}

export interface GetOrgChartDepartmentFilterResponse {
  getOrgChartDepartmentFilter: OrgChartDepartmentFilterModel[];
}

export interface OrgChartModel {
  edges: Edge[];
  nodes: Node[];
}

export interface GetOrgChartResponse {
  orgChart: OrgChartModel;
}

export const orgChartApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getOrgChart: build.query<GetOrgChartResponse, string>({
      query: (department_id: string) => {
        return {
          document: gql`
          query OrgChart {
            orgChart(where: { department_id: "${department_id}" }) {
              edges {
                id
                source
                target
                type
              }
              nodes {
                id
                type
                data {
                  id
                  title
                  position_status
                  classification {
                    id
                    code
                    name
                  }
                  department {
                    id
                    organization_id
                    name
                  }
                  employees {
                    id
                    name
                    status
                  }
                }
                position {
                  x
                  y
                }
              }
            }
          }
          `,
        };
      },
    }),
    getOrgChartDepartmentFilter: build.query<GetOrgChartDepartmentFilterResponse, void>({
      query: () => {
        return {
          document: gql`
            query GetOrgChartDepartmentFilter {
              getOrgChartDepartmentFilter {
                label
                value
                selectable
                children {
                  label
                  value
                  filterString
                  location_id
                  location_name
                }
              }
            }
          `,
        };
      },
    }),
  }),
});

export const {
  useGetOrgChartQuery,
  useGetOrgChartDepartmentFilterQuery,
  useLazyGetOrgChartQuery,
  useLazyGetOrgChartDepartmentFilterQuery,
} = orgChartApi;
