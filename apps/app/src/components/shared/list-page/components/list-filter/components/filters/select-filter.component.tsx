import { useMemo } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';
import { FilterOption } from '.';
import { FilterData } from '../../../../interfaces/filter-data.interface';

export interface SelectFilterProps {
  setSearchParams: SetURLSearchParams;
  filterData: FilterData;
  isMulti?: boolean;
  loading?: boolean;
  name: string;
  options: FilterOption[];
  placeholder: React.ReactNode;
}

export const SelectFilter = ({
  setSearchParams,
  filterData,
  isMulti,
  loading,
  name,
  options,
  placeholder,
}: SelectFilterProps) => {
  const filterKey = useMemo(() => `${name}__${isMulti === true ? 'in' : 'equals'}`, [name, isMulti]);

  return (
    <Select
      onChange={(
        newValue: MultiValue<FilterOption> | SingleValue<FilterOption>,
        { action, option }: ActionMeta<FilterOption>,
      ) => {
        setSearchParams((params) => {
          if (!Array.isArray(newValue)) {
            // single-value
            const typedOption = newValue as SingleValue<FilterOption>;

            if (typedOption != null) {
              params.set(filterKey, typedOption.value);
            } else {
              params.delete(filterKey);
            }
          } else {
            // multi-value
            if (option != null) {
              if (action === 'select-option') {
                params.set(filterKey, [...(filterData[name].value as string[]), option.value].join(','));
              } else if (action === 'deselect-option') {
                const filteredValues = [...(filterData[name].value as string[]).filter((v) => v !== option.value)];

                if (filteredValues.length > 0) {
                  params.set(filterKey, filteredValues.join(','));
                } else {
                  params.delete(filterKey);
                }
              }
            }
          }

          return params;
        });
      }}
      backspaceRemovesValue={false}
      closeMenuOnSelect={false}
      controlShouldRenderValue={false}
      hideSelectedOptions={false}
      isClearable={false}
      isLoading={loading}
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
