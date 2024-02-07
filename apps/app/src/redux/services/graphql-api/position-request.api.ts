/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface UserConnect {
  id: string;
}

export interface JobProfileConnect {
  id: number;
}

interface JobProfileConnectItem {
  connect: JobProfileConnect;
}

export interface CreatePositionRequestInput {
  step: number;
  reports_to_position_id: number;
  profile_json?: any;
  orgchart_json?: any;
  parent_job_profile?: JobProfileConnectItem;
  title?: string;
  classification_id?: string;
  classification_code?: string;
  department?: {
    connect: {
      id: string;
    };
  };
}

export interface GetPositionRequestResponseContent {
  id: number;
  step?: number;
  reports_to_position_id?: number;
  orgchart_json?: any;
  profile_json?: any;
  user_id?: string;
  user_name?: string;
  parent_job_profile_id?: number;
  title?: string;
  position_number?: number;
  classification?: string;
  classification_code?: string;
  submission_id?: string;
  status?: string;
  department_id?: string;
  approved_at?: string;
  email?: string;
  parent_job_profile?: {
    number: number;
  };

  additional_info_work_location_id?: string;
  additional_info_department_id?: string;
  additional_info_excluded_mgr_position_number?: string;
  additional_info_comments?: string;

  crm_id?: string;
}

export interface GetPositionRequestResponse {
  positionRequest: GetPositionRequestResponseContent;
}

export interface PositionRequestStatusCounts {
  draft: number;
  completed: number;
  inReview: number;
  total: number;
}

export interface PositionRequestStatusCountsResponse {
  positionRequestsCount: PositionRequestStatusCounts;
}

export interface GetPositionsRequestResponse {
  positionRequests: GetPositionRequestResponseContent[];
  positionRequestsCount: PositionRequestStatusCounts;
}

export interface GetPositionRequestArgs {
  id: number;
}

export interface CreatePositionRequestResponse {
  createPositionRequest: number;
}

export interface UpdatePositionRequestInput {
  id: number;
  step?: number;
  reports_to_position_id?: number;
  orgchart_json?: any;
  profile_json?: any;
  user_id?: string;
  title?: string;
  position_number?: number;
  classification_id?: string;
  submission_id?: string;
  status?: string;

  workLocation?: {
    connect: {
      id: string;
    };
  };
  paylist_department?: {
    connect: {
      id: string;
    };
  };
  additional_info_excluded_mgr_position_number?: string;
  additional_info_comments?: string;
  parent_job_profile?: {
    connect: {
      id: number;
    };
  };
  department?: {
    connect: {
      id: string;
    };
  };
}

export interface SubmitPositionRequestInput {
  id: number;
}

export interface GetPositionRequestsArgs {
  search?: string;
  where?: Record<string, any>;
  orderBy?: Record<string, any>;
  take?: number;
  skip?: number;
  onlyCompletedForAll?: boolean;
}

export interface GetPositionRequestUserClassificationsResponse {
  positionRequestUserClassifications: PositionRequestUserClassification[];
}

export interface GetPositionRequestClassificationsResponse {
  positionRequestClassifications: PositionRequestUserClassification[];
}

export interface GetPositionRequestJobStoreNumbersResponse {
  positionRequestJobStoreNumbers: number[];
}

export interface GetPositionRequestSubmittedByResponseItem {
  id: string;
  name: string;
}

export interface GetPositionRequestSubmittedByResponse {
  positionRequestSubmittedBy: GetPositionRequestSubmittedByResponseItem[];
}

export interface GetPositionRequestStatusesResponse {
  positionRequestStatuses: string[];
}

export interface PositionRequestUserClassification {
  id: string;
  code: string;
}

