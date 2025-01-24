/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from 'antd';
import { useGetOrganizationsQuery } from '../../../../redux/services/graphql-api/organization';

const MinistriesSelect = ({ onChange, isMultiSelect, onBlur, value, setValue }: any) => {
  const { data } = useGetOrganizationsQuery();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ministriesData = data?.organizations.map((d) => ({ ...d, filterString: `${d.id} ${d.name}` })) || [];
  const handleSelectionChange = (selected: any) => {
    // Validation gets triggered as a side effect of this setValue call, so it has to stick around until this is resolved
    setValue('all_organizations', false);
    onChange(selected);
  };

  return (
    <>
      <Select
        mode={isMultiSelect ? 'multiple' : undefined}
        placeholder="Select ministries"
        value={value}
        onChange={handleSelectionChange}
        onBlur={onBlur}
        style={{ width: '100%' }}
        maxTagCount={10}
        options={ministriesData.map((d) => ({ value: d.id, label: d.name, filterString: `${d.id} ${d.name}` }))}
        optionFilterProp="filterString"
        allowClear
      />
    </>
  );
};

export default MinistriesSelect;
