import { Button, Card, Col, Input, Row, Tag } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { useGetOrganizationsPicklistForSettingsQuery } from '../../../../redux/services/graphql-api/settings/settings.api';
import { FilterOption, FilterOptions } from '../department-list.page';

const { Search } = Input;

interface DepartmentSearchBarProps {
  setSearchParams: SetURLSearchParams;
  searchParams: URLSearchParams;
}

const statusFilterOptions: FilterOption[] = [
  {
    label: 'Active',
    value: 'Active',
  },
  {
    label: 'Inactive',
    value: 'Inactive',
  },
];

export const DepartmentSearchBar = ({ setSearchParams }: DepartmentSearchBarProps) => {
  const [filterValues, setFilterValues] = useState<FilterOptions>({ organization_id: [], effective_status: [] });
  const { data, isFetching } = useGetOrganizationsPicklistForSettingsQuery();

  useEffect(() => {
    console.log('zzg: ', JSON.stringify(filterValues, undefined, 2));

    setSearchParams((params) => {
      const optionKeys = Object.keys(filterValues) as (keyof FilterOptions)[];
      optionKeys.forEach((key) => {
        const filterName = `${key}__in`;

        if (filterValues[key].length === 0) {
          params.delete(filterName);
        } else {
          params.set(filterName, filterValues[key].map((value) => value.value).join(','));
        }
      });

      return params;
    });
  }, [setSearchParams, filterValues]);

  const organizations = useMemo(
    () => data?.organizations.map((o) => ({ label: o.name, value: o.id })),
    [data?.organizations],
  );

  const addFilterValue = (type: keyof FilterOptions, value: FilterOption) => {
    setFilterValues({
      ...filterValues,
      [type]: [...filterValues[type], value],
    });
  };

  const removeFilterValue = (type: keyof FilterOptions, value: FilterOption) => {
    setFilterValues({
      ...filterValues,
      [type]: filterValues[type].filter((fv) => !(fv.label === value.label && fv.value === value.value)),
    });
  };

  const clearAllFilters = () => {
    const reset = Object.keys(filterValues).reduce((prev, curr) => ({ ...prev, [curr]: [] }), {} as FilterOptions);

    setFilterValues({ ...reset });
  };

  return (
    <Row role="search" style={{ position: 'relative', zIndex: 1000 }}>
      <Col lg={24} xs={24}>
        <Card style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Row wrap>
            <Col span={12}>
              <Search />
            </Col>
            <Col span={12}>
              <Row justify="end" gutter={8}>
                <Col>
                  <Select
                    onChange={(_, { action, option }) => {
                      if (option != null) {
                        if (action === 'select-option') {
                          addFilterValue('organization_id', option);
                        } else if (action === 'deselect-option') {
                          removeFilterValue('organization_id', option);
                        }
                      }
                    }}
                    backspaceRemovesValue={false}
                    closeMenuOnSelect={false}
                    controlShouldRenderValue={false}
                    hideSelectedOptions={false}
                    isClearable={false}
                    isLoading={isFetching}
                    isMulti
                    options={organizations}
                    placeholder="Ministries"
                    styles={{
                      container: (css) => ({ ...css, width: '200px' }),
                      menu: (styles) => ({ ...styles, width: 'max-content', minWidth: '100%' }),
                    }}
                    value={(organizations ?? []).filter(
                      (sfo) => filterValues['organization_id'].filter((fo) => fo.value === sfo.value).length > 0,
                    )}
                  />
                </Col>
                <Col>
                  <Select
                    onChange={(_, { action, option }) => {
                      if (option != null) {
                        if (action === 'select-option') {
                          addFilterValue('effective_status', option);
                        } else if (action === 'deselect-option') {
                          removeFilterValue('effective_status', option);
                        }
                      }
                    }}
                    backspaceRemovesValue={false}
                    closeMenuOnSelect={false}
                    controlShouldRenderValue={false}
                    hideSelectedOptions={false}
                    isClearable={false}
                    isMulti
                    options={statusFilterOptions}
                    placeholder="Status"
                    styles={{
                      container: (css) => ({ ...css, width: '200px' }),
                      menu: (styles) => ({ ...styles, width: 'max-content', minWidth: '100%' }),
                    }}
                    value={statusFilterOptions.filter(
                      (sfo) => filterValues['effective_status'].filter((fo) => fo.value === sfo.value).length > 0,
                    )}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          {Object.values(filterValues).reduce((prev, curr) => (prev += curr.length), 0) > 0 && (
            <Row>
              <Col span={24} style={{ marginTop: '10px' }}>
                <span
                  style={{
                    fontWeight: 500,
                    margin: '8px',
                    marginLeft: 0,
                    paddingRight: '8px',
                    borderRight: '2px solid rgba(0, 0, 0, 0.06)',
                    marginRight: '10px',
                  }}
                >
                  Applied filters
                </span>
                <Button
                  onClick={clearAllFilters}
                  type="link"
                  style={{ padding: '0', fontWeight: 400 }}
                  data-cy="clear-filters-button"
                >
                  Clear all filters
                </Button>
              </Col>
              {/* Applied filters with independent sections */}
              {/* <Col span={24}>
                {Object.entries(filterValues)
                  .filter((entry) => entry[1].length > 0)
                  .map(([key, values]) => {
                    return (
                      <Space size={0} style={{ marginTop: '4px', width: '100%' }} wrap>
                        <Tag color="#003366" style={{ marginTop: '4px' }}>
                          {key.slice(0, 1).toUpperCase() + key.slice(1).toLowerCase()}
                        </Tag>
                        {values.map((filterOption) => (
                          <Tag
                            onClose={() => removeFilterValue(key as keyof FilterValues, filterOption)}
                            key={`${key}-${filterOption.value}`}
                            closable
                            style={{ marginTop: '4px' }}
                          >
                            {filterOption.label}
                          </Tag>
                        ))}
                      </Space>
                    );
                  })}
              </Col> */}
              {/* Applied filters joined together */}
              <Col span={24}>
                {Object.entries(filterValues)
                  .filter((entry) => entry[1].length > 0)
                  .map(([key, values]) =>
                    values.map((filterOption) => (
                      <Tag
                        onClose={() => removeFilterValue(key as keyof FilterOptions, filterOption)}
                        key={`${key}-${filterOption.value}`}
                        closable
                        style={{ marginTop: '4px' }}
                      >
                        {filterOption.label}
                      </Tag>
                    )),
                  )}
              </Col>
            </Row>
          )}
        </Card>
      </Col>
    </Row>
  );
};
