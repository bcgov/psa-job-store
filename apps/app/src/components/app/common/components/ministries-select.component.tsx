/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useGetOrganizationsQuery } from '../../../../redux/services/graphql-api/organization';

const { Option } = Select;

const MinistriesSelect = ({ onChange, isMultiSelect, onBlur, value, allOrganizations, setValue }: any) => {
  const { data } = useGetOrganizationsQuery();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ministriesData = data?.organizations || [];
  const [selectedMinistries, setSelectedMinistries] = useState([] as number[]);

  useEffect(() => {
    if (allOrganizations) {
      const allIds = ministriesData.map((item) => item.id);
      setSelectedMinistries(allIds);
      onChange(allIds);
    } else {
      setSelectedMinistries(value);
    }
  }, [allOrganizations, ministriesData, value, onChange]);

  const handleSelectAll = (checked: any) => {
    const allIds = ministriesData.map((item) => item.id);
    setSelectedMinistries(checked ? allIds : []);
    setValue('all_organizations', checked);
    onChange(checked ? allIds : []);
  };

  const handleSelectionChange = (selected: any) => {
    setSelectedMinistries(selected);
    if (selected.length < ministriesData.length) {
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
        value={selectedMinistries}
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
