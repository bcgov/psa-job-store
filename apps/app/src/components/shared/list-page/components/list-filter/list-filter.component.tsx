import { SyncOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row, Tag } from 'antd';
import { useMemo } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import { FilterData } from '../../interfaces/filter-data.interface';
import { SearchConfig } from '../../interfaces/search-config.interface';
import { Filter } from './components/filters';
import { SelectFilter } from './components/filters/select-filter.component';

const { Search } = Input;

export interface ListFilterProps {
  setSearchParams: SetURLSearchParams;
  filterData: FilterData;
  filters: Filter[];
  searchConfig?: SearchConfig | undefined;
  searchTerm?: string | undefined;
}

export const ListFilter = ({ setSearchParams, filterData, filters, searchConfig, searchTerm }: ListFilterProps) => {
  const clearFilters = () => {
    const filterKeys = Object.entries(filterData).map(([key, { operation }]) => `${key}__${operation}`);
    setSearchParams((params) => {
      filterKeys.forEach((filterKey) => params.delete(filterKey));

      return params;
    });
  };

  const filterCount = useMemo(
    () =>
      Object.values(filterData).reduce((prev, curr) => {
        if (Array.isArray(curr.value)) {
          // Return the length of the array
          return (prev += curr.value.length);
        } else if (curr.value != null) {
          // If value is not null, 1 value exists
          return (prev += 1);
        } else {
          return prev;
        }
      }, 0),
    [filterData],
  );

  const handleSearch = (value: string) => {
    const trimmed = value.trim();

    setSearchParams((params) => {
      if (trimmed.length > 0) {
        params.set('search', trimmed);
      } else {
        params.delete('search');
      }

      return params;
    });
  };

  return (
    <Row role="search" style={{ position: 'relative', zIndex: 2 }}>
      <Col span={24}>
        <Card>
          <Row gutter={[8, 8]} wrap>
            <Col xs={24} md={12}>
              {searchConfig != null && (
                <Search
                  onPressEnter={(e) => handleSearch(e.currentTarget.value)}
                  onSearch={handleSearch}
                  allowClear
                  defaultValue={searchTerm}
                  enterButton={searchConfig.enterButton ?? 'Search'}
                  placeholder={searchConfig.placeholder}
                />
              )}
            </Col>
            <Col xs={24} md={12}>
              <Row justify="end" gutter={[8, 8]}>
                {filters.map((props) => {
                  return (
                    <Col key={props.name}>
                      {props.type === 'single-value' ? (
                        <SelectFilter
                          {...props}
                          setSearchParams={setSearchParams}
                          isMulti={false}
                          filterData={filterData}
                        />
                      ) : props.type === 'multi-value' ? (
                        <SelectFilter
                          {...props}
                          setSearchParams={setSearchParams}
                          isMulti={true}
                          filterData={filterData}
                        />
                      ) : (
                        <div />
                      )}
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
          {/* Applied Filters */}
          {filterCount > 0 && (
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
                {/* Tags */}
                {Object.entries(filterData).map(([key, { value }]) => {
                  const match = filters.find((filter) => filter.name === key);
                  return (
                    <>
                      {[...(Array.isArray(value) ? value : value != null ? [value] : [])].map((v) => {
                        return (
                          <Tag
                            key={v}
                            icon={
                              filters.find((f) => f.name === key && f.loading === true) != null && <SyncOutlined spin />
                            }
                            onClose={() => {
                              const { operation, value } = filterData[key];

                              setSearchParams((params) => {
                                if (operation === 'equals') {
                                  if (value != null) {
                                    params.delete(`${key}__${operation}`);
                                  }
                                } else if (operation === 'in') {
                                  const remainingValues = value.filter((val) => val !== v);

                                  if (remainingValues.length > 0) {
                                    params.set(`${key}__${operation}`, value.filter((val) => val !== v).join(','));
                                  } else {
                                    params.delete(`${key}__${operation}`);
                                  }
                                }

                                return params;
                              });
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
          )}
        </Card>
      </Col>
    </Row>
  );
};
