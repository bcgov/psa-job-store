/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useContext, useState } from 'react';

interface TCContextProps {
  profileJson?: any;
  setProfileJson: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  setJobProfileData: React.Dispatch<React.SetStateAction<any>>;
  jobProfileData: any;
  versionInReview: number;
  setVersionInReview: React.Dispatch<React.SetStateAction<number>>;
  versionCompleted: number;
  setVersionCompleted: React.Dispatch<React.SetStateAction<number>>;
  totalInReview: number;
  setTotalInReview: React.Dispatch<React.SetStateAction<number>>;
  totalCompleted: number;
  setTotalCompleted: React.Dispatch<React.SetStateAction<number>>;
  isCurrentVersion: boolean;
  setIsCurrentVersion: React.Dispatch<React.SetStateAction<boolean>>;
  jobProfileMeta?: any;
  setJobProfileMeta: React.Dispatch<React.SetStateAction<any>>;
  id?: string;
  setId: React.Dispatch<React.SetStateAction<string | undefined>>;
  pickerData?: any;
  setPickerData: React.Dispatch<React.SetStateAction<any>>;
  version: string;
  setVersion: React.Dispatch<React.SetStateAction<string>>;
  link: string;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  validationStatus: string | null;
  setValidationStatus: React.Dispatch<React.SetStateAction<string | null>>;
  professionsData: any;
  setProfessionsData: React.Dispatch<React.SetStateAction<any>>;
}

const TCContext = React.createContext<TCContextProps | null>(null);

interface TCProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTCContext = () => {
  const context = useContext(TCContext);
  if (!context) {
    throw new Error('useTCContext must be used within a TCProvider');
  }
  return context;
};

export const TCProvider: React.FC<TCProviderProps> = ({ children }) => {
  const [profileJson, setProfileJson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState('');
  const [jobProfileData, setJobProfileData] = useState<any>(null);

  const [versionInReview, setVersionInReview] = useState<number>(-1); // set to -1 to for triggering second call
  const [versionCompleted, setVersionCompleted] = useState<number>(0);
  const [totalInReview, setTotalInReview] = useState<number>(0);
  const [totalCompleted, setTotalCompleted] = useState<number>(0);
  const [isCurrentVersion, setIsCurrentVersion] = useState(true);
  const [jobProfileMeta, setJobProfileMeta] = useState<any>(null);
  const [id, setId] = useState<string | undefined>(undefined);
  const [pickerData, setPickerData] = useState<any>(null);
  const [version, setVersion] = useState<string>('');
  const [link, setLink] = useState('');
  const [validationStatus, setValidationStatus] = useState<string | null>(null);
  const [professionsData, setProfessionsData] = useState<any>(null);

  const value = {
    profileJson,
    setProfileJson,
    isLoading,
    setIsLoading,
    state,
    setState,
    setJobProfileData,
    jobProfileData,
    versionInReview,
    setVersionInReview,
    versionCompleted,
    setVersionCompleted,
    totalInReview,
    setTotalInReview,
    totalCompleted,
    setTotalCompleted,
    isCurrentVersion,
    setIsCurrentVersion,
    jobProfileMeta,
    setJobProfileMeta,
    id,
    setId,
    pickerData,
    setPickerData,
    version,
    setVersion,
    link,
    setLink,
    validationStatus,
    setValidationStatus,
    professionsData,
    setProfessionsData,
  };

  return <TCContext.Provider value={value}>{children}</TCContext.Provider>;
};
