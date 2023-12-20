import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { oidcConfig } from '../../../main';

const baseQuery = graphqlRequestBaseQuery({
  url: `${import.meta.env.VITE_BACKEND_URL}/graphql`,
  prepareHeaders: async (headers) => {
    const storageString =
      (await oidcConfig.userStore?.get(
        `user:${import.meta.env.VITE_KEYCLOAK_REALM_URL}:${import.meta.env.VITE_KEYCLOAK_CLIENT_ID}`,
      )) ?? '{}';

    const { access_token } = JSON.parse(storageString);

    if (access_token) {
      headers.set('authorization', `Bearer ${access_token}`);
    }

    return headers;
  },
});

export const graphqlApi = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});
