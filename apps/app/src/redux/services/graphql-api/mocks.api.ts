import { gql } from 'graphql-request';
import { graphqlApi } from '.';

interface StatusType {
  id: string;
  lookupName: string;
}

interface StatusWithType {
  status: StatusType;
}

interface Category {
  lookupName: string;
}

interface MockIncidentModel {
  id: string;
  lookupName: string;
  statusWithType: StatusWithType;
  category: Category;
}

interface UpdateMockIncidentResponse {
  updateMockIncidentByPositionRequestId: MockIncidentModel;
}

interface UpdateMockIncidentInput {
  id: string;
  data: {
    statusWithType: {
      status: {
        id: number;
      };
    };
  };
}

export const mockIncidentApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    updateMockIncidentByPositionRequestId: build.mutation<UpdateMockIncidentResponse, UpdateMockIncidentInput>({
      query: (args) => {
        return {
          document: gql`
            mutation UpdateMockIncidentByPositionRequestId($id: ID!, $data: UpdateMockIncidentInput!) {
              updateMockIncidentByPositionRequestId(id: $id, data: $data) {
                id
                lookupName
                statusWithType {
                  status {
                    id
                    lookupName
                  }
                }
                category {
                  lookupName
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

export const { useUpdateMockIncidentByPositionRequestIdMutation } = mockIncidentApi;
