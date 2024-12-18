/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';
import { IdVersion } from './job-profile-types';
import { PositionProfileModel } from './position.api';

export interface GetSuggestedManagersArgs {
  positionNumber?: string;
  positionRequestId?: number;
}

export interface SuggestedManagersResponse {
  suggestedManagers: {
    id: string;
    name: string;
    status: string;
    positionNumber: string;
    positionTitle: string;
    classification: {
      id: string;
      code: string;
      name: string;
    };
    department: {
      id: string;
      name: string;
      organization_id: string;
    };
  }[];
}

export interface UserConnect {
  id: string;
}

export interface JobProfileConnect {
  id_version: IdVersion | null;
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
  classification?: {
    connect: {
      classification_id: string;
      classification_employee_group_id: string;
      classification_peoplesoft_id: string;
    };
  };
  department?: {
    connect: {
      id: string;
    };
  };
  orgchart_png?: string;
}
export interface GetPositionRequestByNumberResponseContent {
  positionRequestByNumber: number;
}
export interface GetPositionRequestResponseContent {
  id: number;
  step?: number;
  max_step_completed?: number;
  reports_to_position_id: number;
  reports_to_position: PositionProfileModel;
  excluded_manager_position: PositionProfileModel;
  orgchart_json?: any;
  profile_json?: any;
  user?: {
    id?: string;
    name?: string;
    email?: string;
  };
  classification?: {
    employee_group_id?: string;
    code?: string;
    id?: string;
  };
  parent_job_profile_id?: number;
  parent_job_profile_version?: number;
  title?: string;
  position_number?: number;
  submission_id?: string;
  status?: string;
  department_id?: string;
  approved_at?: string;
  updated_at?: string;
  submitted_at?: string;
  resubmitted_at?: string;
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
  work_location_name?: string;
  department_id?: string;
  excluded_mgr_position_number?: string;
  comments?: string;
  branch?: string;
  division?: string;
  excluded_mgr_name?: string;
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
  positionNumber?: string;
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
  classification?: {
    connect: {
      id_employee_group_id_peoplesoft_id: {
        id: string;
        employee_group_id: string;
        peoplesoft_id: string;
      };
    };
  };
  submission_id?: string;
  status?: string;
  additional_info?: AdditionalInfo | null;
  parent_job_profile?: JobProfileConnectItem;
  department?: {
    connect: {
      id: string;
    };
  };
  returnFullObject?: boolean;
  orgchart_png?: string;
}

