import { SyncOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Row, Tag } from 'antd';
import { useMemo } from 'react';
import { FieldPathOperatorValue } from '../../lib/prisma-filter/common/field-operator.type';
import { FilterBuilder } from '../../lib/prisma-filter/common/filter.builder';
import { Filter } from './components';
import { SelectFilter } from './components/select-filter.component';

const { Search } = Input;

export interface DataFilterSearchProps {
  fields: FieldPathOperatorValue[];
}

export interface DataFilterProps {
  filterBuilder: FilterBuilder;
  filterProps?: Filter[];
  searchProps?: DataFilterSearchProps;
}

export const DataFilter = ({ filterBuilder, filterProps, searchProps }: DataFilterProps) => {
  const filter = useMemo(() => filterBuilder.toFilter(), [filterBuilder]);

  const handleSearch = (term: string) => {
    const trimmed = term.trim();

    if (trimmed.length > 0) {
      filterBuilder.setSearchTerm(trimmed);
    } else {
      filterBuilder.clearSearchTerm();
    }

    filterBuilder.apply();
  };

  const handleClearFilters = () => {
    filterBuilder.clearFilters();
    filterBuilder.apply();
  };

  return (
    <Card bordered size="small" style={{ position: 'relative', zIndex: 2 }}>
      <Row gutter={[8, 8]} wrap>
        <Col xs={24} md={12}>
          {searchProps && (
            <Search
              onPressEnter={(e) => handleSearch(e.currentTarget.value)}
              onSearch={handleSearch}
              allowClear
              defaultValue={filter.search}
              enterButton={'Search'}
              placeholder={'Search...'}
            />
          )}
        </Col>
        <Col xs={24} md={12} style={{ display: 'flex', justifyContent: 'end' }}>
          {filterProps?.map(({ type, field, ...props }) => {
            if (type === 'select') {
              const { mode, ...rest } = props;
              return (
                <Col key={field}>
                  {type === 'select' && (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    <SelectFilter {...rest} field={field} filterBuilder={filterBuilder} mode={mode as any} />
                  )}
                </Col>
              );
            }
          })}
        </Col>
      </Row>
      {/* Applied Filters */}
      {(filter.filter ?? []).length > 0 && (
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
              onClick={handleClearFilters}
              type="link"
              style={{ padding: '0', fontWeight: 400 }}
              data-cy="clear-filters-button"
            >
              Clear all filters
            </Button>
          </Col>
          <Col span={24}>
            {/* Tags */}
            {(filter.filter ?? []).map((filterData) => {
              const match = filterProps?.find((filter) => filter.field === filterData.field);

              return (
                <>
                  {[
                    ...(Array.isArray(filterData.value)
                      ? filterData.value
                      : filterData.value != null
                        ? [filterData.value]
                        : []),
                  ].map((v) => {
                    return (
                      <Tag
                        onClose={() => {
                          const { field, operator } = filterData;

                          filterBuilder.removeFilter({ field, operator, value: v });
                          filterBuilder.apply();
                        }}
                        key={v}
                        closable
                        icon={match?.loading === true && <SyncOutlined spin />}
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
  );
};
