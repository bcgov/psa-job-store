/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CopyOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  LoadingOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  List,
  Menu,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Tabs,
  TabsProps,
  Tag,
  Tooltip,
  TreeSelect,
  Typography,
  message,
  notification,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsNotEmpty,
  NotEquals,
  ValidateNested,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import copy from 'copy-to-clipboard';
import DOMPurify from 'dompurify';
import debounce from 'lodash.debounce';
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import LoadingSpinnerWithMessage from '../../../components/app/common/components/loading.component';
import MinistriesSelect from '../../../components/app/common/components/ministries-select.component';
import '../../../components/app/common/css/custom-form.css';
import '../../../components/app/common/css/filtered-table.page.css';
import { PageHeader } from '../../../components/app/page-header.component';
import { DownloadJobProfileComponent } from '../../../components/shared/download-job-profile/download-job-profile.component';
import {
  useGetFilteredClassificationsQuery,
  useGetGroupedClassificationsQuery,
} from '../../../redux/services/graphql-api/classification.api';
import { useGetEmployeeGroupsQuery } from '../../../redux/services/graphql-api/employee-group.api';
import { useGetJobFamiliesQuery } from '../../../redux/services/graphql-api/job-family.api';
import { useGetJobProfileMinimumRequirementsQuery } from '../../../redux/services/graphql-api/job-profile-minimum-requirements.api';
import { useGetJobProfileScopesQuery } from '../../../redux/services/graphql-api/job-profile-scope';
import { useGetJobProfileStreamsQuery } from '../../../redux/services/graphql-api/job-profile-stream';
import {
  ClassificationConnectInput,
  ClassificationModel,
  CreateJobProfileInput,
  GetJobProfileResponse,
  IdVersion,
  OrganizationConnectInput,
  ProfessionsModel,
  TrackedFieldArrayItem,
} from '../../../redux/services/graphql-api/job-profile-types';
import {
  useCreateOrUpdateJobProfileMutation,
  useDuplicateJobProfileMutation,
  useGetJobProfilesDraftsMinistriesQuery,
  useGetRequirementsWithoutReadOnlyQuery,
  useLazyGetJobProfileMetaQuery,
  useLazyGetJobProfileQuery,
  useLazyGetNextAvailableJobProfileNumberQuery,
  useLazyIsJobProfileNumberAvailableQuery,
} from '../../../redux/services/graphql-api/job-profile.api';
import { useGetJobRolesQuery } from '../../../redux/services/graphql-api/job-role.api';
import { useGetOrganizationsQuery } from '../../../redux/services/graphql-api/organization';
import { useLazyGetPositionRequestsCountQuery } from '../../../redux/services/graphql-api/position-request.api';
import { FormItem } from '../../../utils/FormItem';
import ContentWrapper from '../../home/components/content-wrapper.component';
import {
  JobProfileValidationModel,
  OverviewField,
  ProgramOverviewField,
  TitleField,
} from '../../job-profiles/components/job-profile.component';
import { ContextOptionsReadonly } from '../../wizard/components/context-options-readonly.component';
import BehaviouralComptencyPicker from '../../wizard/components/wizard-behavioural-comptency-picker';
import WizardOverview from '../../wizard/components/wizard-edit-profile-overview';
import WizardProgramOverview from '../../wizard/components/wizard-edit-profile-program-overview';
import WizardTitle from '../../wizard/components/wizard-edit-profile-title';
import WizardValidationError from '../../wizard/components/wizard-edit-profile-validation-error';
import WizardPicker from '../../wizard/components/wizard-picker';
import WizardProfessionalRegistrationPicker from '../../wizard/components/wizard-professional-registration-picker';
import JobStreamDiscipline from './jobstream-discipline.component';
import ReorderButtons from './reorder-buttons';

const { Option } = Select;
const { Text } = Typography;

const employeeGroupIds: string[] = ['MGT', 'GEU', 'OEX', 'NUR', 'PEA', 'LGL'];

// Define a custom clipboard to handle paste events
class PlainTextClipboard extends Quill.import('modules/clipboard') {
  onPaste(event: any) {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    this.quill.clipboard.dangerouslyPasteHTML(this.quill.getSelection().index, text);
  }
}

// Register the custom clipboard module
Quill.register('modules/clipboard', PlainTextClipboard, true);

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
  id: string | undefined;
  setId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setVersion: React.Dispatch<React.SetStateAction<string>>;
}

export function IsNotNull(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isNotNull',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value !== null && value !== undefined && value.toString().length > 0;
        },
      },
    });
  };
}

function ValidProfessionsValidator(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'validProfessionsValidator',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: ProfessionsModel[]) {
          if (!Array.isArray(value) || value.length === 0) {
            return false;
          }

          // If there's only one profession and its jobFamily is -1, fail
          if (value.length === 1 && value[0].jobFamily === -1) {
            return false;
          }

          // Ensure at least one profession has a valid jobFamily
          return value.some((profession) => profession.jobFamily !== -1);
        },
        defaultMessage() {
          return 'At least one profession must be selected.';
        },
      },
    });
  };
}

export class BasicDetailsValidationModel {
  // // New properties
  // @IsNotEmpty()
  // @Length(5, 100)
  // department: string;

  // @Min(1)
  // @Max(10)
  // teamSize: number;

  // @IsArray()
  // @ArrayMinSize(1)
  // @ArrayMaxSize(5)
  // keyResponsibilities: string[];

  // Override properties from parent

  @ValidateNested()
  @Type(() => TitleField)
  title: TitleField | string;

  jobStoreNumber: string;

  @IsNotNull({ message: 'Employee group must be selected' })
  employeeGroup: string | null;

  @IsNotNull({ message: 'Classification must be selected' })
  classification: string | null;

  @IsNotNull({ message: 'Job role must be selected' })
  jobRole: number | null;

  @ArrayMinSize(1, { message: 'At least one report-to relationship must be selected.' })
  reportToRelationship: string[];

  @ArrayMinSize(1, { message: 'At least one scope of responsibility must be selected.' })
  scopeOfResponsibility: number | number[] | null; // number[] is latest change, used to allow only single selection

  @ArrayMinSize(1, { message: 'At least one ministry must be selected.' })
  ministries: string[];

  @IsNotEmpty({ message: 'Job context must be provided.' })
  @NotEquals('<p><br></p>', { message: 'Job context must be provided.' })
  jobContext: string;

  @ValidProfessionsValidator()
  professions: ProfessionsModel[];

  originalJobStoreNumber: string;
  role: number;
  classificationReviewRequired: boolean;
  all_reports_to: boolean;
  all_organizations: boolean;
  overview: OverviewField | string;
  program_overview: ProgramOverviewField | string;
}

