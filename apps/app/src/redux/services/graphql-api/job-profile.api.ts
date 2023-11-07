/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';
import { ClassificationModel } from './classification.api';

export interface JobProfileModel {
  id: number;
  accountabilities: Accountabilities;
  behavioural_competencies: BehaviouralCompetencies[];
  classification: ClassificationModel | null;
  requirements: string[];
  ministry_id: number;
  family_id: number;
  stream: string;
  title: string;
  number: number;
  context: string;
  overview: string;
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
  optional: string[];
  required: string[];
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
  parent: ClassificationConnectInput;
}

export interface CreateJobProfileResponse {
  id: number;
}

export interface GetJobProfilesArgs {
  where?: Record<string, any>;
  orderBy?: Record<string, any>;
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
      query: (args: GetJobProfilesArgs = {}) => {
        return {
          document: gql`
            query JobProfiles($where: JobProfileWhereInput) {
              jobProfiles(where: $where) {
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
                  occupation_group {
                    id
                    code
                    name
                  }
                  grid {
                    id
                    name
                  }
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
                ministry {
                  id
                  code
                  name
                }
                reports_to {
                  classification {
                    id
                    grid {
                      name
                    }
                    occupation_group {
                      code
                      name
                    }
                  }
                }
              }
            }
          `,
          variables: {
            where: args.where,
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
                  occupation_group {
                    id
                    code
                    name
                  }
                  grid {
                    id
                    name
                  }
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
                ministry {
                  id
                  code
                  name
                }
                reports_to {
                  classification {
                    id
                    grid_id
                    occupation_group_id
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
