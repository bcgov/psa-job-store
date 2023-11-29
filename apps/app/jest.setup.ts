import '@testing-library/jest-dom';
import 'reflect-metadata';

import * as dotenv from 'dotenv';
dotenv.config();

const { VITE_KEYCLOAK_REALM_URL, VITE_KEYCLOAK_CLIENT_ID, VITE_BACKEND_URL, VITE_KEYCLOAK_REDIRECT_URL } = process.env;

jest.mock('./envConfig', () => ({
  VITE_BACKEND_URL: VITE_BACKEND_URL,
  VITE_KEYCLOAK_REALM_URL: VITE_KEYCLOAK_REALM_URL,
  VITE_KEYCLOAK_CLIENT_ID: VITE_KEYCLOAK_CLIENT_ID,
  VITE_KEYCLOAK_REDIRECT_URL: VITE_KEYCLOAK_REDIRECT_URL,
}));
