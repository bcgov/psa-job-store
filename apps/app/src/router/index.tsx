import { FileTextOutlined, PartitionOutlined, UserAddOutlined } from '@ant-design/icons';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/app/app-layout.component';
import RoleGuard from '../components/guards/role.guard';
import { RouteGuard } from '../components/guards/route.guard';
import { AuthRoute } from '../routes/auth';
import { LoginPage } from '../routes/auth/login.page';
import { ClassificationTasksRoute } from '../routes/classification-tasks';
import { ClassificationTaskPage } from '../routes/classification-tasks/classification-task.page';
import { ClassificationTasksPage } from '../routes/classification-tasks/classification-tasks.page';
import { HomeRoute } from '../routes/home';
import { HomePage } from '../routes/home/home.page';
import { JobProfilesRoute } from '../routes/job-profiles';
import { JobProfilesPage } from '../routes/job-profiles/job-profiles.page';
import { MyPositionsRoute } from '../routes/my-positions';
import { MyPositionsPage } from '../routes/my-positions/my-positions.page';
import { OrgChartRoute } from '../routes/org-chart';
import { OrgChartRoute as OrgChartNextRoute } from '../routes/org-chart-next';
import { OrgChartPage as OrgChartNextPage } from '../routes/org-chart-next/org-chart.page';
import { OrgChartRoute as OrgChartReduxRoute } from '../routes/org-chart-redux';
import { OrgChartPage as OrgChartReduxPage } from '../routes/org-chart-redux/org-chart.page';
import { OrgChartPage } from '../routes/org-chart/org-chart.page';
import { TotalCompApprovedRequestsRoute } from '../routes/total-comp-approved-requests';
import { TotalCompApprovedRequestPage } from '../routes/total-comp-approved-requests/total-comp-approved-request.page';
import { TotalCompApprovedRequestsPage } from '../routes/total-comp-approved-requests/total-comp-approved-requests.page';
import { TotalCompArchivedProfilesPage } from '../routes/total-comp-archived-profiles/total-comp-archived-profies.page';
import { TotalCompCreateProfilePage } from '../routes/total-comp-create-profile/total-comp-create-profile.page';
import { TotalCompDraftProfilesRoute } from '../routes/total-comp-draft-profiles';
import { TotalCompDraftProfilesPage } from '../routes/total-comp-draft-profiles/total-comp-draft-profies.page';
import { TotalCompPublishedProfilesRoute } from '../routes/total-comp-published-profiles';
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
              {
                path: '/my-positions/:positionRequestId',
                element: <WizardRoute />,
                children: [
                  {
                    index: true,
                    element: <PositionRequestPage />,
                    handle: {
                      icon: <FileTextOutlined />,
                    },
                  },
                ],
              },
              {
                path: 'share/:positionRequestId',
                element: <WizardRoute />,
                children: [
                  {
                    index: true,
                    element: <PositionRequestPage />,
                    handle: {
                      breadcrumb: () => 'My positions',
                      icon: <FileTextOutlined />,
                    },
                  },
                ],
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
            path: '/org-chart-next',
            element: <OrgChartNextRoute />,
            handle: {
              breadcrumb: () => 'My organizations',
              icon: <PartitionOutlined />,
            },
            children: [
              {
                index: true,
                element: <OrgChartNextPage />,
              },
            ],
          },
          {
            path: '/org-chart-redux',
            element: <OrgChartReduxRoute />,
            handle: {
              breadcrumb: () => 'My organizations',
              icon: <PartitionOutlined />,
            },
            children: [
              {
                index: true,
                element: <OrgChartReduxPage />,
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
                  icon: <FileTextOutlined />,
                },
              },
            ],
          },

          {
            path: '/draft-job-profiles',
            element: (
              <RoleGuard requiredRole="total-compensation">
                <TotalCompDraftProfilesRoute />
              </RoleGuard>
            ),
            handle: {
              breadcrumb: () => 'Draft Job Profiles',
            },
            children: [
              {
                path: 'create',
                element: (
                  <RoleGuard requiredRole="total-compensation">
                    <TotalCompDraftProfilesRoute />
                  </RoleGuard>
                ),
                children: [
                  {
                    index: true,
                    element: <TotalCompCreateProfilePage />,
                  },
                  {
                    path: ':id',
                    element: <TotalCompCreateProfilePage />,
                  },
                ],
              },
              {
                path: ':id',
                element: <TotalCompCreateProfilePage />,
              },
              {
                handle: {
                  breadcrumb: () => 'Create profile',
                },
                index: true,
                element: <TotalCompDraftProfilesPage />,
              },
            ],
          },
          {
            path: '/published-job-profiles',
            element: (
              <RoleGuard requiredRole="total-compensation">
                <TotalCompPublishedProfilesRoute />
              </RoleGuard>
            ),
            handle: {
              breadcrumb: () => 'Published Job Profiles',
            },
            children: [
              {
                index: true,
                element: <TotalCompPublishedProfilesPage />,
              },
              {
                path: ':id',
                element: <TotalCompCreateProfilePage />,
              },
            ],
          },
          {
            path: '/archived-job-profiles',
            element: (
              <RoleGuard requiredRole="total-compensation">
                <TotalCompPublishedProfilesRoute />
              </RoleGuard>
            ),
            handle: {
              breadcrumb: () => 'Archived Job Profiles',
            },
            children: [
              {
                index: true,
                element: <TotalCompArchivedProfilesPage />,
              },
              {
                path: ':id',
                element: <TotalCompCreateProfilePage />,
              },
            ],
          },
          {
            path: '/approved-requests',
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
            path: '/classification-tasks',
            element: (
              <RoleGuard requiredRole="classification">
                <ClassificationTasksRoute />
              </RoleGuard>
            ),
            handle: {
              breadcrumb: () => 'My tasks',
            },
            children: [
              {
                index: true,
                element: <ClassificationTasksPage />,
              },
              {
                path: ':positionRequestId',
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
