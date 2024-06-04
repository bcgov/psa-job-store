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
  max_step_completed?: number;
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
  updated_at?: string;
  email?: string;
  shareUUID?: string;
  parent_job_profile?: {
    number: number;
  };

  additional_info?: AdditionalInfo;

  crm_id?: string;
  crm_lookup_name?: string;
}

export interface AdditionalInfo {
  work_location_id?: string;
  department_id?: string;
  excluded_mgr_position_number?: string;
  comments?: string;
  branch?: string;
  division?: string;
}

export interface GetPositionRequestResponse {
  positionRequest?: GetPositionRequestResponseContent;
  sharedPositionRequest?: GetPositionRequestResponseContent; // this is for GetSharedPositionRequestResponse
}

export interface UpdatePositionRequestResponse {
  updatePositionRequest: GetPositionRequestResponseContent;
}

export interface SubmitPositionRequestResponse {
  submitPositionRequest: GetPositionRequestResponseContent;
}

export interface PositionNeedsReviewResponse {
  positionNeedsRivew: PositionNeedsReviewResponseContent;
}

export interface PositionNeedsReviewResponseContent {
  result: boolean;
  reasons: string[];
}

export interface PositionRequestStatusCounts {
  draft: number;
  completed: number;
  verification: number;
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
  id?: number;
  uuid?: string; // this is for GetSharedPositionRequestArgs
}

export interface CreatePositionRequestResponse {
  createPositionRequest: number;
}

export interface UpdatePositionRequestInput {
  id: number;
  step?: number;
  max_step_completed?: number;
  reports_to_position_id?: number;
  orgchart_json?: any;
  profile_json?: any;
  user_id?: string;
  title?: string | null;
  position_number?: number;
  classification_id?: string;
  classification_employee_group_id?: string;
  classification_peoplesoft_id?: string;
  submission_id?: string;
  status?: string;
  additional_info?: AdditionalInfo | null;
  parent_job_profile?: {
    connect: {
      id: number | null;
    };
  };
  department?: {
    connect: {
      id: string;
    };
  };
  returnFullObject?: boolean;
}

export interface SubmitPositionRequestInput {
  id: number;
  comment?: string;
}

export interface DeletePositionRequestInput {
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
                max_step_completed
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
                shareUUID
                parent_job_profile {
                  number
                }
                crm_id
                crm_lookup_name
              }
              positionRequestsCount(search: $search, where: $where, onlyCompletedForAll: $onlyCompletedForAll) {
                draft
                completed
                verification
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
      // providesTags: ['positionRequest'],
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
                  max_step_completed
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
                  additional_info
                  crm_id
                  crm_lookup_name
                  shareUUID
              }
          }
          `,
        };
      },
    }),
    getSharedPositionRequest: build.query<GetPositionRequestResponse, GetPositionRequestArgs>({
      // providesTags: ['positionRequest'],
      // result
      //   ? [{ type: 'PositionRequest' as const, id: result.positionRequest.id }]
      //   : [{ type: 'PositionRequest' as const, id: 'id' }],
      query: (args: GetPositionRequestArgs) => {
        return {
          document: gql`
            query SharedPositionRequest {
              sharedPositionRequest(uuid: "${args.uuid}") {
                  id
                  step
                  max_step_completed
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
                  additional_info
                  crm_id
                  crm_lookup_name
              }
          }
          `,
        };
      },
    }),
    createPositionRequest: build.mutation<CreatePositionRequestResponse, CreatePositionRequestInput>({
      invalidatesTags: ['positionRequestsCount'],
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
    updatePositionRequest: build.mutation<UpdatePositionRequestResponse, UpdatePositionRequestInput>({
      // invalidatesTags: ['positionRequest'],
      query: (input: UpdatePositionRequestInput) => {
        return {
          document: gql`
            mutation UpdatePositionRequest(
              $id: Int!
              $updateInput: PositionRequestUpdateInput!
              $returnFullObject: Boolean
            ) {
              updatePositionRequest(id: $id, updateInput: $updateInput, returnFullObject: $returnFullObject) {
                id
                step
                max_step_completed
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
                additional_info
                crm_id
                crm_lookup_name
                shareUUID
              }
            }
          `,
          variables: {
            id: input.id,
            updateInput: {
              ...input,
              id: undefined,
              returnFullObject: undefined,
            },
            returnFullObject: input.returnFullObject || false,
          },
        };
      },
    }),
    submitPositionRequest: build.mutation<SubmitPositionRequestResponse, SubmitPositionRequestInput>({
      invalidatesTags: ['positionRequest'],
      query: (input: SubmitPositionRequestInput) => {
        return {
          document: gql`
            mutation SubmitPositionRequest($id: Int!, $comment: String) {
              submitPositionRequest(id: $id, comment: $comment) {
                id
                step
                max_step_completed
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
                additional_info
                crm_id
                crm_lookup_name
                shareUUID
              }
            }
          `,
          variables: {
            id: input.id,
            comment: input.comment,
          },
        };
      },
    }),
    deletePositionRequest: build.mutation<void, DeletePositionRequestInput>({
      invalidatesTags: ['positionRequest', 'positionRequestsCount'],
      query: (input: DeletePositionRequestInput) => {
        return {
          document: gql`
            mutation DeletePositionRequest($id: Int!) {
              deletePositionRequest(id: $id) {
                id
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
      providesTags: ['positionRequestsCount'],
      query: (args: GetPositionRequestsArgs = {}) => {
        return {
          document: gql`
            query PositionRequestsCount($search: String, $where: PositionRequestWhereInput) {
              positionRequestsCount(search: $search, where: $where) {
                draft
                completed
                verification
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
    positionNeedsRivew: build.query<PositionNeedsReviewResponse, GetPositionRequestArgs>({
      query: (args: GetPositionRequestArgs) => {
        return {
          document: gql`
            query PositionNeedsRivew {
              positionNeedsRivew(id: ${args.id}) {
                result
                reasons
              }
            }
          `,
          variables: {
            id: args.id,
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
  useDeletePositionRequestMutation,
  useGetPositionRequestsCountQuery,
  useGetPositionRequestClassificationsQuery,
  useGetPositionRequestJobStoreNumbersQuery,
  useGetPositionRequestStatusesQuery,
  useGetPositionRequestSubmittedByQuery,
  usePositionNeedsRivewQuery,
  useLazyPositionNeedsRivewQuery,
  useGetSharedPositionRequestQuery,
  useLazyGetSharedPositionRequestQuery,
} = positionRequestApi;
