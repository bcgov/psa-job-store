/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined, ExclamationCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Descriptions, DescriptionsProps, Divider, Grid, Row, Tooltip, Typography } from 'antd';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  Length,
  Matches,
  ValidateNested,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import dayjs from 'dayjs';
import { diff_match_patch } from 'diff-match-patch';
import DOMPurify from 'dompurify';
import { CSSProperties, useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import LoadingSpinnerWithMessage from '../../../components/app/common/components/loading.component';
import '../../../components/app/common/css/custom-descriptions.css';
import { VersionSelect } from '../../../components/app/version-select.component';
import {
  AccountabilitiesModel,
  IdVersion,
  JobProfileModel,
  ProfessionsModel,
  TrackedFieldArrayItem,
} from '../../../redux/services/graphql-api/job-profile-types';
import {
  useLazyGetJobProfileByNumberQuery,
  useLazyGetJobProfileQuery,
} from '../../../redux/services/graphql-api/job-profile.api';
import AccessibleDocumentFromDescriptions from './accessible-document-from-descriptions';
import './job-profile.component.css';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface JobProfileProps {
  profileData?: any;
  onProfileLoad?: (profileData: JobProfileModel) => void;
  showBackToResults?: boolean;
  showDiff?: boolean;
  parentJobProfileId?: number;
  parentJobProfileVersion?: number;
  style?: CSSProperties;
  // onUseProfile?: () => void;
  showBasicInfo?: boolean;
  showVersions?: boolean;
}

class BehaviouralCompetency {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}

export interface ValueString {
  value: string;

  // total comp
  nonEditable?: boolean;
  is_readonly?: boolean;
  tc_is_readonly?: boolean;
  text?: string;
}

export class TitleField extends TrackedFieldArrayItem {
  @Matches(/^[A-Za-z0-9\s.,\-'()]{1,200}$/, {
    message: 'Title can only contain letters, numbers, spaces, periods, commas, hyphens, apostrophes, and parentheses.',
  })
  @Length(5, 200, { message: 'Title must be between 5 and 200 characters.' })
  declare text: string;
}

export class OverviewField extends TrackedFieldArrayItem {
  @Length(5, 2000, { message: 'Overview must be between 5 and 2000 characters.' })
  declare text: string;
}

export class ProgramOverviewField extends TrackedFieldArrayItem {
  @Length(0, 2000, { message: 'Program overview must be between 0 and 2000 characters.' })
  declare text: string;
}

function getItemValue(item: string | TrackedFieldArrayItem | AccountabilitiesModel): string {
  if (!item) return '';
  if (typeof item === 'string') {
    return item;
  } else if ('text' in item) {
    // Handle AccountabilitiesModel
    return typeof item.text === 'string' ? item.text : '';
  } else {
    return '';
  }
}

function BehaviouralCompetencyValidator(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'behaviouralCompetencyValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any[]) {
          if (!value) return false;

          return value.length >= 3 && value.length <= 20; //10
        },
        defaultMessage(): string {
          return 'There must be at least one related experience.';
        },
      },
    });
  };
}

function AccountabilitiesCountValidator(
  min: number,
  max: number,
  label: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'accountabilitiesCountValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any[]) {
          // console.log('accountabilitiesCountValidator value: ', value);
          if (!value) return false;

          const validItems = value.filter(
            (item) =>
              item.is_significant &&
              !item.disabled &&
              ((item.text && item?.text.trim() !== '') || (item.value && item?.value.trim() !== '')),
          );
          return validItems.length >= min && validItems.length <= max;
        },
        defaultMessage(args: ValidationArguments): string {
          const [relatedMin, relatedMax, relatedLabel] = args.constraints;
          return `There should be between ${relatedMin} and ${relatedMax} ${relatedLabel}.`;
        },
      },
      constraints: [min, max, label],
    });
  };
}

function ItemCountValidator(min: number, max: number, label: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'itemCountValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any[]) {
          if (!value) return false;

          const validItems = value.filter(
            (item) =>
              !item.disabled && ((item.text && item?.text.trim() !== '') || (item.value && item?.value.trim() !== '')),
          );
          return validItems.length >= min && validItems.length <= max;
        },
        defaultMessage(args: ValidationArguments): string {
          const [relatedMin, relatedMax, relatedLabel] = args.constraints;
          return `There should be between ${relatedMin} and ${relatedMax} ${relatedLabel}.`;
        },
      },
      constraints: [min, max, label],
    });
  };
}

export function MinItemsValidator(min: number, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'minItemsValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any[]) {
          if (!value) return false;
          const validItems = value.filter(
            (item) =>
              !item.disabled && ((item.text && item?.text.trim() !== '') || (item.value && item?.value.trim() !== '')),
          );
          return validItems.length >= min;
        },
        defaultMessage(args: ValidationArguments): string {
          const [relatedMin] = args.constraints;
          return `There must be at least ${relatedMin} ${args.property}.`;
        },
      },
      constraints: [min],
    });
  };
}

function CustomItemCountValidator(min: number, max: number, label: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'customItemCountValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any[]) {
          if (!value) return false;

          // const nonCustomFields = value.filter((item) => !item.isCustom);
          // console.log('defaultFields: ', nonCustomFields);
          // if (nonCustomFields.length === 0) {
          //   return true; // No default items, so minimum count is 0
          // }

          const validItems = value.filter(
            (item) =>
              !item.disabled && ((item.text && item?.text.trim() !== '') || (item.value && item?.value.trim() !== '')),
          );

          return validItems.length >= min && validItems.length <= max;
        },
        defaultMessage(args: ValidationArguments): string {
          const [relatedMin, relatedMax, relatedLabel] = args.constraints;
          return `There should be between ${relatedMin} and ${relatedMax} custom ${relatedLabel}.`;
        },
      },
      constraints: [min, max, label],
    });
  };
}

