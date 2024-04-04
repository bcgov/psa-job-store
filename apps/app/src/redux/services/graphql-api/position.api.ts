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

export interface PositionProfileModel {
  positionNumber: string;
  positionDescription: string;
  departmentName: string;
  employeeName: string;
  classification: string;
  ministry: string;
  status: string;
}

export interface PositionProfileModelResponse {
  positionProfile: PositionProfileModel[];
}

export interface GetPositionResponse {
  position: PositionModel;
}

export interface GetPositionArgs {
  where: { id: string };
}

export interface GetPositionResponseArgs {
  positionNumber: string;
  uniqueKey?: string;
  suppressGlobalError?: boolean;
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
    getPositionProfile: build.query<PositionProfileModelResponse, GetPositionResponseArgs>({
      providesTags: () => ['jobProfiles'],
      query: (args: GetPositionResponseArgs) => {
        return {
          document: gql`
            query PositionProfile($positionNumber: String!) {
              positionProfile(positionNumber: $positionNumber) {
                positionNumber
                positionDescription
                departmentName
                employeeName
                classification
                ministry
                status
              }
            }
          `,
          variables: {
            positionNumber: args.positionNumber,
            uniqueKey: args.uniqueKey,
            suppressGlobalError: args.suppressGlobalError,
          },
        };
      },
    }),
  }),
});

export const {
  useGetPositionQuery,
  useLazyGetPositionQuery,
  useGetPositionProfileQuery,
  useLazyGetPositionProfileQuery,
} = positionApi;
