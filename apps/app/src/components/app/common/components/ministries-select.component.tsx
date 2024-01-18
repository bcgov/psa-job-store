/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useGetOrganizationsQuery } from '../../../../redux/services/graphql-api/organization';

const { Option } = Select;

const MinistriesSelect = ({ onChange, isMultiSelect }: any) => {
  const { data } = useGetOrganizationsQuery();
  const ministriesData = data?.organizations || [];
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    // Reset selections when the select mode changes
    setSelectedItems([]);
    setSelectAll(false);
  }, [isMultiSelect]);

  const handleSelectAll = (checked: any) => {
    const allIds = ministriesData.map((item) => item.id);
    setSelectedItems(checked ? allIds : []);
    onChange(checked ? allIds : []);
    setSelectAll(checked);
  };

  const handleSelectionChange = (selected: any) => {
    setSelectedItems(selected);
    setSelectAll(isMultiSelect && selected.length === ministriesData.length);
    onChange(selected);
  };

  return (
    <>
      {isMultiSelect && (
        <Checkbox
          onChange={(e) => handleSelectAll(e.target.checked)}
          checked={selectAll}
          style={{ marginBottom: '10px' }}
        >
          Select all
        </Checkbox>
      )}
      <Select
        mode={isMultiSelect ? 'multiple' : undefined}
        placeholder="Select ministries"
        value={selectedItems}
        onChange={handleSelectionChange}
        style={{ width: '100%' }}
      >
        {ministriesData.map((ministry) => (
          <Option key={ministry.id} value={ministry.id}>
            {ministry.name}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default MinistriesSelect;
