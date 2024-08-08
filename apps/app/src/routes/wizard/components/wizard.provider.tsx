/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useContext, useState } from 'react';
import {
  ClassificationModel,
  GetClassificationsResponse,
  JobProfileModel,
} from '../../../redux/services/graphql-api/job-profile-types';
import { GetPositionRequestResponseContent } from '../../../redux/services/graphql-api/position-request.api';

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

  minReqAlertShown: boolean;
  setMinReqAlertShown: React.Dispatch<React.SetStateAction<boolean>>;

  reqAlertShown: boolean;
  setReqAlertShown: React.Dispatch<React.SetStateAction<boolean>>;

  optionalAccountabilitiesAlertShown: boolean;
  setOptionalAccountabilitiesAlertShown: React.Dispatch<React.SetStateAction<boolean>>;

  relWorkAlertShown: boolean;
  setRelWorkAlertShown: React.Dispatch<React.SetStateAction<boolean>>;

  secAlertShown: boolean;
  setSecAlertShown: React.Dispatch<React.SetStateAction<boolean>>;

  profRegAlertShown: boolean;
  setProfRegAlertShown: React.Dispatch<React.SetStateAction<boolean>>;

  originalValuesSet: boolean;
  originalAccReqFields: any[];
  originalOptReqFields: any[];
  originalMinReqFields: any[];
  originalRelWorkFields: any[];
  originalTitle: any;

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
  originalOverview: any;
  setOriginalOverview: React.Dispatch<React.SetStateAction<any>>;

  originalProgramOverview: any;
  setOriginalProgramOverview: React.Dispatch<React.SetStateAction<any>>;
  originalSecurityScreeningsFields: any[];
  setOriginalSecurityScreeningsFields: React.Dispatch<React.SetStateAction<any[]>>;
  securityScreeningsAlertShown: boolean;
  setSecurityScreeningsAlertShown: React.Dispatch<React.SetStateAction<boolean>>;

  originalProfessionalRegistrationFields: any[];
  setOriginalProfessionalRegistrationFields: React.Dispatch<React.SetStateAction<any[]>>;
  originalPreferencesFields: any[];
  setOriginalPreferencesFields: React.Dispatch<React.SetStateAction<any[]>>;
  originalKnowledgeSkillsAbilitiesFields: any[];
  setOriginalKnowledgeSkillsAbilitiesFields: React.Dispatch<React.SetStateAction<any[]>>;
  originalProvisosFields: any[];
  setOriginalProvisosFields: React.Dispatch<React.SetStateAction<any[]>>;
  originalBehaviouralCompetenciesFields: any[];
  setOriginalBehaviouralCompetenciesFields: React.Dispatch<React.SetStateAction<any[]>>;
  originalOptionalRequirementsFields: any[];
  setOriginalOptionalRequirementsFields: React.Dispatch<React.SetStateAction<any[]>>;

  positionRequestData: GetPositionRequestResponseContent | null;
  setPositionRequestData: React.Dispatch<React.SetStateAction<GetPositionRequestResponseContent | null>>;

  currentSection: string | null;
  setCurrentSection: React.Dispatch<React.SetStateAction<string | null>>;

  requiresVerification: boolean;
  setRequiresVerification: React.Dispatch<React.SetStateAction<boolean>>;

  resetWizardContext: () => void;
  getClassificationById: (id: string) => ClassificationModel | undefined;
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
  const [minReqAlertShown, setMinReqAlertShown] = useState<boolean>(false);
  const [reqAlertShown, setReqAlertShown] = useState<boolean>(false);
  const [secAlertShown, setSecAlertShown] = useState<boolean>(false);
  const [profRegAlertShown, setProfRegAlertShown] = useState<boolean>(false);
  const [optionalAccountabilitiesAlertShown, setOptionalAccountabilitiesAlertShown] = useState<boolean>(false);
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
  const [originalProgramOverview, setOriginalProgramOverview] = useState<any>({});
  const [positionRequestData, setPositionRequestData] = useState<GetPositionRequestResponseContent | null>(null);

  const [positionRequestId, setPositionRequestId] = useState<number | null>(null);
  const [positionRequestProfileId, setPositionRequestProfileId] = useState<number | null>(null);
  const [positionRequestDepartmentId, setPositionRequestDepartmentId] = useState<string | null>(null);

  const [originalProfessionalRegistrationFields, setOriginalProfessionalRegistrationFields] = useState<any[]>([]);
  const [originalOptionalRequirementsFields, setOriginalOptionalRequirementsFields] = useState<any[]>([]);
  const [originalPreferencesFields, setOriginalPreferencesFields] = useState<any[]>([]);
  const [originalKnowledgeSkillsAbilitiesFields, setOriginalKnowledgeSkillsAbilitiesFields] = useState<any[]>([]);
  const [originalProvisosFields, setOriginalProvisosFields] = useState<any[]>([]);
  const [originalBehaviouralCompetenciesFields, setOriginalBehaviouralCompetenciesFields] = useState<any[]>([]);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [requiresVerification, setRequiresVerification] = useState(false);

  function getClassificationById(id: string): ClassificationModel | undefined {
    // If data is loaded, find the classification by ID
    // console.log('classificationsData: ', classificationsData, id);
    if (classificationsData) {
      return classificationsData.classifications.find(
        (classification: ClassificationModel) => classification.id === id,
      );
    }
    return;
  }

  const resetWizardContext = () => {
    setWizardData(null);
    // setClassificationsData(null); // do not reset this - it just stores the cache of all classifications, otherwise can't find proper classification later
    setMinReqAlertShown(false);
    setSecAlertShown(false);
    setProfRegAlertShown(false);
    setReqAlertShown(false);
    setOptionalAccountabilitiesAlertShown(false);
    setOriginalValuesSet(false);
    setOriginalAccReqFields([]);
    setOriginalOptReqFields([]);
    setOriginalMinReqFields([]);
    setOriginalRelWorkFields([]);
    setRelWorkAlertShown(false);
    setOriginalSecurityScreeningsFields([]);
    setSecurityScreeningsAlertShown(false);
    setOriginalTitle({});
    setOriginalOverview({});
    setOriginalProgramOverview({});
    setPositionRequestData(null);
    setPositionRequestId(null);
    setPositionRequestProfileId(null);
    setPositionRequestDepartmentId(null);
    setOriginalProfessionalRegistrationFields([]);
    setOriginalOptionalRequirementsFields([]);
    setOriginalPreferencesFields([]);
    setOriginalKnowledgeSkillsAbilitiesFields([]);
    setOriginalProvisosFields([]);
    setOriginalBehaviouralCompetenciesFields([]);
    setCurrentSection(null);
    setRequiresVerification(false);
  };

  const value = {
    wizardData,
    setWizardData,
    classificationsData,
    setClassificationsData,
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
    secAlertShown,
    setSecAlertShown,

    profRegAlertShown,
    setProfRegAlertShown,

    optionalAccountabilitiesAlertShown,
    setOptionalAccountabilitiesAlertShown,

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
    originalProgramOverview,
    setOriginalProgramOverview,
    positionRequestId,
    setPositionRequestId,
    positionRequestProfileId,
    setPositionRequestProfileId,
    positionRequestDepartmentId,
    setPositionRequestDepartmentId,

    originalProfessionalRegistrationFields,
    setOriginalProfessionalRegistrationFields,

    originalOptionalRequirementsFields,
    setOriginalOptionalRequirementsFields,

    originalPreferencesFields,
    setOriginalPreferencesFields,
    originalKnowledgeSkillsAbilitiesFields,
    setOriginalKnowledgeSkillsAbilitiesFields,
    originalProvisosFields,
    setOriginalProvisosFields,
    originalBehaviouralCompetenciesFields,
    setOriginalBehaviouralCompetenciesFields,
    positionRequestData,
    setPositionRequestData,
    currentSection,
    setCurrentSection,
    requiresVerification,
    setRequiresVerification,
    resetWizardContext,
    getClassificationById,
  };

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
};
