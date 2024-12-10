/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { notification } from 'antd';
import { GraphQLClient } from 'graphql-request';
import { VITE_BACKEND_URL } from '../../../../envConfig';

interface GraphQLError {
  message: string;
  extensions?: {
    code: string;
  };
}

interface GraphQLResponseMeta {
  response: {
    errors: GraphQLError[];
    data: any;
    status: number;
    headers: {
      map: Record<string, string>;
    };
  };
}

export const client = new GraphQLClient(`${VITE_BACKEND_URL}/graphql`, { credentials: 'include' });

const rawBaseQuery = graphqlRequestBaseQuery({ client: client as any });

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

  if (response?.error?.message && response.error.message.includes('UNAUTHENTICATED')) {
    return true;
  }
  return false; // Specific error message not found
}

let isToastShown = false;
const baseQuery = async (args: any, api: any, extraOptions: any) => {
  let errorToastShown = false;
  let suppressErrorToast = false;
  try {
    const result = await rawBaseQuery(args, api, extraOptions);

    suppressErrorToast = args.variables?.suppressGlobalError;

    const isSessionExpired = checkForExpiredSessionError(result);

    if (isSessionExpired) {
      if (!sessionStorage.getItem('redirectPath')) {
        const currentUrl = new URL(window.location.href);
        const currentPath = currentUrl.pathname + currentUrl.search;
        sessionStorage.setItem('redirectPath', encodeURIComponent(currentPath));
      }
      window.location.href = '/auth/login';
    }

    // Assert the type of 'meta' to be GraphQLResponseMeta
    const meta = result.meta as GraphQLResponseMeta | undefined;

    // Check for GraphQL errors in the meta field
    if (meta && meta.response && meta.response.errors && !isToastShown) {
      // Extract the first error message
      const errorCode = meta.response.errors[0]?.extensions?.code;
      const errorMessage = meta.response.errors[0]?.message;

      // if it's unauthorized, do not show the error toast -  the system will handle the redirect to login page
      if (errorCode == 'UNAUTHENTICATED') return result;

      if (errorMessage.startsWith('ALEXANDRIA_ERROR:') && !suppressErrorToast) {
        isToastShown = true;
        errorToastShown = true;
        const messageParts = errorMessage.split(':');
        const errorDescription = messageParts[1];
        notification.error({
          placement: 'bottomRight',
          duration: 0,
          message: 'Error',
          description: errorDescription,
          onClose: () => {
            isToastShown = false; // Reset the flag when the toast is closed
          },
        });
        throw new Error(errorMessage);
      }

      // Throw a custom error with the extracted message
      throw new Error(errorMessage);
    }

    return result;
  } catch (error) {
    // Handle any other unexpected errors
    if (!errorToastShown && !isToastShown && !suppressErrorToast) {
      isToastShown = true;
      notification.error({
        placement: 'bottomRight',
        duration: 0,
        message: 'Unknown Error',
        description: 'Unknown error has occurred. We are investigating the issue. Please try again later.',
        onClose: () => {
          isToastShown = false; // Reset the flag when the toast is closed
        },
      });
    }
    throw error;
  }
};

export const graphqlApi = createApi({
  baseQuery,
  tagTypes: [
    'positionRequest',
    'positionRequestsCount',
    'getOrgChart',
    'jobProfiles',
    'importUserSearch',
    'settingsDepartment',
    'settingsDepartmentMetadata',
    'settingsUser',
    'settingsUserRoles',
  ],
  endpoints: () => ({}),
});
