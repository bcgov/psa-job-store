import { TreeSelect, Typography } from 'antd';
import { useEffect, useState } from 'react';
import {
  DepartmentModel,
  useGetDepartmentsWithOrganizationQuery,
} from '../../../redux/services/graphql-api/department.api';
import { OrganizationModel, useGetOrganizationsQuery } from '../../../redux/services/graphql-api/organization';

const { Text } = Typography;

interface DepartmentFilterProps {
  setDepartmentId: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  departmentId: string | null | undefined;
  loading?: boolean;
}

export const DepartmentFilter = ({ setDepartmentId, departmentId, loading }: DepartmentFilterProps) => {
  const { data: ministryData, isFetching: ministryDataIsFetching } = useGetOrganizationsQuery();
  const { data: departmentData, isFetching: departmentDataIsFetching } = useGetDepartmentsWithOrganizationQuery();
  const [treeData, setTreeData] = useState<React.ComponentProps<typeof TreeSelect>['treeData']>([]);

  useEffect(() => {
    const ministries: OrganizationModel[] = JSON.parse(JSON.stringify(ministryData?.organizations || []));
    const departments: DepartmentModel[] = JSON.parse(JSON.stringify(departmentData?.departments || []));

    if (ministries.length > 0 && departments.length > 0) {
      const treeData = ministries.map((ministry) => ({
        children: departments
          .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
          .filter((department) => department.organization_id === ministry.id)
          .map(({ id, name }) => ({
            filterString: `${id} ${name}`,
            label: (
              <span title={`${name} (${id})`}>
                {name}{' '}
                <Text style={{ whiteSpace: 'nowrap' }} type="secondary">
                  ({id})
                </Text>
              </span>
            ),
            value: id,
          })),
        label: ministry.name,
        selectable: false,
        value: `ministry-${ministry.id}`,
      }));

      setTreeData(treeData);
    }
  }, [ministryData, departmentData]);

  return (
    <TreeSelect
      onClear={() => setDepartmentId(undefined)}
      onSelect={(value) => setDepartmentId(value)}
      allowClear
      disabled={loading || departmentDataIsFetching || ministryDataIsFetching}
      filterTreeNode
      listHeight={300}
      loading={loading || departmentDataIsFetching || ministryDataIsFetching}
      placeholder="Select a Department"
      showSearch
      style={{ width: '100%' }}
      treeData={treeData}
      treeNodeFilterProp="filterString"
      value={departmentId}
    />
  );
};
