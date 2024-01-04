import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface ProfileModel {
  id: string;
  username?: string;
  department_id?: string;
  employee_id?: string;
  organization_id?: string;
}

export interface GetProfileResponse {
  profile: ProfileModel;
}

export const profileApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<GetProfileResponse, void>({
      query: () => {
        return {
          document: gql`
            query Profile {
              profile {
                id
                username
                department_id
                employee_id
                organization_id
              }
            }
          `,
        };
      },
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