export const TotalCompCreateProfileComponent: React.FC<TotalCompCreateProfileComponentProps> = ({
  jobProfileData,
  id,
  setId,
  setVersion,
}) => {
  const { id: urlId } = useParams();
  const navigate = useNavigate();

  const [profileJson, setProfileJson] = useState<any>(null);

  const [triggerGetJobProfile, { data: lazyJobProfile }] = useLazyGetJobProfileQuery();
  const [triggerGetJobProfileMeta, { data: jobProfileMeta }] = useLazyGetJobProfileMetaQuery();
  const [triggerGetPositionRequestsCount, { data: positionRequestsCount }] = useLazyGetPositionRequestsCountQuery();
  let link: string;
  const [selectedKeys, setSelectedKeys] = useState([]);

  if (jobProfileData?.jobProfile.state === 'DRAFT') {
    if (jobProfileData?.jobProfile.is_archived === false) {
      link = '/draft-job-profiles/';
    } else {
      link = '/archived-job-profiles/';
    }
  } else {
    link = '/published-job-profiles/';
  }
  const handleCopyLink = () => {
    // Dynamically construct the link to include the current base URL
    const linkToCopy = `${window.location.origin}${link}${jobProfileData?.jobProfile.id}`;

    // Use the Clipboard API to copy the link to the clipboard
    if (import.meta.env.VITE_TEST_ENV !== 'true') copy(linkToCopy);
    message.success('Link copied to clipboard!');
    setSelectedKeys([]);
  };
  const [duplicateJobProfile] = useDuplicateJobProfileMutation();

  const duplicate = async () => {
    // console.log('duplicate', record);
    if (jobProfileData?.jobProfile.id) {
      const res = await duplicateJobProfile({
        jobProfileId: jobProfileData?.jobProfile.id,
        jobProfileVersion: jobProfileData.jobProfile.version,
      }).unwrap();
      // console.log('res: ', res);
      navigate(`${link}${res.duplicateJobProfile}`);
    }
  };
  const getMenuContent = () => {
    return (
      <Menu selectedKeys={selectedKeys} className={`popover-selector-${jobProfileData?.jobProfile.id}`}>
        <>
          {' '}
          {state === 'PUBLISHED' && (
            <>
              <Menu.Item key="save">
                <div style={{ padding: '5px 0' }}>
                  <DownloadJobProfileComponent jobProfile={profileJson?.jobProfile} ignoreAbsentParent={true}>
                    <div style={{ padding: '5px 0' }}>
                      Download
                      <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                        Download a copy of this job profile.{' '}
                      </Typography.Text>
                    </div>
                  </DownloadJobProfileComponent>
                </div>
              </Menu.Item>
              {isCurrentVersion ? (
                <Menu.Item key="delete" onClick={showUnPublishConfirm}>
                  <div style={{ padding: '5px 0' }}>
                    Unpublish
                    <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                      Remove the job profile from the Job Store.{' '}
                    </Typography.Text>
                  </div>
                </Menu.Item>
              ) : (
                <Menu.Item key="duplicate" onClick={() => duplicate()}>
                  <div style={{ padding: '5px 0' }}>Duplicate</div>
                  <Typography.Text type="secondary" style={{ marginTop: '5px' }}>
                    Create a copy of this job profile.
                  </Typography.Text>
                </Menu.Item>
              )}
              <Menu.Item key="copy" onClick={() => handleCopyLink()}>
                <div style={{ padding: '5px 0' }}>
                  <div>
                    Copy link <LinkOutlined />
                  </div>
                  <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                    Invite others to review this profile.{' '}
                  </Typography.Text>
                </div>
              </Menu.Item>
            </>
          )}
          {state === 'DRAFT' && !profileJson?.jobProfile.is_archived && (
            <>
              <Menu.Item key="create" onClick={showPublishConfirm}>
                <div style={{ padding: '5px 0' }}>
                  Publish
                  <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                    Publish the job profile to the Job Store.{' '}
                  </Typography.Text>
                </div>
              </Menu.Item>
              <Menu.Item key="copy" onClick={() => handleCopyLink()}>
                <div style={{ padding: '5px 0' }}>
                  <div>
                    Copy link <LinkOutlined />
                  </div>
                  <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                    Invite others to review this profile.{' '}
                  </Typography.Text>
                </div>
              </Menu.Item>
            </>
          )}
          {state === 'DRAFT' && profileJson?.jobProfile.is_archived && (
            <>
              <Menu.Item key="create" onClick={showPublishConfirm}>
                Restore
                <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                  Unarchive the job profile.{' '}
                </Typography.Text>
              </Menu.Item>
              <Menu.Item key="duplicate" onClick={() => duplicate()}>
                Duplicate
                <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                  Create a copy of this job profile.{' '}
                </Typography.Text>
              </Menu.Item>
              <Menu.Item key="save">
                <div style={{ padding: '5px 0' }}>
                  <DownloadJobProfileComponent jobProfile={profileJson?.jobProfile} ignoreAbsentParent={true}>
                    <div style={{ padding: '5px 0' }}>
                      Download
                      <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                        Download a copy of this job profile.{' '}
                      </Typography.Text>
                    </div>
                  </DownloadJobProfileComponent>
                </div>
              </Menu.Item>
            </>
          )}
        </>
      </Menu>
    );
  };
  useEffect(() => {
    if (lazyJobProfile) {
      setProfileJson(lazyJobProfile);
      triggerGetJobProfileMeta(lazyJobProfile.jobProfile.id);
    }
  }, [lazyJobProfile, triggerGetJobProfileMeta]);

  // console.log('=== TotalCompCreateProfilePage, id: ', id, jobProfileData);

  // BASIC DETAILS FORM
  const ministriesData = useGetJobProfilesDraftsMinistriesQuery().data?.jobProfilesDraftsMinistries;
  const { data: allMinistriesData } = useGetOrganizationsQuery();

  // const careerGroupData = useGetJobProfilesDraftsCareerGroupsQuery().data?.jobProfilesDraftsCareerGroups;

  const srOnlyStyle: CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    border: '0',
  };

  const professionsData = jobProfileData?.jobProfile.jobFamilies.map((family) => ({
    jobFamily: family.jobFamily.id,
    jobStreams: jobProfileData?.jobProfile.streams
      .filter((stream) => stream.stream.job_family_id === family.jobFamily.id)
      .map((stream) => stream.stream.id),
  }));
  const prevProfessionsData = useRef(professionsData);

  const basicUseFormReturn = useForm<BasicDetailsValidationModel>({
    resolver: classValidatorResolver(BasicDetailsValidationModel),
    defaultValues: {
      title: { text: '' } as TitleField,
      jobStoreNumber: '',
      originalJobStoreNumber: '',
      employeeGroup: null as string | null,
      classification: null as string | null,
      jobRole: null as number | null,
      professions:
        !professionsData || professionsData?.length == 0
          ? ([{ jobFamily: -1, jobStreams: [] }] as ProfessionsModel[])
          : professionsData,
      role: 1,
      reportToRelationship: [] as string[],
      scopeOfResponsibility: [] as number[] | null,
      ministries: [] as string[],
      classificationReviewRequired: false,
      jobContext: '',
      all_reports_to: false,
      all_organizations: true,
    },
    // resolver: zodResolver(schema)
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues: getBasicDetailsValues,
    reset,
    trigger: triggerBasicDetailsValidation,
    formState: basicFormState,
  } = basicUseFormReturn;

  //triggerBasicDetailsValidation();

  const title = watch('title.text');

  // job store number validation
  const jobStoreNumber = watch('jobStoreNumber');
  const [validationStatus, setValidationStatus] = useState<string | null>(null);

  const [fetchingNextNumber, setFetchingNextNumber] = useState(false);
  const [checkNumberAvailability] = useLazyIsJobProfileNumberAvailableQuery();
  const [getNextAvailableNumber, { data: nextNumberData }] = useLazyGetNextAvailableJobProfileNumberQuery();

  // Fetch the next available number initially
  useEffect(() => {
    if (id) return;

    getNextAvailableNumber();
  }, [getNextAvailableNumber, id]);

  // Set the fetched number as the default value
  useEffect(() => {
    if (nextNumberData?.nextAvailableJobProfileNumber !== undefined) {
      setValue('jobStoreNumber', nextNumberData.nextAvailableJobProfileNumber.toString());
    }
  }, [nextNumberData, setValue]);

  // Function to fetch the next available number
  const fetchNextNumber = useCallback(async () => {
    // Trigger the query to get the next available number
    const originalNumberValue = parseInt(getBasicDetailsValues('originalJobStoreNumber'), 10);

    if (originalNumberValue) {
      setValue('jobStoreNumber', originalNumberValue.toString());
      return;
    }

    setFetchingNextNumber(true);
    await getNextAvailableNumber()
      .unwrap()
      .then((fetchedData) => {
        if (fetchedData?.nextAvailableJobProfileNumber !== undefined) {
          setValue('jobStoreNumber', fetchedData.nextAvailableJobProfileNumber.toString());
        }
      })
      .catch((error) => {
        // Handle error (e.g., show notification)
        console.error('Error fetching next available number:', error);
      })
      .finally(() => {
        setFetchingNextNumber(false);
      });
  }, [getNextAvailableNumber, setValue, setFetchingNextNumber, getBasicDetailsValues]);

  useEffect(() => {
    // console.log('useEffect jobStoreNumber: ', jobStoreNumber);
    const numberValue = parseInt(jobStoreNumber, 10);
    const originalNumberValue = parseInt(getBasicDetailsValues('originalJobStoreNumber'), 10);
    if (numberValue === originalNumberValue) {
      setValidationStatus('valid');
      return;
    }

    if (isNaN(numberValue)) {
      setValidationStatus('invalid');
    } else {
      checkNumberAvailability(numberValue)
        .then(({ data }) => {
          setValidationStatus(data?.isJobProfileNumberAvailable ? 'valid' : 'invalid');
        })
        .catch(() => {
          setValidationStatus('invalid'); // handle error case
        });
    }
  }, [jobStoreNumber, nextNumberData, checkNumberAvailability, getBasicDetailsValues]);

  // professions field array config
  const {
    fields: professionsFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'professions',
  });

  const selectedProfession = watch('professions'); // This will watch the change of profession's value
  const selectedMinistry = watch('ministries');
  const employeeGroup = watch('employeeGroup');
  // State to hold filtered classifications
  const [filteredClassifications, setFilteredClassifications] = useState([] as ClassificationModel[]);

  const allReportsTo = watch('all_reports_to');

  // user deleted last item - re-add a blank one
  if (selectedProfession?.length == 0) {
    append({ jobFamily: -1, jobStreams: [] });
    // setValue('professions', [{ jobFamily: '', jobStreams: [] }]);
  }

  // Dummy data for professions and job streams
  // const professions = ['Administration', 'Finance'];
  // const jobStreams: any = useMemo(
  //   () => ({
  //     Administration: ['Administrative Support', 'Clerical', 'Office Management'],
  //     Finance: ['Financial Analysis', 'Accounting', 'Auditing'],
  //   }),
  //   [],
  // );

  const { data: jobFamiliesData } = useGetJobFamiliesQuery();
  const { data: jobProfileStreamsData } = useGetJobProfileStreamsQuery();

  // Function to filter job streams based on selected job family
  const getJobStreamsForFamily = useCallback(
    (jobFamilyId: number) => {
      return jobProfileStreamsData?.jobProfileStreams.filter((stream) => stream.job_family_id === jobFamilyId) || [];
    },
    [jobProfileStreamsData],
  );

  // This function would filter available job streams based on the selected profession
  // const getAvailableJobStreams = useCallback(
  //   (profession: any) => {
  //     return jobStreams[profession] || [];
  //   },
  //   [jobStreams],
  // );

  // const handlePaste = (event, editor, next) => {
  //   // Prevent the default paste behavior
  //   event.preventDefault();

  //   // Get the plain text from the clipboard
  //   const text = event.clipboardData.getData('text/plain');

  //   // Insert the plain text at the current cursor position
  //   editor.clipboard.dangerouslyPasteHTML(editor.getSelection().index, text);
  // };

  //quill modules for rich text editing
  const quill_modules = {
    toolbar: [
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic'],
      ['link'],
      [{ indent: '+1' }, { indent: '-1' }],
    ],
    clipboard: true,
    // clipboard: {
    //   // Use the custom paste handler
    //   matchVisual: false,
    //   matchers: [['', handlePaste]],
    // },
  };

  // END BASIC DETAILS FORM

  const selectedClassificationId = watch('classification');
  const allOrganizations = watch('all_organizations');

  // PICKER DATA
  const { data: pickerData, refetch: refetchPickerData } = useGetRequirementsWithoutReadOnlyQuery(
    {
      jobFamilyIds: selectedProfession.map((p) => p.jobFamily),
      jobFamilyStreamIds: selectedProfession.map((p) => p.jobStreams).flat(),
      classificationId: selectedClassificationId && selectedClassificationId.split('.')[0],
      classificationPeoplesoftId: selectedClassificationId && selectedClassificationId.split('.')[2],
      classificationEmployeeGroupId: employeeGroup,
      ministryIds: !allOrganizations ? selectedMinistry : undefined,
      jobFamilyWithNoStream: selectedProfession.filter((p) => p.jobStreams.length === 0).map((p) => p.jobFamily),
      excludeProfileId: jobProfileData?.jobProfile.id,
    },
    // {
    //   skip: !selectedClassificationId || !employeeGroup,
    // },
  );

  const itemInPickerData = (text: string, category: string) => {
    return pickerData?.requirementsWithoutReadOnly[category].some((r: any) => r.text === text);
  };

  // console.log('render, selectedClassificationId: ', selectedClassificationId);
  // console.log('professionalRequirementsPickerData:', professionalRequirementsPickerData);

  // PROFILE FORM

  // console.log('useForm? : ', jobProfileData?.jobProfile.accountabilities);

  // console.log(
  //   'jobProfileData?.jobProfile.professional_registration_requirements: ',
  //   jobProfileData?.jobProfile.professional_registration_requirements,
  // );

  const jobProfileUseFormReturn = useForm<JobProfileValidationModel>({
    resolver: classValidatorResolver(JobProfileValidationModel),
    defaultValues: {
      state: 'DRAFT',
      overview: { text: '' } as TrackedFieldArrayItem,
      program_overview: { text: '' } as TrackedFieldArrayItem,
      accountabilities: jobProfileData?.jobProfile.accountabilities?.map(
        (a) =>
          ({
            text: a.text,
            nonEditable: a.is_readonly,
            is_significant: a.is_significant,
          }) as AccountabilityItem,
      ),
      education: jobProfileData?.jobProfile.education?.map(
        (r) =>
          ({
            text: r.text,
            nonEditable: r.is_readonly,
            is_significant: r.is_significant,
            tc_is_readonly: r.tc_is_readonly,
          }) as AccountabilityItem,
      ),
      job_experience: jobProfileData?.jobProfile.job_experience?.map(
        (r) =>
          ({
            text: r.text,
            nonEditable: r.is_readonly,
            is_significant: r.is_significant,
          }) as AccountabilityItem,
      ),
      // professional_registration_requirements: jobProfileData?.jobProfile.professional_registration_requirements.map(
      //   (bc) => ({
      //     professional_registration_requirement: bc,
      //   }),
      // ),
      professional_registration_requirements: jobProfileData?.jobProfile.professional_registration_requirements?.map(
        (s) =>
          ({
            text: s.text,
            nonEditable: s.is_readonly,
            is_significant: s.is_significant,
            tc_is_readonly: s.tc_is_readonly,
          }) as AccountabilityItem,
      ),
      optional_requirements: jobProfileData?.jobProfile.optional_requirements?.map((r: any) => ({ text: r })),
      preferences: jobProfileData?.jobProfile.preferences,
      knowledge_skills_abilities: jobProfileData?.jobProfile.knowledge_skills_abilities,
      willingness_statements: jobProfileData?.jobProfile.willingness_statements,
      security_screenings: jobProfileData?.jobProfile.security_screenings?.map(
        (s) =>
          ({
            text: s.text,
            nonEditable: s.is_readonly,
            is_significant: s.is_significant,
            tc_is_readonly: s.tc_is_readonly,
          }) as SecurityScreeningItem,
      ),
      behavioural_competencies: jobProfileData?.jobProfile.behavioural_competencies.map((bc) => ({
        behavioural_competency: bc.behavioural_competency,
      })),
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

  const {
    control: profileControl,
    watch: profileWatch,
    setValue: profileSetValue,
    getValues: getProfileValues,
    reset: resetProfileForm,
    trigger: triggerProfileValidation,
    formState: profileFormState,
  } = jobProfileUseFormReturn;

  useEffect(() => {
    if (jobProfileData) {
      setProfileJson(jobProfileData);
      if (jobProfileData.jobProfile.state == 'PUBLISHED') {
        triggerGetJobProfileMeta(jobProfileData.jobProfile.id);
        triggerGetPositionRequestsCount({ where: { parent_job_profile_id: { equals: jobProfileData.jobProfile.id } } });
      }
      triggerBasicDetailsValidation();
      triggerProfileValidation();
    }
  }, [
    jobProfileData,
    triggerBasicDetailsValidation,
    triggerGetJobProfileMeta,
    triggerGetPositionRequestsCount,
    triggerProfileValidation,
  ]);
  const [versionInReview, setVersionInReview] = useState<number>(-1); // set to -1 to for triggering second call
  const [versionCompleted, setVersionCompleted] = useState<number>(0);
  const [totalInReview, setTotalInReview] = useState<number>(0);
  const [totalCompleted, setTotalCompleted] = useState<number>(0);
  useEffect(() => {
    if (jobProfileData && positionRequestsCount && versionInReview == -1) {
      setVersionInReview(positionRequestsCount.positionRequestsCount.verification);
      setVersionCompleted(positionRequestsCount.positionRequestsCount.completed);

      return;
    }
    if (jobProfileData && positionRequestsCount && jobProfileMeta) {
      const currentVersion =
        jobProfileData?.jobProfile.version ==
        jobProfileMeta.jobProfileMeta.versions.map((v) => v.version).sort((a, b: number) => b - a)[0];
      setIsCurrentVersion(currentVersion);
      setTotalInReview(positionRequestsCount.positionRequestsCount.verification);
      setTotalCompleted(positionRequestsCount.positionRequestsCount.completed);
      triggerGetPositionRequestsCount({
        where: {
          parent_job_profile_id: { in: jobProfileMeta?.jobProfileMeta.versions.map((v: { id: number }) => v.id) },
        },
      });
    }
  }, [
    jobProfileData,
    jobProfileMeta,
    positionRequestsCount,
    totalInReview,
    triggerGetPositionRequestsCount,
    versionInReview,
  ]);

  // use ref to hold the flag for auto security settings setup
  const autoSecuritySettingsSetup = useRef(false);
  // automatically add security screenings that don't have family or stream associated with them from the pickdata
  useEffect(() => {
    if (
      pickerData?.requirementsWithoutReadOnly?.securityScreenings &&
      !autoSecuritySettingsSetup.current &&
      location.pathname === '/draft-job-profiles/create'
    ) {
      const securityScreenings = pickerData.requirementsWithoutReadOnly.securityScreenings;
      const securityScreeningsWithoutFamilyStream = securityScreenings.filter(
        (s: any) => s.jobFamilies.length == 0 && !s.classification,
      );
      autoSecuritySettingsSetup.current = true;

      const updated = securityScreeningsWithoutFamilyStream?.map((field: any) => ({
        text: field.text,
        nonEditable: true,
        is_significant: true,
        tc_is_readonly: true,
      }));
      profileSetValue('security_screenings', updated as AccountabilityItem[]);
      triggerProfileValidation();
    }
  }, [pickerData, profileSetValue, triggerProfileValidation]);

  // bug fix for case when user re-navigates to previously opened profile and some of the fields would appear blank
  useEffect(() => {
    // Check if the URL is for creating a new profile
    if (!urlId) {
      reset();
      resetProfileForm();
      fetchNextNumber();
      triggerBasicDetailsValidation();
      triggerProfileValidation();
    }
  }, [
    urlId,
    setValue,
    reset,
    resetProfileForm,
    fetchNextNumber,
    triggerBasicDetailsValidation,
    triggerProfileValidation,
  ]);

  const { data: treeData } = useGetGroupedClassificationsQuery({
    employee_group_ids: employeeGroupIds,
    effective_status: 'Active',
  });

  const getAllTreeValues = useCallback((tree: any) => {
    const values: any = [];
    const getValues = (nodes: any) => {
      nodes.forEach((node: any) => {
        if (node.key !== node.title) {
          values.push(node.value);
        }
        if (node.children) {
          getValues(node.children);
        }
      });
    };
    getValues(tree);
    return values;
  }, []);

  const transformToTreeData = useCallback((groupedClassifications: any) => {
    const transformItem = (item: any) => {
      // console.log('transformItem item: ', item, selectedClassificationId);
      // Filter out the selected classification
      // if (selectedClassificationId && item.id === selectedClassificationId) {
      //   console.log('FILTERED ITEM: ', item);
      //   return;
      // }

      return {
        title: (item.groupName || item.name) + (item.employee_group_id ? ' (' + item.employee_group_id + ')' : ''),
        value: item.id != null ? `${item.id}.${item.employee_group_id}.${item.peoplesoft_id}` : item.groupName,
        key: item.id != null ? `${item.id}.${item.employee_group_id}.${item.peoplesoft_id}` : item.groupName,
        id: item.id != null ? `${item.id}.${item.employee_group_id}.${item.peoplesoft_id}` : null,
        children: item.items?.map(transformItem),
      };
    };

    return groupedClassifications.map(transformItem);
  }, []);

  const treeDataConverted = useMemo(() => {
    return treeData ? transformToTreeData(treeData.groupedClassifications) : [];
  }, [treeData, transformToTreeData]);

  const setAllReportToRelationships = useCallback(
    (isChecked: boolean) => {
      // Get all values for 'reportToRelationship' if isChecked is true, else an empty array
      const allValues = isChecked ? getAllTreeValues(treeDataConverted) : [];

      // filter out the selected classification
      let filteredReportToRelationship = allValues;
      if (selectedClassificationId)
        filteredReportToRelationship = allValues.filter((r: string) => r !== selectedClassificationId);
      // Update the 'reportToRelationship' form variable

      console.log('selectedClassificationId:', selectedClassificationId);
      setValue('reportToRelationship', filteredReportToRelationship);
    },
    [getAllTreeValues, treeDataConverted, selectedClassificationId, setValue],
  );

  const handleSelectAllReportTo = useCallback(
    (isChecked: boolean) => {
      // Update the 'all_reports_to' form variable
      setValue('all_reports_to', isChecked);
      setAllReportToRelationships(isChecked);
    },
    [setValue, setAllReportToRelationships],
  );

  useEffect(() => {
    // if select all is checked, need to update the list to include all items properly
    if (allReportsTo) handleSelectAllReportTo(allReportsTo);
  }, [selectedClassificationId, handleSelectAllReportTo, allReportsTo]);

  const [isCurrentVersion, setIsCurrentVersion] = useState(true);
  useEffect(() => {
    // console.log('jobProfileData: ', jobProfileData);
    if (jobProfileData) {
      // console.log('setting values..');
      // Basic Details Form
      setValue('title.text', jobProfileData.jobProfile.title as string);
      setValue('jobStoreNumber', jobProfileData.jobProfile.number.toString());
      setValue('originalJobStoreNumber', jobProfileData.jobProfile.number.toString());

      setValue('employeeGroup', jobProfileData.jobProfile.total_comp_create_form_misc?.employeeGroup ?? null);
      const filtered = classificationsData.classifications.filter(
        (c) => c.employee_group_id === jobProfileData.jobProfile.total_comp_create_form_misc?.employeeGroup,
      );
      setFilteredClassifications(filtered);
      const rawClassification = jobProfileData.jobProfile?.classifications?.[0]?.classification ?? null;
      let classificationString = '';
      if (rawClassification != null) {
        const { id, employee_group_id, peoplesoft_id } = rawClassification;
        classificationString = `${id}.${employee_group_id}.${peoplesoft_id}`;
        setValue('classification', `${id}.${employee_group_id}.${peoplesoft_id}`);
      } else {
        setValue('classification', null);
      }

      setValue('jobRole', jobProfileData.jobProfile?.role?.id);

      if (jobProfileData.jobProfile.role_type) setValue('role', jobProfileData.jobProfile.role_type.id);

      if (jobProfileData.jobProfile?.scopes) {
        setValue(
          'scopeOfResponsibility',
          jobProfileData.jobProfile.scopes.map((s) => s.scope.id),
        );
      }

      setValue('classificationReviewRequired', jobProfileData.jobProfile.review_required);
      if (typeof jobProfileData.jobProfile.context === 'string') {
        setValue('jobContext', jobProfileData.jobProfile.context);
      } else {
        setValue('jobContext', jobProfileData.jobProfile.context);
      }

      // Profile Form
      if (jobProfileData.jobProfile.state) profileSetValue('state', jobProfileData.jobProfile.state);

      profileSetValue('overview.text', jobProfileData.jobProfile.overview as string);
      profileSetValue('program_overview.text', jobProfileData.jobProfile.program_overview as string);

      const allReportsToValue = jobProfileData.jobProfile.all_reports_to;
      setValue('all_reports_to', allReportsToValue);

      if (allReportsToValue) {
        // If 'all_reports_to' is true, set 'reportToRelationship' to all possible values EXCEPT current classification
        const allValues = getAllTreeValues(treeDataConverted);
        let filteredReportToRelationship = allValues;
        if (classificationString)
          filteredReportToRelationship = allValues.filter((r: string) => r !== classificationString);

        setValue('reportToRelationship', filteredReportToRelationship);
      } else {
        // If 'all_reports_to' is false, set 'reportToRelationship' to specific values
        setValue(
          'reportToRelationship',
          jobProfileData.jobProfile.reports_to.map((r) => {
            const { id, employee_group_id, peoplesoft_id } = r.classification;
            return `${id}.${employee_group_id}.${peoplesoft_id}`;
          }),
        );
      }

      const allOrganizationsValue = jobProfileData.jobProfile.all_organizations;
      if (allOrganizationsValue) {
        // If 'all_organizations' is true, set 'ministries' to all possible values
        const allValues = allMinistriesData?.organizations?.map((m) => m?.id?.toString() ?? '') || [];
        setValue('ministries', allValues);
      } else {
        // If 'all_organizations' is false, set 'ministries' to specific values
        setValue(
          'ministries',
          jobProfileData.jobProfile.organizations.map((org) => org.organization.id),
        );
      }
      setValue('all_organizations', allOrganizationsValue);

      // profileSetValue(
      //   'behavioural_competencies',
      //   jobProfileData.jobProfile.behavioural_competencies.map((bc) => ({
      //     behavioural_competency: bc.behavioural_competency,
      //   })),
      // );
      profileSetValue(
        'markAllNonEditable',
        jobProfileData.jobProfile.total_comp_create_form_misc?.markAllNonEditable ?? false,
      );
      profileSetValue(
        'markAllSignificant',
        jobProfileData.jobProfile.total_comp_create_form_misc?.markAllSignificant ?? false,
      );
      profileSetValue(
        'markAllNonEditableEdu',
        jobProfileData.jobProfile.total_comp_create_form_misc?.markAllNonEditableEdu ?? false,
      );
      profileSetValue(
        'markAllSignificantEdu',
        jobProfileData.jobProfile.total_comp_create_form_misc?.markAllSignificantEdu ?? false,
      );
      profileSetValue(
        'markAllNonEditableProReg',
        jobProfileData.jobProfile.total_comp_create_form_misc?.markAllNonEditableProReg ?? false,
      );
      profileSetValue(
        'markAllSignificantProReg',
        jobProfileData.jobProfile.total_comp_create_form_misc?.markAllSignificantProReg ?? false,
      );
      profileSetValue(
        'markAllSignificantSecurityScreenings',
        jobProfileData.jobProfile.total_comp_create_form_misc?.markAllSignificantSecurityScreenings ?? false,
      );
      profileSetValue(
        'markAllNonEditableJob_experience',
        jobProfileData.jobProfile.total_comp_create_form_misc?.markAllNonEditableJob_experience ?? false,
      );
      profileSetValue(
        'markAllSignificantJob_experience',
        jobProfileData.jobProfile.total_comp_create_form_misc?.markAllSignificantJob_experience ?? false,
      );

      profileSetValue(
        'markAllNonEditableSec',
        jobProfileData.jobProfile.total_comp_create_form_misc?.markAllNonEditableSec ?? false,
      );

      triggerBasicDetailsValidation();
      triggerProfileValidation();
    } else {
      // no profile data - select all ministries as that's the default setting
      const allValues = allMinistriesData?.organizations?.map((m) => m?.id?.toString() ?? '') || [];
      setValue('ministries', allValues);
    }
  }, [
    jobProfileData,
    setValue,
    profileSetValue,
    treeDataConverted,
    ministriesData,
    allMinistriesData,
    getAllTreeValues,
    triggerBasicDetailsValidation,
    triggerProfileValidation,
  ]);

  // Update local state when URL parameter changes
  useEffect(() => {
    if (!urlId) {
      const allValues = allMinistriesData?.organizations?.map((m) => m?.id?.toString() ?? '') || [];
      setValue('ministries', allValues);
    }
  }, [urlId, setValue, allMinistriesData]);

  // required accountabilties

  const {
    fields: accountabilitiesFields,
    append: appendAccountability,
    remove: removeAccountability,
    move: moveAccountability,
  } = useFieldArray({
    control: profileControl,
    name: 'accountabilities',
  });

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveAccountability(index, index - 1);
    } else {
      moveAccountability(index, index + 1);
    }
  };

  // Update individual non-editable state based on "Mark all as non-editable" checkbox
  const updateNonEditable = (nonEditable: boolean) => {
    const updatedAccountabilities = accountabilities?.map((field) => ({
      ...field,
      nonEditable: nonEditable,
      is_significant: nonEditable ? true : false,
    }));
    profileSetValue('accountabilities', updatedAccountabilities as AccountabilityItem[]);
  };

  const updateSignificant = (is_significant: boolean) => {
    const updatedAccountabilities = accountabilities?.map((field) => ({
      ...field,
      is_significant: is_significant,
    }));
    profileSetValue('accountabilities', updatedAccountabilities as AccountabilityItem[]);
  };

  const updateSignificantEdu = (is_significant: boolean) => {
    const updatedExperiences = educations?.map((field) => ({
      ...field,
      is_significant: is_significant,
    }));
    profileSetValue('education', updatedExperiences as AccountabilityItem[]);
  };

  const updateSignificantProReg = (is_significant: boolean) => {
    const updated = professionalRegistrations?.map((field) => ({
      ...field,
      is_significant: is_significant,
    }));
    profileSetValue('professional_registration_requirements', updated as AccountabilityItem[]);
  };

  const updateSignificantSecurityScreenings = (is_significant: boolean) => {
    const updated = securityScreenings?.map((field) => ({
      ...field,
      is_significant: is_significant,
    }));
    profileSetValue('security_screenings', updated as AccountabilityItem[]);
  };

  const updateNonEditableEdu = (nonEditable: boolean) => {
    const updatedExperiences = educations?.map((field) => ({
      ...field,
      nonEditable: nonEditable,
      is_significant: nonEditable ? true : false,
    }));
    profileSetValue('education', updatedExperiences as AccountabilityItem[]);
  };

  const updateNonEditableProReg = (nonEditable: boolean) => {
    const updated = professionalRegistrations?.map((field) => ({
      ...field,
      nonEditable: nonEditable,
      is_significant: nonEditable ? true : false,
    }));
    profileSetValue('professional_registration_requirements', updated as AccountabilityItem[]);
  };

  const updateSignificantJob_experience = (is_significant: boolean) => {
    const updatedExperiences = job_experiences?.map((field) => ({
      ...field,
      is_significant: is_significant,
    }));
    profileSetValue('job_experience', updatedExperiences as AccountabilityItem[]);
  };

  const updateNonEditableJob_experience = (nonEditable: boolean) => {
    const updatedExperiences = job_experiences?.map((field) => ({
      ...field,
      nonEditable: nonEditable,
      is_significant: nonEditable ? true : false,
    }));
    profileSetValue('job_experience', updatedExperiences as AccountabilityItem[]);
  };

  const updateNonEditableSec = (nonEditable: boolean) => {
    const securityScreeningsUpdated = securityScreenings?.map((field) => ({
      ...field,
      nonEditable: nonEditable,
      is_significant: nonEditable ? true : false,
    }));
    profileSetValue('security_screenings', securityScreeningsUpdated as SecurityScreeningItem[]);
  };

  const state = profileWatch('state');
  const markAllNonEditable = profileWatch('markAllNonEditable');
  const markAllNonEditableEdu = profileWatch('markAllNonEditableEdu');
  const markAllSignificantEdu = profileWatch('markAllSignificantEdu');
  const markAllNonEditableProReg = profileWatch('markAllNonEditableProReg');
  const markAllSignificantProReg = profileWatch('markAllSignificantProReg');
  const markAllSignificantSecurityScreenings = profileWatch('markAllSignificantSecurityScreenings');
  const markAllNonEditableJob_experience = profileWatch('markAllNonEditableJob_experience');
  const markAllSignificantJob_experience = profileWatch('markAllSignificantJob_experience');

  const markAllNonEditableSec = profileWatch('markAllNonEditableSec');
  // const markAllNonEditableProfReg = profileWatch('markAllNonEditableProfReg');

  const markAllSignificant = profileWatch('markAllSignificant');
  const accountabilities = profileWatch('accountabilities');
  const securityScreenings = profileWatch('security_screenings');
  const educations = profileWatch('education');
  const professionalRegistrations = profileWatch('professional_registration_requirements');
  const preferences = profileWatch('preferences');
  const knowledgeSkillsAbilities = profileWatch('knowledge_skills_abilities');
  const willingnessStatements = profileWatch('willingness_statements');
  const job_experiences = profileWatch('job_experience');
  // console.log('markAllSignificant: ', markAllSignificant);

  // education
  const {
    fields: educationAndWorkExperienceFields,
    append: appendEducationAndWorkExperience,
    remove: removeEducationAndWorkExperience,
    move: moveEducationAndWorkExperience,
    update: updateEducationAndWorkExperience,
  } = useFieldArray({
    control: profileControl,
    name: 'education',
  });

  const handleEducationAndWorkExperienceMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveEducationAndWorkExperience(index, index - 1);
    } else {
      moveEducationAndWorkExperience(index, index + 1);
    }
  };

  // related experience
  const {
    fields: job_experienceFields,
    append: appendJob_experience,
    remove: removeJob_experience,
    move: moveJob_experience,
  } = useFieldArray({
    control: profileControl,
    name: 'job_experience',
  });

  const handleJob_experienceMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveJob_experience(index, index - 1);
    } else {
      moveJob_experience(index, index + 1);
    }
  };

  // professional registration requirements
  const {
    fields: professionalRegistrationRequirementsFields,
    append: appendProfessionalRegistrationRequirement,
    remove: removeProfessionalRegistrationRequirement,
    move: moveProfessionalRegistrationRequirement,
    update: updateProfessionalRegistrationRequirement,
  } = useFieldArray({
    control: profileControl,
    name: 'professional_registration_requirements',
  });

  // console.log('professionalRegistrationRequirementsFields:', professionalRegistrationRequirementsFields);

  const handleProfessionalRegistrationRequirementsMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveProfessionalRegistrationRequirement(index, index - 1);
    } else {
      moveProfessionalRegistrationRequirement(index, index + 1);
    }
  };

  // optional requirements
  const {
    fields: optionalRequirementsFields,
    append: appendOptionalRequirement,
    remove: removeOptionalRequirement,
    move: moveOptionalRequirement,
  } = useFieldArray({
    control: profileControl,
    name: 'optional_requirements',
  });

  const handleOptionalRequirementsMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveOptionalRequirement(index, index - 1);
    } else {
      moveOptionalRequirement(index, index + 1);
    }
  };

  // preferences

  const {
    fields: preferencesFields,
    append: appendPreference,
    remove: removePreference,
    move: movePreference,
    update: updatePreference,
  } = useFieldArray({
    control: profileControl,
    name: 'preferences',
  });

  const handlePreferencesMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      movePreference(index, index - 1);
    } else {
      movePreference(index, index + 1);
    }
  };

  // knowledge Skills Abilities
  const {
    fields: knowledgeSkillsAbilitiesFields,
    append: appendKnowledgeSkillAbility,
    remove: removeKnowledgeSkillAbility,
    move: moveKnowledgeSkillAbility,
    update: updateKnowledgeSkillAbility,
  } = useFieldArray({
    control: profileControl,
    name: 'knowledge_skills_abilities',
  });

  const handleKnowledgeSkillsAbilitiesMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveKnowledgeSkillAbility(index, index - 1);
    } else {
      moveKnowledgeSkillAbility(index, index + 1);
    }
  };

  // willingness Statements
  const {
    fields: willingnessStatementsFields,
    append: appendWillingnessStatement,
    remove: removeWillingnessStatement,
    move: moveWillingnessStatement,
    update: updateWillingnessStatement,
  } = useFieldArray({
    control: profileControl,
    name: 'willingness_statements',
  });

  const handleWillingnessStatementsMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveWillingnessStatement(index, index - 1);
    } else {
      moveWillingnessStatement(index, index + 1);
    }
  };

  //  security Screenings
  const {
    fields: securityScreeningsFields,
    append: appendSecurityScreening,
    remove: removeSecurityScreening,
    move: moveSecurityScreening,
    update: updateSecurityScreeining,
  } = useFieldArray({
    control: profileControl,
    name: 'security_screenings',
  });

  const handleSecurityScreeningsMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveSecurityScreening(index, index - 1);
    } else {
      moveSecurityScreening(index, index + 1);
    }
  };

  // behavioural competencies
  const {
    fields: behavioural_competencies_fields,
    append: behavioural_competencies_append,
    remove: behavioural_competencies_remove,
  } = useFieldArray({
    control: profileControl,
    name: 'behavioural_competencies',
  });

  // Tree-select for report-to relationship
  const { SHOW_CHILD } = TreeSelect;

  //employee group selector
  const { data: employeeGroupData } = useGetEmployeeGroupsQuery({
    ids: employeeGroupIds,
  });

  // classifications selector data
  const { data: classificationsData } = useGetFilteredClassificationsQuery();

  // useEffect to update the filteredClassifications when employeeGroup changes
  useEffect(() => {
    if (employeeGroup && classificationsData?.classifications) {
      const filtered = classificationsData.classifications.filter((c) => c.employee_group_id === employeeGroup);
      setFilteredClassifications(filtered);
    }
  }, [employeeGroup, classificationsData, setValue]);

  // job role selector data
  const { data: jobRolesData } = useGetJobRolesQuery();

  // job profile scopes
  const { data: jobProfileScopes } = useGetJobProfileScopesQuery();

  const selectedScopeId = watch('scopeOfResponsibility');

  const selectedScopeDescription = useMemo(() => {
    // return jobProfileScopes?.jobProfileScopes.find((scope) => scope.id === selectedScopeId)?.description || null;
    if (!selectedScopeId || !jobProfileScopes) return null;
    return (selectedScopeId as number[])
      .map((scopeId) => jobProfileScopes.jobProfileScopes.find((scope) => scope.id === scopeId)?.description)
      .filter((description) => description)
      .join(', ');
  }, [selectedScopeId, jobProfileScopes]);

  const { data: jobProfileMinimumRequirements } = useGetJobProfileMinimumRequirementsQuery();

  const handleMinistriesChange = () => {
    setTimeout(() => {
      // console.log(
      //   'refetching with: ',
      //   selectedProfession.map((p) => p.jobFamily),
      // );
      refetchPickerData().then((r) => {
        // console.log(
        //   'refetched, updateProfessionalRegistrationrequirements, professionalRequirementsPickerData now: ',
        //   professionalRequirementsPickerData,
        //   r,
        // );
        updateProfessionalRegistrationrequirements(r.data);
      });
    }, 0);
  };

  // Handler for classification change
  const handleClassificationChange = (newValue: string | null) => {
    // if this classification exists in reportToRelationship, remove it

    const currentReportToRelationship = getBasicDetailsValues('reportToRelationship');
    const filteredReportToRelationship = currentReportToRelationship.filter((r: string) => r !== newValue);
    setValue('reportToRelationship', filteredReportToRelationship);

    // if (selectedClassificationId) {
    //   setIsModalVisible(true);
    // } else {
    updateMinimumRequirementsFromClassification(newValue);

    setTimeout(() => {
      // console.log(
      //   'refetching with: ',
      //   selectedProfession.map((p) => p.jobFamily),
      // );
      refetchPickerData().then((r) => {
        // console.log(
        //   'refetched, updateProfessionalRegistrationrequirements, professionalRequirementsPickerData now: ',
        //   professionalRequirementsPickerData,
        //   r,
        // );
        updateProfessionalRegistrationrequirements(r.data);
      });
    }, 0);
    // }
  };

  const handleJobFamilyChange = async () => {
    // console.log('handleJobFamilyChange');
    setTimeout(() => {
      // console.log(
      //   'refetching with: ',
      //   selectedProfession.map((p) => p.jobFamily),
      // );
      refetchPickerData().then((r) => {
        // console.log(
        //   'refetched, updateProfessionalRegistrationrequirements, professionalRequirementsPickerData now: ',
        //   professionalRequirementsPickerData,
        //   r,
        // );
        updateProfessionalRegistrationrequirements(r.data);
      });
    }, 0);
  };

  const updateMinimumRequirementsFromClassification = (classId: string | null) => {
    if (classId) {
      const [id, employee_group_id, peoplesoft_id] = classId.split('.');

      const selectedClassification = classificationsData?.classifications.find(
        (classification) =>
          classification.id === id &&
          classification.employee_group_id === employee_group_id &&
          classification.peoplesoft_id === peoplesoft_id,
      );

      if (jobProfileMinimumRequirements && selectedClassification) {
        const filteredRequirements = jobProfileMinimumRequirements.jobProfileMinimumRequirements
          .filter((req) => req.grade === selectedClassification.grade)
          .map((req) => ({ text: req.requirement, nonEditable: false, is_significant: true, tc_is_readonly: true }));

        // console.log('filteredRequirements: ', filteredRequirements);
        // Update the educationAndWorkExperiences field array
        profileSetValue('education', filteredRequirements);
      }
    }
  };

  // END PROFILE FORM

  const [createJobProfile] = useCreateOrUpdateJobProfileMutation();

  function transformFormDataToApiSchema(formData: any): CreateJobProfileInput {
    return {
      data: {
        state: formData.state,
        title: formData.title.text,
        type: 'MINISTRY', // this gets set on the server
        number: parseInt(formData.jobStoreNumber, 10),
        overview: formData.overview.text,
        program_overview: formData.program_overview.text,
        review_required: formData.classificationReviewRequired,
        accountabilities: formData.accountabilities
          .map((a: any) => ({
            text: a.text,
            is_readonly: a.nonEditable,
            is_significant: a.is_significant,
          }))
          .filter((acc: { text: string }) => acc.text?.trim() !== ''),
        education: formData.education
          .map((a: any) => ({
            text: a.text,
            is_readonly: a.nonEditable,
            is_significant: a.is_significant,
            tc_is_readonly: a.tc_is_readonly,
          }))
          .filter((acc: { text: string }) => acc.text?.trim() !== ''),
        job_experience: formData.job_experience
          .map((a: any) => ({
            text: a.text,
            is_readonly: a.nonEditable,
            is_significant: a.is_significant,
          }))
          .filter((acc: { text: string }) => acc.text?.trim() !== ''),
        professional_registration_requirements: formData.professional_registration_requirements
          .map((a: any) => ({
            text: a.text,
            is_readonly: a.nonEditable,
            is_significant: a.is_significant,
            tc_is_readonly: a.tc_is_readonly,
          }))
          .filter((acc: any) => acc.text?.trim() !== ''),
        optional_requirements: formData.optional_requirements
          .map((o: any) => o.text)
          .filter((acc: string) => acc.trim() !== ''),
        preferences: formData.preferences
          .map((a: any) => ({
            text: a.text,
            tc_is_readonly: a.tc_is_readonly,
          }))
          .filter((acc: any) => acc.text?.trim() !== ''),
        knowledge_skills_abilities: formData.knowledge_skills_abilities
          .map((a: any) => ({
            text: a.text,
            tc_is_readonly: a.tc_is_readonly,
          }))
          .filter((acc: any) => acc.text?.trim() !== ''),
        willingness_statements: formData.willingness_statements
          .map((a: any) => ({
            text: a.text,
            tc_is_readonly: a.tc_is_readonly,
          }))
          .filter((acc: any) => acc.text?.trim() !== ''),
        security_screenings: formData.security_screenings
          .map((a: any) => ({
            text: a.text,
            is_readonly: a.nonEditable ?? false,
            is_significant: a.is_significant ?? false,
            tc_is_readonly: a.tc_is_readonly,
          }))
          .filter((acc: { text: string }) => acc.text?.trim() !== ''),
        all_reports_to: formData.all_reports_to,
        all_organizations: formData.all_organizations,
        total_comp_create_form_misc: {
          markAllNonEditable: formData.markAllNonEditable,
          markAllSignificant: formData.markAllSignificant,
          markAllNonEditableEdu: formData.markAllNonEditableEdu,
          markAllSignificantEdu: formData.markAllSignificantEdu,
          markAllNonEditableProReg: formData.markAllNonEditableProReg,
          markAllSignificantProReg: formData.markAllSignificantProReg,
          markAllSignificantSecurityScreenings: formData.markAllSignificantSecurityScreenings,
          markAllNonEditableJob_experience: formData.markAllNonEditableJob_experience,
          markAllSignificantJob_experience: formData.markAllSignificantJob_experience,

          markAllNonEditableSec: formData.markAllNonEditableSec,
          employeeGroup: formData.employeeGroup,
        },
        behavioural_competencies: {
          create: formData.behavioural_competencies.map((bc: any) => ({
            behavioural_competency: { connect: { id: bc.behavioural_competency.id } },
          })),
        },

        ...(formData.classification && {
          classifications: {
            create: [
              {
                classification: {
                  connect: {
                    id_employee_group_id_peoplesoft_id: {
                      id: formData.classification.split('.')[0],
                      employee_group_id: formData.classification.split('.')[1],
                      peoplesoft_id: formData.classification.split('.')[2],
                    },
                  },
                },
              },
            ],
          },
        }),
        organizations: formData.all_organizations
          ? { create: [] as OrganizationConnectInput[] }
          : {
              create: formData.ministries.map((orgId: any) => ({
                organization: { connect: { id: orgId } },
              })),
            },
        context: formData.jobContext,
        ...(formData.jobRole && {
          role: { connect: { id: formData.jobRole } },
        }),
        role_type: { connect: { id: formData.role } },
        ...(formData.scopeOfResponsibility && {
          scopes: {
            create: formData.scopeOfResponsibility.map((scopeId: number) => ({
              scope: { connect: { id: scopeId } },
            })),
          },
        }),
        jobFamilies: {
          create: formData.professions
            .filter((pf: any) => pf.jobFamily !== -1) // Filter out professions with jobFamily -1
            .map((pf: any) => ({
              jobFamily: { connect: { id: pf.jobFamily } },
            })),
        },
        streams: {
          create: formData.professions.flatMap((pf: any) =>
            pf.jobStreams.map((streamId: any) => ({
              stream: { connect: { id: streamId } },
            })),
          ),
        },

        reports_to: formData.all_reports_to
          ? { create: [] as ClassificationConnectInput[] }
          : {
              create: formData.reportToRelationship.map((classificationId: any) => {
                const [id, employee_group_id, peoplesoft_id] = classificationId.split('.');

                return {
                  classification: {
                    connect: {
                      id_employee_group_id_peoplesoft_id: {
                        id: id,
                        employee_group_id: employee_group_id,
                        peoplesoft_id: peoplesoft_id,
                      },
                    },
                  },
                };
              }),
            },
        version: formData.version,
        id: parseInt(id ?? '0'),
        owner: {
          connect: { id: jobProfileData?.jobProfile.owner.id },
        },
        created_at: jobProfileData?.jobProfile.created_at,
        published_by: {
          connect: { id: jobProfileData?.jobProfile.published_by?.id },
        },
        published_at: jobProfileData?.jobProfile.published_at,
      },
    };
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success('Error message copied!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  async function submitJobProfileData(transformedData: CreateJobProfileInput, isPublishing = false) {
    try {
      const response = await createJobProfile(transformedData).unwrap();
      // console.log('response: ', response);
      if (!isPublishing) {
        // saving as draft
        const newId = response.createOrUpdateJobProfile.toString();
        setId(newId);
        navigate(`/draft-job-profiles/${newId}`); // Update the URL
      } else {
        // saving as published
        const newId = response.createOrUpdateJobProfile.toString();
        navigate(`/published-job-profiles/${newId}`); // Update the URL
      }

      notification.success({
        message: 'Success',
        description: 'Job profile saved successfully.',
        duration: 4, // Duration in seconds
      });
      // console.log('Job Profile Created ok: ', response, id);
    } catch (error: any) {
      // console.log('error: ', error);
      let desc = 'There was an error saving the job profile.';

      if (error?.message?.includes('A job profile with this number already exists'))
        desc = 'A job profile with this number already exists. Please use a different number.';
      else desc = error.message;

      const displayDesc = desc.length > 300 ? `${desc.substring(0, 300)}...` : desc;

      notification.error({
        message: 'Error',
        description: (
          <div>
            <p>{displayDesc}</p>
            <Button type="primary" onClick={() => copyToClipboard(desc)}>
              Copy Error Message
            </Button>
          </div>
        ),
        duration: 0, // don't hide error so user can copy error message
      });
      console.error('Error creating job profile: ', error);
    }
  }

  const getTransofrmedData = (isPublishing = false, isUnpublishing = false) => {
    // console.log('save, isPublishing: ', isPublishing);
    const basicDetails = getBasicDetailsValues();
    const profileDetails = getProfileValues();

    if (isUnpublishing) isPublishing = false;
    const newState = isPublishing ? 'PUBLISHED' : isUnpublishing ? 'DRAFT' : state;
    const combinedData = {
      ...basicDetails,
      ...profileDetails,
      // Set the state based on whether the job profile is being published
      state: newState,
      is_archived: isPublishing ? false : isUnpublishing ? true : undefined,
      version: jobProfileData?.jobProfile.version,
    };

    if (isPublishing) {
      profileSetValue('state', 'PUBLISHED');
    } else if (isUnpublishing) {
      profileSetValue('state', 'DRAFT');
    }

    // console.log('Combined form data:', combinedData);

    const transformedData = transformFormDataToApiSchema(combinedData);
    // console.log('transformedData: ', transformedData);

    return transformedData;
  };

  const save = async (isPublishing = false, isUnpublishing = false) => {
    // validate only if publishing
    if (state === 'PUBLISHED' || isPublishing) {
      const errors = Object.values(profileFormErrors).map((error: any) => {
        const message =
          error.message != null
            ? error.message
            : error.root != null
              ? error.root?.message
              : error.value != null
                ? error.value.message
                : error?.text.message
                  ? error.text.message
                  : 'Error';
        return message;
      });

      const errors2 = Object.values(basicFormErrors)
        .map((error: any) => {
          // only interested in title validation here
          // todo: tag the error so it's easier to identify
          // if (!error?.text?.message || !error?.text?.message.toString().startsWith('Title must be between'))
          //   return null;

          const message =
            error.message != null
              ? error.message
              : error.root != null
                ? error.root?.message
                : error.value != null
                  ? error.value.message
                  : error?.text.message
                    ? error.text.message
                    : 'Error';
          return message;
        })
        .filter((m) => m != null);

      if (errors.length || errors2.length) {
        Modal.error({
          title: 'Errors',
          content: (
            <List>
              {errors2.map((message, index) => (
                <List.Item>
                  <p key={index}>{message}</p>
                </List.Item>
              ))}
              {errors.map((message, index) => (
                <List.Item>
                  <p key={index}>{message}</p>
                </List.Item>
              ))}
            </List>
          ),
        });
        return;
      }
    }

    const transformedData = getTransofrmedData(isPublishing, isUnpublishing);
    await submitJobProfileData(transformedData, isPublishing);
    // Refetch job profile data
    if (isNaN(parseInt(id ?? ''))) return;

    await triggerGetJobProfile({ id: parseInt(id ?? '') });
  };

  const unpublish = async () => {
    await save(false, true);
  };

  const publish = async () => {
    await save(true);
  };

  const filterTreeData = (data: any, selectedId: any) => {
    // Filter out the selected classification from the tree data
    const ret = data
      .filter((item: any) => {
        const compareResult = item.id !== selectedId || item.id == null;
        // if (!compareResult) console.log('filtering: ', item.id, selectedId, item);
        return compareResult;
      })
      .map((item: any) => ({
        ...item,
        children: item.children ? filterTreeData(item.children, selectedId) : [],
      }));
    return ret;
  };

  const showPublishConfirm = () => {
    Modal.confirm({
      title: 'Publish profile',
      content:
        'Publishing the job profile to the Job Store will allow hiring managers view the profile. Are you sure you want to continue?',
      okText: 'Publish profile',
      cancelText: 'Cancel',
      onOk() {
        // Call the function to handle the publish action
        publish();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const showUnPublishConfirm = () => {
    Modal.confirm({
      title: 'Unpublish Profile',
      content:
        'Unpublishing the job profile from the Job Store will remove public access to the profile. Are you sure you want to continue?',
      okText: 'Unpublish profile',
      cancelText: 'Cancel',
      onOk() {
        // Call the function to handle the publish action
        unpublish();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const [profileFormErrors, setProfileFormErrors] = useState<any>({});

  useEffect(() => {
    setProfileFormErrors(profileFormState.errors);
  }, [profileFormState.errors]);

  const [basicFormErrors, setBasicFormErrors] = useState<any>({});

  useEffect(() => {
    setBasicFormErrors(basicFormState.errors);
  }, [basicFormState.errors]);

  // console.log('basicFormState.errors: ', basicFormState.errors);
  // console.log('profileFormState.errors: ', profileFormState.errors);

  // console.log(
  //   'selectedProfession:',
  //   selectedProfession,
  //   selectedProfession.map((p) => p.jobFamily),
  //   selectedProfession.map((p) => p.jobStreams).flat(),
  // );

  // user removed family or stream - remove the professional requirements that no longer apply
  const handleStreamOrFamilyRemoval = useCallback(() => {
    if (!pickerData) return;

    // console.log('==REMOVAL handleStreamOrFamilyRemoval');

    // // Get the updated list of professional registrations that would appear in the pick list
    // console.log('professionalRequirementsPickerData:', professionalRequirementsPickerData);
    // console.log('professionalRegistrationRequirementsFields: ', professionalRegistrationRequirementsFields);

    // console.log('professionsFields??:', professionsFields);

    const jobFamilyIds = selectedProfession.map((p) => p.jobFamily);
    const jobFamilyStreamIds = selectedProfession.map((p) => p.jobStreams).flat();

    // console.log('jobFamilyIds: ', jobFamilyIds);
    // console.log('jobFamilyStreamIds: ', jobFamilyStreamIds);

    // console.log('calculating idsToRemove');
    const idsToRemove = professionalRegistrationRequirementsFields
      .filter((field) => {
        // console.log('checking field: ', field);
        if (field.tc_is_readonly) {
          // console.log('is readonly');
          const item = pickerData.requirementsWithoutReadOnly.professionalRegistrationRequirements.find(
            (data: any) => data.text === field.text,
          );

          // console.log('found item by text: ', item);

          if (item) {
            const itemJobFamilies = item.jobFamilies.map((jf: any) => jf.id);
            const itemStreams = item.streams.map((s: any) => s.id);

            // console.log('itemJobFamilies: ', itemJobFamilies, jobFamilyIds);
            // console.log('itemStreams: ', itemStreams, jobFamilyStreamIds);

            const jobFamilyWithNoStream = selectedProfession
              .filter((p) => p.jobStreams.length === 0)
              .map((p) => p.jobFamily);
            // console.log('jobFamilyWithNoStream: ', jobFamilyWithNoStream);

            const isJobFamilyAllowed = itemJobFamilies.some((jf: any) => jobFamilyIds.includes(jf));
            let isStreamAllowed = itemStreams.some((s: any) => jobFamilyStreamIds.includes(s));

            // console.log('isJobFamilyAllowed: ', isJobFamilyAllowed);
            // console.log('isStreamAllowed: ', isStreamAllowed);

            // make an exception for job family with no stream
            if (!isStreamAllowed) {
              // console.log('checking jobFamilyWithNoStream');
              isStreamAllowed = jobFamilyWithNoStream.some((jf: any) => itemJobFamilies.includes(jf));
              // console.log('isStreamAllowed now: ', isStreamAllowed);
            }

            // if this item has classification set, then it was auto-added
            // check separately if classification matches
            // additionally, if the item also has job family set, ensure that matches as well

            if (item.classification) {
              // console.log('classificaiton present');
              const itemClassificationId = item.classification.id;
              const itemClassificationEmployeeGroup = item.classification.employee_group_id;
              const itemJobFamilies = item.jobFamilies;

              const selectedClassification = selectedClassificationId?.split('.')[0];
              const selectedEmployeeGroup = selectedClassificationId?.split('.')[1];

              // console.log('itemClassificationId: ', itemClassificationId);
              // console.log('selectedClassification: ', selectedClassification);

              const isClassificationAllowed = itemClassificationId === selectedClassification;
              const isEmployeeGroupAllowed = itemClassificationEmployeeGroup === selectedEmployeeGroup;

              // if job families are present, check that
              const isJobFamilyAllowed =
                itemJobFamilies.length === 0 || itemJobFamilies.some((jf: any) => jobFamilyIds.includes(jf.id));

              // console.log('isClassificationAllowed: ', isClassificationAllowed);
              // console.log('isEmployeeGroupAllowed: ', isEmployeeGroupAllowed);
              // console.log('isJobFamilyAllowed: ', isJobFamilyAllowed);

              return !(isClassificationAllowed && isEmployeeGroupAllowed && isJobFamilyAllowed);
            }

            return !(isJobFamilyAllowed && isStreamAllowed);
          } else {
            // console.log('item not found');
            // item was not found - likely because we re-fetched the picklist data and it's no longer in the list
            return true;
          }
        }
        return false;
      })
      .map((field) => field.text);

    // console.log('idsToRemove: ', idsToRemove);

    const indexesToRemove = idsToRemove.map((text) =>
      professionalRegistrationRequirementsFields.findIndex((field) => field.tc_is_readonly && field.text === text),
    );

    // console.log('REMOVING indexesToRemove: ', indexesToRemove);
    // Remove the professional registrations that no longer apply
    // per documentaion this should work without timeout, however for some reason it doesn't
    // delay removal
    if (indexesToRemove.length > 0) {
      const timeoutId = setTimeout(() => {
        removeProfessionalRegistrationRequirement(indexesToRemove);
        triggerProfileValidation();
      }, 0);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    // refetchProfessionalRequirementsPickerData();
  }, [
    professionalRegistrationRequirementsFields,
    pickerData,
    // professionsFields,
    removeProfessionalRegistrationRequirement,
    selectedProfession,
    selectedClassificationId,
    triggerProfileValidation,
  ]);

  useEffect(() => {
    // console.log('selectedProfession change');
    const hasRemoval = (prev: any, current: any) => {
      if (!prev || !current) return false;
      if (prev.length > current.length) return true;
      return prev.some((prevItem: any, index: any) => {
        const currentItem = current[index];
        if (!currentItem) return true;
        if (prevItem.jobFamily !== currentItem.jobFamily) return true;
        return prevItem.jobStreams.length > currentItem.jobStreams.length;
      });
    };

    const removed = hasRemoval(prevProfessionsData.current, selectedProfession);
    // console.log('removed: ', prevProfessionsData.current, selectedProfession, removed);
    if (removed) {
      handleStreamOrFamilyRemoval();
    }

    // Update the ref with the new value
    // console.log('SET: ', prevProfessionsData.current, selectedProfession);
    prevProfessionsData.current = JSON.parse(JSON.stringify(selectedProfession));
  }, [selectedProfession, handleStreamOrFamilyRemoval]);

  // console.log('selectedProfession:', selectedProfession);

  // user changed classificaiton or job family - update the professional requirements based on the new selection
  const updateProfessionalRegistrationrequirements = (professionalRequirementsPickerDataIn?: any) => {
    const useProfessionalRequirementsPickerData = professionalRequirementsPickerDataIn || pickerData;

    if (!useProfessionalRequirementsPickerData) return;

    // NEW

    // console.log('NEW - adding automatically');

    // Find items with non-null classification - these should be added automatically based on classification selection
    const itemsWithClassification =
      useProfessionalRequirementsPickerData.requirementsWithoutReadOnly.professionalRegistrationRequirements.filter(
        (comp: any) => comp.classification !== null,
      );

    // console.log('data.requirementsWithoutReadOnly: ', useProfessionalRequirementsPickerData.requirementsWithoutReadOnly);
    // console.log('itemsWithClassification: ', itemsWithClassification);

    // Add items with non-null classification to the fields array
    const newFields = itemsWithClassification.map((item: any) => ({
      tc_is_readonly: true,
      is_readonly: true,
      text: item.text,
    }));

    // console.log('newFields: ', newFields);

    // console.log('filtering new fields over fields: ', professionalRegistrationRequirementsFields);
    // Filter out items that already exist in the fields array
    const uniqueNewFields = newFields.filter(
      (newField: any) =>
        !professionalRegistrationRequirementsFields.some(
          (field) => field.text === newField.text && field.tc_is_readonly === true,
        ),
    );
    // console.log('addAction: ', uniqueNewFields);

    // Add the unique new fields to the existing fields array

    const timeoutId = setTimeout(() => {
      // console.log('append: ', uniqueNewFields);
      appendProfessionalRegistrationRequirement(uniqueNewFields);
      triggerProfileValidation();
    }, 0);
    return () => {
      clearTimeout(timeoutId);
    };

    // END NEW
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  // , [
  //   appendProfessionalRegistrationRequirement,
  //   // professionalRegistrationRequirementsFields,
  //   professionalRequirementsPickerData,
  // ]);

  // console.log('professionalRegistrationRequirementsFields: ', professionalRegistrationRequirementsFields);

  // useEffect(() => {
  //   // console.log('counter: ', counter);
  //   if (counter == 1) removeProfessionalRegistrationRequirement(2);
  // }, [counter, removeProfessionalRegistrationRequirement]);

  const showWarningModal = (onOk: any, onCancel: any) => {
    Modal.confirm({
      title: 'Warning',
      content:
        "Changing 'Classification' would result in updates to some of the system generated fields in the 'Job Profile' page. Report-to relationship may also get updated to exclude this classification. Are you sure you want to continue?",
      onOk,
      onCancel,
    });
  };

  const tabItems = [
    {
      key: '1',
      label: 'Basic details',
      children: (
        <>
          {/* <Button
            onClick={() => {
              triggerProfileValidation();
            }}
          >
            Validate
          </Button> */}
          {/* <Modal
            title="Confirm change"
            open={isModalVisible}
            onOk={handleConfirmChange}
            onCancel={() => setIsModalVisible(false)}
            okText="Confirm change"
            cancelText="Cancel"
          >
            <p>
              Changing ‘Classification’ would result in updates to some of the system generated fields in the ‘Job
              Profile’ page. Report-to relationship may also get updated to exclude this classification. Are you sure
              you want to continue?
            </p>
          </Modal> */}
          <Row justify="center" style={{ margin: '1rem 0' }}>
            <Col xs={24} sm={24} md={24} lg={20} xl={16}>
              <Form
                layout="vertical"
                onFinish={handleSubmit(() => {
                  // console.log(data);
                })}
              >
                <WizardTitle
                  trigger={triggerBasicDetailsValidation}
                  formErrors={basicFormErrors}
                  useFormReturn={basicUseFormReturn}
                  readOnly={!isCurrentVersion}
                />
                {/*
                <Card title="Job Title" bordered={false} className="custom-card">
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      <FormItem control={control} name="jobTitle">
                        <label style={srOnlyStyle} htmlFor="jobTitle">
                          Job Title
                        </label>
                        <Input placeholder="Ex.: Program Assistant" aria-label="Job Title" />
                      </FormItem>
                    </Col>
                  </Row>
                </Card>
                */}

                <Card title="JobStore Number" style={{ marginTop: 16 }} bordered={false} className="custom-card">
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      {isCurrentVersion ? (
                        <FormItem control={control} name="jobStoreNumber">
                          <label style={srOnlyStyle} htmlFor="jobStoreNumber">
                            JobStore Number
                          </label>
                          <Input
                            placeholder="Ex.: 1001"
                            aria-label="JobStore Number"
                            addonBefore={
                              <Tooltip title="Fetch Next Available Number">
                                {fetchingNextNumber ? (
                                  <LoadingOutlined />
                                ) : (
                                  <ReloadOutlined onClick={fetchNextNumber} />
                                )}
                              </Tooltip>
                            }
                            addonAfter={
                              <>
                                {validationStatus === 'valid' && (
                                  <Tooltip title="Number is Valid">
                                    <CheckCircleOutlined style={{ color: 'green' }} />
                                  </Tooltip>
                                )}
                                {validationStatus === 'invalid' && (
                                  <Tooltip title="Number is Invalid">
                                    <CloseCircleOutlined style={{ color: 'red' }} />
                                  </Tooltip>
                                )}
                              </>
                            }
                          />
                        </FormItem>
                      ) : (
                        <span>{jobStoreNumber}</span>
                      )}
                    </Col>
                  </Row>
                </Card>

                <Card title="Classification" style={{ marginTop: 16 }} bordered={false}>
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      <Form.Item label="Employee group" labelCol={{ className: 'card-label' }}>
                        {isCurrentVersion ? (
                          <>
                            <Controller
                              name="employeeGroup"
                              control={control}
                              render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                  <Select
                                    placeholder="Choose an employee group"
                                    onChange={(arg) => {
                                      if (selectedClassificationId) {
                                        showWarningModal(
                                          () => {
                                            // User confirmed the change
                                            setValue('classification', null);
                                            onChange(arg);
                                          },
                                          () => {
                                            // User canceled the change
                                          },
                                        );
                                      } else {
                                        // Call the original onChange to update the form state
                                        onChange(arg);
                                      }
                                      triggerBasicDetailsValidation();
                                    }}
                                    onBlur={onBlur}
                                    value={value}
                                    style={{ width: '100%' }}
                                    // Transforming data to required format for the Select options prop
                                    options={employeeGroupData?.employeeGroups.map((group) => ({
                                      label: group.id,
                                      value: group.id,
                                    }))}
                                  />
                                );
                              }}
                            />
                            <WizardValidationError formErrors={basicFormErrors} fieldName="employeeGroup" />
                          </>
                        ) : (
                          <Typography.Text>{employeeGroup}</Typography.Text>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin" />

                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      <Form.Item label="Classification" labelCol={{ className: 'card-label' }}>
                        {/* Form.Item for cosmetic purposes */}
                        {isCurrentVersion ? (
                          <>
                            <Controller
                              name="classification"
                              control={control}
                              render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                  <Select
                                    placeholder="Choose a classification"
                                    onChange={(newValue) => {
                                      // onChange(newValue);
                                      // handleClassificationChange(newValue);

                                      if (selectedClassificationId) {
                                        showWarningModal(
                                          () => {
                                            onChange(newValue);
                                            handleClassificationChange(newValue);
                                          },
                                          () => {
                                            // User canceled the change
                                          },
                                        );
                                      } else {
                                        onChange(newValue);
                                        handleClassificationChange(newValue);
                                      }
                                      triggerBasicDetailsValidation();
                                    }}
                                    onBlur={onBlur} // notify when input is touched/blur
                                    value={value}
                                    style={{ width: '100%' }}
                                    showSearch={true}
                                    filterOption={(input, option) => {
                                      if (!option) return false;
                                      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                                    }}
                                    // Transforming data to required format for the Select options prop
                                    // options={classificationsData?.classifications.map((classification) => ({
                                    //   label: classification.name,
                                    //   value: classification.id,
                                    // }))}
                                    options={filteredClassifications.map(
                                      ({ id, employee_group_id, peoplesoft_id, name }) => ({
                                        label: name,
                                        value: `${id}.${employee_group_id}.${peoplesoft_id}`,
                                      }),
                                    )}
                                  ></Select>
                                );
                              }}
                            />
                            <WizardValidationError formErrors={basicFormErrors} fieldName="classification" />
                          </>
                        ) : (
                          <Typography.Text>
                            {
                              filteredClassifications.find((c) => c.id === selectedClassificationId?.split('.')[0])
                                ?.code
                            }
                          </Typography.Text>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Card title="Type" style={{ marginTop: 16 }} bordered={false}>
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      <Form.Item label="Job role" labelCol={{ className: 'card-label' }}>
                        {isCurrentVersion ? (
                          <>
                            <Controller
                              name="jobRole"
                              control={control}
                              render={({ field: { onChange, onBlur, value } }) => (
                                <Select
                                  placeholder="Choose a job role"
                                  onChange={(args) => {
                                    onChange(args);
                                    triggerBasicDetailsValidation();
                                  }}
                                  onBlur={onBlur}
                                  value={value}
                                  options={jobRolesData?.jobRoles.map((jobRole) => ({
                                    label: jobRole.name,
                                    value: jobRole.id,
                                  }))}
                                ></Select>
                              )}
                            />
                            <WizardValidationError formErrors={basicFormErrors} fieldName="jobRole" />
                          </>
                        ) : (
                          <Typography.Text style={{ marginBottom: '5px', display: 'block' }}>
                            {jobProfileData?.jobProfile?.role?.name}
                          </Typography.Text>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin" />

                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      <Form.Item
                        label="Job Family / Profession"
                        labelCol={{ className: 'card-label' }}
                        className="label-only"
                      ></Form.Item>
                      {professionsFields.map((field, index: number) =>
                        isCurrentVersion ? (
                          <div key={field.id}>
                            <Form.Item style={{ marginBottom: '0.5rem' }}>
                              {/* First level of selection for job family /profession */}
                              <>
                                <Controller
                                  // ref={register()}
                                  control={control}
                                  name={`professions.${index}.jobFamily`}
                                  render={({ field: { onChange, onBlur, value } }) => (
                                    <Row gutter={8} wrap={false}>
                                      <Col flex="auto">
                                        <Select
                                          value={value == -1 ? null : value}
                                          onBlur={onBlur}
                                          placeholder="Choose a profession"
                                          onChange={(v) => {
                                            // When profession changes, clear the jobStreams for this profession
                                            setValue(`professions.${index}.jobStreams`, []);
                                            onChange(v);
                                            handleJobFamilyChange();
                                            triggerBasicDetailsValidation();
                                          }}
                                        >
                                          {/* Dynamically render profession options based on your data */}
                                          {jobFamiliesData?.jobFamilies
                                            .filter(
                                              (jf) =>
                                                !selectedProfession.map((p) => p.jobFamily).includes(jf.id) ||
                                                jf.id == selectedProfession[index].jobFamily,
                                            )
                                            .map((family) => (
                                              <Option key={family.id} value={family.id}>
                                                {family.name}
                                              </Option>
                                            ))}
                                        </Select>
                                      </Col>
                                      <Col>
                                        <Button
                                          disabled={index === 0 && selectedProfession?.[index]?.jobFamily === -1}
                                          onClick={() => {
                                            Modal.confirm({
                                              title: 'Confirmation',
                                              content:
                                                'Removing job family or stream may result in removal of some of the fields selected from pick lists in the Job Profile page. Are you sure you want to continue?',
                                              onOk: () => {
                                                remove(index);
                                                // removing last one - append blank
                                                if (selectedProfession?.length === 1) {
                                                  append({ jobFamily: -1, jobStreams: [] });
                                                }
                                                handleJobFamilyChange();
                                                triggerBasicDetailsValidation();
                                              },
                                            });
                                          }}
                                          icon={<DeleteOutlined />}
                                        ></Button>
                                      </Col>
                                    </Row>
                                  )}
                                />
                              </>
                            </Form.Item>

                            {/* Second level for job family/profession selector (select job stream/discipline) */}
                            {selectedProfession?.[index]?.jobFamily != -1 && (
                              <JobStreamDiscipline
                                index={index}
                                control={control}
                                getJobStreamsForFamily={getJobStreamsForFamily}
                                selectedProfession={selectedProfession}
                              ></JobStreamDiscipline>
                            )}
                          </div>
                        ) : (
                          <>
                            <Typography.Text style={{ marginBottom: '5px', display: 'block' }}>
                              {jobProfileData?.jobProfile.jobFamilies[index].jobFamily.name}
                            </Typography.Text>

                            {/*
                            
                            fix this to display all
                            
                            
                            */}
                            <Typography.Text style={{ marginBottom: '5px', display: 'block' }}>
                              {jobProfileData?.jobProfile.streams[index].stream?.name}
                            </Typography.Text>
                          </>
                        ),
                      )}
                      {isCurrentVersion && (
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => {
                              append({ jobFamily: -1, jobStreams: [] });
                            }}
                            block
                            icon={<PlusOutlined />}
                            disabled={selectedProfession?.[0]?.jobFamily == -1}
                          >
                            Add another job family
                          </Button>
                        </Form.Item>
                      )}

                      {isCurrentVersion && (
                        <WizardValidationError formErrors={basicFormErrors} fieldName="professions" />
                      )}
                    </Col>
                  </Row>
                </Card>

                <Card title="Additional information" style={{ marginTop: 16 }} bordered={false}>
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      {/* Role Radio Buttons */}

                      <Form.Item label="Role" labelCol={{ className: 'card-label' }}>
                        {isCurrentVersion ? (
                          <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                              <Radio.Group {...field}>
                                <Radio value={1}>Individual Contributor</Radio>
                                <Radio value={2}>People Leader</Radio>
                              </Radio.Group>
                            )}
                          />
                        ) : (
                          <Typography title="Role">{jobProfileData?.jobProfile.role_type?.name}</Typography>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider className="hr-reduced-margin" />

                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      {/* Report-to relationship Select */}

                      <Form.Item label="Report-to relationship" labelCol={{ className: 'card-label' }}>
                        {isCurrentVersion ? (
                          <>
                            <Controller
                              name="reportToRelationship"
                              control={control}
                              render={({ field }) => (
                                <>
                                  <Checkbox
                                    onChange={(e) => {
                                      handleSelectAllReportTo(e.target.checked);
                                      triggerBasicDetailsValidation();
                                    }}
                                    checked={allReportsTo}
                                    style={{ marginBottom: '10px' }}
                                  >
                                    Select all
                                  </Checkbox>
                                  <TreeSelect
                                    {...field}
                                    onChange={(selectedItems) => {
                                      field.onChange(selectedItems); // Continue with the original onChange

                                      // if user selected all items, check the all selected box
                                      const allValues = getAllTreeValues(treeDataConverted);

                                      // filter out the selected classification
                                      let filteredReportToRelationship = allValues;
                                      if (selectedClassificationId)
                                        filteredReportToRelationship = allValues.filter(
                                          (r: string) => r !== selectedClassificationId,
                                        );

                                      if (filteredReportToRelationship.length === selectedItems.length)
                                        setValue('all_reports_to', true);
                                      else setValue('all_reports_to', false);
                                      triggerBasicDetailsValidation();
                                    }}
                                    autoClearSearchValue={false}
                                    // todo: do the filtering externally, wasn't able to do it because of inifinite render loop
                                    treeData={filterTreeData(treeDataConverted, selectedClassificationId)}
                                    // treeData={treeDataConverted} // Replace with your data
                                    // onChange={(value) => setReportToRelationship(value)}
                                    treeCheckable={true}
                                    showCheckedStrategy={SHOW_CHILD}
                                    placeholder="Choose all the positions this role should report to"
                                    style={{ width: '100%' }}
                                    maxTagCount={10}
                                  />
                                </>
                              )}
                            />
                            <WizardValidationError formErrors={basicFormErrors} fieldName="reportToRelationship" />
                          </>
                        ) : (
                          <>
                            {allReportsTo ? (
                              <Tag>Reports to All</Tag>
                            ) : (
                              jobProfileData?.jobProfile.reports_to.map((r) => <Tag>{r.classification.code}</Tag>)
                            )}
                          </>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin" />

                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      {/* Scopes of Responsibility Select */}
                      <Form.Item label="Scope of Responsibility" labelCol={{ className: 'card-label' }}>
                        {isCurrentVersion ? (
                          <>
                            <Controller
                              name="scopeOfResponsibility"
                              control={control}
                              render={({ field: { onChange, onBlur, value } }) => {
                                return (
                                  <Select
                                    placeholder="Choose the scopes of responsibility"
                                    onChange={(v) => {
                                      onChange(v);
                                      triggerBasicDetailsValidation();
                                    }}
                                    onBlur={onBlur}
                                    value={value}
                                    mode="multiple"
                                    options={jobProfileScopes?.jobProfileScopes.map((scope) => ({
                                      label: scope.name,
                                      value: scope.id,
                                    }))}
                                  ></Select>
                                );
                              }}
                            />
                            <Typography.Text type="secondary">{selectedScopeDescription}</Typography.Text>
                            <WizardValidationError formErrors={basicFormErrors} fieldName="scopeOfResponsibility" />
                          </>
                        ) : (
                          <>{jobProfileData?.jobProfile.scopes.map((s) => <Tag>{s.scope.name}</Tag>)}</>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin" />

                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      {/* Ministries Select */}

                      <Form.Item
                        label={
                          <>
                            <Text>Ministries</Text>
                            <>&nbsp;</>
                            <Text type="secondary">(optional)</Text>
                          </>
                        }
                        labelCol={{ className: 'card-label' }}
                      >
                        {isCurrentVersion ? (
                          <>
                            <Controller
                              name="ministries"
                              control={control}
                              render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                  <Text type="secondary" style={{ marginBottom: '5px', display: 'block' }}>
                                    If selected, this role would be available only for those specific ministries.
                                  </Text>
                                  <MinistriesSelect
                                    isMultiSelect={true}
                                    onChange={(args: any) => {
                                      onChange(args);
                                      handleMinistriesChange();
                                      triggerBasicDetailsValidation();
                                    }}
                                    onBlur={onBlur}
                                    value={value}
                                    setValue={(a: any, b: any) => {
                                      setValue(a, b);
                                      triggerBasicDetailsValidation();
                                    }}
                                    allOrganizations={allOrganizations}
                                  />
                                </>
                              )}
                            />
                            <WizardValidationError formErrors={basicFormErrors} fieldName="ministries" />
                          </>
                        ) : (
                          <>
                            {allOrganizations ? (
                              <Tag>All Organizations</Tag>
                            ) : (
                              jobProfileData?.jobProfile.organizations.map((o) => <Tag>{o.organization.name}</Tag>)
                            )}
                          </>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin" />

                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      {/* Other Functions Checkbox */}
                      <Form.Item
                        label={
                          <>
                            <Text>Other functions</Text>
                            <>&nbsp;</>
                            <Text type="secondary">(optional)</Text>
                          </>
                        }
                        labelCol={{ className: 'card-label' }}
                      >
                        <Controller
                          name="classificationReviewRequired"
                          control={control}
                          render={({ field: { onChange, value, ref } }) => (
                            <>
                              <Switch checked={value} onChange={onChange} ref={ref} disabled={!isCurrentVersion} />
                              <span className="ant-form-text" style={{ marginLeft: '0.8rem' }}>
                                Verification or Classification Review required
                              </span>
                            </>
                          )}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Card title="Job Context" style={{ marginTop: 16 }} bordered={false}>
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      {isCurrentVersion ? (
                        <>
                          <Controller
                            control={control}
                            name="jobContext"
                            render={({ field: { onChange, onBlur, value } }) => (
                              <ReactQuill
                                modules={quill_modules}
                                theme="snow"
                                placeholder="Add job context"
                                value={value}
                                onBlur={onBlur}
                                onChange={(v) => {
                                  onChange(v);
                                  triggerBasicDetailsValidation();
                                }}
                              />
                            )}
                          />
                          <WizardValidationError formErrors={basicFormErrors} fieldName="jobContext" />
                        </>
                      ) : (
                        <Typography.Text type="secondary">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                typeof jobProfileData?.jobProfile?.context === 'string'
                                  ? jobProfileData?.jobProfile.context
                                  : jobProfileData?.jobProfile.context ?? '',
                              ),
                            }}
                          ></span>
                        </Typography.Text>
                      )}
                    </Col>
                  </Row>
                </Card>
              </Form>
            </Col>
          </Row>
        </>
      ),
    },
    {
      key: '2',
      label: 'Job profile',
      children: (
        <>
          {/* <Button
            onClick={() => {
              triggerProfileValidation();
            }}
          >
            Validate
          </Button> */}
          <Row justify="center" style={{ margin: '1rem 0' }}>
            <Col xs={24} sm={24} md={24} lg={20} xl={16}>
              <Form layout="vertical">
                <WizardOverview
                  trigger={triggerProfileValidation}
                  formErrors={profileFormErrors}
                  useFormReturn={jobProfileUseFormReturn}
                  readOnly={!isCurrentVersion}
                />
                <WizardProgramOverview
                  trigger={triggerProfileValidation}
                  formErrors={profileFormErrors}
                  useFormReturn={jobProfileUseFormReturn}
                  readOnly={!isCurrentVersion}
                />

                <Card title="Accountabilities" style={{ marginTop: 16 }} bordered={false}>
                  {/* Required accountabilities */}
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                            <Col>
                              {isCurrentVersion ? (
                                <Form.Item style={{ margin: 0 }}>
                                  <Row>
                                    <Col>
                                      <Controller
                                        control={profileControl}
                                        name="markAllNonEditable"
                                        render={({ field }) => (
                                          <Checkbox
                                            {...field}
                                            checked={markAllNonEditable}
                                            disabled={accountabilitiesFields.length === 0}
                                            onChange={(e) => {
                                              field.onChange(e.target.checked);
                                              updateNonEditable(e.target.checked);
                                              triggerProfileValidation();
                                            }}
                                          >
                                            Mark all as non-editable
                                            <Tooltip title="Points marked as non-editable will not be changable by the hiring manager.">
                                              <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                            </Tooltip>
                                          </Checkbox>
                                        )}
                                      ></Controller>
                                    </Col>
                                    <Col>
                                      <Controller
                                        control={profileControl}
                                        name="markAllSignificant"
                                        // disable if markAllNonEditable checkbox is on

                                        render={({ field }) => (
                                          <Checkbox
                                            {...field}
                                            checked={markAllSignificant || markAllNonEditable}
                                            onChange={(e) => {
                                              field.onChange(e.target.checked);
                                              updateSignificant(e.target.checked);
                                              triggerProfileValidation();
                                            }}
                                            disabled={markAllNonEditable || accountabilitiesFields.length === 0}
                                          >
                                            Mark all as significant
                                            <Tooltip title="Points marked as significant will be highlighted to the hiring manager and say that any changes will require verification.">
                                              <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                            </Tooltip>
                                          </Checkbox>
                                        )}
                                      ></Controller>
                                    </Col>
                                  </Row>
                                </Form.Item>
                              ) : (
                                <></>
                              )}
                            </Col>
                          </Row>
                        }
                      >
                        {accountabilitiesFields.map((field, index) => (
                          <Row align="top" key={field.id} gutter={16}>
                            {/* up/down controls */}
                            {isCurrentVersion && (
                              <Col flex="none" className="reorder-controls">
                                <ReorderButtons
                                  index={index}
                                  moveItem={handleMove}
                                  upperDisabled={index === 0}
                                  lowerDisabled={index === accountabilitiesFields.length - 1}
                                />
                              </Col>
                            )}
                            <Col flex="auto">
                              <Row>
                                {/* Non-editable checkbox */}
                                <div style={{ marginBottom: '5px' }}>
                                  <Controller
                                    name={`accountabilities.${index}.nonEditable`}
                                    control={profileControl}
                                    render={({ field: { onChange, value } }) => {
                                      return (
                                        <Checkbox
                                          onChange={(args) => {
                                            // set this item as significant as well
                                            // console.log('non-editable toggle: ', args);
                                            if (args.target.checked) {
                                              profileSetValue(`accountabilities.${index}.is_significant`, true);
                                            }
                                            if (!args.target.checked) {
                                              // console.log('setting markAllNonEditable to false');
                                              profileSetValue('markAllNonEditable', false);
                                            }
                                            onChange(args);
                                            triggerProfileValidation();
                                          }}
                                          checked={value}
                                          disabled={!isCurrentVersion}
                                        >
                                          Non-editable
                                        </Checkbox>
                                      );
                                    }}
                                  />
                                  <Controller
                                    name={`accountabilities.${index}.is_significant`}
                                    control={profileControl}
                                    render={({ field: { onChange, value } }) => {
                                      return (
                                        <Checkbox
                                          onChange={(args) => {
                                            if (!args.target.checked) {
                                              profileSetValue('markAllSignificant', false);
                                            }
                                            onChange(args);
                                            triggerProfileValidation();
                                          }} // send value to hook form
                                          // disable if this item is non-editable
                                          disabled={accountabilities?.[index].nonEditable || !isCurrentVersion}
                                          checked={value || accountabilities?.[index].nonEditable}
                                        >
                                          Significant
                                        </Checkbox>
                                      );
                                    }}
                                  />
                                </div>
                              </Row>
                              {isCurrentVersion ? (
                                <Row gutter={10}>
                                  <Col flex="auto">
                                    <Form.Item>
                                      <Controller
                                        control={profileControl}
                                        name={`accountabilities.${index}.text`}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                          <TextArea
                                            autoSize
                                            placeholder="Add an accountability"
                                            onChange={(event) => {
                                              onChange(event);
                                              debounce(triggerProfileValidation, 300)();
                                            }}
                                            onBlur={onBlur}
                                            value={value?.toString()}
                                          />
                                        )}
                                      />
                                    </Form.Item>
                                  </Col>

                                  <Col flex="none">
                                    <Button
                                      icon={<DeleteOutlined />}
                                      onClick={() => {
                                        removeAccountability(index);
                                        triggerProfileValidation();
                                      }}
                                    />
                                  </Col>
                                </Row>
                              ) : (
                                <Row gutter={10}>
                                  <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                                    {accountabilities?.[index].text?.toString()}
                                  </Typography.Text>
                                </Row>
                              )}
                            </Col>
                          </Row>
                        ))}
                        {isCurrentVersion ? (
                          <Form.Item>
                            <WizardValidationError formErrors={profileFormErrors} fieldName="accountabilities" />
                            <Button
                              type="link"
                              onClick={() =>
                                appendAccountability({
                                  text: '',
                                  nonEditable: markAllNonEditable,
                                  is_significant: markAllSignificant || markAllNonEditable,
                                })
                              }
                              icon={<PlusOutlined />}
                            >
                              Add an accountability
                            </Button>
                          </Form.Item>
                        ) : (
                          <></>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Card
                  title="Minimum job requirements"
                  style={{ marginTop: 16 }}
                  bordered={false}
                  bodyStyle={{ paddingTop: 0 }}
                >
                  {isCurrentVersion ? (
                    <Alert
                      className="custom-alert"
                      role="note"
                      style={{ margin: '0 -24px 24px', borderRadius: '0', paddingBottom: '10px', paddingTop: '10px' }}
                      message=""
                      description="Some information may have been added based on the details you have already provided."
                      type="info"
                      showIcon
                    />
                  ) : (
                    <></>
                  )}

                  {/* Eduction */}

                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                            <Col>Education and work experience</Col>
                            <Col>
                              <Form.Item style={{ margin: 0 }}>
                                {isCurrentVersion ? (
                                  <Row>
                                    <Col>
                                      <Controller
                                        control={profileControl}
                                        name="markAllNonEditableEdu"
                                        render={({ field }) => (
                                          <Checkbox
                                            {...field}
                                            checked={markAllNonEditableEdu}
                                            disabled={educationAndWorkExperienceFields.length === 0}
                                            onChange={(e) => {
                                              field.onChange(e.target.checked);
                                              updateNonEditableEdu(e.target.checked);
                                            }}
                                          >
                                            Mark all as non-editable
                                            <Tooltip title="Points marked as non-editable will not be changable by the hiring manager.">
                                              <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                            </Tooltip>
                                          </Checkbox>
                                        )}
                                      ></Controller>
                                    </Col>
                                    <Col>
                                      <Controller
                                        control={profileControl}
                                        name="markAllSignificantEdu"
                                        render={({ field }) => (
                                          <Checkbox
                                            {...field}
                                            checked={markAllSignificantEdu || markAllNonEditableEdu}
                                            onChange={(e) => {
                                              field.onChange(e.target.checked);
                                              updateSignificantEdu(e.target.checked);
                                            }}
                                            disabled={
                                              markAllNonEditableEdu || educationAndWorkExperienceFields.length === 0
                                            }
                                          >
                                            Mark all as significant
                                            <Tooltip title="Points marked as significant will be highlighted to the hiring manager and say that any changes will require verification.">
                                              <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                            </Tooltip>
                                          </Checkbox>
                                        )}
                                      ></Controller>
                                    </Col>
                                  </Row>
                                ) : (
                                  <></>
                                )}
                              </Form.Item>
                            </Col>
                          </Row>
                        }
                      >
                        {educationAndWorkExperienceFields.map((field, index) => (
                          <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                            {/* up/down controls */}
                            {isCurrentVersion && (
                              <Col flex="none" className="reorder-controls">
                                <ReorderButtons
                                  index={index}
                                  moveItem={handleEducationAndWorkExperienceMove}
                                  upperDisabled={index === 0}
                                  lowerDisabled={index === educationAndWorkExperienceFields.length - 1}
                                />
                              </Col>
                            )}
                            <Col flex="auto">
                              <Row>
                                {/* Non-editable checkbox */}
                                <div style={{ marginBottom: '5px' }}>
                                  <Controller
                                    name={`education.${index}.nonEditable`}
                                    control={profileControl}
                                    render={({ field: { onChange, value } }) => (
                                      <Checkbox
                                        onChange={(args) => {
                                          // set this item as significant as well
                                          if (args.target.checked) {
                                            profileSetValue(`education.${index}.is_significant`, true);
                                          }
                                          if (!args.target.checked) {
                                            profileSetValue('markAllNonEditableEdu', false);
                                          }
                                          onChange(args);
                                        }}
                                        checked={value}
                                        disabled={!isCurrentVersion}
                                      >
                                        Non-editable
                                      </Checkbox>
                                    )}
                                  />
                                  <Controller
                                    name={`education.${index}.is_significant`}
                                    control={profileControl}
                                    render={({ field: { onChange, value } }) => (
                                      <Checkbox
                                        onChange={(args) => {
                                          if (!args.target.checked) {
                                            profileSetValue('markAllSignificantEdu', false);
                                          }
                                          onChange(args);
                                        }}
                                        disabled={educations?.[index].nonEditable || !isCurrentVersion}
                                        checked={value || educations?.[index].nonEditable}
                                      >
                                        Significant
                                      </Checkbox>
                                    )}
                                  />
                                </div>
                              </Row>
                              {isCurrentVersion ? (
                                <Row gutter={10}>
                                  <Col flex="auto">
                                    {field.tc_is_readonly &&
                                      itemInPickerData(
                                        field.text?.toString() ?? '',
                                        'jobProfileMinimumRequirements',
                                      ) && (
                                        <div style={{ display: 'flex' }}>
                                          <Typography.Text style={{ flexGrow: 1, width: 0 }}>
                                            {field.text?.toString()}
                                          </Typography.Text>
                                        </div>
                                      )}

                                    <Form.Item
                                      style={{
                                        display:
                                          field.tc_is_readonly &&
                                          itemInPickerData(
                                            field.text?.toString() ?? '',
                                            'jobProfileMinimumRequirements',
                                          )
                                            ? 'none'
                                            : 'block',
                                      }}
                                    >
                                      <Controller
                                        control={profileControl}
                                        name={`education.${index}.text`}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                          <TextArea
                                            autoSize
                                            placeholder="Add education"
                                            onChange={(event) => {
                                              onChange(event);
                                              debounce(triggerProfileValidation, 300)();
                                            }}
                                            onBlur={onBlur}
                                            value={value?.toString()}
                                          />
                                        )}
                                      />
                                    </Form.Item>
                                  </Col>

                                  <Col flex="none">
                                    <ContextOptionsReadonly
                                      isReadonly={field.tc_is_readonly ?? false}
                                      onEdit={() => {
                                        updateEducationAndWorkExperience(index, {
                                          ...educationAndWorkExperienceFields[index],
                                          tc_is_readonly: false,
                                        });
                                        // setValue(`professional_registration_requirements.${index}.is_readonly`, false);
                                      }}
                                      onRemove={() => {
                                        removeEducationAndWorkExperience(index);
                                        triggerProfileValidation();
                                      }}
                                    />
                                  </Col>
                                </Row>
                              ) : (
                                <Row gutter={10}>
                                  <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                                    {educationAndWorkExperienceFields?.[index].text?.toString()}
                                  </Typography.Text>
                                </Row>
                              )}
                            </Col>
                          </Row>
                        ))}

                        {isCurrentVersion ? (
                          <>
                            <WizardValidationError formErrors={profileFormErrors} fieldName="education" />

                            <Form.Item>
                              <Row>
                                <Col>
                                  <WizardPicker
                                    data={pickerData?.requirementsWithoutReadOnly?.jobProfileMinimumRequirements}
                                    fields={educations}
                                    addAction={appendEducationAndWorkExperience}
                                    removeAction={removeEducationAndWorkExperience}
                                    triggerValidation={triggerProfileValidation}
                                    title="Education and work experiences"
                                    buttonText="Browse and add education"
                                    tc_is_readonly={true}
                                  />
                                </Col>
                                <Col>
                                  <Button
                                    type="link"
                                    onClick={() =>
                                      appendEducationAndWorkExperience({
                                        text: '',
                                        nonEditable: markAllNonEditableEdu,
                                        is_significant: markAllSignificantEdu || markAllNonEditableEdu,
                                      })
                                    }
                                    icon={<PlusOutlined />}
                                  >
                                    Add custom education
                                  </Button>
                                </Col>
                              </Row>
                            </Form.Item>

                            {/* <Form.Item>
                              <Button
                                type="link"
                                onClick={() =>
                                  appendEducationAndWorkExperience({
                                    text: '',
                                    nonEditable: markAllNonEditableEdu,
                                    is_significant: markAllSignificantEdu,
                                  })
                                }
                                icon={<PlusOutlined />}
                              >
                                Add education
                              </Button>
                            </Form.Item> */}
                          </>
                        ) : (
                          <></>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin" />

                  {/* Related experience */}
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                            <Col>Related experience</Col>
                            <Col>
                              {isCurrentVersion ? (
                                <Form.Item style={{ margin: 0 }}>
                                  <Row>
                                    <Col>
                                      <Controller
                                        control={profileControl}
                                        name="markAllNonEditableJob_experience"
                                        render={({ field }) => (
                                          <Checkbox
                                            {...field}
                                            checked={markAllNonEditableJob_experience}
                                            disabled={job_experienceFields.length === 0 || !isCurrentVersion}
                                            onChange={(e) => {
                                              field.onChange(e.target.checked);
                                              updateNonEditableJob_experience(e.target.checked);
                                            }}
                                          >
                                            Mark all as non-editable
                                            <Tooltip title="Points marked as non-editable will not be changable by the hiring manager.">
                                              <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                            </Tooltip>
                                          </Checkbox>
                                        )}
                                      ></Controller>
                                    </Col>
                                    <Col>
                                      <Controller
                                        control={profileControl}
                                        name="markAllSignificantJob_experience"
                                        render={({ field }) => (
                                          <Checkbox
                                            {...field}
                                            checked={
                                              markAllSignificantJob_experience || markAllNonEditableJob_experience
                                            }
                                            onChange={(e) => {
                                              field.onChange(e.target.checked);
                                              updateSignificantJob_experience(e.target.checked);
                                            }}
                                            disabled={
                                              markAllNonEditableJob_experience ||
                                              job_experienceFields.length === 0 ||
                                              !isCurrentVersion
                                            }
                                          >
                                            Mark all as significant
                                            <Tooltip title="Points marked as significant will be highlighted to the hiring manager and say that any changes will require verification.">
                                              <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                            </Tooltip>
                                          </Checkbox>
                                        )}
                                      ></Controller>
                                    </Col>
                                  </Row>
                                </Form.Item>
                              ) : (
                                <></>
                              )}
                            </Col>
                          </Row>
                        }
                      >
                        {job_experienceFields.map((field, index) => (
                          <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                            {/* up/down controls */}
                            {isCurrentVersion && (
                              <Col flex="none" className="reorder-controls">
                                <ReorderButtons
                                  index={index}
                                  moveItem={handleJob_experienceMove}
                                  upperDisabled={index === 0}
                                  lowerDisabled={index === job_experienceFields.length - 1}
                                />
                              </Col>
                            )}
                            <Col flex="auto">
                              <Row>
                                {/* Non-editable checkbox */}
                                <div style={{ marginBottom: '5px' }}>
                                  <Controller
                                    name={`job_experience.${index}.nonEditable`}
                                    control={profileControl}
                                    render={({ field: { onChange, value } }) => (
                                      <Checkbox
                                        onChange={(args) => {
                                          // set this item as significant as well
                                          if (args.target.checked) {
                                            profileSetValue(`job_experience.${index}.is_significant`, true);
                                          }
                                          if (!args.target.checked) {
                                            profileSetValue('markAllNonEditableJob_experience', false);
                                          }
                                          onChange(args);
                                        }}
                                        checked={value}
                                        disabled={!isCurrentVersion}
                                      >
                                        Non-editable
                                      </Checkbox>
                                    )}
                                  />
                                  <Controller
                                    name={`job_experience.${index}.is_significant`}
                                    control={profileControl}
                                    render={({ field: { onChange, value } }) => (
                                      <Checkbox
                                        onChange={(args) => {
                                          if (!args.target.checked) {
                                            profileSetValue('markAllSignificantJob_experience', false);
                                          }
                                          onChange(args);
                                        }}
                                        disabled={job_experiences?.[index].nonEditable || !isCurrentVersion}
                                        checked={value || job_experiences?.[index].nonEditable}
                                      >
                                        Significant
                                      </Checkbox>
                                    )}
                                  />
                                </div>
                              </Row>
                              {isCurrentVersion ? (
                                <Row gutter={10}>
                                  <Col flex="auto">
                                    <Form.Item>
                                      <Controller
                                        control={profileControl}
                                        name={`job_experience.${index}.text`}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                          <TextArea
                                            autoSize
                                            placeholder="Add related experience"
                                            onChange={(event) => {
                                              onChange(event);
                                              debounce(triggerProfileValidation, 300)();
                                            }}
                                            onBlur={onBlur}
                                            value={value?.toString()}
                                          />
                                        )}
                                      />
                                    </Form.Item>
                                  </Col>

                                  <Col flex="none">
                                    <Button
                                      icon={<DeleteOutlined />}
                                      onClick={() => {
                                        removeJob_experience(index);
                                        triggerProfileValidation();
                                      }}
                                    />
                                  </Col>
                                </Row>
                              ) : (
                                <Row gutter={10}>
                                  <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                                    {job_experiences?.[index].text?.toString()}
                                  </Typography.Text>
                                </Row>
                              )}
                            </Col>
                          </Row>
                        ))}
                        {isCurrentVersion ? (
                          <>
                            <WizardValidationError formErrors={profileFormErrors} fieldName="job_experience" />
                            <Form.Item>
                              <Button
                                type="link"
                                onClick={() =>
                                  appendJob_experience({
                                    text: '',
                                    nonEditable: markAllNonEditableJob_experience,
                                    is_significant:
                                      markAllSignificantJob_experience || markAllNonEditableJob_experience,
                                  })
                                }
                                icon={<PlusOutlined />}
                              >
                                Add an experience requirement
                              </Button>
                            </Form.Item>
                          </>
                        ) : (
                          <></>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin"></Divider>

                  {/* Professional registration requirement */}
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                            <Col>Professional registration and certification requirements</Col>
                            {/* NEW */}

                            <Col>
                              {isCurrentVersion ? (
                                <Form.Item style={{ margin: 0 }}>
                                  <Row>
                                    <Col>
                                      <Controller
                                        control={profileControl}
                                        name="markAllNonEditableProReg"
                                        render={({ field }) => (
                                          <Checkbox
                                            {...field}
                                            checked={markAllNonEditableProReg}
                                            disabled={
                                              professionalRegistrationRequirementsFields.length === 0 ||
                                              !isCurrentVersion
                                            }
                                            onChange={(e) => {
                                              field.onChange(e.target.checked);
                                              updateNonEditableProReg(e.target.checked);
                                            }}
                                          >
                                            Mark all as non-editable
                                            <Tooltip title="Points marked as non-editable will not be changable by the hiring manager.">
                                              <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                            </Tooltip>
                                          </Checkbox>
                                        )}
                                      ></Controller>
                                    </Col>
                                    <Col>
                                      <Controller
                                        control={profileControl}
                                        name="markAllSignificantProReg"
                                        render={({ field }) => (
                                          <Checkbox
                                            {...field}
                                            checked={markAllSignificantProReg || markAllNonEditableProReg}
                                            onChange={(e) => {
                                              field.onChange(e.target.checked);
                                              updateSignificantProReg(e.target.checked);
                                            }}
                                            disabled={
                                              markAllNonEditableProReg ||
                                              professionalRegistrationRequirementsFields.length === 0 ||
                                              !isCurrentVersion
                                            }
                                          >
                                            Mark all as significant
                                            <Tooltip title="Points marked as significant will be highlighted to the hiring manager and say that any changes will require verification.">
                                              <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                            </Tooltip>
                                          </Checkbox>
                                        )}
                                      ></Controller>
                                    </Col>
                                  </Row>
                                </Form.Item>
                              ) : (
                                <></>
                              )}
                            </Col>

                            {/* END NEW */}
                          </Row>
                        }
                      >
                        {professionalRegistrationRequirementsFields.map((field, index) => (
                          <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                            {/* up/down controls */}
                            {isCurrentVersion && (
                              <Col flex="none" className="reorder-controls">
                                <ReorderButtons
                                  index={index}
                                  moveItem={handleProfessionalRegistrationRequirementsMove}
                                  upperDisabled={index === 0}
                                  lowerDisabled={index === professionalRegistrationRequirementsFields.length - 1}
                                />
                              </Col>
                            )}
                            <Col flex="auto">
                              <Row>
                                {/* NEW Non-editable checkbox */}
                                <div style={{ marginBottom: '5px' }}>
                                  <Controller
                                    name={`professional_registration_requirements.${index}.nonEditable`}
                                    control={profileControl}
                                    render={({ field: { onChange, value } }) => (
                                      <Checkbox
                                        onChange={(args) => {
                                          // set this item as significant as well
                                          if (args.target.checked) {
                                            profileSetValue(
                                              `professional_registration_requirements.${index}.is_significant`,
                                              true,
                                            );
                                          }
                                          if (!args.target.checked) {
                                            profileSetValue('markAllNonEditableProReg', false);
                                          }
                                          onChange(args);
                                        }}
                                        checked={value}
                                        disabled={!isCurrentVersion}
                                      >
                                        Non-editable
                                      </Checkbox>
                                    )}
                                  />
                                  <Controller
                                    name={`professional_registration_requirements.${index}.is_significant`}
                                    control={profileControl}
                                    render={({ field: { onChange, value } }) => (
                                      <Checkbox
                                        onChange={(args) => {
                                          if (!args.target.checked) {
                                            profileSetValue('markAllSignificantProReg', false);
                                          }
                                          onChange(args);
                                        }}
                                        disabled={professionalRegistrations?.[index].nonEditable || !isCurrentVersion}
                                        checked={value || professionalRegistrations?.[index].nonEditable}
                                      >
                                        Significant
                                      </Checkbox>
                                    )}
                                  />
                                </div>
                                {/* END NEW Non-editable checkbox */}
                              </Row>
                              {isCurrentVersion ? (
                                <Row gutter={10}>
                                  <Col flex="auto">
                                    {/* Needs to be tc_is_readonly AND exist in the picklist to appear as read only */}
                                    {field.tc_is_readonly &&
                                      itemInPickerData(
                                        field.text?.toString() ?? '',
                                        'professionalRegistrationRequirements',
                                      ) && (
                                        <div style={{ display: 'flex' }}>
                                          <Typography.Text style={{ flexGrow: 1, width: 0 }}>
                                            {field.text?.toString()}
                                          </Typography.Text>
                                        </div>
                                      )}
                                    <Form.Item
                                      style={{
                                        display:
                                          field.tc_is_readonly &&
                                          itemInPickerData(
                                            field.text?.toString() ?? '',
                                            'professionalRegistrationRequirements',
                                          )
                                            ? 'none'
                                            : 'block',
                                      }}
                                    >
                                      <Controller
                                        control={profileControl}
                                        name={`professional_registration_requirements.${index}.text`}
                                        render={({ field: { onChange, onBlur, value } }) => {
                                          return (
                                            <>
                                              <TextArea
                                                autoSize
                                                placeholder="Add a professional registration or certification requirement"
                                                onChange={(event) => {
                                                  onChange(event);
                                                  debounce(triggerProfileValidation, 300)();
                                                }}
                                                onBlur={onBlur}
                                                value={value?.toString()}
                                              />
                                            </>
                                          );
                                        }}
                                      />
                                    </Form.Item>
                                  </Col>

                                  <Col flex="none">
                                    <ContextOptionsReadonly
                                      isReadonly={field.tc_is_readonly ?? false}
                                      onEdit={() => {
                                        updateProfessionalRegistrationRequirement(index, {
                                          ...professionalRegistrationRequirementsFields[index],
                                          tc_is_readonly: false,
                                        });
                                      }}
                                      onRemove={() => {
                                        removeProfessionalRegistrationRequirement(index);
                                        triggerProfileValidation();
                                      }}
                                    />
                                  </Col>
                                </Row>
                              ) : (
                                <Row gutter={10}>
                                  <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                                    {professionalRegistrationRequirementsFields?.[index].text?.toString()}
                                  </Typography.Text>
                                </Row>
                              )}
                            </Col>
                          </Row>
                        ))}
                        {isCurrentVersion ? (
                          <>
                            <WizardValidationError
                              formErrors={profileFormErrors}
                              fieldName="professional_registration_requirements"
                            />
                            <Form.Item>
                              <Row>
                                <Col>
                                  <WizardProfessionalRegistrationPicker
                                    data={pickerData?.requirementsWithoutReadOnly?.professionalRegistrationRequirements}
                                    fields={professionalRegistrations}
                                    addAction={appendProfessionalRegistrationRequirement}
                                    removeAction={removeProfessionalRegistrationRequirement}
                                    triggerValidation={triggerProfileValidation}
                                  />
                                </Col>
                                <Col>
                                  <Button
                                    type="link"
                                    onClick={() =>
                                      appendProfessionalRegistrationRequirement({
                                        text: '',
                                        nonEditable: markAllNonEditableProReg,
                                        is_significant: markAllSignificantProReg || markAllNonEditableProReg,
                                      })
                                    }
                                    icon={<PlusOutlined />}
                                  >
                                    Add a custom requirement
                                  </Button>
                                </Col>
                              </Row>
                            </Form.Item>
                          </>
                        ) : (
                          <></>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin" />

                  {/* Preferences */}
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle">
                            <Col>Preferences</Col>
                          </Row>
                        }
                      >
                        {preferencesFields.map((field, index) =>
                          isCurrentVersion ? (
                            <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                              {/* up/down controls */}
                              <Col flex="none" className="reorder-controls">
                                <ReorderButtons
                                  index={index}
                                  moveItem={handlePreferencesMove}
                                  upperDisabled={index === 0}
                                  lowerDisabled={index === preferencesFields.length - 1}
                                />
                              </Col>
                              <Col flex="auto">
                                <Row gutter={10}>
                                  <Col flex="auto">
                                    {field.tc_is_readonly &&
                                      itemInPickerData(field.text?.toString() ?? '', 'preferences') && (
                                        <div style={{ display: 'flex' }}>
                                          <Typography.Text style={{ flexGrow: 1, width: 0 }}>
                                            {field.text?.toString()}
                                          </Typography.Text>
                                        </div>
                                      )}
                                    <Form.Item
                                      style={{
                                        display:
                                          field.tc_is_readonly &&
                                          itemInPickerData(field.text?.toString() ?? '', 'preferences')
                                            ? 'none'
                                            : 'block',
                                      }}
                                    >
                                      <Controller
                                        control={profileControl}
                                        name={`preferences.${index}.text`}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                          <TextArea
                                            autoSize
                                            placeholder="Add a preference"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value?.toString()}
                                          />
                                        )}
                                      />
                                    </Form.Item>
                                  </Col>

                                  <Col flex="none">
                                    <ContextOptionsReadonly
                                      isReadonly={field.tc_is_readonly ?? false}
                                      onEdit={() => {
                                        updatePreference(index, {
                                          ...preferencesFields[index],
                                          tc_is_readonly: false,
                                        });
                                        // setValue(`professional_registration_requirements.${index}.is_readonly`, false);
                                      }}
                                      onRemove={() => {
                                        removePreference(index);
                                        triggerProfileValidation();
                                      }}
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          ) : (
                            <Row gutter={10}>
                              <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                                {preferencesFields?.[index].text?.toString()}
                              </Typography.Text>
                            </Row>
                          ),
                        )}
                        {isCurrentVersion ? (
                          <Form.Item>
                            <Row>
                              <Col>
                                <WizardPicker
                                  data={pickerData?.requirementsWithoutReadOnly?.preferences}
                                  fields={preferences}
                                  addAction={appendPreference}
                                  removeAction={removePreference}
                                  triggerValidation={triggerProfileValidation}
                                  title="Preferences"
                                  buttonText="Browse and add preferences"
                                  tc_is_readonly={true}
                                />
                              </Col>
                              <Col>
                                <Button
                                  type="link"
                                  onClick={() => appendPreference({ text: '' })}
                                  icon={<PlusOutlined />}
                                >
                                  Add a custom job preference
                                </Button>
                              </Col>
                            </Row>
                          </Form.Item>
                        ) : (
                          <></>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin" />

                  {/* Knowledge skills and abilities */}
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle">
                            <Col>Knowledge, Skills, and Abilities</Col>
                          </Row>
                        }
                      >
                        {knowledgeSkillsAbilitiesFields.map((field, index) =>
                          isCurrentVersion ? (
                            <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                              {/* up/down controls */}
                              <Col flex="none" className="reorder-controls">
                                <ReorderButtons
                                  index={index}
                                  moveItem={handleKnowledgeSkillsAbilitiesMove}
                                  upperDisabled={index === 0}
                                  lowerDisabled={index === knowledgeSkillsAbilitiesFields.length - 1}
                                />
                              </Col>
                              <Col flex="auto">
                                <Row gutter={10}>
                                  <Col flex="auto">
                                    {field.tc_is_readonly &&
                                      itemInPickerData(field.text?.toString() ?? '', 'knowledgeSkillsAbilities') && (
                                        <div style={{ display: 'flex' }}>
                                          <Typography.Text style={{ flexGrow: 1, width: 0 }}>
                                            {field.text?.toString()}
                                          </Typography.Text>
                                        </div>
                                      )}
                                    <Form.Item
                                      style={{
                                        display:
                                          field.tc_is_readonly &&
                                          itemInPickerData(field.text?.toString() ?? '', 'knowledgeSkillsAbilities')
                                            ? 'none'
                                            : 'block',
                                      }}
                                    >
                                      <Controller
                                        control={profileControl}
                                        name={`knowledge_skills_abilities.${index}.text`}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                          <TextArea
                                            autoSize
                                            placeholder="Add a knowledge, skill, or ability"
                                            onChange={(event) => {
                                              onChange(event);
                                              debounce(triggerProfileValidation, 300)();
                                            }}
                                            onBlur={onBlur}
                                            value={value?.toString()}
                                          />
                                        )}
                                      />
                                    </Form.Item>
                                  </Col>

                                  <Col flex="none">
                                    <ContextOptionsReadonly
                                      isReadonly={field.tc_is_readonly ?? false}
                                      onEdit={() => {
                                        updateKnowledgeSkillAbility(index, {
                                          ...knowledgeSkillsAbilitiesFields[index],
                                          tc_is_readonly: false,
                                        });
                                        // setValue(`professional_registration_requirements.${index}.is_readonly`, false);
                                      }}
                                      onRemove={() => {
                                        removeKnowledgeSkillAbility(index);
                                        triggerProfileValidation();
                                      }}
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          ) : (
                            <Row gutter={10}>
                              <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                                {knowledgeSkillsAbilitiesFields?.[index].text?.toString()}
                              </Typography.Text>
                            </Row>
                          ),
                        )}
                        {isCurrentVersion ? (
                          <>
                            <WizardValidationError
                              formErrors={profileFormErrors}
                              fieldName="knowledge_skills_abilities"
                            />
                            <Form.Item>
                              <Row>
                                <Col>
                                  <WizardPicker
                                    data={pickerData?.requirementsWithoutReadOnly?.knowledgeSkillsAbilities}
                                    fields={knowledgeSkillsAbilities}
                                    addAction={appendKnowledgeSkillAbility}
                                    removeAction={removeKnowledgeSkillAbility}
                                    triggerValidation={triggerProfileValidation}
                                    title="Knowledge, skill and ability requirements"
                                    buttonText="Browse and add knowledge, skill and abilities"
                                    tc_is_readonly={true}
                                  />
                                </Col>
                                <Col>
                                  <Button
                                    type="link"
                                    onClick={() => appendKnowledgeSkillAbility({ text: '' })}
                                    icon={<PlusOutlined />}
                                  >
                                    Add a custom requirement
                                  </Button>
                                </Col>
                              </Row>
                            </Form.Item>
                          </>
                        ) : (
                          <></>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin" />
                  {/* Provisios */}

                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle">
                            <Col>Willingness Statements or Provisos</Col>
                          </Row>
                        }
                      >
                        {willingnessStatementsFields.map((field, index) =>
                          isCurrentVersion ? (
                            <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                              {/* up/down controls */}
                              <Col flex="none" className="reorder-controls">
                                <ReorderButtons
                                  index={index}
                                  moveItem={handleWillingnessStatementsMove}
                                  upperDisabled={index === 0}
                                  lowerDisabled={index === willingnessStatementsFields.length - 1}
                                />
                              </Col>
                              <Col flex="auto">
                                <Row>{/* Non-editable checkbox */}</Row>
                                <Row gutter={10}>
                                  <Col flex="auto">
                                    {field.tc_is_readonly && (
                                      <div style={{ display: 'flex' }}>
                                        <Typography.Text style={{ flexGrow: 1, width: 0 }}>
                                          {field.text?.toString()}
                                        </Typography.Text>
                                      </div>
                                    )}
                                    <Form.Item style={{ display: field.tc_is_readonly ? 'none' : 'block' }}>
                                      <Controller
                                        control={profileControl}
                                        name={`willingness_statements.${index}.text`}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                          <TextArea
                                            autoSize
                                            placeholder="Add a willingness statement or proviso"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value?.toString()}
                                          />
                                        )}
                                      />
                                    </Form.Item>
                                  </Col>

                                  <Col flex="none">
                                    {/* <Button icon={<DeleteOutlined />} onClick={() => removeWillingnessStatement(index)} /> */}
                                    <ContextOptionsReadonly
                                      isReadonly={field.tc_is_readonly ?? false}
                                      onEdit={() => {
                                        updateWillingnessStatement(index, {
                                          ...willingnessStatementsFields[index],
                                          tc_is_readonly: false,
                                        });
                                        // setValue(`professional_registration_requirements.${index}.is_readonly`, false);
                                      }}
                                      onRemove={() => {
                                        removeWillingnessStatement(index);
                                        triggerProfileValidation();
                                      }}
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          ) : (
                            <Row gutter={10}>
                              <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                                {willingnessStatementsFields?.[index].text?.toString()}
                              </Typography.Text>
                            </Row>
                          ),
                        )}
                        {isCurrentVersion ? (
                          <Form.Item>
                            <Row>
                              <Col>
                                <WizardPicker
                                  data={pickerData?.requirementsWithoutReadOnly?.willingnessStatements}
                                  fields={willingnessStatements}
                                  addAction={appendWillingnessStatement}
                                  removeAction={removeWillingnessStatement}
                                  triggerValidation={triggerProfileValidation}
                                  title="Willingness statements or provisos"
                                  buttonText="Browse and add provisos"
                                  tc_is_readonly={true}
                                />
                              </Col>
                              <Col>
                                <Button
                                  type="link"
                                  onClick={() => appendWillingnessStatement({ text: '' })}
                                  icon={<PlusOutlined />}
                                >
                                  Add a custom proviso
                                </Button>
                              </Col>
                            </Row>
                          </Form.Item>
                        ) : (
                          <></>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin" />
                  {/* Security screenings */}
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                            <Col>Security Screenings</Col>
                            {isCurrentVersion ? (
                              <Col>
                                <Form.Item style={{ margin: 0 }}>
                                  <Row>
                                    <Col>
                                      <Controller
                                        control={profileControl}
                                        name="markAllNonEditableSec"
                                        render={({ field }) => (
                                          <Checkbox
                                            {...field}
                                            checked={markAllNonEditableSec}
                                            disabled={professionalRegistrationRequirementsFields.length === 0}
                                            onChange={(e) => {
                                              field.onChange(e.target.checked);
                                              updateNonEditableSec(e.target.checked);
                                            }}
                                          >
                                            Mark all as non-editable
                                            <Tooltip title="Points marked as non-editable will not be changable by the hiring manager.">
                                              <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                            </Tooltip>
                                          </Checkbox>
                                        )}
                                      ></Controller>
                                    </Col>
                                    <Col>
                                      <Controller
                                        control={profileControl}
                                        name="markAllSignificantSecurityScreenings"
                                        render={({ field }) => (
                                          <Checkbox
                                            {...field}
                                            checked={markAllSignificantSecurityScreenings || markAllNonEditableSec}
                                            onChange={(e) => {
                                              field.onChange(e.target.checked);
                                              updateSignificantSecurityScreenings(e.target.checked);
                                            }}
                                            disabled={
                                              markAllNonEditableSec ||
                                              securityScreeningsFields.length === 0 ||
                                              !isCurrentVersion
                                            }
                                          >
                                            Mark all as significant
                                            <Tooltip title="Points marked as significant will be highlighted to the hiring manager and say that any changes will require verification.">
                                              <InfoCircleOutlined style={{ marginLeft: 8 }} />
                                            </Tooltip>
                                          </Checkbox>
                                        )}
                                      ></Controller>
                                    </Col>
                                  </Row>
                                </Form.Item>
                              </Col>
                            ) : (
                              <></>
                            )}
                          </Row>
                        }
                      >
                        {securityScreeningsFields.map((field, index) => (
                          <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                            {/* up/down controls */}
                            {isCurrentVersion && (
                              <Col flex="none" className="reorder-controls">
                                <ReorderButtons
                                  index={index}
                                  moveItem={handleSecurityScreeningsMove}
                                  upperDisabled={index === 0}
                                  lowerDisabled={index === securityScreeningsFields.length - 1}
                                />
                              </Col>
                            )}
                            <Col flex="auto">
                              <Row>
                                {/* Non-editable checkbox */}
                                <div style={{ marginBottom: '5px' }}>
                                  <Controller
                                    name={`security_screenings.${index}.nonEditable`}
                                    control={profileControl}
                                    render={({ field: { onChange, value } }) => (
                                      <Checkbox
                                        onChange={(args) => {
                                          // set this item as significant as well
                                          if (args.target.checked) {
                                            profileSetValue(`security_screenings.${index}.is_significant`, true);
                                          }
                                          if (!args.target.checked) {
                                            profileSetValue('markAllNonEditableSec', false);
                                          }
                                          onChange(args);
                                        }}
                                        checked={value}
                                        disabled={!isCurrentVersion}
                                      >
                                        Non-editable
                                      </Checkbox>
                                    )}
                                  />

                                  <Controller
                                    name={`security_screenings.${index}.is_significant`}
                                    control={profileControl}
                                    render={({ field: { onChange, value } }) => (
                                      <Checkbox
                                        onChange={(args) => {
                                          if (!args.target.checked) {
                                            profileSetValue('markAllSignificantSecurityScreenings', false);
                                          }
                                          onChange(args);
                                        }}
                                        disabled={securityScreenings?.[index].nonEditable || !isCurrentVersion}
                                        checked={value || securityScreenings?.[index].nonEditable}
                                      >
                                        Significant
                                      </Checkbox>
                                    )}
                                  />
                                </div>
                              </Row>
                              {isCurrentVersion ? (
                                <Row gutter={10}>
                                  <Col flex="auto">
                                    {field.tc_is_readonly &&
                                      itemInPickerData(field.text?.toString() ?? '', 'securityScreenings') && (
                                        <div style={{ display: 'flex' }}>
                                          <Typography.Text style={{ flexGrow: 1, width: 0 }}>
                                            {field.text?.toString()}
                                          </Typography.Text>
                                        </div>
                                      )}
                                    <Form.Item
                                      style={{
                                        display:
                                          field.tc_is_readonly &&
                                          itemInPickerData(field.text?.toString() ?? '', 'securityScreenings')
                                            ? 'none'
                                            : 'block',
                                      }}
                                    >
                                      <Controller
                                        control={profileControl}
                                        name={`security_screenings.${index}.text`}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                          <TextArea
                                            autoSize
                                            placeholder="Add a security screenings requirement"
                                            onChange={(event) => {
                                              onChange(event);
                                              debounce(triggerProfileValidation, 300)();
                                            }}
                                            onBlur={onBlur}
                                            value={value?.toString()}
                                          />
                                        )}
                                      />
                                    </Form.Item>
                                  </Col>

                                  <Col flex="none">
                                    <ContextOptionsReadonly
                                      isReadonly={field.tc_is_readonly ?? false}
                                      onEdit={() => {
                                        updateSecurityScreeining(index, {
                                          ...securityScreeningsFields[index],
                                          tc_is_readonly: false,
                                        });
                                        // setValue(`professional_registration_requirements.${index}.is_readonly`, false);
                                      }}
                                      onRemove={() => {
                                        removeSecurityScreening(index);
                                        triggerProfileValidation();
                                      }}
                                    />
                                    {/* <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() => {
                                      removeSecurityScreening(index);
                                      triggerProfileValidation();
                                    }}
                                  /> */}
                                  </Col>
                                </Row>
                              ) : (
                                <Row gutter={10}>
                                  <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                                    {securityScreeningsFields?.[index].text?.toString()}
                                  </Typography.Text>
                                </Row>
                              )}
                            </Col>
                          </Row>
                        ))}
                        {isCurrentVersion ? (
                          <>
                            <WizardValidationError formErrors={profileFormErrors} fieldName="security_screenings" />
                            <Form.Item>
                              <Row>
                                <Col>
                                  <WizardPicker
                                    data={pickerData?.requirementsWithoutReadOnly?.securityScreenings}
                                    fields={securityScreenings}
                                    addAction={appendSecurityScreening}
                                    removeAction={removeSecurityScreening}
                                    triggerValidation={triggerProfileValidation}
                                    title="Security screenings"
                                    buttonText="Browse and add security screenings"
                                    addAsSignificantAndReadonly={true}
                                    tc_is_readonly={true}
                                  />
                                </Col>
                                <Col>
                                  <Button
                                    type="link"
                                    onClick={() =>
                                      appendSecurityScreening({
                                        text: '',
                                        nonEditable: markAllNonEditableSec,
                                        is_significant: markAllSignificantSecurityScreenings || markAllNonEditableSec,
                                      })
                                    }
                                    icon={<PlusOutlined />}
                                  >
                                    Add a custom requirement
                                  </Button>
                                </Col>
                              </Row>
                            </Form.Item>
                          </>
                        ) : (
                          <></>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin" />
                  {/* other requirements */}
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={22} xl={22} xxl={20}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle">
                            <Col>Other requirements</Col>
                          </Row>
                        }
                      >
                        {optionalRequirementsFields.map((field, index) =>
                          isCurrentVersion ? (
                            <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                              {/* up/down controls */}
                              <Col flex="none" className="reorder-controls">
                                <ReorderButtons
                                  index={index}
                                  moveItem={handleOptionalRequirementsMove}
                                  upperDisabled={index === 0}
                                  lowerDisabled={index === optionalRequirementsFields.length - 1}
                                />
                              </Col>
                              <Col flex="auto">
                                <Row>{/* Non-editable checkbox */}</Row>
                                <Row gutter={10}>
                                  <Col flex="auto">
                                    <Form.Item>
                                      <Controller
                                        control={profileControl}
                                        name={`optional_requirements.${index}.text`}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                          <TextArea
                                            autoSize
                                            placeholder="Add an optional requirement"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value?.toString()}
                                          />
                                        )}
                                      />
                                    </Form.Item>
                                  </Col>

                                  <Col flex="none">
                                    <Button
                                      icon={<DeleteOutlined />}
                                      onClick={() => removeOptionalRequirement(index)}
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          ) : (
                            <Row gutter={10}>
                              <Typography.Text style={{ marginBottom: '20px', display: 'block' }}>
                                {optionalRequirementsFields?.[index].text?.toString()}
                              </Typography.Text>
                            </Row>
                          ),
                        )}
                        {isCurrentVersion ? (
                          <Form.Item>
                            <Button
                              type="link"
                              onClick={() => appendOptionalRequirement({ text: '' })}
                              icon={<PlusOutlined />}
                            >
                              Add an optional requirement
                            </Button>
                          </Form.Item>
                        ) : (
                          <></>
                        )}
                      </Form.Item>
                      {/* Todo: if refactoring, need to also add the re-arrange buttons */}
                      {/* <WizardEditProfileArrayField
                        useFormReturn={jobProfileUseFormReturn}
                        label="Optional requirements"
                        fieldName="optional_requirements"
                        testId="optional-requirement"
                        addButtonText="Add an optional requirement"
                      /> */}
                    </Col>
                  </Row>
                </Card>

                <Card title="Behavioural competencies" style={{ marginTop: 16 }} bordered={false}>
                  <BehaviouralComptencyPicker
                    behavioural_competencies_fields={behavioural_competencies_fields}
                    addAction={behavioural_competencies_append}
                    removeAction={behavioural_competencies_remove}
                    validateFunction={triggerProfileValidation}
                    formErrors={profileFormErrors}
                    useFormReturn={jobProfileUseFormReturn}
                    readOnly={!isCurrentVersion}
                  ></BehaviouralComptencyPicker>
                </Card>
              </Form>
            </Col>
          </Row>
        </>
      ),
    },

    {
      key: '4',
      label: 'Actions',
      children: (
        <>
          <Row justify="center" style={{ margin: '1rem 0' }}>
            <Col xs={24} sm={24} md={24} lg={20} xl={16}>
              {/* Save as Draft Card */}
              {state != 'PUBLISHED' && (
                <Card title="Save as Draft">
                  <Typography.Text>Save your progress and come back later to make changes.</Typography.Text>
                  <br></br>
                  <Button
                    type="primary"
                    style={{ marginTop: 16 }}
                    onClick={async () => {
                      await save();
                    }}
                  >
                    Save as Draft
                  </Button>
                </Card>
              )}

              {state == 'PUBLISHED' && isCurrentVersion && (
                <Card title="Save and publish">
                  <Typography.Text>Save your progress and publish changes.</Typography.Text>
                  <br></br>
                  <Button
                    type="primary"
                    style={{ marginTop: 16 }}
                    onClick={async () => {
                      await save();
                    }}
                  >
                    Save and publish
                  </Button>
                </Card>
              )}

              {state == 'PUBLISHED' && !isCurrentVersion && jobProfileMeta?.jobProfileMeta.versions && (
                <Card>
                  <Typography.Title level={5}>Publish</Typography.Title>
                  <Typography.Text>
                    This will replace the existing published version in the job store. If published, it will be Version{' '}
                    {Number(
                      jobProfileMeta?.jobProfileMeta.versions
                        .map((version) => version.version)
                        .sort((a, b) => b - a)[0],
                    ) + 1}
                    .
                  </Typography.Text>
                  <br></br>
                  <Button type="primary" style={{ marginTop: 10 }} onClick={showPublishConfirm}>
                    Publish as latest version
                  </Button>
                </Card>
              )}

              {/* Other Actions Card */}
              <Card style={{ marginTop: 24 }} title="Other Actions">
                {state != 'PUBLISHED' && (
                  <>
                    <Typography.Title level={5}>Publish</Typography.Title>
                    <Typography.Text>
                      Publish the job profile to the Job Store will allow hiring managers view the profile.
                    </Typography.Text>
                    <br></br>
                    <Button type="primary" style={{ marginTop: 10 }} onClick={showPublishConfirm}>
                      Publish Profile
                    </Button>
                    <Divider></Divider>
                  </>
                )}

                {jobProfileMeta?.jobProfileMeta.versions && isCurrentVersion && (
                  <>
                    <Typography.Title level={5}>Download job profile</Typography.Title>
                    <Typography.Text>Download a copy of the job profile.</Typography.Text>
                    <br></br>
                    <DownloadJobProfileComponent
                      jobProfile={profileJson?.jobProfile}
                      style={{ marginTop: 10 }}
                      ignoreAbsentParent={true}
                    ></DownloadJobProfileComponent>
                    <Divider></Divider>
                  </>
                )}

                {state == 'PUBLISHED' && !isCurrentVersion && jobProfileMeta?.jobProfileMeta.versions && (
                  <>
                    <Typography.Title level={5}>Duplicate</Typography.Title>

                    <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                      This will create a draft copy of this version of the job profile.{' '}
                    </Typography.Text>
                    <Button type="primary" style={{ marginTop: 10 }} onClick={duplicate}>
                      Duplicate job profile
                    </Button>
                    <Divider></Divider>
                  </>
                )}

                {state == 'PUBLISHED' && isCurrentVersion && (
                  <>
                    <Typography.Title level={5}>Unpublish</Typography.Title>
                    <Typography.Text>
                      Unpublishing the job profile from the Job Store will remove public access to the profile. After
                      which you can access the profile from the ‘Drafts’ section.
                    </Typography.Text>
                    <br></br>
                    <Button style={{ marginTop: 10 }} onClick={showUnPublishConfirm}>
                      Unpublish profile
                    </Button>
                    <Divider></Divider>
                  </>
                )}

                {!isCurrentVersion && (
                  <>
                    <div>
                      <Typography.Title level={5}>Copy Link</Typography.Title>
                      <p>
                        Share the URL with people who you would like to view this version of the job profile (IDIR
                        restricted).
                      </p>
                      <Space.Compact style={{ width: '70%' }}>
                        <Input
                          readOnly
                          value={`${window.location.origin}/published-job-profiles/${profileJson?.jobProfile.id}?version=${profileJson?.jobProfile.version}`}
                        ></Input>
                        <Button icon={<CopyOutlined />} onClick={handleCopyLink}>
                          Copy URL
                        </Button>
                      </Space.Compact>
                      <Divider></Divider>
                    </div>
                  </>
                )}

                {state == 'PUBLISHED' && (
                  <>
                    <Typography.Title level={5}>View all published profiles</Typography.Title>
                    <Typography.Text>View all published profiles that you have created.</Typography.Text>
                    <br></br>
                    <Button style={{ marginTop: 10 }} onClick={() => navigate('/published-job-profiles')}>
                      Go to published profiles
                    </Button>
                  </>
                )}

                {state != 'PUBLISHED' && (
                  <>
                    <Typography.Title level={5}>View all profiles</Typography.Title>
                    <Typography.Text>View all profiles that you have created.</Typography.Text>
                    <br></br>
                    <Button style={{ marginTop: 10 }} onClick={() => navigate('/draft-job-profiles')}>
                      Go to drafts
                    </Button>
                  </>
                )}
              </Card>
            </Col>
          </Row>
        </>
      ),
    },
  ];
  if (jobProfileMeta)
    tabItems.push(
      jobProfileMeta && {
        key: '5',
        label: 'Info',
        children: (
          <>
            {/* <Card title="">
          <Typography.Text>Total Views</Typography.Text>
          <br></br>
        </Card>
         */}

            <Row
              style={{
                marginTop: '24px',
                marginBottom: '24px',
                marginLeft: '48px',
                marginRight: '48px',
                paddingLeft: '0',
              }}
              gutter={12}
            >
              <Col className="gutter-row" span={24}>
                <Card
                  bodyStyle={{
                    padding: '0',
                    backgroundColor: '#F0F2F5',
                    borderRadius: '8px',
                    border: '1px solid #D9D9D9',
                  }}
                >
                  <Card.Meta
                    title={
                      <>
                        Version
                        {' ' + profileJson?.jobProfile.version + ' '}
                        {isCurrentVersion && <Tag color={'green'}>Latest</Tag>}
                      </>
                    }
                    style={{
                      padding: '16px',
                      backgroundColor: 'white',
                    }}
                  ></Card.Meta>
                  <Descriptions
                    className="customDescriptions"
                    bordered
                    column={24}
                    items={[
                      {
                        key: 'updated by',
                        label: <Typography.Title level={3}>Updated by</Typography.Title>,
                        children: <span tabIndex={0}>{profileJson?.jobProfile?.updated_by?.name}</span>,
                        span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
                      },
                      {
                        key: 'updated at',
                        label: <Typography.Title level={3}>Updated at</Typography.Title>,
                        children: (
                          <span tabIndex={0}>
                            {profileJson?.jobProfile?.updated_at &&
                              new Intl.DateTimeFormat('en-CA', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                hour12: false,
                                minute: '2-digit',
                                second: '2-digit',
                              }).format(new Date(profileJson?.jobProfile?.updated_at))}
                          </span>
                        ),
                        span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
                      },
                    ]}
                    labelStyle={{
                      fontWeight: 700,
                      verticalAlign: 'top',
                      background: '#FAFAFA',
                    }}
                    contentStyle={{
                      background: 'white',
                      verticalAlign: 'top',
                    }}
                    style={{ marginBottom: '-12px', padding: '12px' }}
                  />
                  <Card
                    style={{
                      margin: '12px',
                    }}
                  >
                    <Row justify="center" align="middle">
                      <Col
                        span={8}
                        style={{
                          padding: '8px',
                          textAlign: 'center',
                        }}
                      >
                        Views
                      </Col>

                      <Col
                        span={8}
                        style={{
                          padding: '8px',
                          textAlign: 'center',
                        }}
                      >
                        In Review
                      </Col>
                      <Col
                        span={8}
                        style={{
                          padding: '8px',
                          textAlign: 'center',
                        }}
                      >
                        Completed
                      </Col>
                    </Row>
                    <Row justify="center" align="middle">
                      <Col
                        span={8}
                        style={{
                          padding: '4px',
                        }}
                      >
                        <Typography style={{ fontSize: '24px', textAlign: 'center' }}>
                          {profileJson?.jobProfile?.views}
                        </Typography>
                      </Col>
                      <Col
                        span={8}
                        style={{
                          padding: '4px',
                        }}
                      >
                        <Typography style={{ fontSize: '24px', textAlign: 'center' }}>{versionInReview}</Typography>
                      </Col>

                      <Col
                        span={8}
                        style={{
                          padding: '4px',
                        }}
                      >
                        <Typography style={{ fontSize: '24px', textAlign: 'center' }}>{versionCompleted}</Typography>
                      </Col>
                    </Row>
                  </Card>
                </Card>
              </Col>
            </Row>
            <Card
              style={{
                marginTop: '24px',
                marginBottom: '24px',
                marginLeft: '48px',
                marginRight: '48px',
                paddingLeft: '0',
              }}
              bodyStyle={{
                padding: '0',
                backgroundColor: '#F0F2F5',
                borderRadius: '8px',
                border: '1px solid #D9D9D9',
              }}
            >
              <Card.Meta
                title="All versions"
                style={{
                  padding: '16px',
                  backgroundColor: 'white',
                }}
              ></Card.Meta>
              <Descriptions
                className="customDescriptions"
                bordered
                column={24}
                items={[
                  // {
                  //   key: 'Last updated by',
                  //   label: <Typography.Title level={3}>Last updated by</Typography.Title>,
                  //   children: <span tabIndex={0}>{profileJson?.jobProfile?.updated_by?.name}</span>,
                  //   span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
                  // },
                  // {
                  //   key: 'Last updated at',
                  //   label: <Typography.Title level={3}>Last updated at</Typography.Title>,
                  //   children: <span tabIndex={0}>{profileJson?.jobProfile?.updated_at}</span>,
                  //   span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
                  // },
                  {
                    key: 'First published by',
                    label: <Typography.Title level={3}>First published by</Typography.Title>,
                    children: <span tabIndex={0}>{jobProfileMeta?.jobProfileMeta.firstPublishedBy?.user}</span>,
                    span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
                  },
                  {
                    key: 'First published at',
                    label: <Typography.Title level={3}>First published at</Typography.Title>,
                    children: (
                      <span tabIndex={0}>
                        {jobProfileMeta?.jobProfileMeta.firstPublishedBy?.date &&
                          new Intl.DateTimeFormat('en-CA', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            hour12: false,
                            minute: '2-digit',
                            second: '2-digit',
                          }).format(new Date(jobProfileMeta.jobProfileMeta.firstPublishedBy.date))}
                      </span>
                    ),
                    span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
                  },
                  {
                    key: 'Created by',
                    label: <Typography.Title level={3}>Created by</Typography.Title>,
                    children: <span tabIndex={0}>{jobProfileMeta?.jobProfileMeta.firstCreatedBy?.owner ?? ''}</span>,
                    span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
                  },
                  {
                    key: 'Created at',
                    label: <Typography.Title level={3}>Created at</Typography.Title>,
                    children: (
                      <span tabIndex={0}>
                        {jobProfileMeta?.jobProfileMeta.firstCreatedBy?.date &&
                          new Intl.DateTimeFormat('en-CA', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            hour12: false,
                            minute: '2-digit',
                            second: '2-digit',
                          }).format(new Date(jobProfileMeta.jobProfileMeta.firstCreatedBy.date))}
                      </span>
                    ),
                    span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
                  },
                ]}
                labelStyle={{
                  fontWeight: 700,
                  verticalAlign: 'top',
                  background: '#FAFAFA',
                }}
                contentStyle={{
                  background: 'white',
                  verticalAlign: 'top',
                }}
                style={{ marginBottom: '-12px', padding: '12px' }}
              />
              <Card
                style={{
                  margin: '12px',
                }}
              >
                <Row justify="center" align="middle">
                  <Col
                    span={8}
                    style={{
                      padding: '8px',
                      textAlign: 'center',
                    }}
                  >
                    Total views
                  </Col>

                  <Col
                    span={8}
                    style={{
                      padding: '8px',
                      textAlign: 'center',
                    }}
                  >
                    In Review
                  </Col>
                  <Col
                    span={8}
                    style={{
                      padding: '8px',
                      textAlign: 'center',
                    }}
                  >
                    Completed
                  </Col>
                </Row>
                <Row justify="center" align="middle">
                  <Col
                    span={8}
                    style={{
                      padding: '4px',
                    }}
                  >
                    <Typography style={{ fontSize: '24px', textAlign: 'center' }}>
                      {jobProfileMeta?.jobProfileMeta.totalViews}
                    </Typography>
                  </Col>
                  <Col
                    span={8}
                    style={{
                      padding: '4px',
                    }}
                  >
                    <Typography style={{ fontSize: '24px', textAlign: 'center' }}>{totalInReview}</Typography>
                  </Col>

                  <Col
                    span={8}
                    style={{
                      padding: '4px',
                    }}
                  >
                    <Typography style={{ fontSize: '24px', textAlign: 'center' }}>{totalCompleted}</Typography>
                  </Col>
                </Row>
              </Card>
            </Card>
          </>
        ),
      },
    );

  // console.log('isLoadingJobProfile: ', isLoadingJobProfile, isFetchingJobProfile);
  // console.log('loading: ', isLoadingJobProfile, isFetchingJobProfile, isLazyLoading, isLazyFetching);

  if (
    !ministriesData ||
    // (id && (isLoadingJobProfile || isFetchingJobProfile)) ||
    !allMinistriesData ||
    !jobFamiliesData ||
    !jobProfileStreamsData ||
    !treeData ||
    !employeeGroupData ||
    !classificationsData ||
    !jobRolesData ||
    !jobProfileScopes ||
    !jobProfileMinimumRequirements
  )
    return <LoadingSpinnerWithMessage />;

  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <StickyBox style={{ zIndex: 1 }}>
      <DefaultTabBar {...props} />
      {jobProfileMeta && !isCurrentVersion && (
        <Alert
          banner
          message={
            <>
              You are viewing an older version of this job profile. To go to the latest version, click the link:{' '}
              <Link to={link + [...jobProfileMeta.jobProfileMeta.versions].sort((a, b) => b.version - a.version)[0].id}>
                Version {[...jobProfileMeta.jobProfileMeta.versions].sort((a, b) => b.version - a.version)[0].version}
              </Link>
            </>
          }
          style={{ marginLeft: '-1rem', marginRight: '-1rem' }}
        ></Alert>
      )}
    </StickyBox>
  );
  return (
    <>
      <PageHeader
        title={
          location.pathname.startsWith('/draft-job-profiles') && title.trim() == ''
            ? 'New profile'
            : !location.pathname.startsWith('/draft-job-profiles') && title.trim() == ''
              ? 'Untitled'
              : title
        }
        showButton1
        showButton2
        button1Content={getMenuContent}
        button2Text={state == 'PUBLISHED' ? 'Save and publish' : 'Save as draft'}
        button2Callback={async () => {
          await save();
        }}
        versions={jobProfileMeta?.jobProfileMeta}
        selectVersionCallback={(selectedVersion: IdVersion) => {
          setId(selectedVersion.id.toString());
          setVersion(selectedVersion.version.toString());
          navigate('/published-job-profiles/' + selectedVersion.id + '?version=' + selectedVersion.version);
        }}
      />

      <ContentWrapper>
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          tabBarStyle={{ backgroundColor: '#fff', margin: '0 -1rem', padding: '0 1rem 0px 1rem' }}
          renderTabBar={renderTabBar}
        />
      </ContentWrapper>
    </>
  );
};
