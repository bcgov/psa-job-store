/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../../../components/app/common/css/custom-form.css';
import '../../../components/app/common/css/filtered-table.page.css';
import {
  GetJobProfileResponse,
  ProfessionsModel,
  TrackedFieldArrayItem,
} from '../../../redux/services/graphql-api/job-profile-types';
import { useLazyGetJobProfileMetaQuery } from '../../../redux/services/graphql-api/job-profile.api';
import { useLazyGetPositionRequestsCountQuery } from '../../../redux/services/graphql-api/position-request.api';
import { JobProfileValidationModel, TitleField } from '../../job-profiles/components/job-profile.component';
import { FormContext } from './form.context';
import { JobProfileHeader } from './total-comp-create-profile-header';
import TCTabBar from './total-comp-create-profile-tab-bar.component';
import { BasicDetailsValidationModel } from './total-comp-create-profile.component';
import { useTCContext } from './total-comp-create-profile.provider';

export interface AccountabilityItem {
  text: string;
  id?: string;
  nonEditable: boolean;
  is_significant: boolean;
}

export interface SecurityScreeningItem {
  text: string;
  id?: string;
  nonEditable: boolean;
  is_significant: boolean;
}

interface TotalCompCreateProfileComponentProps {
  jobProfileData: GetJobProfileResponse | undefined;
}

