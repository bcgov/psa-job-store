import { TreeSelect, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useGetOrgChartDepartmentFilterQuery } from '../../../redux/services/graphql-api/org-chart.api';

const { Text } = Typography;

interface DepartmentFilterProps {
  setDepartmentId: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  departmentId: string | null | undefined;
  loading?: boolean;
}

export const DepartmentFilter = ({ setDepartmentId, departmentId, loading }: DepartmentFilterProps) => {
  const { data: filterData, isFetching: filterDataIsFetching } = useGetOrgChartDepartmentFilterQuery();
  const [treeData, setTreeData] = useState<React.ComponentProps<typeof TreeSelect>['treeData']>([]);

  useEffect(() => {
    const items = Array.isArray(filterData?.getOrgChartDepartmentFilter) ? filterData?.getOrgChartDepartmentFilter : [];

    const treeData = items?.map((ministry) => ({
      label: ministry.label,
      value: ministry.value,
      selectable: ministry.selectable,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children: ministry.children.map(({ label, value, filterString }: Record<string, any>) => ({
        label: (
          <span title={`${label} (${value})`}>
            {label}{' '}
            <Text style={{ whiteSpace: 'nowrap' }} type="secondary">
              ({value})
            </Text>
          </span>
        ),
        value: value,
        filterString: filterString,
      })),
    }));

    setTreeData(treeData);
  }, [filterData]);

  return (
    <TreeSelect
      onClear={() => setDepartmentId(undefined)}
      onSelect={(value) => setDepartmentId(value)}
      allowClear
      disabled={loading || filterDataIsFetching}
      filterTreeNode
      listHeight={300}
      loading={loading || filterDataIsFetching}
      placeholder="Select a Department"
      showSearch
      style={{ width: '100%' }}
      treeData={treeData}
      treeNodeFilterProp="filterString"
      value={departmentId}
    />
  );
};
