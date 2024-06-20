/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
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
  Divider,
  Form,
  Input,
  List,
  Menu,
  Modal,
  Radio,
  Row,
  Select,
  Switch,
  Tabs,
  Tooltip,
  TreeSelect,
  Typography,
  message,
  notification,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import copy from 'copy-to-clipboard';
import debounce from 'lodash.debounce';
import { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
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
  OrganizationConnectInput,
  ProfessionsModel,
  TrackedFieldArrayItem,
} from '../../../redux/services/graphql-api/job-profile-types';
import {
  useCreateOrUpdateJobProfileMutation,
  useDuplicateJobProfileMutation,
  useGetJobProfilesDraftsMinistriesQuery,
  useGetRequirementsWithoutReadOnlyQuery,
  useLazyGetJobProfileQuery,
  useLazyGetNextAvailableJobProfileNumberQuery,
  useLazyIsJobProfileNumberAvailableQuery,
} from '../../../redux/services/graphql-api/job-profile.api';
import { useGetJobRolesQuery } from '../../../redux/services/graphql-api/job-role.api';
import { useGetOrganizationsQuery } from '../../../redux/services/graphql-api/organization';
import { FormItem } from '../../../utils/FormItem';
import ContentWrapper from '../../home/components/content-wrapper.component';
import { JobProfileValidationModel, TitleField } from '../../job-profiles/components/job-profile.component';
import { IsIndigenousCompetency } from '../../wizard/components/is-indigenous-competency.component';
import BehaviouralComptencyPicker from '../../wizard/components/wizard-behavioural-comptency-picker';
import WizardOverview from '../../wizard/components/wizard-edit-profile-overview';
import WizardProgramOverview from '../../wizard/components/wizard-edit-profile-program-overview';
import WizardTitle from '../../wizard/components/wizard-edit-profile-title';
import WizardValidationError from '../../wizard/components/wizard-edit-profile-validation-error';
import WizardProfessionalRegistrationPicker from '../../wizard/components/wizard-professional-registration-picker';
import JobStreamDiscipline from './jobstream-discipline.component';
import ReorderButtons from './reorder-buttons';

const { Option } = Select;
const { Text } = Typography;

const employeeGroupIds: string[] = ['MGT', 'GEU', 'OEX', 'NUR', 'PEA'];

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
}

