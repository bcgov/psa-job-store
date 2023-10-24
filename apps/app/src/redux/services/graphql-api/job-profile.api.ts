/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface JobProfileModel {
  id: number;
  classification_id: number;
  ministry_id: number;
  stream: string;
  title: string;
  number: number;
  context: string;
  overview: string;
}

export interface GetJobProfilesArgs {
  search?: string;
  where?: Record<string, any>;
  orderBy?: Record<string, 'asc' | 'desc'>;
  take?: number;
  skip?: number;
}

export interface GetJobProfilesResponse {
  jobProfiles: JobProfileModel[];
}

export interface GetJobProfileArgs {
  id: number;
}

export interface GetJobProfileResponse {
  jobProfile: JobProfileModel;
}

export const jobProfileApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getJobProfiles: build.query<GetJobProfilesResponse, GetJobProfilesArgs | undefined>({
      query: (args?: GetJobProfilesArgs | undefined) => {
        console.log('args: ', args);

        return {
          document: gql`
            query JobProfiles {
              jobProfiles(search: "Assistant") {
                id
                classification_id
                ministry_id
                stream
                title
                number
                context
                overview
              }
            }
          `,
        };
      },
    }),
    getJobProfile: build.query<GetJobProfileResponse, GetJobProfileArgs>({
      query: (args: GetJobProfileArgs) => {
        return {
          document: gql`
            query JobProfile {
              jobProfile(id: "${args.id}") {
                id
                classification_id
                ministry_id
                stream
                title
                number
                context
                overview
              }
            }
          `,
        };
      },
    }),
  }),
});

export const { useGetJobProfileQuery, useGetJobProfilesQuery, useLazyGetJobProfilesQuery } = jobProfileApi;
