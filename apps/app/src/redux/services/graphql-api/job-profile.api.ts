/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';
import {
  CreateJobProfileInput,
  CreateJobProfileResponse,
  DuplicateJobProfileResponse,
  GetJobProfileArgs,
  GetJobProfileResponse,
  GetJobProfilesArgs,
  GetJobProfilesDraftsResponse,
  GetJobProfilesResponse,
  IsJobProfileNumberAvailableResponse,
  JobProfilesCareerGroupsResponse,
  JobProfilesDraftsCareerGroupsResponse,
  JobProfilesDraftsMinistriesResponse,
  JobProfilesMinistriesResponse,
  NextAvailableJobProfileNumberResponse,
} from './job-profile-types';

export const jobProfileApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getJobProfiles: build.query<GetJobProfilesResponse, GetJobProfilesArgs | undefined>({
      query: (args: GetJobProfilesArgs = {}) => {
        return {
          document: gql`
            query JobProfiles(
              $search: String
              $where: JobProfileWhereInput
              $take: Int
              $skip: Int
              $orderBy: [JobProfileOrderByWithRelationAndSearchRelevanceInput!]
            ) {
              jobProfiles(search: $search, where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
                id
                streams {
                  stream {
                    id
                    job_family_id
                    name
                  }
                }
                title
                number
                context {
                  id
                  description
                }
                overview
                accountabilities
                education
                job_experience
                behavioural_competencies {
                  behavioural_competency {
                    id
                    name
                    description
                  }
                }
                classifications {
                  classification {
                    id
                    code
                    name
                  }
                }
                jobFamilies {
                  jobFamily {
                    id
                    name
                  }
                }
                role {
                  id
                  name
                }
                organizations {
                  organization {
                    id
                    name
                  }
                }
                reports_to {
                  classification {
                    id
                    code
                  }
                }
                updated_at
                owner {
                  name
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
            orderBy: args.orderBy,
          },
        };
      },
    }),
    getJobProfilesDrafts: build.query<GetJobProfilesDraftsResponse, GetJobProfilesArgs | undefined>({
      query: (args: GetJobProfilesArgs = {}) => {
        return {
          document: gql`
            query JobProfilesDrafts(
              $search: String
              $where: JobProfileWhereInput
              $take: Int
              $skip: Int
              $orderBy: [JobProfileOrderByWithRelationAndSearchRelevanceInput!]
            ) {
              jobProfilesDrafts(search: $search, where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
                id
                streams {
                  stream {
                    id
                    job_family_id
                    name
                  }
                }
                title
                number
                context {
                  id
                  description
                }
                overview
                accountabilities
                education
                job_experience
                behavioural_competencies {
                  behavioural_competency {
                    id
                    name
                    description
                  }
                }
                classifications {
                  classification {
                    id
                    code
                    name
                  }
                }
                jobFamilies {
                  jobFamily {
                    id
                    name
                  }
                }
                role {
                  id
                  name
                }
                organizations {
                  organization {
                    id
                    name
                  }
                }
                reports_to {
                  classification {
                    id
                    code
                  }
                }
                updated_at
                owner {
                  name
                }
              }
              jobProfilesDraftsCount(search: $search, where: $where)
            }
          `,
          variables: {
            search: args.search,
            where: args.where,
            skip: args.skip,
            take: args.take,
            orderBy: args.orderBy,
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
                updated_at
                streams {
                  stream {
                      id
                      name
                      job_family_id
                  }
                }
                title
                number
                context {
                  id,
                  description
                }
                state
                security_screenings
                all_reports_to
                all_organizations
                willingness_statements
                knowledge_skills_abilities
                professional_registration_requirements
                optional_requirements
                program_overview
                review_required
                overview
                accountabilities
                preferences
                education
                job_experience
                scope{
                  id
                  name
                  description
                }
                total_comp_create_form_misc
                role_type {
                  id
                  name
                }
                behavioural_competencies {
                  behavioural_competency {
                    id
                    name
                    description
                  }
                }
                classifications {
                  classification {
                    id
                    code
                    name
                  }
                }
                jobFamilies {
                  jobFamily {
                      id
                      name
                  }
                }
                role {
                  id
                  name
                }
                organizations {
                  organization{
                    id
                    name
                  }
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
    createOrUpdateJobProfile: build.mutation<CreateJobProfileResponse, CreateJobProfileInput>({
      query: (input: CreateJobProfileInput) => {
        return {
          document: gql`
            mutation CreateOrUpdateJobProfile($data: JobProfileCreateInput!, $id: Int) {
              createOrUpdateJobProfile(data: $data, id: $id)
            }
          `,
          variables: {
            data: input.data,
            id: input.id,
          },
        };
      },
    }),

    duplicateJobProfile: build.mutation<DuplicateJobProfileResponse, { jobProfileId: number }>({
      query: (args) => {
        return {
          document: gql`
            mutation DuplicateJobProfile($jobProfileId: Int!) {
              duplicateJobProfile(jobProfileId: $jobProfileId)
            }
          `,
          variables: args,
        };
      },
    }),

    getJobProfilesCareerGroups: build.query<JobProfilesCareerGroupsResponse, void>({
      query: () => {
        return {
          document: gql`
            query JobProfilesCareerGroups {
              jobProfilesCareerGroups {
                id
                name
              }
            }
          `,
        };
      },
    }),
    getJobProfilesMinistries: build.query<JobProfilesMinistriesResponse, void>({
      query: () => {
        return {
          document: gql`
            query JobProfilesMinistries {
              jobProfilesMinistries {
                id
                name
              }
            }
          `,
        };
      },
    }),
    getJobProfilesDraftsMinistries: build.query<JobProfilesDraftsMinistriesResponse, void>({
      query: () => {
        return {
          document: gql`
            query JobProfilesDraftsMinistries {
              jobProfilesDraftsMinistries {
                id
                name
              }
            }
          `,
        };
      },
    }),
    getJobProfilesDraftsCareerGroups: build.query<JobProfilesDraftsCareerGroupsResponse, void>({
      query: () => {
        return {
          document: gql`
            query JobProfilesDraftsCareerGroups {
              jobProfilesDraftsCareerGroups {
                id
                name
              }
            }
          `,
        };
      },
    }),

    getNextAvailableJobProfileNumber: build.query<NextAvailableJobProfileNumberResponse, void>({
      query: () => ({
        document: gql`
          query NextAvailableJobProfileNumber {
            nextAvailableJobProfileNumber
          }
        `,
      }),
    }),

    isJobProfileNumberAvailable: build.query<IsJobProfileNumberAvailableResponse, number>({
      query: (number) => ({
        document: gql`
          query IsJobProfileNumberAvailable($number: Int!) {
            isJobProfileNumberAvailable(number: $number)
          }
        `,
        variables: {
          number,
        },
      }),
    }),
  }),
});

export const {
  useGetJobProfileQuery,
  useGetJobProfilesCareerGroupsQuery,
  useGetJobProfilesDraftsCareerGroupsQuery,
  useGetJobProfilesMinistriesQuery,
  useGetJobProfilesDraftsMinistriesQuery,
  useLazyGetJobProfileQuery,
  useGetJobProfilesQuery,
  useLazyGetJobProfilesQuery,
  useLazyGetJobProfilesDraftsQuery,
  useCreateOrUpdateJobProfileMutation,

  useGetNextAvailableJobProfileNumberQuery,
  useIsJobProfileNumberAvailableQuery,
  useLazyIsJobProfileNumberAvailableQuery,
  useLazyGetNextAvailableJobProfileNumberQuery,
  useDuplicateJobProfileMutation,
} = jobProfileApi;
