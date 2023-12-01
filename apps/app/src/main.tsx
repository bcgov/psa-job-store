import { App, ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { WebStorageStateStore } from 'oidc-client-ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AuthProvider, AuthProviderProps } from 'react-oidc-context';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import 'reflect-metadata';
import { VITE_KEYCLOAK_CLIENT_ID, VITE_KEYCLOAK_REALM_URL, VITE_KEYCLOAK_REDIRECT_URL } from '../envConfig';
import { store } from './redux/redux.store';
import { router } from './router/index';

export const oidcConfig: AuthProviderProps = {
  userStore: new WebStorageStateStore({
    store: localStorage,
  }),
  authority: VITE_KEYCLOAK_REALM_URL,
  client_id: VITE_KEYCLOAK_CLIENT_ID,
  redirect_uri: VITE_KEYCLOAK_REDIRECT_URL,
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig} automaticSilentRenew>
      <ReduxProvider store={store}>
        <ConfigProvider
          theme={{
            components: {
              Layout: {
                siderBg: '#FFF',
              },
            },
          }}
        >
          <HelmetProvider>
            <App>
              <Helmet defaultTitle="Job Store" titleTemplate="%s | Job Store" />
              <RouterProvider router={router} />
            </App>
          </HelmetProvider>
        </ConfigProvider>
      </ReduxProvider>
    </AuthProvider>
  </React.StrictMode>,
);
