/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface LocationModel {
  id: string;
  peoplesoft_id: string;
  code: string;
  name: string;
  effective_status: string;
  departmentCount: number;
}

export interface GetLocationsResponse {
  locations: LocationModel[];
}

export const locationApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getLocations: build.query<GetLocationsResponse, void>({
      query: () => {
        return {
          document: gql`
            query Locations {
              locations(where: { effective_status: { equals: "Active" } }, orderBy: { name: asc }) {
                id
                peoplesoft_id
                code
                name
                effective_status
                departmentCount
              }
            }
          `,
        };
      },
    }),
  }),
});

export const { useGetLocationsQuery, useLazyGetLocationsQuery } = locationApi;
