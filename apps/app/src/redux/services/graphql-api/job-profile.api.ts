/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';
import {
  ClassificationModel,
  CreateJobProfileInput,
  CreateJobProfileResponse,
  DeleteJobProfileResponse,
  DuplicateJobProfileResponse,
  GetJobProfileArgs,
  GetJobProfileByNumberResponse,
  GetJobProfileMetaResponse,
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
  updateJobProfileViewCountInput,
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
              $orderBy: [JobProfileOrderByWithRelationInput!]
              $sortByClassificationName: Boolean
              $sortByJobFamily: Boolean
              $sortByOrganization: Boolean
              $sortOrder: String
              $selectProfile: String
              $departmentId: String
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
                departmentId: $departmentId
              ) {
                id
                all_reports_to
                streams {
                  stream {
                    id
                    job_family_id
                    name
                  }
                }
                title
                number
                context
                overview
                accountabilities
                education
                job_experience
                behavioural_competencies
                classifications {
                  classification {
                    id
                    employee_group_id
                    peoplesoft_id
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
                    employee_group_id
                    peoplesoft_id
                    code
                  }
                }
                updated_at
                owner {
                  name
                }
                updated_by {
                  name
                }
                published_by {
                  name
                }
                valid_from
                valid_to
                version
              }
              jobProfilesCount(search: $search, where: $where, departmentId: $departmentId)
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
                departmentId: $departmentId
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
            departmentId: args.departmentId,
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
              $orderBy: [JobProfileOrderByWithRelationInput!]
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
                context
                overview
                accountabilities
                education
                job_experience
                behavioural_competencies
                classifications {
                  classification {
                    id
                    employee_group_id
                    peoplesoft_id
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
                    employee_group_id
                    peoplesoft_id
                    code
                  }
                }
                updated_at
                owner {
                  name
                }
                updated_by {
                  name
                }
                published_by {
                  name
                }
                valid_from
                valid_to
                version
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
              $orderBy: [JobProfileOrderByWithRelationInput!]
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
                context
                overview
                accountabilities
                education
                job_experience
                behavioural_competencies
                classifications {
                  classification {
                    id
                    employee_group_id
                    peoplesoft_id
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
                    employee_group_id
                    peoplesoft_id
                    code
                  }
                }
                updated_at
                owner {
                  name
                }
                updated_by {
                  name
                }
                published_by {
                  name
                }
                is_archived
                valid_from
                valid_to
                version
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

    GetJobProfileByNumber: build.query<GetJobProfileByNumberResponse, GetJobProfileArgs>({
      query: (args: GetJobProfileArgs) => {
        return {
          document: gql`
            query JobProfileByNumber {
              jobProfileByNumber(number: "${args.number}") {
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
                context
                state
                security_screenings
                all_reports_to
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
                behavioural_competencies
                classifications {
                  classification {
                    id
                    employee_group_id
                    peoplesoft_id
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
                    employee_group_id
                    peoplesoft_id
                    code
                  }
                }
                is_archived
                valid_from
                valid_to
                version
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
            query JobProfile($id: Float!, $version: Float) {
              jobProfile(id: $id, version: $version) {
                id
                updated_at
                updated_by {
                  id
                  name
                }
                published_by {
                  id
                  name
                }
                created_at
                owner {
                  id
                  name
                }
                published_at
                streams {
                  stream {
                    id
                    name
                    job_family_id
                  }
                }
                title
                number
                context
                state
                security_screenings
                all_reports_to
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
                behavioural_competencies
                classifications {
                  classification {
                    id
                    employee_group_id
                    peoplesoft_id
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
                    employee_group_id
                    peoplesoft_id
                    code
                  }
                }
                is_archived
                valid_from
                valid_to
                version
                views
              }
            }
          `,
          variables: {
            id: args.id,
            version: args.version,
          },
        };
      },
    }),
    createOrUpdateJobProfile: build.mutation<CreateJobProfileResponse, CreateJobProfileInput>({
      query: (input: CreateJobProfileInput) => {
        return {
          document: gql`
            mutation CreateOrUpdateJobProfile($data: ExtendedJobProfileCreateInput!, $id: Int) {
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
    getJobProfileMeta: build.query<GetJobProfileMetaResponse, number>({
      query: (id: number) => {
        return {
          document: gql`
            query jobProfileMeta {
              jobProfileMeta(id: ${id}) {
                totalViews
                firstPublishedBy {
                  date
                  user
                }
                firstCreatedBy {
                  date
                  owner
                }
                versions {
                  id
                  version
                }
            }
        }
          `,
        };
      },
    }),
    updateJobProfileViewCount: build.mutation<GetJobProfileMetaResponse, updateJobProfileViewCountInput>({
      query: (input: updateJobProfileViewCountInput) => {
        return {
          document: gql`
            mutation updateJobProfileViewCount($jobProfiles: [Int!]) {
              updateJobProfileViewCount(jobProfiles: $jobProfiles)
            }
          `,
          variables: {
            jobProfiles: input.jobProfiles,
          },
        };
      },
    }),
    duplicateJobProfile: build.mutation<
      DuplicateJobProfileResponse,
      { jobProfileId: number; jobProfileVersion: number }
    >({
      query: (args) => {
        return {
          document: gql`
            mutation DuplicateJobProfile($jobProfileId: Int!, $jobProfileVersion: Int!) {
              duplicateJobProfile(jobProfileId: $jobProfileId, jobProfileVersion: $jobProfileVersion)
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

    updateJobProfileState: build.mutation<
      UpdateJobProfileResponse,
      { jobProfileId: number; jobProfileVersion: number; state: string }
    >({
      query: (args) => {
        return {
          document: gql`
            mutation UpdateJobProfileState($jobProfileId: Int!, $jobProfileVersion: Int!, $state: String!) {
              updateJobProfileState(jobProfileId: $jobProfileId, jobProfileVersion: $jobProfileVersion, state: $state)
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
                employee_group_id
                peoplesoft_id
                code
                name
                grade
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
                employee_group_id
                peoplesoft_id
                code
                name
                grade
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

    getRequirementsWithoutReadOnly: build.query({
      query: (args: {
        jobFamilyIds: number[];
        jobFamilyStreamIds: number[];
        classifications: ClassificationModel[];
        ministryIds?: string[];
        jobFamilyWithNoStream?: number[];
        excludeProfileId?: number;
      }) => {
        return {
          document: gql`
            query RequirementsWithoutReadOnly(
              $jobFamilyIds: [Int!]!
              $jobFamilyStreamIds: [Int!]!
              $classifications: [ClassificationInput!]!
              $ministryIds: [String!]
              $jobFamilyWithNoStream: [Int!]
              $excludeProfileId: Int
            ) {
              requirementsWithoutReadOnly(
                jobFamilyIds: $jobFamilyIds
                jobFamilyStreamIds: $jobFamilyStreamIds
                classifications: $classifications
                ministryIds: $ministryIds
                jobFamilyWithNoStream: $jobFamilyWithNoStream
                excludeProfileId: $excludeProfileId
              ) {
                professionalRegistrationRequirements {
                  text
                  jobFamilies {
                    id
                  }
                  streams {
                    id
                  }
                  classification {
                    id
                    employee_group_id
                  }
                  organization {
                    id
                  }
                }
                preferences {
                  text
                  jobFamilies {
                    id
                  }
                  streams {
                    id
                  }
                  classification {
                    id
                    employee_group_id
                  }
                  organization {
                    id
                  }
                }
                knowledgeSkillsAbilities {
                  text
                  jobFamilies {
                    id
                  }
                  streams {
                    id
                  }
                  classification {
                    id
                    employee_group_id
                  }
                  organization {
                    id
                  }
                }
                willingnessStatements {
                  text
                  jobFamilies {
                    id
                  }
                  streams {
                    id
                  }
                  classification {
                    id
                    employee_group_id
                  }
                  organization {
                    id
                  }
                }
                securityScreenings {
                  text
                  jobFamilies {
                    id
                  }
                  streams {
                    id
                  }
                  classification {
                    id
                    employee_group_id
                  }
                  organization {
                    id
                  }
                }
                jobProfileMinimumRequirements {
                  text
                  jobFamilies {
                    id
                  }
                  streams {
                    id
                  }
                  classification {
                    id
                    employee_group_id
                  }
                  organization {
                    id
                  }
                }
              }
            }
          `,
          variables: args,
        };
      },
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

  useGetJobProfileByNumberQuery,
  useLazyGetJobProfileByNumberQuery,
  useGetJobProfileMetaQuery,
  useLazyGetJobProfileMetaQuery,
  useUpdateJobProfileViewCountMutation,

  useGetRequirementsWithoutReadOnlyQuery,
} = jobProfileApi;
