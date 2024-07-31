import { AutoComplete, Input, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useSearchContext } from './tree-org-chart-search-context';

export interface PositionSearchProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string | undefined>>;
  onSearch: (value: string) => void;
  disabled?: boolean;
  searchTerm?: string | undefined;
}

export const TreeOrgChartSearch = ({
  setSearchTerm: setSearchTermFromProps,
  onSearch,
  disabled = false,
  searchTerm: searchTermFromProps,
}: PositionSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const { searchResults } = useSearchContext();

  useEffect(() => {
    setSearchTerm(searchTermFromProps);
  }, [searchTermFromProps]);

  const handleSearch = (value: string) => {
    setSearchTermFromProps(value);
    onSearch(value);
  };

  const options = searchResults.map((node) => ({
    value: node.id,
    label: `${node.data.title} - ${node.data.employees[0]?.name || 'Vacant'} (${node.id})`,
  }));

  return (
    <AutoComplete
      options={options}
      onSelect={(value) => handleSearch(value)}
      onSearch={handleSearch}
      style={{ width: '100%' }}
    >
      <Input.Search
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
        onSearch={handleSearch}
        addonAfter={
          searchTermFromProps != null && (
            <Tag color={searchResults.length === 0 ? 'red' : 'green'} style={{ marginLeft: '0.5rem', marginRight: 0 }}>
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
    </AutoComplete>
  );
};
