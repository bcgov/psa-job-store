import { Card, Col, Input, Row } from 'antd';
import { useMemo } from 'react';
import { FieldOperator } from '../../lib/prisma-filter/common/field-operator.type';
import { FilterBuilder } from '../../lib/prisma-filter/common/filter.builder';

const { Search } = Input;

export interface DataFilterSearchProps {
  fields: FieldOperator[];
}

export interface DataFilterProps {
  filterBuilder: FilterBuilder;
  searchProps?: DataFilterSearchProps;
}

export const DataFilter = ({ filterBuilder, searchProps }: DataFilterProps) => {
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
        <Col xs={24} md={12} style={{ display: 'flex', justifyContent: 'end' }}></Col>
      </Row>
    </Card>
  );
};
