import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Tag } from 'antd';
import { useEffect, useState } from 'react';

export interface PositionSearchProps {
  disabled?: boolean;
  searchTerm?: string | undefined;
  searchResultsCount: number | null;
  onSearch: (
    value: string,
    source:
      | {
          source?: 'input' | 'clear' | undefined;
        }
      | undefined,
  ) => void;
  // focusable?: boolean;
}

export const PositionSearch = ({
  disabled = false,
  searchTerm: searchTermFromProps,
  searchResultsCount, // focusable = true,
  onSearch,
}: PositionSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  useEffect(() => {
    setSearchTerm(searchTermFromProps);
  }, [searchTermFromProps]);

  return (
    <>
      {searchTermFromProps != null && searchResultsCount != null && (
        <div aria-live="assertive" className="sr-only">
          {searchResultsCount === 1 ? '1 result' : `${searchResultsCount} results`}
        </div>
      )}

      <Input.Search
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
        onSearch={(value, _, source) => onSearch(value, source)}
        addonAfter={
          searchTermFromProps != null &&
          searchResultsCount != null && (
            <Tag
              color={searchTermFromProps != null && searchResultsCount === 0 ? 'red' : 'green'}
              style={{ marginLeft: '0.5rem', marginRight: 0 }}
            >
              {searchResultsCount === 1 ? '1 result' : `${searchResultsCount} results`}
            </Tag>
          )
        }
        addonBefore="Search"
        allowClear
        disabled={disabled}
        loading={disabled}
        placeholder="Search by Position Number, Title, or Employee Name"
        value={searchTerm}
        // tabIndex={focusable ? 0 : -1}
        enterButton={
          <Button id="org-chart-search-button" icon={<SearchOutlined aria-hidden />} aria-label="Search"></Button>
        } // tabIndex={focusable ? 0 : -1}
      />
    </>
  );
};
