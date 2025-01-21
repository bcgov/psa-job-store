import axios from 'axios';
import { VITE_BACKEND_URL } from '../../envConfig';
import { checkForExpiredSessionError } from '../redux/services/graphql-api';

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

  try {
    const result = await axios.post(VITE_BACKEND_URL + '/logs/log', logMessage, { withCredentials: true });
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
