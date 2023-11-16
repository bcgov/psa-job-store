import { gql } from 'graphql-request';
import { graphqlApi } from '.';

export interface BehaviouralCompetencyModel {
  id: string;
  ministry_id: string;
  membership: string[];
  group: string;
  name: string;
  description: string;
}

export interface GetBehaviouralCompetenciesResponse {
  behaviouralComptencies: BehaviouralCompetencyModel[];
}

export const behaviouralCompetenciesApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getBehaviouralCompetencies: build.query<GetBehaviouralCompetenciesResponse, void>({
      query: () => {
        return {
          document: gql`
            query BehaviouralComptencies {
              behaviouralComptencies {
                id
                ministry_id
                membership
                group
                name
                description
              }
            }
          `,
        };
      },
    }),
  }),
});

export const { useGetBehaviouralCompetenciesQuery } = behaviouralCompetenciesApi;
