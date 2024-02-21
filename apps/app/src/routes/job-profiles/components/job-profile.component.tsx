/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined, ExclamationCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import { Alert, Descriptions, DescriptionsProps, Grid, Tooltip, Typography } from 'antd';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  Length,
  ValidateNested,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import dayjs from 'dayjs';
import { diff_match_patch } from 'diff-match-patch';
import DOMPurify from 'dompurify';
import { CSSProperties, useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import LoadingSpinnerWithMessage from '../../../components/app/common/components/loading.component';
import '../../../components/app/common/css/custom-descriptions.css';
import {
  AccountabilitiesModel,
  JobProfileModel,
  TrackedFieldArrayItem,
} from '../../../redux/services/graphql-api/job-profile-types';
import { useLazyGetJobProfileQuery } from '../../../redux/services/graphql-api/job-profile.api';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface JobProfileProps {
  profileData?: any;
  id?: string; // The id is optional, as it can also be retrieved from the params
  onProfileLoad?: (profileData: JobProfileModel) => void;
  showBackToResults?: boolean;
  showDiff?: boolean;
  style?: CSSProperties;
  // onUseProfile?: () => void;
  showBasicInfo?: boolean;
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
}

export class TitleField extends TrackedFieldArrayItem {
  @Length(5, 500, { message: 'Title must be between 5 and 500 characters.' })
  declare value: string;
}

export class OverviewField extends TrackedFieldArrayItem {
  @Length(5, 500, { message: 'Overview must be between 5 and 500 characters.' })
  declare value: string;
}

export class ProgramOverviewField extends TrackedFieldArrayItem {
  @Length(0, 320, { message: 'Program overview must be between 0 and 320 characters.' })
  declare value: string;
}

function getItemValue(item: string | TrackedFieldArrayItem | AccountabilitiesModel): string {
  if (!item) return '';
  if (typeof item === 'string') {
    return item;
  } else if ('text' in item) {
    // Handle AccountabilitiesModel
    return typeof item.text === 'string' ? item.text : '';
  } else if ('value' in item) {
    // Handle TrackedFieldArrayItem
    return item.value;
  } else {
    return '';
  }
}

@ValidatorConstraint({ async: false })
class AllDisabledConstraint implements ValidatorConstraintInterface {
  validate(array: (TrackedFieldArrayItem | string | AccountabilitiesModel)[]) {
    return !array?.every((item) => {
      // Check if the item is disabled or empty
      const itemValue = getItemValue(item);
      return typeof item === 'object' && (item.disabled === true || itemValue.length == 0);
    });
  }

  defaultMessage() {
    return 'All items must be disabled.';
  }
}

function AllDisabled(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: AllDisabledConstraint,
    });
  };
}

class ClassificationField {
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

  @AllDisabled({ message: 'There must be at least one accountability.' })
  accountabilities: (TrackedFieldArrayItem | ValueString | AccountabilitiesModel)[];

  optional_accountabilities: (TrackedFieldArrayItem | ValueString | AccountabilitiesModel)[];

  @AllDisabled({ message: 'There must be at least one education requirement.' })
  education: (TrackedFieldArrayItem | ValueString | AccountabilitiesModel)[];

  // @AllDisabled({ message: 'There must be at least one job experience requirement.' })
  job_experience: (TrackedFieldArrayItem | ValueString | AccountabilitiesModel)[];
  security_screenings: (TrackedFieldArrayItem | ValueString | AccountabilitiesModel)[];

  behavioural_competencies: { behavioural_competency: BehaviouralCompetency }[];

  professional_registration: (TrackedFieldArrayItem | ValueString)[];
  preferences: (TrackedFieldArrayItem | ValueString)[];
  knowledge_skills_abilities: (TrackedFieldArrayItem | ValueString)[];
  provisos: (TrackedFieldArrayItem | ValueString)[];
  optional_requirements: (TrackedFieldArrayItem | ValueString)[];
}

