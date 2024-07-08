import { Card, Col, Input, Row } from 'antd';
import { useCallback, useState } from 'react';
import { PicklistOption } from './picklist-options';

const { Search } = Input;

export type PicklistOnSearch = (value: string | undefined) => PicklistOption[] | undefined;

export interface PicklistSearchProps {
  placeholder?: string;
  onSearch: PicklistOnSearch;
  trigger?: {
    text?: string;
  };
}

export const PicklistSearch = ({ onSearch, placeholder = 'Search by keyword', trigger }: PicklistSearchProps) => {
  const [value, setValue] = useState<string | undefined>(undefined);

  const handleSearch = useCallback(
    (value: string | undefined) => {
      onSearch(value);
    },
    [onSearch],
  );

  return (
    <Card>
      <Row gutter={24}>
        <Col span={24}>
          <Search
            onBlur={() => handleSearch(value)}
            onChange={(e) => {
              const value = e.currentTarget.value.length > 0 ? e.currentTarget.value : undefined;
              if (value == null) handleSearch(value);
              setValue(value);
            }}
            onPressEnter={() => handleSearch(value)}
            onSearch={() => handleSearch(value)}
            allowClear
            aria-label={placeholder}
            enterButton={trigger?.text ?? 'Search'}
            placeholder={placeholder}
            style={{ width: '100%' }}
            value={value}
          />
        </Col>
      </Row>
    </Card>
  );
};
