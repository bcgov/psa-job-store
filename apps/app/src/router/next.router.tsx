import { FileTextOutlined, PartitionOutlined } from '@ant-design/icons';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/app/app-layout.component';
import RoleGuard from '../components/guards/role.guard';
import { Redirect } from '../components/shared/redirect/redirect.component';
import { AuthRoute } from '../routes/auth';
import { LoginPage } from '../routes/auth/login.page';
import { ClassificationTasksRoute } from '../routes/classification-tasks';
import { ClassificationTaskPage } from '../routes/classification-tasks/classification-task.page';
import { ClassificationTasksPage } from '../routes/classification-tasks/classification-tasks.page';
import { HelpRoute } from '../routes/help';
import DocumentRedirect from '../routes/help/documentRedirect.component';
import { EditDocumentPage } from '../routes/help/edit.page';
import { HelpPage } from '../routes/help/help.page';
import { UploadHelpDocPage } from '../routes/help/upload.page';
import { HomeRoute } from '../routes/home';
import { HomePage } from '../routes/home/components/home-page.component';
import { JobProfilesRoute } from '../routes/job-profiles';
import { JobProfilesPage } from '../routes/job-profiles/job-profiles.page';
import { MocksRoute } from '../routes/mocks';
import MocksPage from '../routes/mocks/mocks.page';
import { MyPositionsRoute } from '../routes/my-position-requests';
import { MyPositionsPage } from '../routes/my-position-requests/my-position-requests.page';
import NotFoundComponent from '../routes/not-found/404';
import { OrgChartRoute } from '../routes/org-chart';
import { OrgChartPage } from '../routes/org-chart/org-chart.page';
import { PositionRoute } from '../routes/position';
import { ViewPositionPage } from '../routes/position/view-position.page';
import { SettingsRoute } from '../routes/settings';
import { DepartmentDetailPage } from '../routes/settings/department/department-detail.page';
import { DepartmentListPage } from '../routes/settings/department/department-list.page';
import { UserDetailPage } from '../routes/settings/user/user-detail.page';
import { UserListPage } from '../routes/settings/user/user-list.page';
import { WidgetListPage } from '../routes/settings/widget/widget-list-page.component';
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
import { NextRouteGuard } from './next-route.guard';

