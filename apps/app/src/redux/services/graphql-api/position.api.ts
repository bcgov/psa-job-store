import { gql } from 'graphql-request';
import { graphqlApi } from '.';
import { DepartmentModel } from './department.api';
import { ClassificationModel } from './job-profile-types';
import { OrganizationModel } from './organization';

export interface PositionModel {
  id: string;
  classification_id: string;
  department_id: string;
  organization_id: string;
  supervisor_id: string;
  title: string;
  job_profile_number: string;
  effective_status: string;
  effective_date: string;
  classification: ClassificationModel;
  department: DepartmentModel;
  organization: OrganizationModel;
}

export interface GetPositionResponse {
  position: PositionModel;
}

export interface GetPositionArgs {
  where: { id: string };
}

export const positionApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getPosition: build.query<GetPositionResponse, GetPositionArgs>({
      providesTags: () => ['jobProfiles'],
      query: (args: GetPositionArgs) => {
        return {
          document: gql`
            query Position($where: PositionWhereUniqueInput!) {
              position(where: $where) {
                classification_id
              }
            }
          `,
          variables: {
            where: args.where,
          },
        };
      },
    }),
  }),
});

export const { useGetPositionQuery, useLazyGetPositionQuery } = positionApi;
