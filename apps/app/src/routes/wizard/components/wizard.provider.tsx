import React, { ReactNode, useContext, useState } from 'react';
import { GetClassificationsResponse } from '../../../redux/services/graphql-api/classification.api';
import { JobProfileModel } from '../../../redux/services/graphql-api/job-profile.api';

// interface WizardData {
//   [key: string]: string;
// }

// interface WizardContextProps {
//   wizardData: WizardData | null;
//   setWizardData: React.Dispatch<React.SetStateAction<WizardData | null>>;
// }

interface WizardContextProps {
  wizardData: JobProfileModel | null;
  setWizardData: React.Dispatch<React.SetStateAction<JobProfileModel | null>>;

  classificationsData: GetClassificationsResponse | null;
  setClassificationsData: React.Dispatch<React.SetStateAction<GetClassificationsResponse | null>>;

  isValid: boolean;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [wizardData, setWizardData] = useState<JobProfileModel | null>(null);
  const [classificationsData, setClassificationsData] = useState<GetClassificationsResponse | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  const value = {
    wizardData,
    classificationsData,
    isValid,
    setWizardData,
    setClassificationsData,
    setIsValid,
  };

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
};
