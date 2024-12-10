import { App, ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import 'reflect-metadata';
import './global.css';
import { store } from './redux/redux.store';
import { nextRouter } from './router/next.router';
import { WizardProvider } from './routes/wizard/components/wizard.provider';
import { sendLogToServer } from './utils/logger-service.util';

window.onerror = function (_message, _source, _lineno, _colno, error) {
  console.error('Caught by window.onerror:', error);
  if (error) sendLogToServer(error);
};

window.addEventListener('unhandledrejection', function (event) {
  console.error('Unhandled promise rejection:', event.reason);
  sendLogToServer(event.reason);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ErrorBoundary > */}
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
          token: {
            colorLink: '#0057AD',
            colorPrimary: '#0057AD',
            // colorTextSecondary: 'red',
            // colorText: 'red',
            colorTextTertiary: '#6E6E6E',
            fontSizeHeading1: 20,
            fontSizeHeading2: 18,
            fontSizeHeading3: 16,
            fontSizeHeading4: 14,
            fontSizeHeading5: 14,

            controlItemBgActive: '#F1F8FE',

            lineHeightHeading1: 1.4,
            lineHeightHeading2: 1.33333,
            lineHeightHeading3: 1.375,
            lineHeightHeading4: 1,
            lineHeightHeading5: 2,

            colorTextPlaceholder: '#6E6E6E',
          },
        }}
      >
        <HelmetProvider>
          <App>
            <Helmet defaultTitle="Job Store" titleTemplate="%s | Job Store" />
            <WizardProvider>
              <RouterProvider router={nextRouter} />
            </WizardProvider>
          </App>
        </HelmetProvider>
      </ConfigProvider>
    </ReduxProvider>
    {/* </ErrorBoundary> */}
  </React.StrictMode>,
);
