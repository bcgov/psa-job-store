import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface ProfileModel {
  id: string;
  username?: string;
  department_id?: string;
  employee_id?: string;
  organization_id?: string;
  position_id?: string;
}

export interface GetProfileResponse {
  profile: ProfileModel;
}

export interface LogoutResponse {
  logout: {
    success: boolean;
  };
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
                position_id
              }
            }
          `,
        };
      },
    }),
    logout: build.query<LogoutResponse, void>({
      query: () => {
        return {
          document: gql`
            query Logout {
              logout {
                success
              }
            }
          `,
        };
      },
    }),
  }),
});

export const { useGetProfileQuery, useLazyLogoutQuery } = profileApi;
