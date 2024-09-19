import { useMemo } from 'react';
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';
import { FilterOperator } from '../../../lib/prisma-filter/common/filter-operator.enum';
import { FilterBuilder } from '../../../lib/prisma-filter/common/filter.builder';

export type SelectFilterOption = { label: string; value: string };

type SingleSelectFilterProps = {
  mode: 'single-value';
  field: string;
  path?: string[];
  operator: FilterOperator.StringEquals | FilterOperator.JsonEquals;
  filterBuilder: FilterBuilder;
  loading?: boolean;
  options: SelectFilterOption[];
  placeholder: React.ReactNode;
};

type MultiSelectFilterProps = {
  mode: 'multi-value';
  field: string;
  path?: string[];
  operator: FilterOperator.StringIn | FilterOperator.StringListHasSome;
  filterBuilder: FilterBuilder;
  loading?: boolean;
  options: SelectFilterOption[];
  placeholder: React.ReactNode;
};

export type SelectFilterProps = SingleSelectFilterProps | MultiSelectFilterProps;

export const SelectFilter = ({
  mode,
  field,
  path,
  operator,
  filterBuilder,
  loading,
  options,
  placeholder,
}: SelectFilterProps) => {
  const filter = useMemo(() => filterBuilder.toFilter(), [filterBuilder]);

  return (
    <Select
      onChange={(
        newValue: SingleValue<SelectFilterOption> | MultiValue<SelectFilterOption>,
        { action, option }: ActionMeta<SelectFilterOption>,
      ) => {
        if (mode === 'single-value') {
          const typed = newValue as SingleValue<SelectFilterOption>;

          if (typed != null) {
            filterBuilder.addFilter({ field, path, operator, value: typed.value });
          } else {
            filterBuilder.removeFilter({ field, operator });
          }
        } else if (mode === 'multi-value') {
          if (option != null) {
            if (Array.isArray(newValue)) {
              if (action === 'select-option') {
                filterBuilder.addFilter({
                  field,
                  path,
                  operator,
                  value: newValue.map((v) => v.value).join(','),
                });
              } else if (action === 'deselect-option') {
                const matchingFilter = filter.filter?.find((f) => f.field === field && f.operator === operator);
                if (matchingFilter != null) {
                  const filteredValues = [
                    ...decodeURIComponent(matchingFilter.value as string)
                      .split(',')
                      .filter((v) => v !== option.value),
                  ];

                  if (filteredValues.length > 0) {
                    filterBuilder.addFilter({
                      field,
                      path,
                      operator,
                      value: filteredValues,
                    });
                  } else {
                    filterBuilder.removeFilter({ field, path, operator });
                  }
                }
              }
            }
          }
        }

        filterBuilder.apply();
      }}
      backspaceRemovesValue={false}
      closeMenuOnSelect={mode === 'single-value'}
      controlShouldRenderValue={false}
      hideSelectedOptions={false}
      isClearable={false}
      isLoading={loading}
      isMulti={mode === 'multi-value'}
      name={field}
      options={options}
      placeholder={placeholder}
      styles={{
        container: (css) => ({ ...css, width: '200px' }),
        menu: (styles) => ({ ...styles, minWidth: '100%', width: 'max-content' }),
      }}
      value={options.filter((option) => {
        const value = filter.filter?.find((f) => f.field === field && f.operator === operator)?.value;

        if (value != null) {
          const values = Array.isArray(value) ? value : [value];

          return values.some((v) => option.value === v);
        }
      })}
    />
  );
};
