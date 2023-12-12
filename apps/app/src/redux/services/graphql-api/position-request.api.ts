/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface UserConnect {
  id: string;
}

export interface JobProfileConnect {
  id: number;
}

export interface CreatePositionRequestInput {
  step: number;
  reports_to_position_id: number;
  profile_json: any;
  user: UserConnect;
  parent_job_profile: JobProfileConnect;
  title: string;
  classification: string;
}

export interface GetPositionRequestResponse {
  id: number;
  step?: number;
  reports_to_position_id?: number;
  profile_json?: any;
  user_id?: string;
  parent_job_profile_id?: number;
  title?: string;
  position_number?: number;
  classification?: string;
  submission_id?: string;
  status?: string;
}

export interface GetPositionsRequestResponse {
  positionRequests: GetPositionRequestResponse[];
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
  profile_json?: any;
  user_id?: string;
  title?: string;
  position_number?: number;
  classification?: string;
  submission_id?: string;
  status?: string;
}

export interface GetPositionRequestsArgs {
  search?: string;
  where?: Record<string, any>;
  orderBy?: Record<string, any>;
  take?: number;
  skip?: number;
}

export const positionRequestApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getPositionRequests: build.query<GetPositionsRequestResponse, GetPositionRequestsArgs | undefined>({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      query: (args: GetPositionRequestsArgs = {}) => {
        return {
          document: gql`
            query PositionRequests($search: String, $where: PositionRequestWhereInput, $take: Int, $skip: Int) {
              positionRequests(search: $search, where: $where, take: $take, skip: $skip) {
                id
                step
                reports_to_position_id
                parent_job_profile_id
                user_id
                title
                position_number
                classification_code
                submission_id
                status
              }
              positionRequestsCount(search: $search, where: $where)
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
    getPositionRequest: build.query<GetPositionRequestResponse, GetPositionRequestArgs>({
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
                  user_id
                  title
                  position_number
                  classification
                  submission_id
                  status
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
      query: (input: UpdatePositionRequestInput) => {
        return {
          document: gql`
            mutation UpdatePositionRequest($id: Int!, $updateData: PositionRequestUpdateInput!) {
              updatePositionRequest(id: $id, updateData: $updateData) {
                id
              }
            }
          `,
          variables: {
            id: input.id,
            updateData: {
              ...input,
              id: undefined,
            },
          },
        };
      },
    }),
    getPositionRequestUserClassifications: build.query<GetPositionRequestResponse, void>({
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
} = positionRequestApi;
