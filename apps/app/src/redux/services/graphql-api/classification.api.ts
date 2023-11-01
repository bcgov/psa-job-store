/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface ClassificationModel {
  id: number;
  grid: {
    name: string;
  };
  occupation_group: {
    name: string;
  };
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
              classifications {
                id
                grid {
                  name
                }
                occupation_group {
                  name
                }
              }
            }
          `,
        };
      },
    }),
  }),
});

export const { useGetClassificationsQuery, useLazyGetClassificationsQuery } = classificationApi;
