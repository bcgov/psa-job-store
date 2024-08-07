import { Button, Card, Col, Row, Tag } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { SelectFilter, SelectFilterProps } from './components/select-filter.component';

type FilterPropsWithType<ComponentType extends string, Props> = { componentType: ComponentType } & Props;
type Filter = FilterPropsWithType<
  'select',
  Omit<SelectFilterProps, 'addFilterData' | 'removeFilterData' | 'filterData'>
>;

export type Option = {
  label: string;
  value: string;
};

export type FilterData = {
  [key: string]: { operation: 'in'; value: string[] } | { operation: 'eq'; value: string | null };
};

export interface FilterBarProps {
  filters: Filter[];
}

export const FilterBar = ({ filters }: FilterBarProps) => {
  const defaultFilterData: FilterData = useMemo(
    () =>
      Object.fromEntries(
        filters.map((filter) => {
          if (filter.componentType === 'select') {
            if (filter.isMulti === true) {
              return [
                filter.name,
                {
                  operation: 'in',
                  value: [],
                },
              ];
            }
          }

          return [
            filter.name,
            {
              operation: 'eq',
              value: null,
            },
          ];
        }),
      ),
    [filters],
  );

  // const [searchParams, setSearchParams] = useSearchParams();
  const [filterData, setFilterData] = useState<FilterData>(defaultFilterData);

  useEffect(() => {
    console.log('defaultFilterData: ', defaultFilterData);
  }, [defaultFilterData]);

  useEffect(() => {
    console.log('filterData: ', filterData);
  }, [filterData]);

  // const [selectedFilterOptions, setSelectedFilterOptions] = useState<SelectedFilterOptions>({
  //   organization_id: [],
  //   effective_status: [],
  // });

  const addFilterData = (type: keyof FilterData, value: string) => {
    const operation = filterData[type].operation;

    if (operation === 'in') {
      setFilterData({
        ...filterData,
        [type]: {
          operation,
          value: [...(filterData[type].value as string[]), value],
        },
      });
    } else {
      setFilterData({
        ...filterData,
        [type]: {
          operation,
          value: value,
        },
      });
    }
  };

  const removeFilterData = (type: keyof FilterData, value: string) => {
    const operation = filterData[type].operation;

    if (operation === 'in') {
      console.log(
        'newValue: ',
        (filterData[type].value as string[]).filter((v) => v !== value),
      );

      setFilterData({
        ...filterData,
        [type]: {
          operation,
          value: (filterData[type].value as string[]).filter((v) => v !== value),
        },
      });
    } else {
      setFilterData({
        ...filterData,
        [type]: {
          operation,
          value: null,
        },
      });
    }
  };

  const clearFilters = () => {
    setFilterData(defaultFilterData);
  };

  return (
    <Row role="search" style={{ position: 'relative', zIndex: 9001 }}>
      <Col span={24}>
        <Card style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Row wrap>
            <Col span={12}></Col>
            <Col span={12}>
              <Row justify="end" gutter={8}>
                {filters.map((props) => (
                  <Col>
                    {props.componentType === 'select' ? (
                      <SelectFilter
                        addFilterData={addFilterData}
                        removeFilterData={removeFilterData}
                        {...props}
                        filterData={filterData}
                      />
                    ) : (
                      <div />
                    )}
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          {/* Applied Filters */}
          <Row>
            <Col span={24}>
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
                onClick={clearFilters}
                type="link"
                style={{ padding: '0', fontWeight: 400 }}
                data-cy="clear-filters-button"
              >
                Clear all filters
              </Button>
            </Col>
            <Col span={24}>
              {Object.entries(filterData).map(([key, { value }]) => {
                const match = filters.find((filter) => filter.name === key);

                return (
                  <>
                    {key}: {Array.isArray(value) ? value.length : value != null ? [value].length : 0} values
                    <br />
                    {[...(Array.isArray(value) ? value : value != null ? [value] : [])].map((v) => {
                      return (
                        <Tag
                          key={v}
                          onClose={() => {
                            if (v != null) {
                              removeFilterData(key, v);
                            }
                          }}
                          closable
                        >
                          {match?.options.find((option) => option.value === v)?.label ?? ''}
                        </Tag>
                      );
                    })}
                  </>
                );
              })}
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
