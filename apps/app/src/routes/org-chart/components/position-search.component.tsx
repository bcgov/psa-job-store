import { AutoComplete, Input, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';

export interface SearchResult {
  id: string;
  title: string;
}

export interface PositionSearchProps {
  disabled?: boolean;
  searchTerm?: string | undefined;
  searchResultsCount: number | null;
  searchResults: SearchResult[];
  onSearch: (
    value: string,
    source:
      | {
          source?: 'input' | 'clear' | undefined;
        }
      | undefined,
  ) => void;
  onSelectResult: (id: string) => void;
}

export const PositionSearch = ({
  disabled = false,
  searchTerm: searchTermFromProps,
  searchResultsCount,
  searchResults,
  onSearch,
  onSelectResult,
}: PositionSearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [lastSearchedTerm, setLastSearchedTerm] = useState<string | undefined>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const autoCompleteRef = useRef<any>(null);

  useEffect(() => {
    setSearchTerm(searchTermFromProps);
    setLastSearchedTerm(searchTermFromProps);
  }, [searchTermFromProps]);

  const handleSearch = (value: string) => {
    console.log('handleSearch: ', value);
    onSearch(value, { source: 'input' });
    setLastSearchedTerm(value);
  };

  const handleSelect = (value: string) => {
    console.log('handleSelect: ', value);
    onSelectResult(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      console.log('escape key pressed, blur');
      e.preventDefault();
      autoCompleteRef.current?.blur();
    }
  };

  // if there's only one result, select it automatically
  useEffect(() => {
    if (searchResults.length === 1) {
      console.log('select single result');
      onSelectResult(searchResults[0].id);
    }
  }, [searchResults]);

  const shouldShowOptions = isInputFocused && searchTerm === lastSearchedTerm && searchResults.length > 1;

  return (
    <>
      {searchTermFromProps != null && searchResultsCount != null && (
        <div aria-live="assertive" className="sr-only">
          {searchResultsCount === 1 ? '1 result' : `${searchResultsCount} results`}
        </div>
      )}

      <Space.Compact style={{ width: '100%' }}>
        <AutoComplete
          ref={autoCompleteRef}
          style={{ width: searchResultsCount != null ? 'calc(100% - 100px)' : '100%' }}
          options={searchResults.map((result) => {
            // console.log('making option: ', result);
            return { value: result.id, label: result.title, key: `${result.id}-${result.title}` };
          })}
          onSelect={handleSelect}
          onSearch={(value) => setSearchTerm(value)}
          value={searchTerm}
          disabled={disabled}
          open={shouldShowOptions}
          id="org-chart-search-input"
        >
          <Input.Search
            placeholder="Search by Position Number, Title, or Employee Name"
            onSearch={handleSearch}
            disabled={disabled}
            loading={disabled}
            addonBefore="Search"
            allowClear
            onKeyDown={handleKeyDown}
            onFocus={() => {
              console.log('onFocus');
              setIsInputFocused(true);
            }}
            onBlur={() => {
              console.log('onBlur');
              setIsInputFocused(false);
            }}
          />
        </AutoComplete>
        {searchTermFromProps != null && searchResultsCount != null && (
          <div
            style={{
              width: '100px',
              backgroundColor: 'white',
              color: searchResultsCount === 0 ? 'red' : 'green',
              lineHeight: '32px',
              textAlign: 'center',
              border: '1px solid #d9d9d9',
              borderLeft: 'none',
              height: '32px',
            }}
          >
            {searchResultsCount === 1 ? '1 result' : `${searchResultsCount} results`}
          </div>
        )}
      </Space.Compact>
    </>
  );
};
