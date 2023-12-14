import { gql } from 'graphql-request';
import { Edge, Node } from 'reactflow';
import { graphqlApi } from '.';

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
  }),
});

export const { useLazyGetOrgChartQuery } = orgChartApi;
