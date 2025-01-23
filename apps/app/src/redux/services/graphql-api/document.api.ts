import { gql } from 'graphql-request';
import { graphqlApi } from '.';
import { CheckURLResponse, GetDocumentByIdResponse, GetDocumentsArgs, GetDocumentsResponse } from './job-profile-types';

export const documentApi = graphqlApi.injectEndpoints({
  endpoints: (build) => ({
    getDocuments: build.query<GetDocumentsResponse, GetDocumentsArgs | undefined>({
      query: (args: GetDocumentsArgs) => ({
        document: gql`
          query GetDocuments(
            $where: DocumentWhereInput
            $orderBy: [DocumentOrderByWithRelationInput!]
            $take: Int
            $skip: Int
          ) {
            documentsWithCount(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
              data {
                id
                file_extension
                title
                description
                url
                category
                jobFamilies {
                  jobFamily {
                    id
                    name
                  }
                }
                streams {
                  jobStream {
                    id
                    name
                  }
                }
                created_at
                updated_at
              }
              pageInfo {
                page
                pageCount
                pageSize
                totalCount
              }
            }
          }
        `,
        variables: {
          where: args.where,
          orderBy: args.orderBy,
          take: args.take,
          skip: args.skip,
        },
      }),
    }),

    // ---------- NEW ENDPOINT -------------
    getDocumentById: build.query<GetDocumentByIdResponse, string>({
      query: (id: string) => ({
        document: gql`
          query GetDocumentById($id: String!) {
            document(id: $id) {
              id
              file_extension
              title
              description
              url
              category
              jobFamilies {
                jobFamily {
                  id
                  name
                }
              }
              streams {
                jobStream {
                  id
                  name
                }
              }
              created_at
              updated_at
            }
          }
        `,
        variables: {
          id,
        },
      }),
    }),
    checkDocumentURL: build.query<CheckURLResponse, string>({
      query: (url: string) => ({
        document: gql`
          query CheckURL($url: String!) {
            checkURL(url: $url) {
              id
              file_extension
              title
              url
            }
          }
        `,
        variables: {
          url,
        },
      }),
    }),
    // -------------------------------------
  }),
});
export const { useGetDocumentByIdQuery, useLazyCheckDocumentURLQuery, useGetDocumentsQuery, useLazyGetDocumentsQuery } =
  documentApi;
