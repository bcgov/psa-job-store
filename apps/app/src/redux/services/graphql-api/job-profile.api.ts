/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';
import { ClassificationModel } from './classification.api';

export interface JobProfileModel {
  id: number;
  accountabilities: Accountabilities;
  behavioural_competencies: BehaviouralCompetencies[];
  classification: ClassificationModel | null;
  requirements: (string | TrackedFieldArrayItem)[];
  organization_id: string;
  family_id: number;
  stream: string;
  title: string | TrackedFieldArrayItem;
  number: number;
  context: string;
  overview: string | TrackedFieldArrayItem;
}

export interface BehaviouralCompetencies {
  behavioural_competency: BehaviouralCompetency;
}

export interface BehaviouralCompetency {
  id: number;
  name: string;
  description: string;
}

interface Accountabilities {
  optional: (string | TrackedFieldArrayItem)[];
  required: (string | TrackedFieldArrayItem)[];
}

export interface TrackedFieldArrayItem {
  value: string;
  disabled?: boolean;
  isCustom?: boolean;
}

interface BehaviouralCompetencyConnect {
  id: number;
}

interface BehaviouralCompetencyItem {
  behavioural_competency: {
    connect: BehaviouralCompetencyConnect;
  };
}

interface BehaviouralCompetenciesInput {
  create: BehaviouralCompetencyItem[];
}

interface ClassificationConnectInput {
  connect: {
    id: string;
  };
}

interface ParentConnectInput {
  connect: {
    id: number;
  };
}

export interface CreateJobProfileInput {
  stream: string;
  title: string;
  number: number;
  context: string;
  overview: string;
  accountabilities: Accountabilities;
  requirements: string[];
  behavioural_competencies?: BehaviouralCompetenciesInput;
  classification: ClassificationConnectInput;
  state: string;
  parent: ParentConnectInput;
}

export interface CreateJobProfileResponse {
  id: number;
}

export interface GetJobProfilesArgs {
  search?: string;
  where?: Record<string, any>;
  orderBy?: Record<string, any>;
  take?: number;
  skip?: number;
}

export interface GetJobProfilesResponse {
  jobProfiles: JobProfileModel[];
  jobProfilesCount: number;
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
