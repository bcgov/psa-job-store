import { SettingOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../../components/app/page-header.component';
import ContentWrapper from '../../../components/content-wrapper.component';
import { DataList } from '../../../components/shared/data-list/data-list.component';
import { FilterOperator } from '../../../components/shared/data-list/lib/prisma-filter/common/filter-operator.enum';
import {
  useGetOrganizationsPicklistForSettingsQuery,
  useLazyGetDepartmentsForSettingsQuery,
} from '../../../redux/services/graphql-api/settings/settings.api';

export const WidgetListPage = () => {
  const { data: organizationsData, isFetching: organizationsDataIsLoading } =
    useGetOrganizationsPicklistForSettingsQuery();

  const [trigger, { data: departmentData, isFetching: departmentDataIsLoading }] =
    useLazyGetDepartmentsForSettingsQuery();
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
                field: 'organization_id',
                loading: organizationsDataIsLoading,
                operator: FilterOperator.StringIn,
                options: (organizationsData?.organizations ?? []).map((o) => ({ label: o.name, value: o.id })),
                placeholder: 'Ministries',
              },
              {
                type: 'select',
                mode: 'single-value',
                field: 'effective_status',
                operator: FilterOperator.StringEquals,
                options: [
                  {
                    label: 'Active',
                    value: 'Active',
                  },
                  {
                    label: 'Inactive',
                    value: 'Inactive',
                  },
                ],
                placeholder: 'Status',
              },
            ],
            searchProps: {
              fields: [
                {
                  field: 'id',
                  operator: FilterOperator.StringIContains,
                },
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
                key: 'id',
                dataIndex: 'id',
                sorter: true,
                title: 'Department ID',
              },
              {
                key: 'name',
                dataIndex: 'name',
                sorter: true,
                title: 'Name',
              },
              {
                key: 'organization.name',
                dataIndex: ['organization', 'name'],
                sorter: true,
                title: 'Ministry',
              },
              {
                key: 'effective_status',
                dataIndex: 'effective_status',
                sorter: true,
                title: 'Status',
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
            data: departmentData?.departmentsWithCount,
            loading: departmentDataIsLoading,
          }}
        />
      </ContentWrapper>
    </>
  );
};

// import { SettingOutlined } from '@ant-design/icons';
// import { Button, Tooltip } from 'antd';
// import { Link } from 'react-router-dom';
// import { ListPage } from '../../../components/shared/list-page/list-page.component';
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
//     <ListPage
//       trigger={trigger}
//       pageHeaderProps={{
//         title: 'Widgets',
//         subTitle: 'Manage widgets',
//       }}
//       columns={[
//         {
//           key: 'id',
//           dataIndex: 'id',
//           sorter: true,
//           title: 'Department ID',
//         },
//         {
//           key: 'name',
//           dataIndex: 'name',
//           sorter: true,
//           title: 'Name',
//         },
//         {
//           key: 'organization.name',
//           dataIndex: ['organization', 'name'],
//           sorter: true,
//           title: 'Ministry',
//         },
//         {
//           key: 'effective_status',
//           dataIndex: 'effective_status',
//           sorter: true,
//           title: 'Status',
//         },
//         {
//           key: 'actions',
//           align: 'center',
//           title: 'Actions',
//           render: (_, record) => (
//             <Link to={`${record.id}`}>
//               <Tooltip title="Manage widget">
//                 <Button icon={<SettingOutlined />} />
//               </Tooltip>
//             </Link>
//           ),
//         },
//       ]}
//       data={departmentData?.departmentsWithCount}
//       filters={[
//         {
//           type: 'multi-value',
//           name: 'organization_id',
//           loading: organizationsDataIsLoading,
//           options: (organizationsData?.organizations ?? []).map((o) => ({ label: o.name, value: o.id })),
//           placeholder: 'Ministries',
//         },
//         {
//           type: 'single-value',
//           name: 'effective_status',
//           placeholder: 'Status',
//           options: [
//             {
//               label: 'Active',
//               value: 'Active',
//             },
//             { label: 'Inactive', value: 'Inactive' },
//           ],
//         },
//       ]}
//       loading={departmentDataIsLoading}
//       searchConfig={{
//         fields: ['id', 'name'],
//         placeholder: 'Search by name or department ID',
//       }}
//     />
//   );
// };
