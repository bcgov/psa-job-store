import Select from 'react-select';
import { FilterData } from '../filter-bar.component';

type SelectProps = React.ComponentProps<Select>;
export type SelectFilterOption = { label: string; value: string };

export interface SelectFilterProps extends Pick<SelectProps, 'isMulti' | 'placeholder'> {
  addFilterData: (type: keyof FilterData, value: string) => void;
  removeFilterData: (type: keyof FilterData, value: string) => void;
  filterData: FilterData;
  name: string;
  options: SelectFilterOption[];
}

export const SelectFilter = ({
  addFilterData,
  removeFilterData,
  filterData,
  isMulti,
  name,
  options,
  placeholder,
}: SelectFilterProps) => {
  return (
    <Select
      onChange={(newValue, { action, ...meta }) => {
        console.log('newValue: ', newValue);
        console.log('actionMeta: ', meta);

        let option: SelectFilterOption | null;
        if (isMulti === true) {
          option = meta.option as SelectFilterOption;
        } else {
          option = newValue as SelectFilterOption | null;
        }

        if (action === 'select-option') {
          if (option != null) {
            addFilterData(name, option.value);
          }
        } else {
          if (option != null) {
            removeFilterData(name, option.value);
          }
        }
      }}
      backspaceRemovesValue={false}
      closeMenuOnSelect={false}
      controlShouldRenderValue={false}
      hideSelectedOptions={false}
      isClearable={false}
      isMulti={isMulti}
      options={options}
      name={name}
      placeholder={placeholder}
      styles={{
        container: (css) => ({ ...css, width: '200px' }),
        menu: (styles) => ({ ...styles, minWidth: '100%', width: 'max-content' }),
      }}
      value={options.filter((option) => filterData[name].value?.includes(option.value))}
    />
  );
};