export const positionRequestApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getPositionRequests: build.query<GetPositionsRequestResponse, GetPositionRequestsArgs | undefined>({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: (args: GetPositionRequestsArgs = {}) => {
        return {
          document: gql`
            query PositionRequests(
              $search: String
              $where: PositionRequestWhereInput
              $take: Int
              $skip: Int
              $orderBy: [PositionRequestOrderByWithRelationAndSearchRelevanceInput!]
              $onlyCompletedForAll: Boolean
            ) {
              positionRequests(
                search: $search
                where: $where
                take: $take
                skip: $skip
                orderBy: $orderBy
                onlyCompletedForAll: $onlyCompletedForAll
              ) {
                id
                step
                reports_to_position_id
                parent_job_profile_id
                user_id
                user_name
                email
                title
                approved_at
                position_number
                classification_code
                submission_id
                status
                updated_at
                submitted_at
                parent_job_profile {
                  number
                }
                crm_id
              }
              positionRequestsCount(search: $search, where: $where, onlyCompletedForAll: $onlyCompletedForAll) {
                draft
                completed
                inReview
                total
              }
            }
          `,
          variables: {
            search: args.search,
            where: args.where,
            skip: args.skip,
            take: args.take,
            orderBy: args.orderBy,
            onlyCompletedForAll: args.onlyCompletedForAll,
          },
        };
      },
    }),
    getPositionRequest: build.query<GetPositionRequestResponse, GetPositionRequestArgs>({
      providesTags: () => ['positionRequest'],
      // result
      //   ? [{ type: 'PositionRequest' as const, id: result.positionRequest.id }]
      //   : [{ type: 'PositionRequest' as const, id: 'id' }],
      query: (args: GetPositionRequestArgs) => {
        return {
          document: gql`
            query PositionRequest {
              positionRequest(id: ${args.id}) {
                  id
                  step
                  reports_to_position_id
                  parent_job_profile_id
                  profile_json
                  orgchart_json
                  user_id
                  user_name
                  email
                  title
                  position_number
                  classification_code
                  submission_id
                  status
                  updated_at
                  submitted_at
                  department_id
                  approved_at
                  parent_job_profile {
                    number
                  }
                  additional_info_work_location_id
                  additional_info_department_id
                  additional_info_excluded_mgr_position_number
                  additional_info_comments
                  crm_id
              }
          }
          `,
        };
      },
    }),
    createPositionRequest: build.mutation<CreatePositionRequestResponse, CreatePositionRequestInput>({
      query: (input: CreatePositionRequestInput) => {
        return {
          document: gql`
            mutation CreatePositionRequest($data: PositionRequestCreateInput!) {
              createPositionRequest(data: $data)
            }
          `,
          variables: {
            data: input,
          },
        };
      },
    }),
    updatePositionRequest: build.mutation<GetPositionRequestResponse, UpdatePositionRequestInput>({
      invalidatesTags: ['positionRequest'],
      query: (input: UpdatePositionRequestInput) => {
        return {
          document: gql`
            mutation UpdatePositionRequest($id: Int!, $updateInput: PositionRequestUpdateInput!) {
              updatePositionRequest(id: $id, updateInput: $updateInput) {
                id
              }
            }
          `,
          variables: {
            id: input.id,
            updateInput: {
              ...input,
              id: undefined,
            },
          },
        };
      },
    }),
    submitPositionRequest: build.mutation<GetPositionRequestResponse, SubmitPositionRequestInput>({
      invalidatesTags: ['positionRequest'],
      query: (input: SubmitPositionRequestInput) => {
        return {
          document: gql`
            mutation SubmitPositionRequest($id: Int!) {
              submitPositionRequest(id: $id) {
                id
                step
                reports_to_position_id
                department_id
                parent_job_profile_id
                profile_json
                user_id
                title
                position_number
                classification_id
                classification_code
                user_name
                email
                submission_id
                approved_at
                status
                updated_at
              }
            }
          `,
          variables: {
            id: input.id,
          },
        };
      },
    }),
    getPositionRequestUserClassifications: build.query<GetPositionRequestUserClassificationsResponse, void>({
      query: () => {
        return {
          document: gql`
            query PositionRequestUserClassifications {
              positionRequestUserClassifications {
                id
                code
              }
            }
          `,
        };
      },
    }),
    getPositionRequestClassifications: build.query<GetPositionRequestClassificationsResponse, void>({
      query: () => {
        return {
          document: gql`
            query PositionRequestClassifications {
              positionRequestClassifications {
                id
                code
              }
            }
          `,
        };
      },
    }),
    getPositionRequestJobStoreNumbers: build.query<GetPositionRequestJobStoreNumbersResponse, void>({
      query: () => {
        return {
          document: gql`
            query PositionRequestJobStoreNumbers {
              positionRequestJobStoreNumbers
            }
          `,
        };
      },
    }),
    getPositionRequestStatuses: build.query<GetPositionRequestStatusesResponse, void>({
      query: () => {
        return {
          document: gql`
            query PositionRequestStatuses {
              positionRequestStatuses
            }
          `,
        };
      },
    }),
    getPositionRequestSubmittedBy: build.query<GetPositionRequestSubmittedByResponse, void>({
      query: () => {
        return {
          document: gql`
            query PositionRequestSubmittedBy {
              positionRequestSubmittedBy {
                id
                name
              }
            }
          `,
        };
      },
    }),
    getPositionRequestsCount: build.query<PositionRequestStatusCountsResponse, GetPositionRequestsArgs | void>({
      query: (args: GetPositionRequestsArgs = {}) => {
        return {
          document: gql`
            query PositionRequestsCount($search: String, $where: PositionRequestWhereInput) {
              positionRequestsCount(search: $search, where: $where) {
                draft
                completed
                inReview
                total
              }
            }
          `,
          variables: {
            search: args.search,
            where: args.where,
          },
        };
      },
    }),
  }),
});

export const {
  useGetPositionRequestUserClassificationsQuery,
  useGetPositionRequestsQuery,
  useLazyGetPositionRequestsQuery,
  useGetPositionRequestQuery,
  useLazyGetPositionRequestQuery,
  useCreatePositionRequestMutation,
  useUpdatePositionRequestMutation,
  useSubmitPositionRequestMutation,
  useGetPositionRequestsCountQuery,
  useGetPositionRequestClassificationsQuery,
  useGetPositionRequestJobStoreNumbersQuery,
  useGetPositionRequestStatusesQuery,
  useGetPositionRequestSubmittedByQuery,
} = positionRequestApi;
