import { FileTextOutlined, HomeOutlined, PartitionOutlined, UserAddOutlined } from '@ant-design/icons';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/app/app-layout.component';
import RoleGuard from '../components/guards/role.guard';
import { RouteGuard } from '../components/guards/route.guard';
import { AuthRoute } from '../routes/auth';
import { LoginPage } from '../routes/auth/login.page';
import { HomeRoute } from '../routes/home';
import { HomePage } from '../routes/home/home.page';
import { JobProfilesRoute } from '../routes/job-profiles';
import { JobProfilesPage } from '../routes/job-profiles/job-profiles.page';
import { MyPositionsRoute } from '../routes/my-positions';
import { MyPositionsPage } from '../routes/my-positions/my-positions.page';
import { OrgChartRoute } from '../routes/org-chart';
import { OrgChartPage } from '../routes/org-chart/org-chart.page';
import { TotalCompDraftProfilesPage } from '../routes/total-comp-draft-profiles/total-comp-draft-profies.page';
import { TotalCompPublishedProfilesRoute } from '../routes/total-comp-published-profiles';
import { WizardRoute } from '../routes/wizard';
import { PositionRequestPage } from '../routes/wizard/position-request.page';
import { WizardOrgChartPage } from '../routes/wizard/wizard-org-chart.page';
import { RoleBasedComponent } from './role-based-component';

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
                element: (
                  <RoleBasedComponent
                    requiredRole="total-compensation"
                    Component={TotalCompDraftProfilesPage}
                    FallbackComponent={HomePage}
                  />
                ),
              },
            ],
          },

          {
            path: '/my-positions',
            element: <MyPositionsRoute />,
            handle: {
              breadcrumb: () => 'My Positions',
              icon: <UserAddOutlined />,
            },
            children: [
              {
                index: true,
                element: <MyPositionsPage />,
              },
              {
                path: 'create',
                element: <WizardOrgChartPage />,
              },
            ],
          },

          {
            path: '/org-chart',
            element: <OrgChartRoute />,
            handle: {
              breadcrumb: () => 'Org Chart',
              icon: <PartitionOutlined />,
            },
            children: [
              {
                index: true,
                element: <OrgChartPage />,
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
            path: '/position-request/:positionRequestId',
            element: <WizardRoute />,
            children: [
              {
                index: true,
                element: <PositionRequestPage />,
              },
              // {
              //   path: '?step=2',
              //   element: <PositionRequestPage />,
              // },
            ],
          },
        ],
      },
      {
        path: '/total-compensation/profiles/published',
        element: (
          <RoleGuard requiredRole="total-compensation">
            <TotalCompPublishedProfilesRoute />
          </RoleGuard>
        ),
      },
    ],
  },
]);