export const JobProfile: React.FC<JobProfileProps> = ({
  id,
  profileData,
  onProfileLoad,
  showBackToResults = true,
  showDiff = false,
  style,
  // onUseProfile,
  showBasicInfo = true,
}) => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const resolvedId = id ?? params.id ?? searchParams.get('selectedProfile'); // Using prop ID or param ID
  // console.log('resolvedId: ', resolvedId);
  const screens = useBreakpoint();

  // If neither resolvedId nor profileData is present, throw an error
  if (!resolvedId && !profileData) throw new Error('No ID');

  const [originalData, setOriginalData] = useState<JobProfileModel | null>(null); // for diff

  // Using the lazy query to have control over when the fetch action is dispatched
  // (not dispatching if profileData was already provided)
  const [triggerGetJobProfile, { data, isLoading }] = useLazyGetJobProfileQuery();

  // State to hold the effectiveData which can be from profileData prop or fetched from API
  const initialData = profileData ?? null;
  const [effectiveData, setEffectiveData] = useState<JobProfileModel | null>(initialData);

  useEffect(() => {
    // If profileData exists, use it to set the form state
    if (profileData && !showDiff) {
      setEffectiveData(profileData);
    } else if ((!profileData && resolvedId) || (profileData && showDiff && resolvedId)) {
      // If no profileData is provided and an id exists, fetch the data
      // OR profileData was provided, but we also want to run a diff
      triggerGetJobProfile({ id: +resolvedId });
    }
  }, [resolvedId, profileData, triggerGetJobProfile, showDiff]);

  // useEffect to set effectiveData when data is fetched from the API
  useEffect(() => {
    if (!profileData && data && !isLoading) {
      // Only set effectiveData from fetched data if profileData is not provided
      if (onProfileLoad) onProfileLoad(data.jobProfile);
      setEffectiveData(data.jobProfile);
    } else if (profileData && showDiff && data && !isLoading) {
      if (onProfileLoad) onProfileLoad(data.jobProfile);
      setOriginalData(data.jobProfile); // for diff
    }
  }, [data, isLoading, profileData, onProfileLoad, showDiff]);

  const compareData = (original: string | undefined, modified: string | undefined): JSX.Element[] => {
    const blank: JSX.Element[] = [];
    if (!original || !modified) return blank;

    const dmp = new diff_match_patch();
    const diff = dmp.diff_main(original, modified);
    dmp.diff_cleanupSemantic(diff);

    return diff.map(([operation, text], index) => {
      const style: React.CSSProperties = {};
      if (operation === 1) {
        // Insertion
        style.backgroundColor = 'yellow';
      } else if (operation === -1) {
        // Deletion
        style.textDecoration = 'line-through';
        style.color = 'red';
      }

      return (
        <span key={index} style={style}>
          {text}
        </span>
      );
    });
  };

  const compareLists = (
    original: (string | TrackedFieldArrayItem | AccountabilitiesModel)[],
    modified: (string | TrackedFieldArrayItem | AccountabilitiesModel)[] | undefined,
  ): JSX.Element[] => {
    const comparisonResult: JSX.Element[] = [];
    // console.log('compareLists: ', original, modified);
    if (!modified || !original) return comparisonResult;

    const maxLength = Math.max(original.length, modified.length);
    const dmp = new diff_match_patch();

    for (let i = 0; i < maxLength; i++) {
      const originalVal = original[i] ?? '';
      const originalItemValue = getItemValue(originalVal);

      const modifiedItem = modified[i];
      let modifiedItemValue = getItemValue(modifiedItem);
      modifiedItemValue =
        typeof modifiedItem === 'string' ? modifiedItemValue : modifiedItem?.disabled ? '' : modifiedItemValue || '';

      if (originalItemValue || modifiedItemValue) {
        const diff = dmp.diff_main(originalItemValue, modifiedItemValue);
        dmp.diff_cleanupSemantic(diff);

        comparisonResult.push(
          <li key={i}>
            {diff.map(([operation, text], index) => {
              const style: React.CSSProperties = {};
              if (operation === 1) {
                style.backgroundColor = 'yellow';
              } else if (operation === -1) {
                style.textDecoration = 'line-through';
                style.color = 'red';
              }

              return (
                <span key={index} style={style}>
                  {text}
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
          <li key={name} style={{ textDecoration: 'line-through', color: 'red' }}>
            <Text strong>{originalItem.name}</Text> {originalItem.description}
          </li>,
        );
      } else if (!originalItem && modifiedItem) {
        comparisonResult.push(
          <li key={name} style={{ backgroundColor: 'yellow' }}>
            <Text strong>{modifiedItem.name}</Text> {modifiedItem.description}
          </li>,
        );
      }
    });

    return comparisonResult;
  };

  if (isLoading) {
    return <LoadingSpinnerWithMessage />;
  }

  // console.log('effectiveData: ', effectiveData);

  const basicInfoItems: DescriptionsProps['items'] = [
    {
      key: 'number',
      label: 'Job Store #',
      children: effectiveData?.number,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'Lastupdated',
      label: 'Last updated',
      children: `${dayjs(effectiveData?.updated_at).format('MMM D, YYYY')}`,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },

    {
      key: 'ministries',
      label: 'Ministries',
      children: effectiveData?.all_organizations ? (
        'All'
      ) : (
        <ul>{effectiveData?.organizations.map((org, index) => <li key={index}>{org.organization.name}</li>)}</ul>
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'Jobrole',
      label: 'Job role',
      children: effectiveData?.role?.name,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'Roletype',
      label: 'Role type',
      children: effectiveData?.role_type?.name ? effectiveData?.role_type?.name : 'Unknown',
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'Scopeofresponsibility',
      label: 'Scope of responsibility',
      children:
        effectiveData?.scope?.name && effectiveData?.scope?.description
          ? `${effectiveData?.scope?.name} - ${effectiveData?.scope?.description}`
          : 'Unknown',
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'Professionsanddisciplines',
      label: 'Professions & disciplines',
      children: (
        <div>
          {effectiveData?.jobFamilies.map((jobFamilyItem) => {
            const jobFamily = jobFamilyItem.jobFamily;
            return (
              <div key={jobFamily.id}>
                <h4>{jobFamily.name}</h4>
                <ul>
                  {effectiveData?.streams
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
      label: 'Title',
      children:
        showDiff && originalData
          ? compareData(
              typeof originalData.title === 'string' ? originalData.title : originalData.title.value,
              typeof effectiveData?.title === 'string' ? effectiveData?.title : effectiveData?.title?.value,
            )
          : typeof effectiveData?.title === 'string'
            ? effectiveData?.title
            : effectiveData?.title?.value,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },

    {
      key: 'classification',
      label: 'Classification',
      children: <div>{effectiveData?.classifications?.map((c) => c.classification.code).join(', ')}</div>,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    ...(effectiveData?.program_overview &&
    (typeof effectiveData.program_overview === 'string'
      ? effectiveData.program_overview.trim()
      : effectiveData.program_overview.value.trim()) !== ''
      ? [
          {
            key: 'program_overview',
            label: 'Program Overview',
            children:
              showDiff && originalData
                ? compareData(
                    typeof originalData.program_overview === 'string'
                      ? originalData.program_overview
                      : originalData?.program_overview?.value,
                    typeof effectiveData?.program_overview === 'string'
                      ? effectiveData?.program_overview
                      : effectiveData?.program_overview?.value,
                  )
                : typeof effectiveData?.program_overview === 'string'
                  ? effectiveData?.program_overview
                  : effectiveData?.program_overview?.value,
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
      label: 'Job Overview',
      children:
        showDiff && originalData
          ? compareData(
              typeof originalData.overview === 'string' ? originalData.overview : originalData?.overview?.value,
              typeof effectiveData?.overview === 'string' ? effectiveData?.overview : effectiveData?.overview?.value,
            )
          : typeof effectiveData?.overview === 'string'
            ? effectiveData?.overview
            : effectiveData?.overview?.value,
      // needs to be in this format to remove warning Sum of column `span` in a line not match `column` of Descriptions
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'accountabilities',
      label: 'Accountabilities',
      children: (
        <>
          {/* Main Accountabilities - is_significant == true */}
          <ul>
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
                      return <li key={index}>{accountability.text.value}</li>;
                    } else if (typeof accountability.text === 'string') {
                      return <li key={index}>{accountability.text}</li>;
                    }
                  })}
          </ul>
          {/* Optional Accountabilities - is_significant == false */}
          <h4>Optional accountabilities</h4>
          <ul>
            {showDiff && originalData
              ? compareLists(
                  originalData.accountabilities.filter((acc) => !acc.is_significant),
                  effectiveData?.accountabilities.filter((acc) => !acc.is_significant),
                )
              : effectiveData?.accountabilities
                  .filter((acc) => !acc.is_significant)
                  .map((accountability, index) => {
                    if (typeof accountability === 'string' || accountability.disabled) {
                      return null;
                    }
                    if (accountability.text instanceof TrackedFieldArrayItem) {
                      return <li key={index}>{accountability.text.value}</li>;
                    } else if (typeof accountability.text === 'string') {
                      return <li key={index}>{accountability.text}</li>;
                    }
                  })}
          </ul>
        </>
      ),
      // needs to be in this format to remove warning Sum of column `span` in a line not match `column` of Descriptions
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'requirements',
      label: 'Minimum job requirements',
      children: (
        <>
          <h4>Education</h4>
          <ul>
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
                    return <li key={index}>{requirement.text.value}</li>;
                  } else if (typeof requirement.text === 'string') {
                    return <li key={index}>{requirement.text}</li>;
                  }
                })}
          </ul>

          {effectiveData?.job_experience && effectiveData?.job_experience.length > 0 && (
            <>
              <h4>Related experience</h4>
              <ul>
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
                        return <li key={index}>{requirement.text.value}</li>;
                      } else if (typeof requirement.text === 'string') {
                        return <li key={index}>{requirement.text}</li>;
                      }
                    })}
              </ul>
            </>
          )}

          {effectiveData?.professional_registration_requirements &&
            effectiveData?.professional_registration_requirements.length > 0 && (
              <>
                <h4>Professional registration requirements</h4>
                <ul>
                  {showDiff && originalData
                    ? compareLists(
                        originalData.professional_registration_requirements,
                        effectiveData?.professional_registration_requirements,
                      )
                    : effectiveData?.professional_registration_requirements?.map((requirement, index) => {
                        if (typeof requirement === 'string') {
                          return <li key={index}>{requirement}</li>;
                        }
                        if (requirement.disabled) {
                          return null;
                        }
                        return <li key={index}>{requirement.value}</li>;
                      })}
                </ul>
              </>
            )}

          {effectiveData?.preferences && effectiveData?.preferences.length > 0 && (
            <>
              <h4>Preferences</h4>
              <ul>
                {showDiff && originalData
                  ? compareLists(originalData.preferences, effectiveData?.preferences)
                  : effectiveData?.preferences?.map((requirement, index) => {
                      if (typeof requirement === 'string') {
                        return <li key={index}>{requirement}</li>;
                      }
                      if (requirement.disabled) {
                        return null;
                      }
                      return <li key={index}>{requirement.value}</li>;
                    })}
              </ul>
            </>
          )}

          {effectiveData?.knowledge_skills_abilities && effectiveData?.knowledge_skills_abilities.length > 0 && (
            <>
              <h4>Knowledge, skills and abilities</h4>
              <ul>
                {showDiff && originalData
                  ? compareLists(originalData.knowledge_skills_abilities, effectiveData?.knowledge_skills_abilities)
                  : effectiveData?.knowledge_skills_abilities?.map((requirement, index) => {
                      if (typeof requirement === 'string') {
                        return <li key={index}>{requirement}</li>;
                      }
                      if (requirement.disabled) {
                        return null;
                      }
                      return <li key={index}>{requirement.value}</li>;
                    })}
              </ul>
            </>
          )}

          {effectiveData?.willingness_statements && effectiveData?.willingness_statements.length > 0 && (
            <>
              <h4>Willingness statements or provisos</h4>
              <ul>
                {showDiff && originalData
                  ? compareLists(originalData.willingness_statements, effectiveData?.willingness_statements)
                  : effectiveData?.willingness_statements?.map((requirement, index) => {
                      if (typeof requirement === 'string') {
                        return <li key={index}>{requirement}</li>;
                      }
                      if (requirement.disabled) {
                        return null;
                      }
                      return <li key={index}>{requirement.value}</li>;
                    })}
              </ul>
            </>
          )}

          {effectiveData?.security_screenings && effectiveData?.security_screenings.length > 0 && (
            <>
              <h4>Security screening</h4>
              <ul>
                {showDiff && originalData
                  ? compareLists(originalData.security_screenings, effectiveData?.security_screenings)
                  : effectiveData?.security_screenings?.map((requirement, index) => {
                      if (typeof requirement === 'string') {
                        return <li key={index}>{requirement}</li>;
                      }
                      if (requirement.disabled) {
                        return null;
                      }
                      if (requirement.text instanceof TrackedFieldArrayItem) {
                        return <li key={index}>{requirement.text.value}</li>;
                      } else if (typeof requirement.text === 'string') {
                        return <li key={index}>{requirement.text}</li>;
                      }
                    })}
              </ul>
            </>
          )}

          {effectiveData?.optional_requirements && effectiveData?.optional_requirements.length > 0 && (
            <>
              <h4>Optional requirements</h4>
              <ul>
                {showDiff && originalData
                  ? compareLists(originalData.optional_requirements, effectiveData?.optional_requirements)
                  : effectiveData?.optional_requirements?.map((requirement, index) => {
                      if (typeof requirement === 'string') {
                        return <li key={index}>{requirement}</li>;
                      }
                      if (requirement.disabled) {
                        return null;
                      }
                      return <li key={index}>{requirement.value}</li>;
                    })}
              </ul>
            </>
          )}
        </>
      ),
      // needs to be in this format to remove warning Sum of column `span` in a line not match `column` of Descriptions
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
    {
      key: 'behavioural_competencies',
      label: 'Behavioural Competencies',
      children: (
        <ul>
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
      ),
      // needs to be in this format to remove warning Sum of column `span` in a line not match `column` of Descriptions
      span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
    },
  ];

  return (
    <div data-testid="job-profile" style={{ ...style }}>
      {screens.xl === false && showBackToResults ? (
        <nav aria-label="Breadcrumb">
          <Link to="/job-profiles">
            <ArrowLeftOutlined aria-hidden="true" /> Back to Search Results
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
          type="warning"
          showIcon
          icon={<ExclamationCircleFilled />}
          style={{ marginBottom: '24px' }}
        />
      )}

      <Alert
        message={
          <span>
            Job context{' '}
            <Tooltip title="The job context is important to understand as you proceed to create the position. You will be asked prior to approving that you understand the context of the job.">
              <InfoCircleOutlined style={{ cursor: 'pointer', fontSize: '0.9rem' }} />
            </Tooltip>
          </span>
        }
        description={
          <span
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                typeof effectiveData?.context === 'string'
                  ? effectiveData?.context
                  : effectiveData?.context.description ?? '',
              ),
            }}
          ></span>
        }
        type="info"
        showIcon
        icon={<ExclamationCircleFilled />}
        style={{ marginBottom: '24px' }}
      />

      <Descriptions
        className="customDescriptions"
        title="Job profile"
        aria-hidden="true"
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
        <Descriptions
          className="customDescriptions"
          title="Basic information"
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
      >
        <section>
          <h3>Title</h3>
          <p>{typeof effectiveData?.title === 'string' ? effectiveData?.title : effectiveData?.title?.value}</p>
          <h3>Classification</h3>
          <p>{effectiveData?.classifications?.map((c) => c.classification.code).join(', ')}</p>

          <h3>Job Store #</h3>
          <p>{effectiveData?.number}</p>

          <h3>Last Updated</h3>
          <p>{/* last updated info */}</p>

          <h3>Job Context</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                typeof effectiveData?.context === 'string'
                  ? effectiveData?.context
                  : effectiveData?.context.description ?? '',
              ),
            }}
          ></p>

          <h3>Job Overview</h3>
          <p>
            {typeof effectiveData?.overview === 'string' ? effectiveData?.overview : effectiveData?.overview?.value}
          </p>
          <h3>Required Accountabilities</h3>
          <ul>
            {effectiveData?.accountabilities.map((accountability, index) => {
              // Check if the accountability is a string
              if (typeof accountability === 'string') {
                return <li key={index}>{accountability}</li>;
              }

              // Check if the accountability is an object and not disabled
              if (accountability.disabled) {
                return null;
              }
              if (accountability.text instanceof TrackedFieldArrayItem) {
                return <li key={accountability.text.value}>{accountability.text.value}</li>;
              } else if (typeof accountability.text === 'string') {
                return <li key={accountability.text}>{accountability.text}</li>;
              }
            })}
          </ul>

          {/* <h3>Optional Accountabilities</h3>
          <ul>
            {effectiveData?.accountabilities.optional.map((accountability, index) => {
              // Check if the accountability is a string
              if (typeof accountability === 'string') {
                return <li key={index}>{accountability}</li>;
              }

              // Check if the accountability is an object and not disabled
              if (accountability.disabled) {
                return null;
              }

              return <li key={accountability.value}>{accountability.value}</li>;
            })}
          </ul> */}

          <h3>Minimum Job Requirements</h3>
          <ul>
            {effectiveData?.education?.map((requirement, index) => {
              if (typeof requirement === 'string') {
                return <li key={index}>{requirement}</li>;
              }

              if (requirement.disabled) {
                return null;
              }

              if (requirement.text instanceof TrackedFieldArrayItem) {
                return <li key={requirement.text.value}>{requirement.text.value}</li>;
              } else if (typeof requirement.text === 'string') {
                return <li key={requirement.text}>{requirement.text}</li>;
              }
            })}
          </ul>

          <h3>Behavioural Competencies</h3>
          <ul>
            {(effectiveData?.behavioural_competencies ?? []).map(
              ({ behavioural_competency: { name, description } }, index) => (
                <li key={index}>
                  <Text strong>{name}</Text> {description}
                </li>
              ),
            )}
          </ul>
        </section>
      </div>
    </div>
  );
};