// function ItemCountValidatorWithInnerProperty(
//   min: number,
//   max: number,
//   label: string,
//   pName: string,
//   validationOptions?: ValidationOptions,
// ) {
//   return function (object: object, propertyName: string) {
//     registerDecorator({
//       name: 'behaviouralCompetencyValidator',
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       validator: {
//         validate(value: any[]) {
//           console.log('ItemCountValidator2: ', value, pName);

//           if (!value) return false;

//           // const defaultFields = value.filter((item) => !item.isCustom);
//           // if (defaultFields.length === 0) {
//           //   return true; // No default items, so minimum count is 0
//           // }

//           const validItems = value.filter(
//             (item) =>
//               item[pName] &&
//               !item[pName].disabled &&
//               ((item[pName].text && item[pName].text.trim() !== '') ||
//                 (item[pName].value && item[pName].value.trim() !== '')),
//           );
//           return validItems.length >= min && validItems.length <= max;
//         },

//         defaultMessage(args: ValidationArguments): string {
//           const [relatedMin, relatedMax, relatedLabel] = args.constraints;
//           return `There should be between ${relatedMin} and ${relatedMax} custom ${relatedLabel}.`;
//         },
//       },
//       constraints: [min, max, label],
//     });
//   };
// }

export class ClassificationField {
  classification: string;
}

export class JobProfileValidationModel {
  id: number;

  number: number;

  @ValidateNested()
  @Type(() => TitleField)
  title: TitleField | string;

  classifications: ClassificationField[];

  context: string;

  @ValidateNested()
  @Type(() => OverviewField)
  overview: OverviewField | string;

  @ValidateNested()
  @Type(() => ProgramOverviewField)
  program_overview: ProgramOverviewField | string;

  // @AllDisabled({ message: 'There must be at least one accountability.' })
  @AccountabilitiesCountValidator(1, 40, 'required accountabilities', {
    // 1, 5
    message: 'There should be between $constraint1 and $constraint2 $constraint3.',
  })
  accountabilities: (TrackedFieldArrayItem | ValueString | AccountabilitiesModel)[];

  optional_accountabilities: (TrackedFieldArrayItem | ValueString | AccountabilitiesModel)[];

  @MinItemsValidator(1, { message: 'There must be at least 1 education or work experience requirements.' }) // 1, 2
  education: (TrackedFieldArrayItem | ValueString | AccountabilitiesModel)[];

  @MinItemsValidator(1, { message: 'There must be at least 1 related work experience requirements.' }) //1, 2
  job_experience: (TrackedFieldArrayItem | ValueString | AccountabilitiesModel)[];

  @ItemCountValidator(1, 10, 'security screenings', {
    message: 'There should be between $constraint1 and $constraint2 $constraint3.',
  })
  security_screenings: (TrackedFieldArrayItem | ValueString | AccountabilitiesModel)[];

  optional_security_screenings: (TrackedFieldArrayItem | ValueString | AccountabilitiesModel)[];

  @BehaviouralCompetencyValidator({ message: 'The profile should have between 3 and 10 behavioural competencies' })
  behavioural_competencies: { behavioural_competency: BehaviouralCompetency }[];

  // @CustomItemCountValidator(1, 10, 'professional registration and certification requirements', {
  //   message: 'There should be between $constraint1 and $constraint2 $constraint3.',
  // })
  // @ItemCountValidatorWithInnerProperty(
  //   1,
  //   10,
  //   'professional registration requirements',
  //   'professional_registration_requirement',
  //   {
  //     message: 'There should be between $constraint1 and $constraint2 $constraint3.',
  //   },
  // )
  // professional_registration_requirements: {
  //   professional_registration_requirement: TrackedFieldArrayItem | ValueString | AccountabilitiesModel;
  // }[];
  professional_registration_requirements: (TrackedFieldArrayItem | ValueString | AccountabilitiesModel)[];

  optional_professional_registration_requirements: (TrackedFieldArrayItem | ValueString | AccountabilitiesModel)[];

  preferences: (TrackedFieldArrayItem | ValueString | AccountabilitiesModel)[];

  @CustomItemCountValidator(1, 20, 'knowledge, skills or abilities', {
    // 1-5, 3-20
    message: 'There should be between $constraint1 and $constraint2 $constraint3.',
  })
  knowledge_skills_abilities: (TrackedFieldArrayItem | ValueString | AccountabilitiesModel)[];
  willingness_statements: (TrackedFieldArrayItem | ValueString | AccountabilitiesModel)[];
  optional_requirements: (TrackedFieldArrayItem | ValueString | AccountabilitiesModel)[];

  // total comp fields
  state: string;
  markAllNonEditable: boolean;
  markAllSignificant: boolean;
  markAllNonEditableEdu: boolean;
  markAllSignificantEdu: boolean;
  markAllNonEditableProReg: boolean;
  markAllSignificantProReg: boolean;
  markAllSignificantSecurityScreenings: boolean;
  markAllNonEditableJob_experience: boolean;
  markAllSignificantJob_experience: boolean;
  markAllNonEditableSec: boolean;
  jobStoreNumber: string;
  originalJobStoreNumber: string;
  employeeGroups: string[];
  classification: string | null;

  jobRole: number | null;
  professions: ProfessionsModel[];
  role: number;
  reportToRelationship: string[];
  scopeOfResponsibility: number | number[] | null; // number[] is latest change, used to allow only single selection
  ministries: string[];
  classificationReviewRequired: boolean;
  jobContext: string;
  all_reports_to: boolean;
  all_organizations: boolean;
}

export const JobProfile: React.FC<JobProfileProps> = ({
  profileData,
  onProfileLoad,
  showBackToResults = true,
  showDiff = false,
  parentJobProfileId,
  parentJobProfileVersion,
  style,
  // onUseProfile,
  showBasicInfo = true,
  showVersions = false,
}) => {
  const auth = useAuth();
  const roles = auth.user?.profile['client_roles'];
  const [searchParams] = useSearchParams();
  const params = useParams();
  const jobNumber = params.number ?? searchParams.get('selectedProfile'); // Using prop ID or param ID
  const id = searchParams.get('id');
  const version = searchParams.get('version');
  // console.log('resolvedId: ', resolvedId);
  const screens = useBreakpoint();

  // If neither resolvedId nor profileData is present, throw an error
  if (!jobNumber && !profileData) throw new Error('No ID');

  const [originalData, setOriginalData] = useState<JobProfileModel | null>(null); // for diff

  // Using the lazy query to have control over when the fetch action is dispatched
  // (not dispatching if profileData was already provided)
  const [triggerGetJobProfileByNumber, { data: profileByNumber, isLoading }] = useLazyGetJobProfileByNumberQuery();
  const [triggerGetJobProfile, { data: diffProfileData, isLoading: isLoadingDiff }] = useLazyGetJobProfileQuery();
  const [triggerGetJobProfileById, { data: versionedProfileData, isLoading: isLoadingVersioned }] =
    useLazyGetJobProfileQuery();

  // State to hold the effectiveData which can be from profileData prop or fetched from API
  const initialData = profileData ?? null;
  const [effectiveData, setEffectiveData] = useState<JobProfileModel | null>(initialData);
  const [effectiveDataExtra, setEffectiveDataExtra] = useState<JobProfileModel | null>(initialData);

  useEffect(() => {
    // If profileData exists, use it to set the form state
    if (versionedProfileData) {
      // once data by id and version loads, set that data
      setEffectiveData(versionedProfileData.jobProfile);
      setEffectiveDataExtra(versionedProfileData.jobProfile);
    } else if (id && version && !isLoadingVersioned) {
      // fetch by id and version when present in search query
      triggerGetJobProfileById({ id: parseInt(id ?? '-1'), version: parseInt(version ?? '-1') });
    }
  }, [searchParams, versionedProfileData, triggerGetJobProfileById, isLoadingVersioned, id, version]);

  useEffect(() => {
    // If profileData exists, use it to set the form state
    if (profileData && !showDiff) {
      setEffectiveData(profileData);
      setEffectiveDataExtra(profileData);
    } else if (!profileData && jobNumber && !(id && version)) {
      triggerGetJobProfileByNumber({ number: +jobNumber });
    } else if (profileData && showDiff && parentJobProfileId) {
      // we're in diff mode - load parent profile to compare to
      triggerGetJobProfile({ id: parentJobProfileId, version: parentJobProfileVersion });
    }
  }, [
    profileData,
    triggerGetJobProfile,
    showDiff,
    jobNumber,
    triggerGetJobProfileByNumber,
    parentJobProfileId,
    parentJobProfileVersion,
    id,
    version,
  ]);

  // useEffect to set effectiveData when data is fetched from the API
  useEffect(() => {
    if (!profileData && profileByNumber && !isLoading) {
      // Only set effectiveData from fetched data if profileData is not provided
      if (onProfileLoad) onProfileLoad(profileByNumber.jobProfileByNumber);
      setEffectiveData(profileByNumber.jobProfileByNumber);
      setEffectiveDataExtra(profileByNumber.jobProfileByNumber);
    } else if (profileData && showDiff && profileByNumber && !isLoading) {
      if (onProfileLoad) onProfileLoad(profileByNumber.jobProfileByNumber);
      // do diff between profile as it was submitted at the time, otherwise compare to the latest
      setOriginalData(profileByNumber.jobProfileByNumber); // for diff
    } else if (profileData && showDiff && diffProfileData && !isLoadingDiff) {
      if (onProfileLoad) onProfileLoad(diffProfileData.jobProfile);
      // do diff between profile as it was submitted at the time, otherwise compare to the latest
      setOriginalData(diffProfileData.jobProfile); // for diff
    }
  }, [profileByNumber, isLoading, profileData, onProfileLoad, showDiff, diffProfileData, isLoadingDiff]);

  const compareData = (original: string | undefined, modified: string | undefined): JSX.Element[] => {
    const blank: JSX.Element[] = [];
    if (original === undefined || modified === undefined) return blank;

    const dmp = new diff_match_patch();
    const diff = dmp.diff_main(original, modified);
    dmp.diff_cleanupSemantic(diff);

    return diff.map(([operation, text], index) => {
      const style: React.CSSProperties = {};
      let screenReaderText = '';
      if (operation === 1) {
        // Insertion
        style.backgroundColor = 'yellow';
        screenReaderText = ` Added: ${text}. End added. `;
      } else if (operation === -1) {
        // Deletion
        style.textDecoration = 'line-through';
        style.color = '#A8071A';
        screenReaderText = ` Deleted: ${text}. End deleted. `;
      } else {
        screenReaderText = text;
      }

      return (
        <span key={index} style={style}>
          <span className="sr-only">&nbsp;{screenReaderText}</span>
          <span aria-hidden>{text}</span>
        </span>
      );
    });
  };

  const compareLists = (
    original: (string | TrackedFieldArrayItem | AccountabilitiesModel)[],
    modified: (string | TrackedFieldArrayItem | AccountabilitiesModel)[] | undefined,
    hideDisabled?: boolean,
  ): JSX.Element[] => {
    const comparisonResult: JSX.Element[] = [];
    console.log('original/modified 47: ', original, modified);
    if (!modified) return comparisonResult;

    // Add this check to handle null original
    if (!original) {
      // If original is null, treat all modified items as additions
      return modified.map((item) => {
        const itemValue = getItemValue(item);
        return (
          <span style={{ backgroundColor: 'yellow' }}>
            <span className="sr-only">Added: {itemValue}. End added.</span>
            {itemValue}
          </span>
        );
      });
    }

    const maxLength = Math.max(original.length, modified.length);
    const dmp = new diff_match_patch();

    for (let i = 0; i < maxLength; i++) {
      const originalVal = original[i] ?? '';
      const originalItemValue = getItemValue(originalVal);

      const modifiedItem = modified[i];
      const modifiedItemValue =
        typeof modifiedItem === 'string'
          ? getItemValue(modifiedItem)
          : modifiedItem?.disabled
            ? ''
            : getItemValue(modifiedItem) || '';
      const hideItem = typeof modifiedItem !== 'string' && modifiedItem?.disabled && hideDisabled;

      if ((originalItemValue || modifiedItemValue) && !hideItem) {
        const diff = dmp.diff_main(originalItemValue, modifiedItemValue);
        dmp.diff_cleanupSemantic(diff);

        comparisonResult.push(
          <li key={i}>
            {diff.map(([operation, text], index) => {
              const style: React.CSSProperties = {};
              let screenReaderText = '';
              if (operation === 1) {
                style.backgroundColor = 'yellow';
                screenReaderText = ` Added: ${text}. End added. `;
              } else if (operation === -1) {
                style.textDecoration = 'line-through';
                style.color = '#A8071A';
                screenReaderText = ` Deleted: ${text}. End deleted.`;
              } else {
                screenReaderText = text;
              }

              return (
                <span key={index} style={style}>
                  <span className="sr-only">&nbsp;{screenReaderText}</span>
                  <span aria-hidden>{text}</span>
                </span>
              );
            })}
          </li>,
        );
      }
    }

    return comparisonResult;
  };

  const compareCompetencies = (original: BehaviouralCompetency[], modified: BehaviouralCompetency[]): JSX.Element[] => {
    const allNames = new Set([...original.map((item) => item.name), ...modified.map((item) => item.name)]);
    const comparisonResult: JSX.Element[] = [];

    allNames.forEach((name) => {
      const originalItem = original.find((item) => item.name === name);
      const modifiedItem = modified.find((item) => item.name === name);

      if (originalItem && modifiedItem) {
        comparisonResult.push(
          <li key={name}>
            <Text strong>{originalItem.name}</Text> {originalItem.description}
          </li>,
        );
      } else if (originalItem && !modifiedItem) {
        comparisonResult.push(
          <li key={name}>
            <span className="sr-only">
              &nbsp;Deleted: {originalItem.name}. {originalItem.description} End deleted.
            </span>
            <Text strong style={{ textDecoration: 'line-through', color: '#A8071A' }} aria-hidden>
              {originalItem.name}
            </Text>{' '}
            <span style={{ textDecoration: 'line-through', color: '#A8071A' }} aria-hidden>
              {originalItem.description}
            </span>
          </li>,
        );
      } else if (!originalItem && modifiedItem) {
        comparisonResult.push(
          <li key={name}>
            <span className="sr-only">
              &nbsp;Added: {modifiedItem.name}. {modifiedItem.description} End added.
            </span>
            <Text strong style={{ backgroundColor: 'yellow' }} aria-hidden>
              {modifiedItem.name}
            </Text>{' '}
            <span style={{ backgroundColor: 'yellow' }} aria-hidden>
              {modifiedItem.description}
            </span>
          </li>,
        );
      }
    });

    return comparisonResult;
  };

  // Construct the back URL
  const backUrl = `/job-profiles?${searchParams}`;

  if (isLoading) {
    return <LoadingSpinnerWithMessage />;
  }

  // console.log('effectiveData: ', effectiveData);

  const basicInfoItems: DescriptionsProps['items'] = [
    {
      key: 'number',
      label: <h3 tabIndex={0}>Job Store #</h3>,
      children: <span tabIndex={0}>{effectiveData?.number}</span>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'profileversion',
      label: <h3 tabIndex={0}>Profile Version</h3>,
      children: (
        <div>
          <div style={{ paddingBottom: '5px' }}>{effectiveData?.version}</div>
          <Typography.Text type="secondary">
            {`Updated ${dayjs(effectiveData?.updated_at).format('MMM D, YYYY')}`}
          </Typography.Text>
        </div>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },

    {
      key: 'ministries',
      label: <h3 tabIndex={0}>Ministries</h3>,
      children: (
        <span tabIndex={0}>
          {effectiveDataExtra?.all_organizations ? (
            'All'
          ) : (
            <ul>
              {effectiveDataExtra?.organizations.map((org, index) => <li key={index}>{org.organization.name}</li>)}
            </ul>
          )}
        </span>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'Jobrole',
      label: <h3 tabIndex={0}>Job role</h3>,
      children: <span tabIndex={0}>{effectiveDataExtra?.role?.name}</span>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'Roletype',
      label: <h3 tabIndex={0}>Role type</h3>,
      children: (
        <span tabIndex={0}>
          {effectiveDataExtra?.role_type?.name ? effectiveDataExtra?.role_type?.name : 'Unknown'}
        </span>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'Scopeofresponsibility',
      label: <h3 tabIndex={0}>Scope of responsibility</h3>,
      children: (
        <span tabIndex={0}>
          {/* Used to have only single scope, later expanded to multiple */}
          {!effectiveDataExtra?.scopes
            ? effectiveDataExtra?.scope?.name && effectiveDataExtra?.scope?.description
              ? `${effectiveDataExtra?.scope?.name} - ${effectiveDataExtra?.scope?.description}`
              : 'Unknown'
            : ''}
          {effectiveDataExtra?.scopes &&
            effectiveDataExtra?.scopes
              .map((scopeItem) => {
                return `${scopeItem.scope.name} ${scopeItem.scope.description}`;
              })
              .join(', ')}
        </span>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'Professionsanddisciplines',
      label: <h3 tabIndex={0}>Professions & disciplines</h3>,
      children: (
        <div tabIndex={0}>
          {effectiveDataExtra?.jobFamilies.map((jobFamilyItem) => {
            const jobFamily = jobFamilyItem.jobFamily;
            return (
              <div key={jobFamily.id}>
                <h4>{jobFamily.name}</h4>
                <ul>
                  {effectiveDataExtra?.streams
                    .filter((streamItem) => streamItem.stream.job_family_id === jobFamily.id)
                    .map((streamItem, index) => <li key={index}>{streamItem.stream.name}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
  ];

  const items: DescriptionsProps['items'] = [
    {
      key: 'title',
      label: <h3 tabIndex={0}>Title</h3>,
      children: (
        <span data-testid="job-title" tabIndex={0}>
          {showDiff && originalData
            ? compareData(
                typeof originalData.title === 'string' ? originalData.title : originalData.title.text,
                typeof effectiveData?.title === 'string' ? effectiveData?.title : effectiveData?.title?.text,
              )
            : typeof effectiveData?.title === 'string'
              ? effectiveData?.title
              : effectiveData?.title?.text}
        </span>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },

    {
      key: 'classification',
      label: <h3 tabIndex={0}>Classification</h3>,
      children: (
        <div tabIndex={0}>
          {
            // currently, there are a maximum of 2 classifications (to accomadate schedule A) - both of which should be the same code.
            originalData
              ? originalData?.classifications?.map((c) => c.classification?.code)[0]
              : effectiveData?.classifications?.map((c) => c.classification?.code)[0]
          }
        </div>
      ),

      // children: <div tabIndex={0}>{originalData?.classifications?.map((c) => c.classification?.code).join(', ')}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    ...(effectiveData?.program_overview &&
    (effectiveData?.program_overview as any).text && // if program overview field is present AND it's not empty
    (typeof effectiveData.program_overview === 'string'
      ? effectiveData.program_overview.trim()
      : effectiveData.program_overview.text.trim()) !== ''
      ? [
          {
            key: 'program_overview',
            label: <span tabIndex={0}>Program Overview</span>,
            children: (
              <span data-testid="program-overview" tabIndex={0}>
                {showDiff && originalData
                  ? compareData(
                      typeof originalData.program_overview === 'string'
                        ? originalData.program_overview
                        : originalData?.program_overview?.text,
                      typeof effectiveData?.program_overview === 'string'
                        ? effectiveData?.program_overview
                        : effectiveData?.program_overview?.text,
                    )
                  : typeof effectiveData?.program_overview === 'string'
                    ? effectiveData?.program_overview
                    : effectiveData?.program_overview?.text}
              </span>
            ),
            span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
          },
        ]
      : []),
    // {
    //   key: 'context',
    //   label: 'Job Context',
    //   children:
    //     showDiff && originalData ? (
    //       compareData(
    //         typeof originalData.context === 'string' ? originalData.context : originalData.context?.description || '',
    //         effectiveData?.context?.toString(),
    //       )
    //     ) : (
    //       <span
    //         dangerouslySetInnerHTML={{
    //           __html: DOMPurify.sanitize(
    //             typeof effectiveData?.context === 'string'
    //               ? effectiveData?.context
    //               : effectiveData?.context.description ?? '',
    //           ),
    //         }}
    //       ></span>
    //     ),
    //   // : typeof effectiveData?.context === 'string'
    //   //   ? effectiveData?.context
    //   //   : effectiveData?.context.description,
    //   // needs to be in this format to remove warning Sum of column `span` in a line not match `column` of Descriptions
    //   span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    // },
    {
      key: 'overview',
      label: <h3 tabIndex={0}>Job Overview</h3>,
      children: (
        <span data-testid="job-overview" tabIndex={0}>
          {showDiff && originalData
            ? compareData(
                typeof originalData.overview === 'string' ? originalData.overview : originalData?.overview?.text,
                typeof effectiveData?.overview === 'string' ? effectiveData?.overview : effectiveData?.overview?.text,
              )
            : typeof effectiveData?.overview === 'string'
              ? effectiveData?.overview
              : effectiveData?.overview?.text}
        </span>
      ),
      // needs to be in this format to remove warning Sum of column `span` in a line not match `column` of Descriptions
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    ...((!showDiff && (effectiveData?.accountabilities.filter((acc) => !acc.disabled)?.length ?? 0) > 0) ||
    (showDiff && (effectiveData?.accountabilities?.length ?? 0) > 0)
      ? [
          {
            key: 'accountabilities',
            label: <h3 tabIndex={0}>Accountabilities</h3>,
            children: (
              <>
                {/* Main Accountabilities - is_significant == true */}
                <span tabIndex={0}>
                  <ul data-testid="significant-accountabilities">
                    {showDiff && originalData
                      ? compareLists(
                          originalData.accountabilities.filter((acc) => acc.is_significant),
                          effectiveData?.accountabilities.filter((acc) => acc.is_significant),
                        )
                      : effectiveData?.accountabilities
                          .filter((acc) => acc.is_significant)
                          .map((accountability, index) => {
                            if (typeof accountability === 'string' || accountability.disabled) {
                              return null;
                            }
                            if (accountability.text instanceof TrackedFieldArrayItem) {
                              return <li key={index}>{accountability.text.text}</li>;
                            } else if (typeof accountability.text === 'string') {
                              return <li key={index}>{accountability.text}</li>;
                            }
                          })}
                  </ul>
                  {/* Optional Accountabilities - is_significant == false */}
                  {(effectiveData?.accountabilities.filter((acc) => !acc.is_significant && !acc.disabled)?.length ??
                    0) > 0 &&
                    (showDiff && originalData ? (
                      <div
                        style={{
                          borderLeft: '1px solid #D8D8D8',
                          paddingLeft: '12px',
                          marginBottom: '12px',
                          marginLeft: '23px',
                        }}
                        className="optionalList"
                      >
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#474543' }}>
                          <h4>Optional accountabilities</h4>
                        </span>

                        <ul data-testid="optional-accountabilities" style={{ paddingInlineStart: '27px' }}>
                          {compareLists(
                            originalData.accountabilities.filter((acc) => !acc.is_significant && acc.disabled),
                            effectiveData?.accountabilities.filter((acc) => !acc.is_significant),
                            true,
                          )}
                        </ul>
                      </div>
                    ) : (
                      //marginTop resets the applied marginButtom by antd
                      <ul data-testid="optional-accountabilities" style={{ marginTop: '-14px' }}>
                        {effectiveData?.accountabilities
                          .filter((acc) => !acc.is_significant)
                          .map((accountability, index) => {
                            if (typeof accountability === 'string' || accountability.disabled) {
                              return null;
                            }
                            if (accountability.text instanceof TrackedFieldArrayItem) {
                              return <li key={index}>{accountability.text.text}</li>;
                            } else if (typeof accountability.text === 'string') {
                              return <li key={index}>{accountability.text}</li>;
                            }
                          })}
                      </ul>
                    ))}
                </span>
              </>
            ),
            // needs to be in this format to remove warning Sum of column `span` in a line not match `column` of Descriptions
            span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
          },
        ]
      : []),

    {
      key: 'requirements',
      label: <h3 tabIndex={0}>Minimum job requirements</h3>,
      children: (
        <>
          <span tabIndex={0}>
            {((showDiff && (effectiveData?.education?.length ?? 0) > 0) ||
              (!showDiff && (effectiveData?.education.filter((ed) => !ed.disabled)?.length ?? 0) > 0)) && (
              <>
                <h4>Education</h4>

                <ul data-testid="education">
                  {showDiff && originalData
                    ? compareLists(originalData.education, effectiveData?.education)
                    : effectiveData?.education?.map((requirement, index) => {
                        if (typeof requirement === 'string') {
                          return <li key={index}>{requirement}</li>;
                        }
                        if (requirement.disabled) {
                          return null;
                        }
                        if (requirement.text instanceof TrackedFieldArrayItem) {
                          return <li key={index}>{requirement.text.text}</li>;
                        } else if (typeof requirement.text === 'string') {
                          return <li key={index}>{requirement.text}</li>;
                        }
                      })}
                </ul>
                <Divider />
              </>
            )}

            {((showDiff && (effectiveData?.job_experience?.length ?? 0) > 0) ||
              (!showDiff && (effectiveData?.job_experience.filter((ed) => !ed.disabled)?.length ?? 0) > 0)) && (
              <>
                <h4>Related experience</h4>
                <ul data-testid="job-experience">
                  {showDiff && originalData
                    ? compareLists(originalData.job_experience, effectiveData?.job_experience)
                    : effectiveData?.job_experience?.map((requirement, index) => {
                        if (typeof requirement === 'string') {
                          return <li key={index}>{requirement}</li>;
                        }
                        if (requirement.disabled) {
                          return null;
                        }
                        if (requirement.text instanceof TrackedFieldArrayItem) {
                          return <li key={index}>{requirement.text.text}</li>;
                        } else if (typeof requirement.text === 'string') {
                          return <li key={index}>{requirement.text}</li>;
                        }
                      })}
                </ul>
                <Divider />
              </>
            )}

            {((showDiff && (effectiveData?.professional_registration_requirements?.length ?? 0) > 0) ||
              (!showDiff &&
                (effectiveData?.professional_registration_requirements?.filter((ed) => !ed.disabled)?.length ?? 0) >
                  0)) && (
              <>
                <h4>Professional registration and certification requirements</h4>
                <>
                  <ul data-testid="professional-registration">
                    {showDiff && originalData
                      ? compareLists(
                          originalData.professional_registration_requirements?.filter((acc) => acc.is_significant),
                          effectiveData?.professional_registration_requirements?.filter((acc) => acc.is_significant),
                        )
                      : effectiveData?.professional_registration_requirements
                          .filter((acc) => acc.is_significant)
                          .map((professional_registration_requirement, index) => {
                            if (
                              typeof professional_registration_requirement === 'string' ||
                              professional_registration_requirement.disabled
                            ) {
                              return null;
                            }
                            if (typeof professional_registration_requirement.text === 'string') {
                              return <li key={index}>{professional_registration_requirement.text}</li>;
                            }
                          })}
                  </ul>
                  {/* Optional  - is_significant == false */}
                  {(effectiveData?.professional_registration_requirements.filter(
                    (acc) => !acc.is_significant && !acc.disabled,
                  )?.length ?? 0) > 0 && (
                    <>
                      {showDiff && originalData ? (
                        <div
                          style={{
                            borderLeft: '1px solid #D8D8D8',
                            paddingLeft: '12px',
                            marginBottom: '12px',
                            marginLeft: '23px',
                          }}
                          className="optionalList"
                        >
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#474543' }}>
                            <h4>Optional requirements</h4>
                          </span>
                          <ul data-testid="optional-prof-regs" style={{ paddingInlineStart: '27px' }}>
                            {compareLists(
                              originalData.professional_registration_requirements.filter(
                                (acc) => !acc.is_significant && acc.disabled,
                              ),
                              effectiveData?.professional_registration_requirements.filter(
                                (acc) => !acc.is_significant,
                              ),
                              true,
                            )}
                          </ul>
                        </div>
                      ) : (
                        effectiveData?.professional_registration_requirements
                          .filter((acc) => !acc.is_significant)
                          .map((professional_registration_requirement, index) => {
                            if (
                              typeof professional_registration_requirement === 'string' ||
                              professional_registration_requirement.disabled
                            ) {
                              return null;
                            }
                            if (typeof professional_registration_requirement.text === 'string') {
                              return <li key={index}>{professional_registration_requirement.text}</li>;
                            }
                          })
                      )}
                    </>
                  )}
                </>
                <Divider />
              </>
            )}

            {((showDiff && (effectiveData?.preferences?.length ?? 0) > 0) ||
              (!showDiff && (effectiveData?.preferences?.filter((ed) => !ed.disabled)?.length ?? 0) > 0)) && (
              <>
                <h4>Preferences</h4>
                <ul data-testid="preferences">
                  {showDiff && originalData
                    ? compareLists(originalData.preferences, effectiveData?.preferences)
                    : effectiveData?.preferences?.map((requirement, index) => {
                        if (typeof requirement === 'string') {
                          return <li key={index}>{requirement}</li>;
                        }
                        if (requirement.disabled) {
                          return null;
                        }
                        return <li key={index}>{requirement.text}</li>;
                      })}
                </ul>
                <Divider />
              </>
            )}

            {((showDiff && (effectiveData?.knowledge_skills_abilities?.length ?? 0) > 0) ||
              (!showDiff &&
                (effectiveData?.knowledge_skills_abilities?.filter((ed) => !ed.disabled)?.length ?? 0) > 0)) && (
              <>
                <h4>Knowledge, skills and abilities</h4>
                <ul data-testid="knowledge-skills-abilities">
                  {showDiff && originalData
                    ? compareLists(originalData.knowledge_skills_abilities, effectiveData?.knowledge_skills_abilities)
                    : effectiveData?.knowledge_skills_abilities?.map((requirement, index) => {
                        if (typeof requirement === 'string') {
                          return <li key={index}>{requirement}</li>;
                        }
                        if (requirement.disabled) {
                          return null;
                        }
                        return <li key={index}>{requirement.text}</li>;
                      })}
                </ul>
                <Divider />
              </>
            )}

            {((showDiff && (effectiveData?.willingness_statements?.length ?? 0) > 0) ||
              (!showDiff &&
                (effectiveData?.willingness_statements?.filter((ed) => !ed.disabled)?.length ?? 0) > 0)) && (
              <>
                <h4>Willingness statements or provisos</h4>
                <ul data-testid="provisos">
                  {showDiff && originalData
                    ? compareLists(originalData.willingness_statements, effectiveData?.willingness_statements)
                    : effectiveData?.willingness_statements?.map((requirement, index) => {
                        if (typeof requirement === 'string') {
                          return <li key={index}>{requirement}</li>;
                        }
                        if (requirement.disabled) {
                          return null;
                        }
                        return <li key={index}>{requirement.text}</li>;
                      })}
                </ul>
                <Divider />
              </>
            )}

            {((showDiff && (effectiveData?.security_screenings?.length ?? 0) > 0) ||
              (!showDiff && (effectiveData?.security_screenings.filter((ed) => !ed.disabled)?.length ?? 0) > 0)) && (
              <>
                <h4>Security screenings</h4>
                <>
                  {/* Main - is_significant == true */}
                  <ul data-testid="security-screenings">
                    {showDiff && originalData
                      ? compareLists(
                          originalData.security_screenings.filter((acc) => acc.is_significant),
                          effectiveData?.security_screenings.filter((acc) => acc.is_significant),
                        )
                      : effectiveData?.security_screenings
                          .filter((acc) => acc.is_significant)
                          .map((security_screening, index) => {
                            if (typeof security_screening === 'string' || security_screening.disabled) {
                              return null;
                            }
                            if (typeof security_screening.text === 'string') {
                              return <li key={index}>{security_screening.text}</li>;
                            }
                          })}
                  </ul>
                  {/* Optional - is_significant == false */}
                  {(effectiveData?.security_screenings.filter((acc) => !acc.is_significant && !acc.disabled)?.length ??
                    0) > 0 && (
                    <>
                      {showDiff && originalData ? (
                        <div
                          style={{
                            borderLeft: '1px solid #D8D8D8',
                            paddingLeft: '12px',
                            marginBottom: '12px',
                            marginLeft: '23px',
                          }}
                          className="optionalList"
                        >
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#474543' }}>
                            <h4>Optional security screenings</h4>
                          </span>
                          <ul data-testid="optional-security-screenings" style={{ paddingInlineStart: '27px' }}>
                            {compareLists(
                              originalData.security_screenings.filter((acc) => !acc.is_significant && acc.disabled),
                              effectiveData?.security_screenings.filter((acc) => !acc.is_significant),
                              true,
                            )}
                          </ul>
                        </div>
                      ) : (
                        //marginTop resets the applied marginButtom by antd
                        <ul data-testid="optional-accountabilities" style={{ marginTop: '-14px' }}>
                          {effectiveData?.security_screenings
                            .filter((acc) => !acc.is_significant)
                            .map((security_screening, index) => {
                              if (typeof security_screening === 'string' || security_screening.disabled) {
                                return null;
                              }
                              if (typeof security_screening.text === 'string') {
                                return <li key={index}>{security_screening.text}</li>;
                              }
                            })}
                        </ul>
                      )}
                    </>
                  )}
                </>
                <Divider />
              </>
            )}

            {((showDiff && (effectiveData?.optional_requirements?.length ?? 0) > 0) ||
              (!showDiff && (effectiveData?.optional_requirements.filter((ed) => !ed.disabled)?.length ?? 0) > 0)) && (
              <>
                <h4>Other requirements</h4>
                <ul data-testid="optional-requirements">
                  {showDiff && originalData
                    ? compareLists(originalData.optional_requirements, effectiveData?.optional_requirements)
                    : effectiveData?.optional_requirements?.map((requirement, index) => {
                        if (typeof requirement === 'string') {
                          return <li key={index}>{requirement}</li>;
                        }
                        if (requirement.disabled) {
                          return null;
                        }
                        return <li key={index}>{requirement.text}</li>;
                      })}
                </ul>
              </>
            )}
          </span>
        </>
      ),
      // needs to be in this format to remove warning Sum of column `span` in a line not match `column` of Descriptions
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'behavioural_competencies',
      label: <h3 tabIndex={0}>Behavioural Competencies</h3>,
      children: (
        <span tabIndex={0}>
          <ul data-testid="behavioural-competencies">
            {showDiff && originalData
              ? compareCompetencies(
                  originalData.behavioural_competencies.map((item) => item.behavioural_competency),
                  effectiveData?.behavioural_competencies.map((item) => item.behavioural_competency) ?? [],
                )
              : (effectiveData?.behavioural_competencies ?? []).map(
                  ({ behavioural_competency: { name, description } }, index) => {
                    return (
                      <li key={index}>
                        <Text strong>{name}</Text> {description}
                      </li>
                    );
                  },
                )}
          </ul>
        </span>
      ),
      // needs to be in this format to remove warning Sum of column `span` in a line not match `column` of Descriptions
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
  ];

  return (
    <div data-testid="job-profile" style={{ ...style }}>
      {screens.xl === false && showBackToResults ? (
        <nav aria-label="Breadcrumb">
          <Link to={backUrl}>
            <Button type="link" icon={<ArrowLeftOutlined aria-hidden="true" />} style={{ padding: 0 }}>
              Back to Search Results
            </Button>
          </Link>
        </nav>
      ) : (
        <div />
      )}
      {/* {onUseProfile ? (
        <WizardEditControlBar onNext={onUseProfile} nextText="Use Profile" style={{ marginBottom: '1rem' }} />
      ) :
      null} */}

      {effectiveData?.review_required && (
        <Alert
          message={<span>Will require verification</span>}
          description={
            <span>
              This profile will need to be verified by the classification team before a position number is generated.
            </span>
          }
          role="note"
          type="warning"
          showIcon
          icon={<ExclamationCircleFilled />}
          style={{ marginBottom: '24px' }}
        />
      )}

      <Alert
        role="note"
        message={
          <h2 style={{ margin: 0, fontSize: '1rem', marginTop: '-0.3rem' }}>
            Job context{' '}
            <Tooltip title="The job context is important to understand as you proceed to create the position. You will be asked prior to approving that you understand the context of the job.">
              <InfoCircleOutlined style={{ cursor: 'pointer', fontSize: '0.9rem' }} />
            </Tooltip>
          </h2>
        }
        description={
          <span
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(effectiveData?.context ?? ''),
            }}
          ></span>
        }
        type="info"
        showIcon
        icon={<ExclamationCircleFilled />}
        style={{ marginBottom: '24px' }}
      />

      <div className="sr-only">
        <h2 style={{ margin: '0' }}>Job profile</h2>

        <AccessibleDocumentFromDescriptions items={items} />
      </div>

      <Descriptions
        aria-hidden
        className="customDescriptions"
        title={
          <div>
            <Row>
              <Col flex="auto">
                <h2 style={{ margin: '0' }}>Job profile</h2>
              </Col>{' '}
              <Col>
                {showVersions &&
                roles &&
                ((roles as string[]).includes('total-compensation') ||
                  (roles as string[]).includes('classification')) ? (
                  <VersionSelect
                    id={id ?? effectiveData?.id.toString() ?? '-1'}
                    version={version}
                    selectVersionCallback={(selectedVersion: IdVersion) => {
                      triggerGetJobProfileById({ id: selectedVersion.id, version: selectedVersion.version });
                    }}
                  />
                ) : (
                  <></>
                )}
              </Col>
            </Row>
          </div>
        }
        bordered
        column={24}
        items={items}
        labelStyle={{
          fontWeight: 700,
          width: '100px',
          verticalAlign: 'top',
          background: '#FAFAFA',
        }}
        contentStyle={{
          background: 'white',
          verticalAlign: 'top',
        }}
      />

      {showBasicInfo && (
        <>
          <div className="sr-only">
            <h2 style={{ margin: '0' }}>Basic information</h2>
            <AccessibleDocumentFromDescriptions items={basicInfoItems} />
          </div>
          <Descriptions
            aria-hidden
            className="customDescriptions"
            title={<h2 style={{ margin: '0' }}>Basic information</h2>}
            bordered
            column={24}
            items={basicInfoItems}
            style={{ marginTop: '24px', marginBottom: '24px' }}
            labelStyle={{
              fontWeight: 700,
              width: '100px',
              verticalAlign: 'top',
              background: '#FAFAFA',
            }}
            contentStyle={{
              background: 'white',
              verticalAlign: 'top',
            }}
          />
        </>
      )}
      <div
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      ></div>
    </div>
  );
};
