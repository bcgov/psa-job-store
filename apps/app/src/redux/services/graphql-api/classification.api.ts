/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface ClassificationModel {
  id: string;
  code: string;
}

export interface GetClassificationsResponse {
  classifications: ClassificationModel[];
}

export const classificationApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getClassifications: build.query<GetClassificationsResponse, void>({
      query: () => {
        return {
          document: gql`
            query Classifications {
              classifications(orderBy: [{ code: asc }, { id: asc }]) {
                id
                code
              }
            }
          `,
        };
      },
    }),
  }),
});

export const { useGetClassificationsQuery, useLazyGetClassificationsQuery } = classificationApi;
