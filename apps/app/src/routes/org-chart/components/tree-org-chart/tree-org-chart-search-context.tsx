import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Node } from 'reactflow';

interface SearchContextType {
  searchResults: Node[];
  setSearchResults: React.Dispatch<React.SetStateAction<Node[]>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};

export const TreeChartSearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<Node[]>([]);

  return <SearchContext.Provider value={{ searchResults, setSearchResults }}>{children}</SearchContext.Provider>;
};
