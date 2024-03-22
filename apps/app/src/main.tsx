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
import { sendLogToServer } from './redux/services/loggerService';
import { router } from './router/index';
import ErrorBoundary from './routes/error-boundary/ErrorBoundary';
import { WizardProvider } from './routes/wizard/components/wizard.provider';

export const oidcConfig: AuthProviderProps = {
  userStore: new WebStorageStateStore({
    store: localStorage,
  }),
  authority: VITE_KEYCLOAK_REALM_URL,
  client_id: VITE_KEYCLOAK_CLIENT_ID,
  redirect_uri: VITE_KEYCLOAK_REDIRECT_URL,
};

window.addEventListener('error', function (event) {
  console.error('Caught by global error listener:', event.error);
  sendLogToServer(event.error);
});

window.addEventListener('unhandledrejection', function (event) {
  console.error('Unhandled promise rejection:', event.reason);
  sendLogToServer(event.reason);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig} automaticSilentRenew>
      <ReduxProvider store={store}>
        <ConfigProvider
          theme={{
            // todo: this causes some issues (for example steps component on wizard doesn't render properly), needed to render AccessibleList on dev
            // hashed: false,
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
              <WizardProvider>
                <ErrorBoundary>
                  <RouterProvider router={router} />
                </ErrorBoundary>
              </WizardProvider>
            </App>
          </HelmetProvider>
        </ConfigProvider>
      </ReduxProvider>
    </AuthProvider>
  </React.StrictMode>,
);
