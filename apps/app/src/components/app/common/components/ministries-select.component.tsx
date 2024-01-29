/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Select } from 'antd';
import { useGetOrganizationsQuery } from '../../../../redux/services/graphql-api/organization';

const { Option } = Select;

const MinistriesSelect = ({ onChange, isMultiSelect, onBlur, value, allOrganizations, setValue }: any) => {
  const { data } = useGetOrganizationsQuery();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ministriesData = data?.organizations || [];
  // const [selectedMinistries, setSelectedMinistries] = useState([] as number[]);

  const handleSelectAll = (checked: any) => {
    console.log('handleSelectAll');
    const allIds = ministriesData.map((item) => item.id);
    // setSelectedMinistries(checked ? allIds : []);
    setValue('all_organizations', checked);
    // onChange(checked ? allIds : []);

    // Update the 'reportToRelationship' form variable
    console.log('setting minisries from select all: ', checked ? allIds : []);
    setValue('ministries', checked ? allIds : []);
  };

  const handleSelectionChange = (selected: any) => {
    // setSelectedMinistries(selected);
    setValue('all_organizations', false);
    onChange(selected);
  };

  return (
    <>
      {isMultiSelect && (
        <Checkbox
          onChange={(e) => {
            console.log('onChange');
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
