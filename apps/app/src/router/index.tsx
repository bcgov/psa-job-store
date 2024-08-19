import { FileTextOutlined, PartitionOutlined, UserAddOutlined } from '@ant-design/icons';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/app/app-layout.component';
import { AppLayout as AppLayoutNext } from '../components/app@next/app-layout.component';
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
import { SavedJobProfilesPage } from '../routes/job-profiles/saved-job-profiles.page';
import { MyPositionsRoute } from '../routes/my-position-requests';
import { MyPositionsPage } from '../routes/my-position-requests/my-position-requests.page';
import { OrgChartRoute as OrgChartOldRoute, OrgChartRoute } from '../routes/org-chart';
import { OrgChartPage as OrgChartOldPage, OrgChartPage } from '../routes/org-chart/org-chart.page';
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
import { RoleBasedRouting } from './role-based-component';

export const router = createBrowserRouter([
  {
    path: 'auth',
    element: <AuthRoute />,
    children: [
      {
        element: <AppLayoutNext />,
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
        element: <AppLayoutNext />,
        children: [
          {
            path: 'next',
            element: <HomeRoute />,
            children: [
              // Home
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
                    path: 'saved',
                    element: <JobProfilesRoute />,
                    handle: {
                      icon: <FileTextOutlined />,
                    },
                    children: [
                      {
                        index: true,
                        element: <SavedJobProfilesPage />,
                      },
                      {
                        path: ':number',
                        element: <SavedJobProfilesPage />,
                        handle: {
                          icon: <FileTextOutlined />,
                        },
                      },
                    ],
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
                              breadcrumb: () => 'My position requests',
                              icon: <FileTextOutlined />,
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              // {
              //   path: '/my-position-requests',
              //   element: <MyPositionsRoute />,
              //   handle: {
              //     breadcrumb: () => 'My Position Requests',
              //     icon: <UserAddOutlined />,
              //   },
              //   children: [
              //     {
              //       index: true,
              //       element: <MyPositionsPage />,
              //     },
              //     {
              //       path: 'create',
              //       element: <WizardOrgChartPage />,
              //     },
              //     {
              //       path: '/my-position-requests/:positionRequestId',
              //       element: <WizardRoute />,
              //       children: [
              //         {
              //           index: true,
              //           element: <PositionRequestPage />,
              //           handle: {
              //             icon: <FileTextOutlined />,
              //           },
              //         },
              //       ],
              //     },
              //     {
              //       path: 'share/:positionRequestId',
              //       element: <WizardRoute />,
              //       children: [
              //         {
              //           index: true,
              //           element: <PositionRequestPage />,
              //           handle: {
              //             breadcrumb: () => 'My position requests',
              //             icon: <FileTextOutlined />,
              //           },
              //         },
              //       ],
              //     },
              //   ],
              // },
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
                        path: ':id',
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
            ],
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
                    path: ':id',
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
          {
            path: '/my-position-requests',
            element: <MyPositionsRoute />,
            handle: {
              breadcrumb: () => 'My Position Requests',
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
                path: '/my-position-requests/:positionRequestId',
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
                      breadcrumb: () => 'My position requests',
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
            path: '/org-chart-old',
            element: <OrgChartOldRoute />,
            handle: {
              breadcrumb: () => 'My organizations',
              icon: <PartitionOutlined />,
            },
            children: [
              {
                index: true,
                element: <OrgChartOldPage />,
              },
            ],
          },
          {
            path: '/job-profiles',
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
            ],
          },

          {
            path: '/saved-profiles',
            element: <JobProfilesRoute />,
            handle: {
              icon: <FileTextOutlined />,
            },
            children: [
              {
                index: true,
                element: <SavedJobProfilesPage />,
              },
              {
                path: ':number',
                element: <SavedJobProfilesPage />,
                handle: {
                  icon: <FileTextOutlined />,
                },
              },
            ],
          },

          {
            path: '/draft-job-profiles',
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
                path: 'create',
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
          {
            path: '/archived-job-profiles',
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
            path: '/approved-requests',
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

          {
            path: '/classification-tasks',
            element: (
              <RoleGuard roles={['classification']}>
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
