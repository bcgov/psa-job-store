/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';
import {
  CreateJobProfileInput,
  CreateJobProfileResponse,
  GetJobProfileArgs,
  GetJobProfileResponse,
  GetJobProfilesArgs,
  GetJobProfilesResponse,
} from './job-profile-types';

export const jobProfileApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getJobProfiles: build.query<GetJobProfilesResponse, GetJobProfilesArgs | undefined>({
      query: (args: GetJobProfilesArgs = {}) => {
        return {
          document: gql`
            query JobProfiles($search: String, $where: JobProfileWhereInput, $take: Int, $skip: Int) {
              jobProfiles(search: $search, where: $where, take: $take, skip: $skip) {
                id
                stream
                title
                number
                context
                overview
                accountabilities
                requirements
                behavioural_competencies {
                  behavioural_competency {
                    id
                    name
                    description
                  }
                }
                classification {
                  id
                  code
                }
                family {
                  id
                  name
                }
                role {
                  id
                  name
                }
                career_group {
                  id
                  name
                }
                organization {
                  id
                  name
                }
                reports_to {
                  classification {
                    id
                    code
                  }
                }
              }
              jobProfilesCount(search: $search, where: $where)
            }
          `,
          variables: {
            search: args.search,
            where: args.where,
            skip: args.skip,
            take: args.take,
          },
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
                stream
                title
                number
                context
                overview
                accountabilities
                requirements
                behavioural_competencies {
                  behavioural_competency {
                    id
                    name
                    description
                  }
                }
                classification {
                  id
                  code
                }
                family {
                  id
                  name
                }
                role {
                  id
                  name
                }
                career_group {
                  id
                  name
                }
                organization {
                  id
                  name
                }
                reports_to {
                  classification {
                    id
                    code
                  }
                }
              }
            }
          `,
        };
      },
    }),
    createJobProfile: build.mutation<CreateJobProfileResponse, CreateJobProfileInput>({
      query: (input: CreateJobProfileInput) => {
        return {
          document: gql`
            mutation CreateJobProfile($data: JobProfileCreateInput!) {
              createJobProfile(data: $data)
            }
          `,
          variables: {
            data: input,
          },
        };
      },
    }),
  }),
});

export const {
  useGetJobProfileQuery,
  useLazyGetJobProfileQuery,
  useGetJobProfilesQuery,
  useLazyGetJobProfilesQuery,
  useCreateJobProfileMutation,
} = jobProfileApi;
