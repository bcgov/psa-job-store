/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Select } from 'antd';
import { useGetOrganizationsQuery } from '../../../../redux/services/graphql-api/organization';

const MinistriesSelect = ({ onChange, isMultiSelect, onBlur, value, allOrganizations, setValue }: any) => {
  const { data } = useGetOrganizationsQuery();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ministriesData = data?.organizations.map((d) => ({ ...d, filterString: `${d.id} ${d.name}` })) || [];

  console.log('ministriesData: ', ministriesData);
  // console.log('ministriesData: ', ministriesData, value);
  // const [selectedMinistries, setSelectedMinistries] = useState([] as number[]);

  const handleSelectAll = (checked: any) => {
    // console.log('handleSelectAll');
    const allIds = ministriesData.map((item) => item.id);
    // setSelectedMinistries(checked ? allIds : []);
    setValue('all_organizations', checked);
    // onChange(checked ? allIds : []);

    // Update the 'reportToRelationship' form variable
    // console.log('setting minisries from select all: ', checked ? allIds : []);
    setValue('ministries', checked ? allIds : []);
  };

  const handleSelectionChange = (selected: any) => {
    console.log('seelcted: ', selected);
    // setSelectedMinistries(selected);
    setValue('all_organizations', false);
    onChange(selected);
  };

  return (
    <>
      {isMultiSelect && (
        <Checkbox
          onChange={(e) => {
            // console.log('onChange');
            handleSelectAll(e.target.checked);
          }}
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
        options={ministriesData.map((d) => ({ value: d.id, label: d.name, filterString: `${d.id} ${d.name}` }))}
        optionFilterProp="filterString"
      />
    </>
  );
};

export default MinistriesSelect;
