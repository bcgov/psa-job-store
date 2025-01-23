import { ReactNode, createContext, useContext, useState } from 'react';

interface FetchContextType {
  shouldFetch: boolean;
  setShouldFetch: (value: boolean) => void;
  clearingFilters: boolean;
  setClearingFilters: (value: boolean) => void;
  clearingSearch: boolean;
  setClearingSearch: (value: boolean) => void;
  setReselectOriginalWizardProfile: (value: boolean) => void;
  reselectOriginalWizardProfile: boolean;
}

const FetchContext = createContext<FetchContextType | undefined>(undefined);

interface JobProfilesProviderProps {
  children: ReactNode;
}

export function JobProfilesProvider({ children }: JobProfilesProviderProps) {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [clearingFilters, setClearingFilters] = useState<boolean>(false);
  const [clearingSearch, setClearingSearch] = useState<boolean>(false);
  const [reselectOriginalWizardProfile, setReselectOriginalWizardProfile] = useState<boolean>(false);

  return (
    <FetchContext.Provider
      value={{
        shouldFetch,
        setShouldFetch,
        clearingFilters,
        setClearingFilters,
        clearingSearch,
        setClearingSearch,
        reselectOriginalWizardProfile,
        setReselectOriginalWizardProfile,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
}

// Custom hook
export function useJobProfilesProvider(): FetchContextType {
  const context = useContext(FetchContext);
  if (!context) {
    throw new Error('useJobProfilesProvider must be used within JobProfilesProvider');
  }
  return context;
}
