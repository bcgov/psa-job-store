/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';
import { GetCommentsResponse } from './job-profile-types';

export interface CommentRequestInput {
  record_id: number;
  record_type: string;
}
export const commentApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<GetCommentsResponse, CommentRequestInput>({
      query: (input: CommentRequestInput) => {
        return {
          document: gql`
            query Comments($record_id: Float!, $record_type: String!) {
              comments(record_id: $record_id, record_type: $record_type) {
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
            record_id: input.record_id,
            record_type: input.record_type,
          },
        };
      },
    }),
  }),
});

export const { useGetCommentsQuery, useLazyGetCommentsQuery } = commentApi;
