import { TreeSelect, Typography } from 'antd';
import { useEffect, useState } from 'react';
import AccessibleTreeSelect from '../../../components/app/common/components/accessible-tree-select';
import { useGetOrgChartDepartmentFilterQuery } from '../../../redux/services/graphql-api/org-chart.api';

const { Text } = Typography;

interface DepartmentFilterProps {
  setDepartmentId: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect?: (value: any) => void;
  departmentId: string | null | undefined;
  loading?: boolean;
  // focusable?: boolean;
}

export const DepartmentFilter = ({
  setDepartmentId,
  departmentId,
  loading, // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSelect, // focusable = true,
}: DepartmentFilterProps) => {
  const { data: filterData, isFetching: filterDataIsFetching } = useGetOrgChartDepartmentFilterQuery();
  const [treeData, setTreeData] = useState<React.ComponentProps<typeof TreeSelect>['treeData']>([]);
  const [hasOnlyOneDepartment, setHasOnlyOneDepartment] = useState<boolean>(false);

  useEffect(() => {
    // console.log('filterData: ', filterData);
    if (
      filterData &&
      filterData.getOrgChartDepartmentFilter.length == 1 &&
      filterData.getOrgChartDepartmentFilter[0].children.length == 1
    )
      setHasOnlyOneDepartment(true);

    const items = Array.isArray(filterData?.getOrgChartDepartmentFilter) ? filterData?.getOrgChartDepartmentFilter : [];

    const treeData = items?.map((ministry) => ({
      label: ministry.label,
      value: ministry.value,
      selectable: ministry.selectable,
      children: ministry.children.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ label, value, filterString, location_id, location_name }: Record<string, any>) => ({
          // label: (
          //   <span title={`${label} (${value})`}>
          //     {label}{' '}
          //     <Text style={{ whiteSpace: 'nowrap' }} type="secondary">
          //       ({value})
          //     </Text>
          //   </span>
          // ),
          value: value,
          filterString: filterString,
          metadata: {
            filterString: filterString,
            label: label,
            value: value,
            location_id: location_id,
            location_name: location_name,
            ministry: false,
          },
        }),
      ),
      metadata: {
        label: ministry.label,
        value: ministry.value,
        selectable: ministry.selectable,
        ministry: true,
      },
    }));

    // console.log('treeData: ', treeData);
    setTreeData(treeData);

    // Call onSelect with the initially selected value
    if (departmentId && onSelect && treeData) {
      const selectedNode = treeData
        .flatMap((ministry) => ministry.children)
        .find((child) => child.value === departmentId);
      if (selectedNode) {
        onSelect(selectedNode);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData, departmentId]);

  // console.log('original treeData', treeData);
  // console.log('departmentId', departmentId);
  return (
    <>
      <div id="department-filter-description" style={{ display: 'none' }}>
        Select a department to filter the organization chart
      </div>
      <div id="usage-instructions" style={{ display: 'none' }}>
        Use arrow keys to navigate options. Press Enter to select or deselect an option.
      </div>

      {/* <TreeSelect
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
        tabIndex={focusable ? 0 : -1}
        aria-label="Department selector"
        aria-describedby="department-filter-description usage-instructions"
        // open={true}
      /> */}

      <AccessibleTreeSelect
        disabledText={hasOnlyOneDepartment ? 'You only have access to one department' : ''}
        placeholderText={'Select a Department'}
        treeData={JSON.parse(JSON.stringify(treeData))}
        treeValue={departmentId ?? ''}
        onClear={() => setDepartmentId(undefined)}
        allowClear
        width={'100%'}
        onSelect={(value) => {
          onSelect?.(value);
          if (value?.metadata?.value) setDepartmentId(value.metadata.value.toString());
        }}
        renderNode={(node) => {
          // console.log('renderNode:', node.metadata.ministry, node);
          if (!node?.metadata) return <></>;

          if (node.metadata.ministry) return <span>{node.metadata.label}</span>;
          else
            return (
              <span title={`${node.metadata.label} (${node.metadata.value})`}>
                {node.metadata.label}{' '}
                <Text style={{ whiteSpace: 'nowrap' }} type="secondary">
                  ({node.metadata.value})
                </Text>
              </span>
            );
        }}
        disabled={loading || filterDataIsFetching || hasOnlyOneDepartment}
        // tabIndex={focusable ? 0 : -1}
        treeNodeFilterProp="filterString"
      />
    </>
  );
};