export interface SubmitPositionRequestInput {
  id: number;
  comment?: string;
  orgchart_png?: string;
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
  requestingFeature?: string;
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
              $orderBy: [PositionRequestOrderByWithRelationInput!]
              $requestingFeature: RequestingFeature
            ) {
              positionRequests(
                search: $search
                where: $where
                take: $take
                skip: $skip
                orderBy: $orderBy
                requestingFeature: $requestingFeature
              ) {
                id
                step
                max_step_completed
                reports_to_position_id
                parent_job_profile_id
                parent_job_profile_version
                user {
                  id
                  name
                  email
                }
                classification {
                  code
                  id
                }
                title
                approved_at
                position_number
                submission_id
                status
                updated_at
                resubmitted_at
                submitted_at
                time_to_approve
                approval_type
                shareUUID
                parent_job_profile {
                  number
                }
                crm_id
                crm_lookup_name
              }
              positionRequestsCount(search: $search, where: $where, requestingFeature: $requestingFeature) {
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
            requestingFeature: args.requestingFeature,
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
                  reports_to_position
                  excluded_manager_position
                  parent_job_profile_id
                  parent_job_profile_version
                  profile_json
                  orgchart_json
                  user {
                    id
                    name
                    email
                  }
                  classification {
                    employee_group_id
                    code
                    id
                  }
                  title
                  position_number
                  submission_id
                  status
                  updated_at
                  resubmitted_at
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
    getPositionRequestForDept: build.query<GetPositionRequestResponse, GetPositionRequestArgs>({
      // providesTags: ['positionRequest'],
      // result
      //   ? [{ type: 'PositionRequest' as const, id: result.positionRequest.id }]
      //   : [{ type: 'PositionRequest' as const, id: 'id' }],
      query: (args: GetPositionRequestArgs) => {
        return {
          document: gql`
            query positionRequestForDept {
              positionRequest: positionRequestForDept(id: ${args.id}) {
                  id
                  step
                  max_step_completed
                  reports_to_position_id
                  reports_to_position
                  excluded_manager_position
                  parent_job_profile_id
                  parent_job_profile_version
                  profile_json
                  orgchart_json
                  user {
                    id
                    name
                    email
                  }
                  classification {
                    employee_group_id
                    code
                    id
                  }
                  title
                  position_number
                  submission_id
                  status
                  updated_at
                  resubmitted_at
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
                  reports_to_position
                  excluded_manager_position
                  parent_job_profile_id
                  parent_job_profile_version
                  profile_json
                  orgchart_json
                  user {
                    id
                    name
                    email
                  }
                  classification {
                    code
                  }
                  title
                  position_number
                  submission_id
                  status
                  updated_at
                  resubmitted_at
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
    getPositionRequestByPositionNumber: build.query<GetPositionRequestByNumberResponseContent, GetPositionRequestArgs>({
      // providesTags: ['positionRequest'],
      // result
      //   ? [{ type: 'PositionRequest' as const, id: result.positionRequest.id }]
      //   : [{ type: 'PositionRequest' as const, id: 'id' }],
      query: (args: GetPositionRequestArgs) => {
        return {
          document: gql`
            query PositionRequestByNumber {
              positionRequestByNumber(positionNumber: "${args.positionNumber}")
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
            mutation CreatePositionRequest($data: PositionRequestCreateInputWithoutUser!) {
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
                parent_job_profile_version
                profile_json
                orgchart_json
                user {
                  id
                  name
                  email
                }
                classification {
                  code
                  id
                }
                title
                position_number
                submission_id
                status
                updated_at
                resubmitted_at
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
            mutation SubmitPositionRequest($id: Int!, $comment: String, $orgchart_png: String) {
              submitPositionRequest(id: $id, comment: $comment, orgchart_png: $orgchart_png) {
                id
                step
                max_step_completed
                reports_to_position_id
                reports_to_position
                excluded_manager_position
                parent_job_profile_id
                parent_job_profile_version
                profile_json
                orgchart_json
                user {
                  id
                  name
                  email
                }
                classification {
                  code
                  id
                }
                title
                position_number
                status
                updated_at
                resubmitted_at
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
            orgchart_png: input.orgchart_png,
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
    getPositionRequestSubmittedBy: build.query<
      GetPositionRequestSubmittedByResponse,
      GetPositionRequestsArgs | undefined
    >({
      query: (args: GetPositionRequestsArgs = {}) => {
        return {
          document: gql`
            query PositionRequestSubmittedBy($requestingFeature: RequestingFeature) {
              positionRequestSubmittedBy(requestingFeature: $requestingFeature) {
                id
                name
              }
            }
          `,
          variables: {
            requestingFeature: args.requestingFeature,
          },
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
    getSuggestedManagers: build.query<SuggestedManagersResponse, GetSuggestedManagersArgs>({
      query: (args: GetSuggestedManagersArgs) => {
        return {
          document: gql`
            query SuggestedManagers($positionNumber: String!, $positionRequestId: Float!) {
              suggestedManagers(positionNumber: $positionNumber, positionRequestId: $positionRequestId) {
                id
                name
                status
                positionNumber
                positionTitle
                classification {
                  id
                  code
                  name
                }
                department {
                  id
                  name
                  organization_id
                }
              }
            }
          `,
          variables: {
            positionNumber: args.positionNumber,
            positionRequestId: args.positionRequestId,
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
  useGetPositionRequestForDeptQuery,
  useLazyGetPositionRequestQuery,
  useCreatePositionRequestMutation,
  useUpdatePositionRequestMutation,
  useSubmitPositionRequestMutation,
  useDeletePositionRequestMutation,
  useGetPositionRequestsCountQuery,
  useLazyGetPositionRequestsCountQuery,
  useGetPositionRequestClassificationsQuery,
  useGetPositionRequestJobStoreNumbersQuery,
  useGetPositionRequestStatusesQuery,
  useGetPositionRequestSubmittedByQuery,
  usePositionNeedsRivewQuery,
  useLazyPositionNeedsRivewQuery,
  useGetSharedPositionRequestQuery,
  useLazyGetSharedPositionRequestQuery,
  useGetSuggestedManagersQuery,
  useLazyGetPositionRequestByPositionNumberQuery,
} = positionRequestApi;