interface TotalCompCreateProfileComponentProps {
  jobProfileData: GetJobProfileResponse | undefined;
  id: string | undefined;
  setId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const TotalCompCreateProfileComponent: React.FC<TotalCompCreateProfileComponentProps> = ({
  jobProfileData,
  id,
  setId,
}) => {
  const { id: urlId } = useParams();
  const navigate = useNavigate();

  const [profileJson, setProfileJson] = useState<any>(null);

  const [triggerGetJobProfile, { data: lazyJobProfile }] = useLazyGetJobProfileQuery();
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
      const res = await duplicateJobProfile({ jobProfileId: jobProfileData?.jobProfile.id }).unwrap();
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
              <Menu.Item key="delete" onClick={showUnPublishConfirm}>
                <div style={{ padding: '5px 0' }}>
                  Unpublish
                  <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
                    Remove the job profile from the Job Store.{' '}
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
    }
  }, [lazyJobProfile]);

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

  const basicUseFormReturn = useForm<JobProfileValidationModel>({
    resolver: classValidatorResolver(JobProfileValidationModel),
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

  // PICKER DATA
  const { data: professionalRequirementsPickerData } = useGetRequirementsWithoutReadOnlyQuery({
    jobFamilyIds: selectedProfession.map((p) => p.jobFamily),
    jobFamilyStreamIds: selectedProfession.map((p) => p.jobStreams).flat(),
  });

  // PROFILE FORM

  // console.log('useForm? : ', jobProfileData?.jobProfile.accountabilities);

  // console.log(
  //   'jobProfileData?.jobProfile.professional_registration_requirements: ',
  //   jobProfileData?.jobProfile.professional_registration_requirements,
  // );

  const jobProfileUseFormReturn = useForm<JobProfileValidationModel>({
    resolver: classValidatorResolver(JobProfileValidationModel),
    defaultValues: {
      state: '',
      overview: { text: '' } as TrackedFieldArrayItem,
      program_overview: { text: '' } as TrackedFieldArrayItem,
      accountabilities: jobProfileData?.jobProfile.accountabilities.map(
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
      professional_registration_requirements: jobProfileData?.jobProfile.professional_registration_requirements,
      optional_requirements: jobProfileData?.jobProfile.optional_requirements.map((r: any) => ({ text: r })),
      preferences: jobProfileData?.jobProfile.preferences.map((p: any) => ({ text: p })),
      knowledge_skills_abilities: jobProfileData?.jobProfile.knowledge_skills_abilities.map((k: any) => ({ text: k })),
      willingness_statements: jobProfileData?.jobProfile.willingness_statements.map((w: any) => ({ text: w })),
      security_screenings: jobProfileData?.jobProfile.security_screenings.map(
        (s) =>
          ({
            text: s.text,
            nonEditable: s.is_readonly,
          }) as SecurityScreeningItem,
      ),
      behavioural_competencies: jobProfileData?.jobProfile.behavioural_competencies.map((bc) => ({
        behavioural_competency: bc.behavioural_competency,
      })),
      markAllNonEditable: false,
      markAllSignificant: false,
      markAllNonEditableEdu: false,
      markAllSignificantEdu: false,
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
      triggerBasicDetailsValidation();
      triggerProfileValidation();
    }
  }, [jobProfileData, triggerBasicDetailsValidation, triggerProfileValidation]);

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

  const selectedClassificationId = watch('classification');

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

  useEffect(() => {
    // console.log('jobProfileData: ', jobProfileData);
    if (jobProfileData) {
      // console.log('setting values..');
      // Basic Details Form
      setValue('title.text', jobProfileData.jobProfile.title as string);
      setValue('jobStoreNumber', jobProfileData.jobProfile.number.toString());
      setValue('originalJobStoreNumber', jobProfileData.jobProfile.number.toString());

      setValue('employeeGroup', jobProfileData.jobProfile.total_comp_create_form_misc?.employeeGroup ?? null);
      const rawClassification = jobProfileData.jobProfile?.classifications?.[0]?.classification ?? null;
      if (rawClassification != null) {
        const { id, employee_group_id, peoplesoft_id } = rawClassification;
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
        setValue('jobContext', jobProfileData.jobProfile.context.description);
      }

      // Professions (assuming it's an array of jobFamily and jobStreams)
      // if (jobProfileData.jobProfile.jobFamilies && jobProfileData.jobProfile.streams) {
      //   const professionsData = jobProfileData.jobProfile.jobFamilies.map((family) => ({
      //     jobFamily: family.jobFamily.id,
      //     jobStreams: jobProfileData.jobProfile.streams
      //       .filter((stream) => stream.stream.job_family_id === family.jobFamily.id)
      //       .map((stream) => stream.stream.id),
      //   }));

      //   if (professionsData.length == 0) {
      //     // set to [{ jobFamily: -1, jobStreams: [] }] as ProfessionsModel[]
      //     setValue('professions', [{ jobFamily: -1, jobStreams: [] }] as ProfessionsModel[]);
      //   } else {
      //     setValue('professions', professionsData);
      //   }

      //   // professions: ,
      // }

      // Profile Form
      if (jobProfileData.jobProfile.state) profileSetValue('state', jobProfileData.jobProfile.state);

      profileSetValue('overview.text', jobProfileData.jobProfile.overview as string);
      profileSetValue('program_overview.text', jobProfileData.jobProfile.program_overview as string);

      // console.log(
      //   'setting accountabilities: ',
      //   jobProfileData.jobProfile.accountabilities.map(
      //     (a) =>
      //       ({
      //         text: a.text,
      //         nonEditable: a.is_readonly,
      //         significant: a.is_significant,
      //       }) as AccountabilityItem,
      //   ),
      // );
      // profileSetValue(
      //   'accountabilities',
      //   jobProfileData.jobProfile.accountabilities.map(
      //     (a) =>
      //       ({
      //         text: a.text,
      //         nonEditable: a.is_readonly,
      //         significant: a.is_significant,
      //       }) as AccountabilityItem,
      //   ),
      // );
      // profileSetValue(
      //   'education',
      //   jobProfileData.jobProfile.education?.map(
      //     (r) =>
      //       ({
      //         text: r.text,
      //         nonEditable: r.is_readonly,
      //         significant: r.is_significant,
      //       }) as AccountabilityItem,
      //   ),
      // );
      // profileSetValue(
      //   'job_experience',
      //   jobProfileData.jobProfile.job_experience?.map(
      //     (r) =>
      //       ({
      //         text: r.text,
      //         nonEditable: r.is_readonly,
      //         significant: r.is_significant,
      //       }) as AccountabilityItem,
      //   ),
      // );
      // profileSetValue(
      //   'professional_registration_requirements',
      //   jobProfileData.jobProfile.professional_registration_requirements.map((r: any) => ({ text: r })),
      // );
      // profileSetValue(
      //   'optional_requirements',
      //   jobProfileData.jobProfile.optional_requirements.map((r: any) => ({ text: r })),
      // );
      // profileSetValue(
      //   'preferences',
      //   jobProfileData.jobProfile.preferences.map((p: any) => ({ text: p })),
      // );
      // profileSetValue(
      //   'optional_requirements',
      //   jobProfileData.jobProfile.knowledge_skills_abilities.map((k: any) => ({ text: k })),
      // );
      // profileSetValue(
      //   'willingness_statements',
      //   jobProfileData.jobProfile.willingness_statements.map((w: any) => ({ text: w })),
      // );
      // profileSetValue(
      //   'security_screenings',
      //   jobProfileData.jobProfile.security_screenings.map(
      //     (s) =>
      //       ({
      //         text: s.text,
      //         nonEditable: s.is_readonly,
      //       }) as SecurityScreeningItem,
      //   ),
      // );

      const allReportsToValue = jobProfileData.jobProfile.all_reports_to;
      setValue('all_reports_to', allReportsToValue);

      if (allReportsToValue) {
        // If 'all_reports_to' is true, set 'reportToRelationship' to all possible values
        const allValues = getAllTreeValues(treeDataConverted);
        setValue('reportToRelationship', allValues);
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

  const updateNonEditableEdu = (nonEditable: boolean) => {
    const updatedExperiences = educations?.map((field) => ({
      ...field,
      nonEditable: nonEditable,
      is_significant: nonEditable ? true : false,
    }));
    profileSetValue('education', updatedExperiences as AccountabilityItem[]);
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
    }));
    profileSetValue('security_screenings', securityScreeningsUpdated as SecurityScreeningItem[]);
  };

  const allOrganizations = watch('all_organizations');

  const state = profileWatch('state');
  const markAllNonEditable = profileWatch('markAllNonEditable');
  const markAllNonEditableEdu = profileWatch('markAllNonEditableEdu');
  const markAllSignificantEdu = profileWatch('markAllSignificantEdu');
  const markAllNonEditableJob_experience = profileWatch('markAllNonEditableJob_experience');
  const markAllSignificantJob_experience = profileWatch('markAllSignificantJob_experience');

  const markAllNonEditableSec = profileWatch('markAllNonEditableSec');
  // const markAllNonEditableProfReg = profileWatch('markAllNonEditableProfReg');

  const markAllSignificant = profileWatch('markAllSignificant');
  const accountabilities = profileWatch('accountabilities');
  const securityScreenings = profileWatch('security_screenings');
  const educations = profileWatch('education');
  const job_experiences = profileWatch('job_experience');

  // education
  const {
    fields: educationAndWorkExperienceFields,
    append: appendEducationAndWorkExperience,
    remove: removeEducationAndWorkExperience,
    move: moveEducationAndWorkExperience,
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
  } = useFieldArray({
    control: profileControl,
    name: 'professional_registration_requirements',
  });

  console.log('professionalRegistrationRequirementsFields:', professionalRegistrationRequirementsFields);

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

  // minimum requirements that change in reponse to classification changes
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data: jobProfileMinimumRequirements } = useGetJobProfileMinimumRequirementsQuery();

  // Handler for classification change
  const handleClassificationChange = (newValue: string | null) => {
    // if this classification exists in reportToRelationship, remove it

    const currentReportToRelationship = getBasicDetailsValues('reportToRelationship');
    const filteredReportToRelationship = currentReportToRelationship.filter((r: string) => r !== newValue);
    setValue('reportToRelationship', filteredReportToRelationship);

    if (selectedClassificationId) {
      setIsModalVisible(true);
    } else {
      updateMinimumRequirementsFromClassification(newValue);
    }
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
          .map((req) => ({ text: req.requirement, nonEditable: false, is_significant: true }));

        // console.log('filteredRequirements: ', filteredRequirements);
        // Update the educationAndWorkExperiences field array
        profileSetValue('education', filteredRequirements);
      }
    }
  };
  // Handler for confirming classification change
  const handleConfirmChange = async () => {
    setIsModalVisible(false);
    updateMinimumRequirementsFromClassification(selectedClassificationId);
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
          .filter((acc: { text: string }) => acc.text.trim() !== ''),
        education: formData.education
          .map((a: any) => ({
            text: a.text,
            is_readonly: a.nonEditable,
            is_significant: a.is_significant,
          }))
          .filter((acc: { text: string }) => acc.text.trim() !== ''),
        job_experience: formData.job_experience
          .map((a: any) => ({
            text: a.text,
            is_readonly: a.nonEditable,
            is_significant: a.is_significant,
          }))
          .filter((acc: { text: string }) => acc.text.trim() !== ''),
        professional_registration_requirements: formData.professional_registration_requirements
          .map((p: any) => p.professional_registration_requirement)
          .filter((acc: any) => acc.text.trim() !== ''),
        optional_requirements: formData.optional_requirements
          .map((o: any) => o.text)
          .filter((acc: string) => acc.trim() !== ''),
        preferences: formData.preferences.map((p: any) => p.text).filter((acc: string) => acc.trim() !== ''),
        knowledge_skills_abilities: formData.knowledge_skills_abilities
          .map((k: any) => k.text)
          .filter((acc: string) => acc.trim() !== ''),
        willingness_statements: formData.willingness_statements
          .map((w: any) => w.text)
          .filter((acc: string) => acc.trim() !== ''),
        security_screenings: formData.security_screenings
          .map((a: any) => ({
            text: a.text,
            is_readonly: a.nonEditable,
          }))
          .filter((acc: { text: string }) => acc.text.trim() !== ''),
        all_reports_to: formData.all_reports_to,
        all_organizations: formData.all_organizations,
        total_comp_create_form_misc: {
          markAllNonEditable: formData.markAllNonEditable,
          markAllSignificant: formData.markAllSignificant,
          markAllNonEditableEdu: formData.markAllNonEditableEdu,
          markAllSignificantEdu: formData.markAllSignificantEdu,
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
        context: { create: { description: formData.jobContext } },
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
      },
      id: parseInt(id ?? ''),
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

    const combinedData = {
      ...basicDetails,
      ...profileDetails,
      // Set the state based on whether the job profile is being published
      state: isPublishing ? 'PUBLISHED' : null,
    };

    if (isPublishing) profileSetValue('state', 'PUBLISHED');
    if (isUnpublishing) {
      combinedData.state = 'DRAFT';
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
          if (!error?.text?.message || !error?.text?.message.toString().startsWith('Title must be between'))
            return null;

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

  console.log(
    'selectedProfession:',
    selectedProfession,
    selectedProfession.map((p) => p.jobFamily),
    selectedProfession.map((p) => p.jobStreams).flat(),
  );

  const handleStreamOrFamilyRemoval = useCallback(() => {
    if (!professionalRequirementsPickerData) return;

    // console.log('handleStreamOrFamilyRemoval');

    // // Get the updated list of professional registrations that would appear in the pick list
    // console.log('professionalRequirementsPickerData:', professionalRequirementsPickerData);
    // console.log('professionalRegistrationRequirementsFields: ', professionalRegistrationRequirementsFields);

    // console.log('professionsFields??:', professionsFields);

    const jobFamilyIds = selectedProfession.map((p) => p.jobFamily);
    const jobFamilyStreamIds = selectedProfession.map((p) => p.jobStreams).flat();

    // console.log('jobFamilyIds: ', jobFamilyIds);
    // console.log('jobFamilyStreamIds: ', jobFamilyStreamIds);

    const idsToRemove = professionalRegistrationRequirementsFields
      .filter((field) => {
        // console.log('checking field: ', field);
        if (field.is_readonly) {
          // console.log('is readonly');
          const item = professionalRequirementsPickerData.requirementsWithoutReadOnly.find(
            (data: any) => data.text === field.text,
          );

          // console.log('found item by text: ', item);

          if (item) {
            const itemJobFamilies = item.jobFamilies.map((jf: any) => jf.id);
            const itemStreams = item.streams.map((s: any) => s.id);

            // console.log('itemJobFamilies: ', itemJobFamilies);
            // console.log('itemStreams: ', itemStreams);

            const isJobFamilyAllowed = itemJobFamilies.some((jf: any) => jobFamilyIds.includes(jf));
            const isStreamAllowed = itemStreams.some((s: any) => jobFamilyStreamIds.includes(s));

            // console.log('isJobFamilyAllowed: ', isJobFamilyAllowed);
            // console.log('isStreamAllowed: ', isStreamAllowed);

            return !(isJobFamilyAllowed && isStreamAllowed);
          } else {
            // item was not found - likely because we re-fetched the picklist data and it's no longer in the list
            return true;
          }
        }
        return false;
      })
      .map((field) => field.text);

    // console.log('idsToRemove: ', idsToRemove);

    const indexesToRemove = idsToRemove.map((text) =>
      professionalRegistrationRequirementsFields.findIndex((field) => field.is_readonly && field.text === text),
    );

    // console.log('indexesToRemove: ', indexesToRemove);
    // Remove the professional registrations that no longer apply
    // per documentaion this should work without timeout, however for some reason it doesn't
    // delay removal
    if (indexesToRemove.length > 0) {
      const timeoutId = setTimeout(() => {
        removeProfessionalRegistrationRequirement(indexesToRemove);
      }, 0);
      return () => {
        clearTimeout(timeoutId);
      };
    }
    // refetchProfessionalRequirementsPickerData();
  }, [
    professionalRegistrationRequirementsFields,
    professionalRequirementsPickerData,
    // professionsFields,
    removeProfessionalRegistrationRequirement,
    selectedProfession,
  ]);

  useEffect(() => {
    // console.log('selectedProfession: ', selectedProfession);
    // if (selectedProfession.length == 2) return;

    // // per documentaion this should work without timeout, however for some reason it doesn't
    // // delay removal
    // const timeoutId = setTimeout(() => {
    //   console.log('REMOVING');
    //   removeProfessionalRegistrationRequirement(2);
    // }, 0);

    // return () => {
    //   clearTimeout(timeoutId);
    // };

    handleStreamOrFamilyRemoval();
  }, [selectedProfession, handleStreamOrFamilyRemoval]);

  // useEffect(() => {
  //   // console.log('counter: ', counter);
  //   if (counter == 1) removeProfessionalRegistrationRequirement(2);
  // }, [counter, removeProfessionalRegistrationRequirement]);

  const tabItems = [
    {
      key: '1',
      label: 'Basic details',
      children: (
        <>
          <Modal
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
          </Modal>
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
                      <FormItem control={control} name="jobStoreNumber">
                        <label style={srOnlyStyle} htmlFor="jobStoreNumber">
                          JobStore Number
                        </label>
                        <Input
                          placeholder="Ex.: 1001"
                          aria-label="JobStore Number"
                          addonBefore={
                            <Tooltip title="Fetch Next Available Number">
                              {fetchingNextNumber ? <LoadingOutlined /> : <ReloadOutlined onClick={fetchNextNumber} />}
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
                    </Col>
                  </Row>
                </Card>

                <Card title="Classification" style={{ marginTop: 16 }} bordered={false}>
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      <Form.Item label="Employee group" labelCol={{ className: 'card-label' }}>
                        <Controller
                          name="employeeGroup"
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => {
                            return (
                              <Select
                                placeholder="Choose an employee group"
                                onChange={(arg) => {
                                  // console.log('arg employee group: ', arg);
                                  // Filter classifications based on the selected employee group
                                  // Clear the classification selection
                                  setValue('classification', null);

                                  // Call the original onChange to update the form state
                                  onChange(arg);
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
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin" />

                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      <Form.Item label="Classification" labelCol={{ className: 'card-label' }}>
                        {/* Form.Item for cosmetic purposes */}
                        <Controller
                          name="classification"
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => {
                            return (
                              <Select
                                placeholder="Choose a classification"
                                onChange={(newValue) => {
                                  onChange(newValue);
                                  handleClassificationChange(newValue);
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
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Card title="Type" style={{ marginTop: 16 }} bordered={false}>
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      <Form.Item label="Job role" labelCol={{ className: 'card-label' }}>
                        <Controller
                          name="jobRole"
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              placeholder="Choose a job role"
                              onChange={onChange}
                              onBlur={onBlur}
                              value={value}
                              options={jobRolesData?.jobRoles.map((jobRole) => ({
                                label: jobRole.name,
                                value: jobRole.id,
                              }))}
                            ></Select>
                          )}
                        />
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
                      {professionsFields.map((field, index: number) => (
                        <div key={field.id}>
                          <Form.Item style={{ marginBottom: '0.5rem' }}>
                            {/* First level of selection for job family /profession */}
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
                                          },
                                        });
                                      }}
                                      icon={<DeleteOutlined />}
                                    ></Button>
                                  </Col>
                                </Row>
                              )}
                            />
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
                      ))}
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
                    </Col>
                  </Row>
                </Card>

                <Card title="Additional information" style={{ marginTop: 16 }} bordered={false}>
                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      {/* Role Radio Buttons */}
                      <Form.Item label="Role" labelCol={{ className: 'card-label' }}>
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
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider className="hr-reduced-margin" />

                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      {/* Report-to relationship Select */}

                      <Form.Item label="Report-to relationship" labelCol={{ className: 'card-label' }}>
                        <Controller
                          name="reportToRelationship"
                          control={control}
                          render={({ field }) => (
                            <>
                              <Checkbox
                                onChange={(e) => handleSelectAllReportTo(e.target.checked)}
                                checked={allReportsTo}
                                style={{ marginBottom: '10px' }}
                              >
                                Select all
                              </Checkbox>
                              <TreeSelect
                                {...field}
                                onChange={(selectedItems) => {
                                  setValue('all_reports_to', false);
                                  field.onChange(selectedItems); // Continue with the original onChange
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
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin" />

                  <Row justify="start">
                    <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                      {/* Scopes of Responsibility Select */}
                      <Form.Item label="Scope of Responsibility" labelCol={{ className: 'card-label' }}>
                        <Controller
                          name="scopeOfResponsibility"
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => {
                            return (
                              <Select
                                placeholder="Choose the scopes of responsibility"
                                onChange={onChange}
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
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                setValue={setValue}
                                allOrganizations={allOrganizations}
                              />
                            </>
                          )}
                        />
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
                              <Switch checked={value} onChange={onChange} ref={ref} />
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
                      <Controller
                        control={control}
                        name="jobContext"
                        render={({ field }) => (
                          <ReactQuill {...field} modules={quill_modules} theme="snow" placeholder="Add job context" />
                        )}
                      />
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
          <Row justify="center" style={{ margin: '1rem 0' }}>
            <Col xs={24} sm={24} md={24} lg={20} xl={16}>
              <Form layout="vertical">
                <WizardOverview
                  trigger={triggerProfileValidation}
                  formErrors={profileFormErrors}
                  useFormReturn={jobProfileUseFormReturn}
                />

                <WizardProgramOverview
                  trigger={triggerProfileValidation}
                  formErrors={profileFormErrors}
                  useFormReturn={jobProfileUseFormReturn}
                />

                <Card title="Accountabilities" style={{ marginTop: 16 }} bordered={false}>
                  {/* Required accountabilities */}
                  <Row justify="start">
                    <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                            <Col>
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
                            </Col>
                          </Row>
                        }
                      >
                        {accountabilitiesFields.map((field, index) => (
                          <Row align="top" key={field.id} gutter={16}>
                            {/* up/down controls */}
                            <Col flex="none" className="reorder-controls">
                              <ReorderButtons
                                index={index}
                                moveItem={handleMove}
                                upperDisabled={index === 0}
                                lowerDisabled={index === accountabilitiesFields.length - 1}
                              />
                            </Col>
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
                                          disabled={accountabilities?.[index].nonEditable}
                                          checked={value || accountabilities?.[index].nonEditable}
                                        >
                                          Significant
                                        </Checkbox>
                                      );
                                    }}
                                  />
                                </div>
                              </Row>
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
                            </Col>
                          </Row>
                        ))}
                        <Form.Item>
                          <WizardValidationError formErrors={profileFormErrors} fieldName="accountabilities" />
                          <Button
                            type="link"
                            onClick={() =>
                              appendAccountability({
                                text: '',
                                nonEditable: markAllNonEditable,
                                is_significant: markAllSignificant,
                              })
                            }
                            icon={<PlusOutlined />}
                          >
                            Add an accountability
                          </Button>
                        </Form.Item>
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
                  <Alert
                    className="custom-alert"
                    role="note"
                    style={{ margin: '0 -24px 24px', borderRadius: '0', paddingBottom: '10px', paddingTop: '10px' }}
                    message=""
                    description="Some information may have been added based on the details you have already provided."
                    type="info"
                    showIcon
                  />

                  {/* Eduction */}

                  <Row justify="start">
                    <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                            <Col>Education and work experience</Col>
                            <Col>
                              <Form.Item style={{ margin: 0 }}>
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
                              </Form.Item>
                            </Col>
                          </Row>
                        }
                      >
                        {educationAndWorkExperienceFields.map((field, index) => (
                          <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                            {/* up/down controls */}
                            <Col flex="none" className="reorder-controls">
                              <ReorderButtons
                                index={index}
                                moveItem={handleEducationAndWorkExperienceMove}
                                upperDisabled={index === 0}
                                lowerDisabled={index === educationAndWorkExperienceFields.length - 1}
                              />
                            </Col>
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
                                        disabled={educations?.[index].nonEditable}
                                        checked={value || educations?.[index].nonEditable}
                                      >
                                        Significant
                                      </Checkbox>
                                    )}
                                  />
                                </div>
                              </Row>
                              <Row gutter={10}>
                                <Col flex="auto">
                                  <Form.Item>
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
                                  <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() => {
                                      removeEducationAndWorkExperience(index);
                                      triggerProfileValidation();
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}

                        <WizardValidationError formErrors={profileFormErrors} fieldName="education" />

                        <Form.Item>
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
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Related experience */}
                  <Row justify="start">
                    <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                            <Col>Related experience</Col>
                            <Col>
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
                                          disabled={job_experienceFields.length === 0}
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
                                          checked={markAllSignificantJob_experience || markAllNonEditableJob_experience}
                                          onChange={(e) => {
                                            field.onChange(e.target.checked);
                                            updateSignificantJob_experience(e.target.checked);
                                          }}
                                          disabled={
                                            markAllNonEditableJob_experience || job_experienceFields.length === 0
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
                          </Row>
                        }
                      >
                        {job_experienceFields.map((field, index) => (
                          <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                            {/* up/down controls */}
                            <Col flex="none" className="reorder-controls">
                              <ReorderButtons
                                index={index}
                                moveItem={handleJob_experienceMove}
                                upperDisabled={index === 0}
                                lowerDisabled={index === job_experienceFields.length - 1}
                              />
                            </Col>
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
                                        disabled={job_experiences?.[index].nonEditable}
                                        checked={value || job_experiences?.[index].nonEditable}
                                      >
                                        Significant
                                      </Checkbox>
                                    )}
                                  />
                                </div>
                              </Row>
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
                            </Col>
                          </Row>
                        ))}

                        <WizardValidationError formErrors={profileFormErrors} fieldName="job_experience" />
                        <Form.Item>
                          <Button
                            type="link"
                            onClick={() =>
                              appendJob_experience({
                                text: '',
                                nonEditable: markAllNonEditableJob_experience,
                                is_significant: markAllSignificantJob_experience,
                              })
                            }
                            icon={<PlusOutlined />}
                          >
                            Add an experience requirement
                          </Button>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin"></Divider>

                  {/* Professional registration requirement */}
                  <Row justify="start">
                    <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle">
                            <Col>Professional registration requirements</Col>
                          </Row>
                        }
                      >
                        {professionalRegistrationRequirementsFields.map((field, index) => (
                          <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                            {/* up/down controls */}
                            <Col flex="none" className="reorder-controls">
                              <ReorderButtons
                                index={index}
                                moveItem={handleProfessionalRegistrationRequirementsMove}
                                upperDisabled={index === 0}
                                lowerDisabled={index === professionalRegistrationRequirementsFields.length - 1}
                              />
                            </Col>
                            <Col flex="auto">
                              <Row>{/* Non-editable checkbox */}</Row>
                              <Row gutter={10}>
                                <Col flex="auto">
                                  <Form.Item>
                                    <Controller
                                      control={profileControl}
                                      name={`professional_registration_requirements.${index}.text`}
                                      render={({ field: { onChange, onBlur, value } }) => {
                                        console.log('value: ', value);
                                        return professionalRegistrationRequirementsFields[index]?.is_readonly ? (
                                          <div>{value?.toString()}</div>
                                        ) : (
                                          <TextArea
                                            autoSize
                                            placeholder="Add a professional registration requirement"
                                            onChange={(event) => {
                                              onChange(event);
                                              debounce(triggerProfileValidation, 300)();
                                            }}
                                            onBlur={onBlur}
                                            value={value?.toString()}
                                          />
                                        );
                                      }}
                                    />
                                  </Form.Item>
                                </Col>

                                <Col flex="none">
                                  <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() => {
                                      removeProfessionalRegistrationRequirement(index);
                                      triggerProfileValidation();
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
                        <WizardValidationError
                          formErrors={profileFormErrors}
                          fieldName="professional_registration_requirements"
                        />
                        <Form.Item>
                          <Row>
                            <Col>
                              <WizardProfessionalRegistrationPicker
                                data={professionalRequirementsPickerData}
                                fields={professionalRegistrationRequirementsFields}
                                addAction={appendProfessionalRegistrationRequirement}
                                removeAction={removeProfessionalRegistrationRequirement}
                                triggerValidation={triggerProfileValidation}
                              />
                            </Col>
                            <Col>
                              <Button
                                type="link"
                                onClick={() => appendProfessionalRegistrationRequirement({ text: '' })}
                                icon={<PlusOutlined />}
                              >
                                Add a custom requirement
                              </Button>
                            </Col>
                          </Row>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Professional registration requirement NEW */}
                  {/* <Row justify="start">
                    <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                            <Col>Professional registration requirements</Col>
                            <Col>
                              <Form.Item style={{ margin: 0 }}>
                                <Row>
                                  <Col>
                                    <Controller
                                      control={profileControl}
                                      name="markAllNonEditableProfReg"
                                      render={({ field }) => (
                                        <Checkbox
                                          {...field}
                                          checked={markAllNonEditableProfReg}
                                          disabled={professionalRegistrationRequirementsFields.length === 0}
                                          onChange={(e) => {
                                            field.onChange(e.target.checked);
                                            updateNonEditableProfReg(e.target.checked);
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
                                </Row>
                              </Form.Item>
                            </Col>
                          </Row>
                        }
                      >
                        {professionalRegistrationRequirementsFields.map((field, index) => (
                          <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                            <Col flex="none" className="reorder-controls">
                              <ReorderButtons
                                index={index}
                                moveItem={handleProfessionalRegistrationRequirementsMove}
                                upperDisabled={index === 0}
                                lowerDisabled={index === professionalRegistrationRequirementsFields.length - 1}
                              />
                            </Col>
                            <Col flex="auto">
                              <Row>
                                <div style={{ marginBottom: '5px' }}>
                                  <Controller
                                    name={`professional_registration_requirements.${index}.nonEditable`}
                                    control={profileControl}
                                    render={({ field: { onChange, value } }) => (
                                      <Checkbox
                                        onChange={(args) => {
                                          if (!args.target.checked) {
                                            profileSetValue('markAllNonEditableProfReg', false);
                                          }
                                          onChange(args);
                                        }}
                                        checked={value}
                                      >
                                        Non-editable
                                      </Checkbox>
                                    )}
                                  />
                                </div>
                              </Row>
                              <Row gutter={10}>
                                <Col flex="auto">
                                  <Form.Item>
                                    <Controller
                                      control={profileControl}
                                      name={`professional_registration_requirements.${index}.text`}
                                      render={({ field: { onChange, onBlur, value } }) => (
                                        <TextArea
                                          autoSize
                                          placeholder="Add a professional registration requirement"
                                          onChange={onChange}
                                          onBlur={onBlur}
                                          value={value.toString()}
                                        />
                                      )}
                                    />
                                  </Form.Item>
                                </Col>

                                <Col flex="none">
                                  <Button icon={<DeleteOutlined />} onClick={() => removeProfessionalRegistrationRequirement(index)} />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
                        <Form.Item>
                          <Button
                            type="link"
                            onClick={() =>
                              appendProfessionalRegistrationRequirement({
                                text: '',
                                nonEditable: markAllNonEditableSec,
                              })
                            }
                            icon={<PlusOutlined />}
                          >
                            Add a professional registration requirement
                          </Button>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  </Row> */}

                  {/* Preferences */}
                  <Row justify="start">
                    <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle">
                            <Col>Preferences</Col>
                          </Row>
                        }
                      >
                        {preferencesFields.map((field, index) => (
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
                              <Row>{/* Non-editable checkbox */}</Row>
                              <Row gutter={10}>
                                <Col flex="auto">
                                  <Form.Item>
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
                                  <Button icon={<DeleteOutlined />} onClick={() => removePreference(index)} />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
                        <Form.Item>
                          <Button type="link" onClick={() => appendPreference({ text: '' })} icon={<PlusOutlined />}>
                            Add a job preference
                          </Button>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Knowledge skills and abilities */}
                  <Row justify="start">
                    <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle">
                            <Col>Knowledge, Skills, and Abilities</Col>
                          </Row>
                        }
                      >
                        {knowledgeSkillsAbilitiesFields.map((field, index) => (
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
                              <Row>{/* Non-editable checkbox */}</Row>
                              <Row gutter={10}>
                                <Col flex="auto">
                                  <Form.Item>
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
                                  <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() => {
                                      removeKnowledgeSkillAbility(index);
                                      triggerProfileValidation();
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
                        <WizardValidationError formErrors={profileFormErrors} fieldName="knowledge_skills_abilities" />
                        <Form.Item>
                          <Button
                            type="link"
                            onClick={() => appendKnowledgeSkillAbility({ text: '' })}
                            icon={<PlusOutlined />}
                          >
                            Add a knowledge, skill or ability requirement
                          </Button>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Provisios */}

                  <Row justify="start">
                    <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle">
                            <Col>Willingness Statements or Provisos</Col>
                          </Row>
                        }
                      >
                        {willingnessStatementsFields.map((field, index) => (
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
                                  <Form.Item>
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
                                  <Button icon={<DeleteOutlined />} onClick={() => removeWillingnessStatement(index)} />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
                        <Form.Item>
                          <Button
                            type="link"
                            onClick={() => appendWillingnessStatement({ text: '' })}
                            icon={<PlusOutlined />}
                          >
                            Add a proviso
                          </Button>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Security screenings */}
                  <Row justify="start">
                    <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                            <Col>Security Screenings</Col>
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
                                          disabled={securityScreeningsFields.length === 0}
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
                                </Row>
                              </Form.Item>
                            </Col>
                          </Row>
                        }
                      >
                        {securityScreeningsFields.map((field, index) => (
                          <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                            {/* up/down controls */}
                            <Col flex="none" className="reorder-controls">
                              <ReorderButtons
                                index={index}
                                moveItem={handleSecurityScreeningsMove}
                                upperDisabled={index === 0}
                                lowerDisabled={index === securityScreeningsFields.length - 1}
                              />
                            </Col>
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
                                          if (!args.target.checked) {
                                            profileSetValue('markAllNonEditableSec', false);
                                          }
                                          onChange(args);
                                        }}
                                        checked={value}
                                      >
                                        Non-editable
                                      </Checkbox>
                                    )}
                                  />
                                </div>
                              </Row>
                              <Row gutter={10}>
                                <Col flex="auto">
                                  <Form.Item>
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
                                  <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() => {
                                      removeSecurityScreening(index);
                                      triggerProfileValidation();
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
                        <WizardValidationError formErrors={profileFormErrors} fieldName="security_screenings" />
                        <Form.Item>
                          <Button
                            type="link"
                            onClick={() =>
                              appendSecurityScreening({
                                text: '',
                                nonEditable: markAllNonEditableSec,
                              })
                            }
                            icon={<PlusOutlined />}
                          >
                            Add a security screenings requirement
                          </Button>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* optional requirements */}
                  <Row justify="start">
                    <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle">
                            <Col>Optional requirements</Col>
                          </Row>
                        }
                      >
                        {optionalRequirementsFields.map((field, index) => (
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
                                  <Button icon={<DeleteOutlined />} onClick={() => removeOptionalRequirement(index)} />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
                        <Form.Item>
                          <Button
                            type="link"
                            onClick={() => appendOptionalRequirement({ text: '' })}
                            icon={<PlusOutlined />}
                          >
                            Add an optional requirement
                          </Button>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Card title="Behavioural competencies" style={{ marginTop: 16 }} bordered={false}>
                  <Row justify="start">
                    <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                      <>
                        <List
                          style={{ marginTop: '7px' }}
                          locale={{ emptyText: ' ' }}
                          dataSource={behavioural_competencies_fields}
                          renderItem={(field, index) => (
                            <List.Item
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start', // Align items to the top
                                marginBottom: '0px',
                                borderBottom: 'none',

                                padding: '5px 0',
                              }}
                              key={field.id} // Ensure this is a unique value
                            >
                              <p style={{ flex: 1, marginRight: '10px', marginBottom: 0 }}>
                                <strong>
                                  {field.behavioural_competency.name}
                                  <IsIndigenousCompetency competency={field.behavioural_competency} />
                                </strong>
                                : {field.behavioural_competency.description}
                              </p>

                              <Button
                                type="text" // No button styling, just the icon
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                  behavioural_competencies_remove(index);
                                  triggerProfileValidation();
                                }}
                                style={{
                                  marginLeft: '10px',
                                  border: '1px solid',
                                  borderColor: '#d9d9d9',
                                }}
                              />

                              <FormItem
                                name={`behavioural_competencies.${index}.behavioural_competency.id`}
                                control={profileControl}
                                hidden
                              >
                                <Input />
                              </FormItem>
                              <FormItem
                                hidden
                                name={`behavioural_competencies.${index}.behavioural_competency.name`}
                                control={profileControl}
                                style={{ flex: 1, marginRight: '10px' }}
                              >
                                <Input placeholder="Name" style={{ width: '100%' }} />
                              </FormItem>
                              <FormItem
                                hidden
                                name={`behavioural_competencies.${index}.behavioural_competency.description`}
                                control={profileControl}
                                style={{ flex: 2, marginRight: '10px' }}
                              >
                                <TextArea placeholder="Description" style={{ width: '100%' }} />
                              </FormItem>
                            </List.Item>
                          )}
                        />
                        <Typography.Text type="secondary">
                          <div style={{ margin: '0.5rem 0' }}>* denotes an Indigenous Behavioural Competency</div>
                        </Typography.Text>
                        <BehaviouralComptencyPicker
                          behavioural_competencies_fields={behavioural_competencies_fields}
                          addAction={behavioural_competencies_append}
                          removeAction={behavioural_competencies_remove}
                        ></BehaviouralComptencyPicker>
                      </>
                      <WizardValidationError formErrors={profileFormErrors} fieldName="behavioural_competencies" />
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

              {state == 'PUBLISHED' && (
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
                  </>
                )}

                <Divider></Divider>

                {/* {state == 'PUBLISHED' && ( */}
                <>
                  <Typography.Title level={5}>Download job profile</Typography.Title>
                  <Typography.Text>Download a copy of the job profile.</Typography.Text>
                  <br></br>
                  <DownloadJobProfileComponent
                    jobProfile={profileJson?.jobProfile}
                    style={{ marginTop: 10 }}
                    ignoreAbsentParent={true}
                  ></DownloadJobProfileComponent>
                </>
                {/* )} */}

                <Divider></Divider>

                {state == 'PUBLISHED' && (
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

                <Typography.Title level={5}>Allow others to edit</Typography.Title>
                <Typography.Paragraph>
                  Share the URL with people who you would like to collaborate with (IDIR restricted).
                </Typography.Paragraph>
                <Typography.Text copyable>http://pjs-dev.apps.silver.devops.gov.bc.ca/wizard/edit/1</Typography.Text>

                <Divider></Divider>

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
      />

      <ContentWrapper>
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          tabBarStyle={{ backgroundColor: '#fff', margin: '0 -1rem', padding: '0 1rem 0px 1rem' }}
        />
      </ContentWrapper>
    </>
  );
};
