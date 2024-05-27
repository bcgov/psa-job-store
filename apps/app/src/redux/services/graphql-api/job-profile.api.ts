/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';
import {
  CreateJobProfileInput,
  CreateJobProfileResponse,
  DeleteJobProfileResponse,
  DuplicateJobProfileResponse,
  GetJobProfileArgs,
  GetJobProfileResponse,
  GetJobProfilesArchivedResponse,
  GetJobProfilesArgs,
  GetJobProfilesDraftsResponse,
  GetJobProfilesResponse,
  IsJobProfileNumberAvailableResponse,
  JobProfilesCareerGroupsResponse,
  JobProfilesClassificationsResponse,
  JobProfilesDraftsCareerGroupsResponse,
  JobProfilesDraftsClassificationsResponse,
  JobProfilesDraftsMinistriesResponse,
  JobProfilesMinistriesResponse,
  NextAvailableJobProfileNumberResponse,
  UnarchiveJobProfileResponse,
  UpdateJobProfileResponse,
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
              $sortByClassificationName: Boolean
              $sortByJobFamily: Boolean
              $sortByOrganization: Boolean
              $sortOrder: String
              $selectProfile: String
            ) {
              jobProfiles(
                search: $search
                where: $where
                take: $take
                skip: $skip
                orderBy: $orderBy
                sortByClassificationName: $sortByClassificationName
                sortOrder: $sortOrder
                sortByJobFamily: $sortByJobFamily
                sortByOrganization: $sortByOrganization
                selectProfile: $selectProfile
              ) {
                id
                all_reports_to
                all_organizations
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
                role_type {
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
              pageNumberForSelectProfile(
                search: $search
                where: $where
                take: $take
                skip: $skip
                orderBy: $orderBy
                sortByClassificationName: $sortByClassificationName
                sortOrder: $sortOrder
                sortByJobFamily: $sortByJobFamily
                sortByOrganization: $sortByOrganization
                selectProfile: $selectProfile
              )
            }
          `,
          variables: {
            search: args.search,
            where: args.where,
            skip: args.skip,
            take: args.take,
            orderBy: args.orderBy,
            sortByClassificationName: args.sortByClassificationName,
            sortByJobFamily: args.sortByJobFamily,
            sortByOrganization: args.sortByOrganization,
            sortOrder: args.sortOrder,
            selectProfile: args.selectProfile,
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
              $sortByClassificationName: Boolean
              $sortByJobFamily: Boolean
              $sortByOrganization: Boolean
              $sortOrder: String
            ) {
              jobProfilesDrafts(
                search: $search
                where: $where
                take: $take
                skip: $skip
                orderBy: $orderBy
                sortByClassificationName: $sortByClassificationName
                sortByJobFamily: $sortByJobFamily
                sortByOrganization: $sortByOrganization
                sortOrder: $sortOrder
              ) {
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
            sortByClassificationName: args.sortByClassificationName,
            sortByJobFamily: args.sortByJobFamily,
            sortByOrganization: args.sortByOrganization,
            sortOrder: args.sortOrder,
          },
        };
      },
    }),

    getJobProfilesArchived: build.query<GetJobProfilesArchivedResponse, GetJobProfilesArgs | undefined>({
      query: (args: GetJobProfilesArgs = {}) => {
        return {
          document: gql`
            query JobProfilesArchived(
              $search: String
              $where: JobProfileWhereInput
              $take: Int
              $skip: Int
              $orderBy: [JobProfileOrderByWithRelationAndSearchRelevanceInput!]
              $sortByClassificationName: Boolean
              $sortByJobFamily: Boolean
              $sortByOrganization: Boolean
              $sortOrder: String
            ) {
              jobProfilesArchived(
                search: $search
                where: $where
                take: $take
                skip: $skip
                orderBy: $orderBy
                sortByClassificationName: $sortByClassificationName
                sortByJobFamily: $sortByJobFamily
                sortByOrganization: $sortByOrganization
                sortOrder: $sortOrder
              ) {
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
              jobProfilesArchivedCount(search: $search, where: $where)
            }
          `,
          variables: {
            search: args.search,
            where: args.where,
            skip: args.skip,
            take: args.take,
            orderBy: args.orderBy,
            sortByClassificationName: args.sortByClassificationName,
            sortByJobFamily: args.sortByJobFamily,
            sortByOrganization: args.sortByOrganization,
            sortOrder: args.sortOrder,
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
                scopes {
                  scope {
                    id
                    name
                    description
                  }
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
                is_archived
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

    deleteJobProfile: build.mutation<DeleteJobProfileResponse, { jobProfileId: number }>({
      query: (args) => {
        return {
          document: gql`
            mutation DeleteJobProfile($jobProfileId: Int!) {
              deleteJobProfile(jobProfileId: $jobProfileId)
            }
          `,
          variables: args,
        };
      },
    }),

    unarchiveJobProfile: build.mutation<UnarchiveJobProfileResponse, { jobProfileId: number }>({
      query: (args) => {
        return {
          document: gql`
            mutation UnarchiveJobProfile($jobProfileId: Int!) {
              unarchiveJobProfile(jobProfileId: $jobProfileId)
            }
          `,
          variables: args,
        };
      },
    }),

    updateJobProfileState: build.mutation<UpdateJobProfileResponse, { jobProfileId: number; state: string }>({
      query: (args) => {
        return {
          document: gql`
            mutation UpdateJobProfileState($jobProfileId: Int!, $state: String!) {
              updateJobProfileState(jobProfileId: $jobProfileId, state: $state)
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
    getJobProfilesMinistries: build.query<JobProfilesMinistriesResponse, { positionRequestId?: number }>({
      query: (args) => {
        const { positionRequestId } = args;
        return {
          document: gql`
            query JobProfilesMinistries($positionRequestId: Int) {
              jobProfilesMinistries(positionRequestId: $positionRequestId) {
                id
                name
              }
            }
          `,
          variables: { positionRequestId },
        };
      },
    }),
    getJobProfilesClassifications: build.query<JobProfilesClassificationsResponse, void>({
      query: () => {
        return {
          document: gql`
            query JobProfilesClassifications {
              jobProfilesClassifications {
                id
                code
                name
                grade
                employee_group_id
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
    getJobProfilesDraftsClassifications: build.query<JobProfilesDraftsClassificationsResponse, void>({
      query: () => {
        return {
          document: gql`
            query JobProfilesDraftsClassifications {
              jobProfilesDraftsClassifications {
                id
                code
                name
                grade
                employee_group_id
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
  useGetJobProfilesDraftsClassificationsQuery,
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
  useDeleteJobProfileMutation,
  useGetJobProfilesClassificationsQuery,

  useGetJobProfilesArchivedQuery,
  useLazyGetJobProfilesArchivedQuery,

  useUnarchiveJobProfileMutation,
  useUpdateJobProfileStateMutation,
} = jobProfileApi;
