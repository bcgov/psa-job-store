import React, { ReactNode, useContext, useState } from 'react';

interface WizardData {
  [key: string]: string;
}

interface WizardContextProps {
  wizardData: WizardData | null;
  setWizardData: React.Dispatch<React.SetStateAction<WizardData | null>>;
}

const WizardContext = React.createContext<WizardContextProps | null>(null);

interface WizardProviderProps {
  children: ReactNode;
}

export const useWizardContext = () => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizardContext must be used within a WizardProvider');
  }
  return context;
};

export const WizardProvider: React.FC<WizardProviderProps> = ({ children }) => {
  const [wizardData, setWizardData] = useState<WizardData | null>(null);

  const value = {
    wizardData,
    setWizardData,
  };

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
};
