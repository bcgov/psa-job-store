import { FileTextOutlined, HomeOutlined, StarOutlined } from '@ant-design/icons';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/app/app-layout.component';
import { RouteGuard } from '../components/guards/route.guard';
import { AuthRoute } from '../routes/auth';
import { LoginPage } from '../routes/auth/login.page';
import { HomeRoute } from '../routes/home';
import { HomePage } from '../routes/home/home.page';
import { JobProfilesRoute } from '../routes/job-profiles';
import { JobProfilesPage } from '../routes/job-profiles/job-profiles.page';
import { WizardRoute } from '../routes/wizard';
import { WizardEditPage } from '../routes/wizard/wizard-edit.page';
import { WizardResultPage } from '../routes/wizard/wizard-result.page';
import { WizardReviewPage } from '../routes/wizard/wizard-review.page';
import { WizardPage } from '../routes/wizard/wizard.page';

export const router = createBrowserRouter([
  {
    path: 'auth',
    element: <AuthRoute />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <RouteGuard />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: <HomeRoute />,
            handle: {
              breadcrumb: () => 'Home',
              icon: <HomeOutlined />,
            },
            children: [
              {
                index: true,
                element: <HomePage />,
              },
            ],
          },
          {
            path: '/job-profiles',
            element: <JobProfilesRoute />,
            handle: {
              breadcrumb: () => 'Job Profiles',
              icon: <FileTextOutlined />,
            },
            children: [
              {
                index: true,
                element: <JobProfilesPage />,
              },
              {
                path: ':id',
                element: <JobProfilesPage />,
                handle: {
                  breadcrumb: () => 'Job Profilez',
                  icon: <FileTextOutlined />,
                },
              },
            ],
          },
          {
            path: '/wizard',
            element: <WizardRoute />,
            handle: {
              breadcrumb: () => 'Wizard',
              icon: <StarOutlined />,
            },
            children: [
              {
                index: true,
                element: <WizardPage />,
              },
              {
                path: ':id',
                element: <WizardPage />,
              },
              {
                path: 'edit',
                element: <WizardEditPage />,
                handle: {
                  breadcrumb: () => 'Edit profile',
                },
              },
              {
                path: 'review',
                element: <WizardReviewPage />,
                handle: {
                  breadcrumb: () => 'Review profile',
                },
              },
              {
                path: 'result',
                element: <WizardResultPage />,
                handle: {
                  breadcrumb: () => 'Profile',
                },
              },
            ],
          },
        ],
      },
    ],
  },
]);
