import { FileTextOutlined, PartitionOutlined, UserAddOutlined } from '@ant-design/icons';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/app/app-layout.component';
import RoleGuard from '../components/guards/role.guard';
import { RouteGuard } from '../components/guards/route.guard';
import { AuthRoute } from '../routes/auth';
import { LoginPage } from '../routes/auth/login.page';
import { ClassificationTaskPage } from '../routes/classification-tasks/classification-task.page';
import { ClassificationTasksPage } from '../routes/classification-tasks/classification-tasks.page';
import { HomeRoute } from '../routes/home';
import { HomePage } from '../routes/home/home.page';
import { JobProfilesRoute } from '../routes/job-profiles';
import { JobProfilesPage } from '../routes/job-profiles/job-profiles.page';
import { MyPositionsRoute } from '../routes/my-positions';
import { MyPositionsPage } from '../routes/my-positions/my-positions.page';
import { OrgChartRoute } from '../routes/org-chart';
import { OrgChartPage } from '../routes/org-chart/org-chart.page';
import { TotalCompApprovedRequestsRoute } from '../routes/total-comp-approved-requests';
import { TotalCompApprovedRequestPage } from '../routes/total-comp-approved-requests/total-comp-approved-request.page';
import { TotalCompApprovedRequestsPage } from '../routes/total-comp-approved-requests/total-comp-approved-requests.page';
import { TotalCompCreateProfilePage } from '../routes/total-comp-create-profile/total-comp-create-profile.page';
import { TotalCompDraftProfilesRoute } from '../routes/total-comp-draft-profiles';
import { TotalCompDraftProfilesPage } from '../routes/total-comp-draft-profiles/total-comp-draft-profies.page';
import { TotalCompPublishedProfilesPage } from '../routes/total-comp-published-profiles/total-comp-published-profies.page';
import { UnauthorizedRoute } from '../routes/unauthorized';
import UnauthorizedPage from '../routes/unauthorized/unauthorized.page';
import { WizardRoute } from '../routes/wizard';
import { PositionRequestPage } from '../routes/wizard/position-request.page';
import { WizardOrgChartPage } from '../routes/wizard/wizard-org-chart.page';
import { RoleBasedRouting } from './role-based-component';

export const router = createBrowserRouter([
  {
    path: 'auth',
    element: <AuthRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'logout',
            element: <LoginPage />,
          },
        ],
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
            children: [
              {
                index: true,
                handle: {
                  // breadcrumb: () => 'My tasks',
                },
                element: (
                  <RoleBasedRouting
                    roleComponentMapping={{
                      classification: ClassificationTasksPage,
                      'total-compensation': TotalCompDraftProfilesPage,
                      'hiring-manager': HomePage,
                      user: UnauthorizedPage,
                      default: UnauthorizedPage,

                      // default: HomePage,
                    }}
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
              breadcrumb: () => 'My organizations',
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
            ],
          },
          {
            path: '/total-compensation/profiles',
            element: (
              <RoleGuard requiredRole="total-compensation">
                <TotalCompDraftProfilesRoute />
              </RoleGuard>
            ),
            handle: {
              breadcrumb: () => 'Job profiles',
            },
            children: [
              {
                path: 'drafts',
                element: <TotalCompDraftProfilesPage />,
              },
              {
                path: 'published',
                element: <TotalCompPublishedProfilesPage />,
              },
              // {
              //   handle: {
              //     breadcrumb: () => 'Create profile',
              //   },
              //   path: 'create',
              //   element: <TotalCompCreateProfilePage />,
              // },
              {
                path: ':id',
                element: <TotalCompCreateProfilePage />,
              },
            ],
          },
          {
            path: '/total-compensation/create-profile',
            element: (
              <RoleGuard requiredRole="total-compensation">
                <TotalCompDraftProfilesRoute />
              </RoleGuard>
            ),
            handle: {
              breadcrumb: () => 'Approved requests',
            },
            children: [
              {
                handle: {
                  breadcrumb: () => 'Create profile',
                },
                index: true,
                element: <TotalCompCreateProfilePage />,
              },
            ],
          },
          {
            path: '/total-compensation/approved-requests',
            element: (
              <RoleGuard requiredRole="total-compensation">
                <TotalCompApprovedRequestsRoute />
              </RoleGuard>
            ),
            handle: {
              breadcrumb: () => 'Approved requests',
            },
            children: [
              {
                index: true,
                element: <TotalCompApprovedRequestsPage />,
              },
              {
                path: ':positionRequestId',
                element: <TotalCompApprovedRequestPage />,
              },
            ],
          },

          {
            path: '/classification-tasks/:positionRequestId',
            element: (
              <RoleGuard requiredRole="classification">
                <TotalCompApprovedRequestsRoute />
              </RoleGuard>
            ),
            handle: {
              breadcrumb: () => 'My tasks',
            },
            children: [
              {
                index: true,
                element: <ClassificationTaskPage />,
              },
            ],
          },

          {
            path: '/unauthorized',
            element: <UnauthorizedRoute />,
            children: [
              {
                index: true,
                element: <UnauthorizedPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
