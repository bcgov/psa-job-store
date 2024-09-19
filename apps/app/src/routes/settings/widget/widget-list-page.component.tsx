import { InfoCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Space, Spin, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../../components/app/page-header.component';
import ContentWrapper from '../../../components/content-wrapper.component';
import { DataList } from '../../../components/shared/data-list/data-list.component';
import { FilterOperator } from '../../../components/shared/data-list/lib/prisma-filter/common/filter-operator.enum';
import {
  useGetOrganizationsPicklistForSettingsQuery,
  useGetRolesForSettingsQuery,
  useLazyGetUsersForSettingsQuery,
} from '../../../redux/services/graphql-api/settings/settings.api';
import { useSettingsContext } from '../hooks/use-settings-context.hook';

export const WidgetListPage = () => {
  const { organizations } = useSettingsContext();

  const { data: organizationsPicklistData, isFetching: organizationsPicklistDataIsLoading } =
    useGetOrganizationsPicklistForSettingsQuery();

  const { data: rolesData, isFetching: rolesDataIsLoading } = useGetRolesForSettingsQuery();

  const [trigger, { data: userData, isFetching: userDataIsLoading }] = useLazyGetUsersForSettingsQuery();
  return (
    <>
      <PageHeader title="Widgets" subTitle="Manage widgets..." />
      <ContentWrapper>
        <DataList
          trigger={trigger}
          filterProps={{
            filterProps: [
              {
                type: 'select',
                mode: 'multi-value',
                field: 'roles',
                loading: rolesDataIsLoading,
                operator: FilterOperator.StringListHasSome,
                options: (rolesData ?? []).map((role) => {
                  const label = role
                    .split('-')
                    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
                    .join(' ');

                  return { label: label, value: role };
                }),
                placeholder: 'Roles',
              },
              {
                type: 'select',
                mode: 'single-value',
                field: 'metadata',
                path: ['peoplesoft', 'organization_id'],
                loading: organizationsPicklistDataIsLoading,
                operator: FilterOperator.JsonEquals,
                options: (organizationsPicklistData?.organizations ?? []).map((o) => ({ label: o.name, value: o.id })),
                placeholder: 'Ministry',
              },
            ],
            searchProps: {
              fields: [
                {
                  field: 'name',
                  operator: FilterOperator.StringIContains,
                },
              ],
            },
          }}
          tableProps={{
            columns: [
              {
                key: 'name',
                dataIndex: 'name',
                sorter: true,
                title: 'Name',
              },
              {
                key: 'roles',
                dataIndex: 'roles',
                render: (values: string[]) => {
                  return (
                    <div style={{ rowGap: '1rem', wordWrap: 'break-word', wordBreak: 'break-word' }}>
                      {values.map((value) => (
                        <Tag style={{ margin: '2px' }}>
                          {value
                            .split('-')
                            .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
                            .join(' ')}
                        </Tag>
                      ))}
                    </div>
                  );
                },
                sorter: false,
                title: 'Roles',
              },
              {
                key: 'metadata.peoplesoft.organization_id',
                dataIndex: ['metadata', 'peoplesoft', 'organization_id'],
                render: (value: string) => {
                  const ministryName =
                    organizationsPicklistData?.organizations?.find((o) => o.id === value)?.name ?? '';
                  return <span>{ministryName}</span>;
                },
                sorter: false,
                title: 'Home  ministry',
              },
              {
                key: 'email',
                dataIndex: 'email',
                sorter: true,
                title: 'Email',
              },
              {
                key: 'metadata.org_chart.department_ids',
                dataIndex: ['metadata', 'org_chart', 'department_ids'],
                render: (value: string[]) => {
                  if (organizations.isLoading) {
                    return <Spin size="small" spinning />;
                  }

                  // Reduce data to the format { organization_name: string, department_count: number }[]
                  const organizationAndDepartmentCounts = (
                    organizations && organizations.data ? [...organizations.data] : []
                  )
                    .filter((o) => o.departments.filter((d) => d.effective_status === 'Active').length > 0)
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((organization) => ({
                      organization_name: organization.name,
                      department_count: [...organization.departments]
                        .filter((d) => d.effective_status === 'Active' && value?.includes(d.id))
                        .sort((a, b) => (a.name > b.name ? 1 : -1))
                        .map((d) => d.id).length,
                    }))
                    .filter((o) => o.department_count > 0);

                  return (
                    <span>
                      <Tooltip
                        title={
                          <>
                            {organizationAndDepartmentCounts.map((o) => (
                              <div>
                                {o.organization_name} ({o.department_count})
                              </div>
                            ))}
                          </>
                        }
                      >
                        <Space>
                          {organizationAndDepartmentCounts.reduce((prev, curr) => prev + curr.department_count, 0)}
                          <InfoCircleOutlined />
                        </Space>
                      </Tooltip>
                    </span>
                  );
                },
                sorter: false,
                title: 'Departments',
              },
              {
                key: 'actions',
                align: 'center',
                title: 'Actions',
                render: (_, record) => (
                  <Link to={`${record.id}`}>
                    <Tooltip title="Manage widget">
                      <Button icon={<SettingOutlined />} />
                    </Tooltip>
                  </Link>
                ),
              },
            ],
            data: userData?.usersWithCount,
            loading: userDataIsLoading,
            orderByTransformers: {
              name: 'SortOrderInput',
              email: 'SortOrderInput',
            },
          }}
        />
      </ContentWrapper>
    </>
  );
};

// import { SettingOutlined } from '@ant-design/icons';
// import { Button, Tooltip } from 'antd';
// import { Link } from 'react-router-dom';
// import { PageHeader } from '../../../components/app/page-header.component';
// import ContentWrapper from '../../../components/content-wrapper.component';
// import { DataList } from '../../../components/shared/data-list/data-list.component';
// import { FilterOperator } from '../../../components/shared/data-list/lib/prisma-filter/common/filter-operator.enum';
// import {
//   useGetOrganizationsPicklistForSettingsQuery,
//   useLazyGetDepartmentsForSettingsQuery,
// } from '../../../redux/services/graphql-api/settings/settings.api';

// export const WidgetListPage = () => {
//   const { data: organizationsData, isFetching: organizationsDataIsLoading } =
//     useGetOrganizationsPicklistForSettingsQuery();

//   const [trigger, { data: departmentData, isFetching: departmentDataIsLoading }] =
//     useLazyGetDepartmentsForSettingsQuery();
//   return (
//     <>
//       <PageHeader title="Widgets" subTitle="Manage widgets..." />
//       <ContentWrapper>
//         <DataList
//           trigger={trigger}
//           filterProps={{
//             filterProps: [
//               {
//                 type: 'select',
//                 mode: 'multi-value',
//                 field: 'organization_id',
//                 loading: organizationsDataIsLoading,
//                 operator: FilterOperator.StringIn,
//                 options: (organizationsData?.organizations ?? []).map((o) => ({ label: o.name, value: o.id })),
//                 placeholder: 'Ministries',
//               },
//               {
//                 type: 'select',
//                 mode: 'single-value',
//                 field: 'effective_status',
//                 operator: FilterOperator.StringEquals,
//                 options: [
//                   {
//                     label: 'Active',
//                     value: 'Active',
//                   },
//                   {
//                     label: 'Inactive',
//                     value: 'Inactive',
//                   },
//                 ],
//                 placeholder: 'Status',
//               },
//             ],
//             searchProps: {
//               fields: [
//                 {
//                   field: 'id',
//                   operator: FilterOperator.StringIContains,
//                 },
//                 {
//                   field: 'name',
//                   operator: FilterOperator.StringIContains,
//                 },
//               ],
//             },
//           }}
//           tableProps={{
//             columns: [
//               {
//                 key: 'id',
//                 dataIndex: 'id',
//                 sorter: true,
//                 title: 'Department ID',
//               },
//               {
//                 key: 'name',
//                 dataIndex: 'name',
//                 sorter: true,
//                 title: 'Name',
//               },
//               {
//                 key: 'organization.name',
//                 dataIndex: ['organization', 'name'],
//                 sorter: true,
//                 title: 'Ministry',
//               },
//               {
//                 key: 'effective_status',
//                 dataIndex: 'effective_status',
//                 sorter: true,
//                 title: 'Status',
//               },
//               {
//                 key: 'actions',
//                 align: 'center',
//                 title: 'Actions',
//                 render: (_, record) => (
//                   <Link to={`${record.id}`}>
//                     <Tooltip title="Manage widget">
//                       <Button icon={<SettingOutlined />} />
//                     </Tooltip>
//                   </Link>
//                 ),
//               },
//             ],
//             data: departmentData?.departmentsWithCount,
//             loading: departmentDataIsLoading,
//             orderByTransformers: {},
//           }}
//         />
//       </ContentWrapper>
//     </>
//   );
// };
