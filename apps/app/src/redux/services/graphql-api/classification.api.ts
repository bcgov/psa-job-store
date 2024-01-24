/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from 'graphql-request';
import { graphqlApi } from '.';
import { GetClassificationsResponse } from './job-profile-types';

interface ClassificationItem {
  id: string | null;
  name: string | null;
  groupName: string;
  employee_group_id: string | null;
  items: ClassificationItem[] | null;
}

interface GroupedClassification {
  groupName: string;
  items: ClassificationItem[];
}

interface GroupedClassificationsArgs {
  employee_group_ids: string[];
  effective_status: string;
}

interface GroupedClassificationsResponse {
  groupedClassifications: GroupedClassification[];
}

export const classificationApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getClassifications: build.query<GetClassificationsResponse, void>({
      query: () => {
        return {
          document: gql`
            query Classifications {
              classifications(orderBy: [{ code: asc }, { id: asc }]) {
                id
                name
                code
                grade
              }
            }
          `,
        };
      },
    }),
    getGroupedClassifications: build.query<GroupedClassificationsResponse, GroupedClassificationsArgs>({
      query: (args) => {
        return {
          document: gql`
            query GroupedClassifications($employee_group_ids: [String!], $effective_status: String!) {
              groupedClassifications(
                where: {
                  employee_group_id: { in: $employee_group_ids }
                  effective_status: { equals: $effective_status }
                }
              ) {
                groupName
                items {
                  id
                  name
                  groupName
                  items {
                    id
                    name
                    groupName
                    items {
                      id
                      name
                      groupName
                      items {
                        id
                        name
                        groupName
                        items {
                          id
                          name
                          groupName
                          items {
                            id
                            name
                            groupName
                            employee_group_id
                          }
                          employee_group_id
                        }
                        employee_group_id
                      }
                      employee_group_id
                    }
                    employee_group_id
                  }
                  employee_group_id
                }
              }
            }
          `,
          variables: {
            employee_group_ids: args.employee_group_ids,
            effective_status: args.effective_status,
          },
        };
      },
    }),
  }),
});

export const { useGetClassificationsQuery, useLazyGetClassificationsQuery, useGetGroupedClassificationsQuery } =
  classificationApi;
