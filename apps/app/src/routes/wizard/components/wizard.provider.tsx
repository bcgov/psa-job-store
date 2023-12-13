/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useContext, useState } from 'react';
import { GetClassificationsResponse, JobProfileModel } from '../../../redux/services/graphql-api/job-profile-types';

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

  errors: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
  minReqAlertShown: boolean;
  setMinReqAlertShown: React.Dispatch<React.SetStateAction<boolean>>;

  reqAlertShown: boolean;
  setReqAlertShown: React.Dispatch<React.SetStateAction<boolean>>;

  originalValuesSet: boolean;
  originalAccReqFields: any[];
  originalOptReqFields: any[];
  originalMinReqFields: any[];
  originalTitle: any;
  originalOverview: any;

  positionRequestId: number | null;
  setPositionRequestId: React.Dispatch<React.SetStateAction<number | null>>;

  setOriginalValuesSet: React.Dispatch<React.SetStateAction<boolean>>;
  setOriginalAccReqFields: React.Dispatch<React.SetStateAction<any[]>>;
  setOriginalOptReqFields: React.Dispatch<React.SetStateAction<any[]>>;
  setOriginalMinReqFields: React.Dispatch<React.SetStateAction<any[]>>;
  setOriginalTitle: React.Dispatch<React.SetStateAction<any>>;
  setOriginalOverview: React.Dispatch<React.SetStateAction<any>>;
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
  const [errors, setErrors] = useState<string[]>([]);
  const [minReqAlertShown, setMinReqAlertShown] = useState<boolean>(false);
  const [reqAlertShown, setReqAlertShown] = useState<boolean>(false);
  const [originalValuesSet, setOriginalValuesSet] = useState<boolean>(false);
  const [originalAccReqFields, setOriginalAccReqFields] = useState<any[]>([]);
  const [originalOptReqFields, setOriginalOptReqFields] = useState<any[]>([]);
  const [originalMinReqFields, setOriginalMinReqFields] = useState<any[]>([]);
  const [originalTitle, setOriginalTitle] = useState<any>({});
  const [originalOverview, setOriginalOverview] = useState<any>({});
  const [positionRequestId, setPositionRequestId] = useState<number | null>(null);

  const value = {
    wizardData,
    setWizardData,
    classificationsData,
    setClassificationsData,
    errors,
    setErrors,
    minReqAlertShown,
    setMinReqAlertShown,
    reqAlertShown,
    setReqAlertShown,
    originalValuesSet,
    setOriginalValuesSet,
    originalAccReqFields,
    setOriginalAccReqFields,
    originalOptReqFields,
    setOriginalOptReqFields,
    originalMinReqFields,
    setOriginalMinReqFields,
    originalTitle,
    setOriginalTitle,
    originalOverview,
    setOriginalOverview,
    positionRequestId,
    setPositionRequestId,
  };

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
};
