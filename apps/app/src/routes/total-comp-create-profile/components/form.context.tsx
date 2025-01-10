import React, { useContext } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import { BasicDetailsValidationModel } from './total-comp-create-profile.component';

interface FormContextType {
  basicUseFormReturn: UseFormReturn<BasicDetailsValidationModel>;
  jobProfileUseFormReturn: UseFormReturn<JobProfileValidationModel>;
  watchedState: string;
}

export const FormContext = React.createContext<FormContextType | undefined>(undefined);

export const useFormsContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormsContext must be used within FormContext.Provider');
  }
  return context;
};
