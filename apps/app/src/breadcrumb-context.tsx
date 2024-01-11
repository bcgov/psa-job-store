import React, { ReactNode, createContext, useContext, useState } from 'react';

// Define the shape of the context data
interface BreadcrumbContextData {
  breadcrumb: string | undefined;
  setBreadcrumb: React.Dispatch<React.SetStateAction<string | undefined>>;
}

// Create the context with a default undefined value
const BreadcrumbContext = createContext<BreadcrumbContextData | null>(null);

// Hook to use the context
export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
};

// Define the props for the provider component
interface BreadcrumbProviderProps {
  children: ReactNode;
}

// Create the provider component
export const BreadcrumbProvider: React.FC<BreadcrumbProviderProps> = ({ children }) => {
  const [breadcrumb, setBreadcrumb] = useState<string | undefined>(undefined);

  const contextValue = { breadcrumb, setBreadcrumb };

  return <BreadcrumbContext.Provider value={contextValue}>{children}</BreadcrumbContext.Provider>;
};
