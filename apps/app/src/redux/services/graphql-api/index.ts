/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { VITE_BACKEND_URL, VITE_KEYCLOAK_CLIENT_ID, VITE_KEYCLOAK_REALM_URL } from '../../../../envConfig';
import { oidcConfig } from '../../../main';

const rawBaseQuery = graphqlRequestBaseQuery({
  url: `${VITE_BACKEND_URL}/graphql`,
  prepareHeaders: async (headers) => {
    const storageString =
      (await oidcConfig.userStore?.get(`user:${VITE_KEYCLOAK_REALM_URL}:${VITE_KEYCLOAK_CLIENT_ID}`)) ?? '{}';

    const { access_token } = JSON.parse(storageString);

    if (access_token) {
      headers.set('authorization', `Bearer ${access_token}`);
    }

    return headers;
  },
});

function checkForExpiredSessionError(response: any) {
  // Check if the errors array exists
  if (response.meta && response.meta.response && Array.isArray(response.meta.response.errors)) {
    // Iterate over the errors array
    for (const error of response.meta.response.errors) {
      // Check if the error message matches the specific message
      if (error.message === 'Your session has expired. Please log in again.') {
        return true; // Specific error message found
      }
    }
  }
  return false; // Specific error message not found
}

const baseQuery = async (args: any, api: any, extraOptions: any) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  const isSessionExpired = checkForExpiredSessionError(result);

  if (isSessionExpired) {
    if (!sessionStorage.getItem('redirectPath')) {
      const currentUrl = new URL(window.location.href);
      const currentPath = currentUrl.pathname + currentUrl.search;
      sessionStorage.setItem('redirectPath', encodeURIComponent(currentPath));
    }
    window.location.href = '/auth/login';
  }

  return result;
};

export const graphqlApi = createApi({
  baseQuery,
  tagTypes: ['positionRequest'],
  endpoints: () => ({}),
});
