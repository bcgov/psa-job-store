import { Input, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Node } from 'reactflow';

export interface PositionSearchProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string | undefined>>;
  disabled?: boolean;
  searchTerm?: string | undefined;
  searchResults: (() => Node[]) | Node[] | undefined;
}

export const PositionSearch = ({
  setSearchTerm: setSearchTermFromProps,
  disabled = false,
  searchTerm: searchTermFromProps,
  searchResults,
}: PositionSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);

  useEffect(() => {
    setSearchTerm(searchTermFromProps);
  }, [searchTermFromProps]);

  return (
    <Input.Search
      onChange={(event) => setSearchTerm(event.currentTarget.value)}
      onSearch={(value, _, source) =>
        setSearchTermFromProps(source?.source === 'clear' ? undefined : (value ?? '').length > 0 ? value : undefined)
      }
      addonAfter={
        searchTermFromProps != null &&
        searchResults != null && (
          <Tag
            color={searchTermFromProps != null && searchResults.length === 0 ? 'red' : 'green'}
            style={{ marginLeft: '0.5rem', marginRight: 0 }}
          >
            {searchResults.length === 1 ? '1 result' : `${searchResults.length} results`}
          </Tag>
        )
      }
      addonBefore="Search"
      allowClear
      disabled={disabled}
      loading={disabled}
      placeholder="Search by Position Number, Title, or Employee Name"
      value={searchTerm}
    />
  );
};
