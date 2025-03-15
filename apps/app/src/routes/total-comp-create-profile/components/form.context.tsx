import React, { useContext } from 'react';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';
import { BasicDetailsValidationModel } from './total-comp-create-profile-validation';

interface FormContextType {
  basicUseFormReturn: UseFormReturn<BasicDetailsValidationModel>;
  jobProfileUseFormReturn: UseFormReturn<JobProfileValidationModel>;
  watchedState: string;
  isArchived: boolean;
  professionalRegistrationRequirementsFieldArray: UseFieldArrayReturn<
    JobProfileValidationModel,
    'professional_registration_requirements',
    'id'
  >;
}

export const FormContext = React.createContext<FormContextType | undefined>(undefined);

export const useFormsContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormsContext must be used within FormContext.Provider');
  }
  return context;
};