export const nextRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      // <ErrorBoundary>
      <NextRouteGuard />
      // </ErrorBoundary>
    ),
    children: [
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
        path: '/',
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: <HomeRoute />,
            children: [
              {
                index: true,
                handle: {},
                element: <HomePage />,
              },
              {
                path: 'help',
                handle: {
                  breadcrumb: () => 'Help and Documentation',
                },
                element: <HelpRoute />,
                children: [
                  {
                    index: true,
                    element: <HelpPage />,
                  },
                  {
                    path: 'create',
                    element: <UploadHelpDocPage />,
                    handle: {
                      breadcrumb: () => 'Upload',
                    },
                  },
                  {
                    path: 'edit/:id',
                    element: <EditDocumentPage />,
                    handle: {
                      breadcrumb: () => 'Edit',
                    },
                  },
                  // In your router configuration
                  {
                    path: ':url',
                    element: <DocumentRedirect />,
                  },
                ],
              },

              // Org Chart
              {
                path: 'my-departments',
                element: <OrgChartRoute />,
                handle: {
                  breadcrumb: () => 'My departments',
                  icon: <PartitionOutlined />,
                },
                children: [
                  {
                    index: true,
                    element: <OrgChartPage />,
                  },
                  {
                    path: 'position',
                    element: <PositionRoute />,
                    children: [
                      {
                        path: ':positionRequestId',
                        element: <ViewPositionPage />,
                      },
                    ],
                  },
                ],
              },
              // Job Profiles
              {
                path: 'job-profiles',
                element: <JobProfilesRoute />,
                handle: {
                  icon: <FileTextOutlined />,
                },
                children: [
                  {
                    index: true,
                    element: <JobProfilesPage />,
                  },
                  {
                    path: ':number',
                    element: <JobProfilesPage />,
                    handle: {
                      icon: <FileTextOutlined />,
                    },
                  },
                  {
                    path: 'manage',
                    children: [
                      {
                        path: 'archived',
                        element: (
                          <RoleGuard roles={['total-compensation']}>
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
                        path: 'create',
                        handle: {
                          breadcrumb: () => 'Create profile',
                        },
                        element: (
                          <RoleGuard roles={['total-compensation']}>
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
                        path: 'draft',
                        element: (
                          <RoleGuard roles={['total-compensation']}>
                            <TotalCompDraftProfilesRoute />
                          </RoleGuard>
                        ),
                        handle: {
                          breadcrumb: () => 'Draft Job Profiles',
                        },
                        children: [
                          {
                            path: ':id',
                            element: <TotalCompCreateProfilePage />,
                          },
                          {
                            index: true,
                            element: <TotalCompDraftProfilesPage />,
                          },
                        ],
                      },
                      {
                        path: 'published',
                        element: (
                          <RoleGuard roles={['total-compensation']}>
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
                    ],
                  },
                ],
              },
              // Requests
              {
                path: 'requests',
                children: [
                  {
                    path: 'positions',
                    element: <MyPositionsRoute />,
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
                        path: 'manage',
                        handle: {
                          breadcrumb: () => 'Manage position requests',
                        },
                        children: [
                          {
                            element: (
                              <RoleGuard roles={['classification']}>
                                <ClassificationTasksRoute />
                              </RoleGuard>
                            ),
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
                            path: 'approved',
                            element: (
                              <RoleGuard roles={['total-compensation']}>
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
                        ],
                      },
                      {
                        path: ':positionRequestId',
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
                              icon: <FileTextOutlined />,
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              // Settings
              {
                path: 'settings',
                element: (
                  <RoleGuard roles={['super-admin']}>
                    <SettingsRoute />
                  </RoleGuard>
                ),
                children: [
                  {
                    path: 'departments',
                    handle: {
                      breadcrumb: () => 'Departments',
                    },
                    children: [
                      {
                        index: true,
                        element: <DepartmentListPage />,
                      },
                      {
                        path: ':id',
                        element: <DepartmentDetailPage />,
                      },
                    ],
                  },
                  {
                    path: 'users',
                    handle: {
                      breadcrumb: () => 'Users',
                    },
                    children: [
                      {
                        index: true,
                        element: <UserListPage />,
                      },
                      {
                        path: ':employeeId',
                        element: <UserDetailPage />,
                      },
                    ],
                  },
                  {
                    path: 'widgets',
                    handle: {
                      breadcrumb: () => 'Widgets',
                    },
                    children: [
                      {
                        index: true,
                        element: <WidgetListPage />,
                      },
                    ],
                  },
                ],
              },
              // Unauthorized
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
              {
                path: '/mocks/:id',
                element: <MocksRoute />,
                children: [
                  {
                    index: true,
                    element: <MocksPage />,
                  },
                ],
              },
              // Legacy redirects to support previous URL scheme
              // These links specifically were used in share links, CRM service incidents
              {
                path: '/my-position-requests/share/:positionRequestId',
                element: <Redirect to="/requests/positions/share/:positionRequestId" replace />,
              },
              {
                path: '/archived-job-profiles/:id',
                element: <Redirect to="/job-profiles/manage/archived/:id" replace />,
              },
              {
                path: '/drafts-job-profiles/:id',
                element: <Redirect to="/job-profiles/manage/draft/:id" replace />,
              },
              {
                path: '/published-job-profiles/:id',
                element: <Redirect to="/job-profiles/manage/published/:id" replace />,
              },
              {
                path: '/classification-tasks/:id',
                element: <Redirect to="/requests/positions/manage/:id" replace />,
              },
              {
                path: '*',
                element: <Redirect to="/not-found" replace />,
              },
              {
                path: '/not-found',
                element: <NotFoundComponent />, // This will handle all unmatched routes
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Redirect to="/not-found" replace />,
  },
  {
    path: '/not-found',
    element: <NotFoundComponent />, // This will handle all unmatched routes
  },
]);
