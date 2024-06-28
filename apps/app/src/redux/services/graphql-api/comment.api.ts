/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';
import { GetCommentsResponse } from './job-profile-types';

export const commentApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<GetCommentsResponse, number>({
      query: (record_id: number) => {
        return {
          document: gql`
          query Comments {
            comments(record_id: ${record_id}) {
              id
              author_id
              record_id
              record_type
              text
              created_at
              updated_at
            }
          }
        `,
          variables: {
            record_id: record_id,
          },
        };
      },
    }),
  }),
});

export const { useGetCommentsQuery, useLazyGetCommentsQuery } = commentApi;