export const TotalCompCreateProfileComponent2: React.FC<TotalCompCreateProfileComponentProps> = ({
  jobProfileData,
}) => {
  const [triggerGetJobProfileMeta, { data: jobProfileMetaData }] = useLazyGetJobProfileMetaQuery();
  const [triggerGetPositionRequestsCount, { data: positionRequestsCount }] = useLazyGetPositionRequestsCountQuery();

  const {
    isLoading,
    setProfileJson,
    setJobProfileData,
    versionInReview,
    setVersionInReview,
    setVersionCompleted,
    setTotalInReview,
    setTotalCompleted,
    setIsCurrentVersion,
    setJobProfileMeta,
    setLink,
    validationStatus,
    setProfessionsData,
  } = useTCContext();

  useEffect(() => {
    if (jobProfileMetaData) {
      setJobProfileMeta(jobProfileMetaData);
    }
  }, [jobProfileMetaData]);

  const jobProfileUseFormReturn = useForm<JobProfileValidationModel>({
    resolver: classValidatorResolver(JobProfileValidationModel),
    defaultValues: {
      state: 'DRAFT',
      overview: { text: '' } as TrackedFieldArrayItem,
      program_overview: { text: '' } as TrackedFieldArrayItem,
      accountabilities:
        jobProfileData?.jobProfile.accountabilities?.map(
          (a) =>
            ({
              text: a.text,
              nonEditable: a.is_readonly,
              is_significant: a.is_significant,
            }) as AccountabilityItem,
        ) ?? [],
      education:
        jobProfileData?.jobProfile.education?.map(
          (r: any) =>
            ({
              text: r.text,
              nonEditable: r.is_readonly,
              is_significant: r.is_significant,
              tc_is_readonly: r.tc_is_readonly,
            }) as AccountabilityItem,
        ) ?? [],
      job_experience:
        jobProfileData?.jobProfile.job_experience?.map(
          (r: any) =>
            ({
              text: r.text,
              nonEditable: r.is_readonly,
              is_significant: r.is_significant,
            }) as AccountabilityItem,
        ) ?? [],
      professional_registration_requirements:
        jobProfileData?.jobProfile.professional_registration_requirements?.map(
          (s: any) =>
            ({
              text: s.text,
              nonEditable: s.is_readonly,
              is_significant: s.is_significant,
              tc_is_readonly: s.tc_is_readonly,
            }) as AccountabilityItem,
        ) ?? [],
      optional_requirements: jobProfileData?.jobProfile.optional_requirements?.map((r: any) => ({ text: r })) ?? [],
      preferences: jobProfileData?.jobProfile.preferences ?? [],
      knowledge_skills_abilities: jobProfileData?.jobProfile.knowledge_skills_abilities ?? [],
      willingness_statements: jobProfileData?.jobProfile.willingness_statements ?? [],
      security_screenings:
        jobProfileData?.jobProfile.security_screenings?.map(
          (s) =>
            ({
              text: s.text,
              nonEditable: s.is_readonly,
              is_significant: s.is_significant,
              tc_is_readonly: s.tc_is_readonly,
            }) as SecurityScreeningItem,
        ) ?? [],
      behavioural_competencies:
        jobProfileData?.jobProfile.behavioural_competencies?.map((r: any) => ({
          id: r.id,
          name: r.name,
          description: r.description,
        })) ?? [],
      markAllNonEditable: false,
      markAllSignificant: false,
      markAllNonEditableEdu: false,
      markAllSignificantEdu: false,
      markAllNonEditableProReg: false,
      markAllSignificantProReg: false,
      markAllSignificantSecurityScreenings: false,
      markAllNonEditableJob_experience: false,
      markAllSignificantJob_experience: false,
      markAllNonEditableSec: false,
    },
  });

  const { trigger: triggerProfileValidation } = jobProfileUseFormReturn;

  const professionsDat = jobProfileData?.jobProfile.jobFamilies.map((family: any) => ({
    jobFamily: family.jobFamily.id,
    jobStreams: jobProfileData?.jobProfile.streams
      .filter((stream: any) => stream.stream.job_family_id === family.jobFamily.id)
      .map((stream: any) => stream.stream.id),
  }));

  const basicUseFormReturn = useForm<BasicDetailsValidationModel>({
    resolver: async (values, context, options) => {
      // Inject validation status into the validation context
      const valuesWithStatus = {
        ...values,
        _validationStatus: validationStatus,
      };

      return classValidatorResolver(BasicDetailsValidationModel)(valuesWithStatus, context, options);
    },
    defaultValues: {
      title: { text: '' } as TitleField,
      jobStoreNumber: '',
      originalJobStoreNumber: '',
      employeeClassificationGroups: [{ employeeGroup: null, classification: null }],
      jobRole: null as number | null,
      professions:
        !professionsDat || professionsDat?.length == 0
          ? ([{ jobFamily: -1, jobStreams: [] }] as ProfessionsModel[])
          : professionsDat,
      role: 1,
      reportToRelationship: [] as string[],
      scopeOfResponsibility: [] as number[] | null,
      ministries: [] as string[],
      classificationReviewRequired: false,
      jobContext: '',
      all_reports_to: false,
      all_organizations: true,
    },
  });

  const { trigger: triggerBasicDetailsValidation, watch: basicFormWatch } = basicUseFormReturn;

  // Received job profile data: set profileJson, trigger getJobProfileMeta and getPositionRequestsCount
  useEffect(() => {
    if (jobProfileData) {
      setJobProfileData(jobProfileData);
      setProfileJson(jobProfileData);
      triggerBasicDetailsValidation();
      triggerProfileValidation();

      let link: string;

      if (jobProfileData?.jobProfile.state === 'DRAFT') {
        if (jobProfileData?.jobProfile.is_archived === false) {
          link = '/job-profiles/manage/draft/';
        } else {
          link = '/job-profiles/manage/archived/'; //'/job-profiles/manage/published/';
        }
      } else {
        link = '/job-profiles/manage/published/';
      }

      setLink(link);
      setProfessionsData(professionsDat);
    }
  }, [jobProfileData, triggerBasicDetailsValidation, triggerProfileValidation]);

  // Received job profile data: set profileJson, trigger getJobProfileMeta and getPositionRequestsCount
  useEffect(() => {
    if (jobProfileData) {
      if (jobProfileData.jobProfile.state == 'PUBLISHED') {
        triggerGetJobProfileMeta(jobProfileData.jobProfile.id);
        triggerGetPositionRequestsCount({ where: { parent_job_profile_id: { equals: jobProfileData.jobProfile.id } } });
      }
    }
  }, [jobProfileData, triggerGetJobProfileMeta, triggerGetPositionRequestsCount]);

  useEffect(() => {
    if (jobProfileData && positionRequestsCount && versionInReview == -1) {
      setVersionInReview(positionRequestsCount.positionRequestsCount.verification);
      setVersionCompleted(positionRequestsCount.positionRequestsCount.completed);

      return;
    }
    if (jobProfileData && positionRequestsCount && jobProfileMetaData) {
      const currentVersion =
        jobProfileData?.jobProfile.version ==
        jobProfileMetaData.jobProfileMeta.versions.map((v) => v.version).sort((a, b: number) => b - a)[0];
      setIsCurrentVersion(currentVersion);
      setTotalInReview(positionRequestsCount.positionRequestsCount.verification);
      setTotalCompleted(positionRequestsCount.positionRequestsCount.completed);
      triggerGetPositionRequestsCount({
        where: {
          parent_job_profile_id: { in: jobProfileMetaData?.jobProfileMeta.versions.map((v: { id: number }) => v.id) },
        },
      });
    }
  }, [jobProfileData, jobProfileMetaData, positionRequestsCount, triggerGetPositionRequestsCount, versionInReview]);

  const title = basicFormWatch('title.text');

  const formMethods = {
    basicUseFormReturn,
    jobProfileUseFormReturn,
  };

  return (
    <>
      <FormContext.Provider value={formMethods}>
        {isLoading ? <></> : <JobProfileHeader title={title} />}

        <TCTabBar></TCTabBar>
      </FormContext.Provider>
    </>
  );
};
