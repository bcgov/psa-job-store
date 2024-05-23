import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export const savedJobProfileApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    saveJobProfile: build.mutation<boolean, { jobProfileId: number }>({
      query: ({ jobProfileId }) => ({
        document: gql`
          mutation SaveJobProfile($jobProfileId: Float!) {
            saveJobProfile(jobProfileId: $jobProfileId)
          }
        `,
        variables: { jobProfileId },
      }),
    }),
    removeSavedJobProfile: build.mutation<boolean, { jobProfileId: number }>({
      query: ({ jobProfileId }) => ({
        document: gql`
          mutation RemoveSavedJobProfile($jobProfileId: Float!) {
            removeSavedJobProfile(jobProfileId: $jobProfileId)
          }
        `,
        variables: { jobProfileId },
      }),
    }),
    getSavedJobProfileIds: build.query<{ getSavedJobProfileIds: number[] }, void>({
      query: () => ({
        document: gql`
          query GetSavedJobProfileIds {
            getSavedJobProfileIds
          }
        `,
      }),
    }),
  }),
});

export const { useSaveJobProfileMutation, useRemoveSavedJobProfileMutation, useGetSavedJobProfileIdsQuery } =
  savedJobProfileApi;
