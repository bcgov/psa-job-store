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

  relWorkAlertShown: boolean;
  setRelWorkAlertShown: React.Dispatch<React.SetStateAction<boolean>>;

  originalValuesSet: boolean;
  originalAccReqFields: any[];
  originalOptReqFields: any[];
  originalMinReqFields: any[];
  originalRelWorkFields: any[];
  originalTitle: any;
  originalOverview: any;

  positionRequestId: number | null;
  setPositionRequestId: React.Dispatch<React.SetStateAction<number | null>>;

  positionRequestProfileId: number | null;
  setPositionRequestProfileId: React.Dispatch<React.SetStateAction<number | null>>;

  positionRequestDepartmentId: string | null;
  setPositionRequestDepartmentId: React.Dispatch<React.SetStateAction<string | null>>;

  setOriginalValuesSet: React.Dispatch<React.SetStateAction<boolean>>;
  setOriginalAccReqFields: React.Dispatch<React.SetStateAction<any[]>>;
  setOriginalOptReqFields: React.Dispatch<React.SetStateAction<any[]>>;
  setOriginalMinReqFields: React.Dispatch<React.SetStateAction<any[]>>;
  setOriginalRelWorkFields: React.Dispatch<React.SetStateAction<any[]>>;
  setOriginalTitle: React.Dispatch<React.SetStateAction<any>>;
  setOriginalOverview: React.Dispatch<React.SetStateAction<any>>;

  originalSecurityScreeningsFields: any[];
  setOriginalSecurityScreeningsFields: React.Dispatch<React.SetStateAction<any[]>>;
  securityScreeningsAlertShown: boolean;
  setSecurityScreeningsAlertShown: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [originalRelWorkFields, setOriginalRelWorkFields] = useState<any[]>([]);
  const [relWorkAlertShown, setRelWorkAlertShown] = useState<boolean>(false);

  const [originalSecurityScreeningsFields, setOriginalSecurityScreeningsFields] = useState<any[]>([]);
  const [securityScreeningsAlertShown, setSecurityScreeningsAlertShown] = useState<boolean>(false);

  const [originalTitle, setOriginalTitle] = useState<any>({});
  const [originalOverview, setOriginalOverview] = useState<any>({});
  const [positionRequestId, setPositionRequestId] = useState<number | null>(null);
  const [positionRequestProfileId, setPositionRequestProfileId] = useState<number | null>(null);
  const [positionRequestDepartmentId, setPositionRequestDepartmentId] = useState<string | null>(null);

  const value = {
    wizardData,
    setWizardData,
    classificationsData,
    setClassificationsData,
    errors,
    setErrors,
    minReqAlertShown,
    setMinReqAlertShown,
    originalMinReqFields,
    setOriginalMinReqFields,

    relWorkAlertShown,
    setRelWorkAlertShown,
    originalRelWorkFields,
    setOriginalRelWorkFields,

    securityScreeningsAlertShown,
    setSecurityScreeningsAlertShown,
    originalSecurityScreeningsFields,
    setOriginalSecurityScreeningsFields,

    reqAlertShown,
    setReqAlertShown,
    originalValuesSet,
    setOriginalValuesSet,
    originalAccReqFields,
    setOriginalAccReqFields,
    originalOptReqFields,
    setOriginalOptReqFields,
    originalTitle,
    setOriginalTitle,
    originalOverview,
    setOriginalOverview,
    positionRequestId,
    setPositionRequestId,
    positionRequestProfileId,
    setPositionRequestProfileId,
    positionRequestDepartmentId,
    setPositionRequestDepartmentId,
  };

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
};
