import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { oidcConfig } from '../../../main';

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
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

export const api = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});
