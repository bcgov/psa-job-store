import axios, { AxiosRequestConfig } from 'axios';
import { VITE_BACKEND_URL, VITE_KEYCLOAK_CLIENT_ID, VITE_KEYCLOAK_REALM_URL } from '../../envConfig';
import { oidcConfig } from '../main';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkForExpiredSessionError(response: any) {
  if (response.meta && response.meta.response && Array.isArray(response.meta.response.errors)) {
    for (const error of response.meta.response.errors) {
      if (error.message === 'Your session has expired. Please log in again.') {
        return true;
      }
    }
  }
  return false;
}

interface LogMessage {
  level: string;
  message: string;
  stack?: string;
  timestamp: string;
  path: string;
}

export const sendLogToServer = async (error: Error): Promise<void> => {
  console.log('sendLogToServer!');
  const logMessage: LogMessage = {
    level: 'error',
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
  };
  // console.log(logMessage);
  const storageString =
    (await oidcConfig.userStore?.get(`user:${VITE_KEYCLOAK_REALM_URL}:${VITE_KEYCLOAK_CLIENT_ID}`)) ?? '{}';

  const { access_token } = JSON.parse(storageString);

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  try {
    const result = await axios.post(VITE_BACKEND_URL + '/logs/log', logMessage, config);
    const isSessionExpired = checkForExpiredSessionError(result);

    if (isSessionExpired) {
      if (!sessionStorage.getItem('redirectPath')) {
        const currentUrl = new URL(window.location.href);
        const currentPath = currentUrl.pathname + currentUrl.search;
        sessionStorage.setItem('redirectPath', encodeURIComponent(currentPath));
      }
      window.location.href = '/auth/login';
    }

    // console.log(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (networkError: any) {
    console.error('Failed to send log to server', networkError);
  }
};
