/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface MinistryModel {
  id: number;
  name: string;
  code: string;
}

export interface GetMinistrysResponse {
  ministries: MinistryModel[];
}

export const ministryApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getMinistries: build.query<GetMinistrysResponse, void>({
      query: () => {
        return {
          document: gql`
            query GetMinistries {
              ministries {
                id
                code
                name
              }
            }
          `,
        };
      },
    }),
  }),
});

export const { useGetMinistriesQuery, useLazyGetMinistriesQuery } = ministryApi;
