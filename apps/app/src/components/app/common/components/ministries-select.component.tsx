/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Select } from 'antd';
import { useEffect } from 'react';
import { useGetOrganizationsQuery } from '../../../../redux/services/graphql-api/organization';

const { Option } = Select;

const MinistriesSelect = ({ onChange, isMultiSelect, onBlur, value, allOrganizations, setValue }: any) => {
  const { data } = useGetOrganizationsQuery();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ministriesData = data?.organizations || [];

  useEffect(() => {
    if (allOrganizations) {
      const allIds = ministriesData.map((item) => item.id);
      onChange(allIds);
    } else {
      onChange([]);
    }
  }, [allOrganizations, ministriesData, onChange]);

  const handleSelectAll = (checked: boolean) => {
    const allIds = ministriesData.map((item) => item.id);
    onChange(checked ? allIds : []);

    // Update the 'all_organizations' form variable
    // console.log('all_org setting: ', checked);
    setValue('all_organizations', checked);
  };

  const handleSelectionChange = (selected: any) => {
    // Check if the number of selected items is less than the total
    if (selected.length < ministriesData.length) {
      // If so, set 'all_organizations' to false, but keep the selected items
      setValue('all_organizations', false);
    }
    onChange(selected);
  };

  return (
    <>
      {isMultiSelect && (
        <Checkbox
          onChange={(e) => handleSelectAll(e.target.checked)}
          checked={allOrganizations}
          style={{ marginBottom: '10px' }}
        >
          Select all
        </Checkbox>
      )}
      <Select
        mode={isMultiSelect ? 'multiple' : undefined}
        placeholder="Select ministries"
        value={value}
        onChange={handleSelectionChange}
        onBlur={onBlur}
        style={{ width: '100%' }}
        maxTagCount={10}
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
