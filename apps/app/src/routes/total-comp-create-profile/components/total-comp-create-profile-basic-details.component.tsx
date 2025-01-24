import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Switch,
  Tag,
  Tooltip,
  TreeSelect,
  Typography,
  message,
} from 'antd';
import { CSSProperties, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Controller, useFieldArray, useWatch } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import LoadingSpinnerWithMessage from '../../../components/app/common/components/loading.component';
import MinistriesSelect from '../../../components/app/common/components/ministries-select.component';
import {
  useGetFilteredClassificationsQuery,
  useGetGroupedClassificationsQuery,
} from '../../../redux/services/graphql-api/classification.api';
import { useGetEmployeeGroupsQuery } from '../../../redux/services/graphql-api/employee-group.api';
import { useGetJobFamiliesQuery } from '../../../redux/services/graphql-api/job-family.api';
import { useGetJobProfileMinimumRequirementsQuery } from '../../../redux/services/graphql-api/job-profile-minimum-requirements.api';
import { useGetJobProfileScopesQuery } from '../../../redux/services/graphql-api/job-profile-scope';
import { useGetJobProfileStreamsQuery } from '../../../redux/services/graphql-api/job-profile-stream';
import { ClassificationModel } from '../../../redux/services/graphql-api/job-profile-types';
import {
  useGetJobProfilesDraftsMinistriesQuery,
  useGetRequirementsWithoutReadOnlyQuery,
  useLazyGetNextAvailableJobProfileNumberQuery,
  useLazyIsJobProfileNumberAvailableQuery,
} from '../../../redux/services/graphql-api/job-profile.api';
import { useGetJobRolesQuery } from '../../../redux/services/graphql-api/job-role.api';
import { useGetOrganizationsQuery } from '../../../redux/services/graphql-api/organization';
import { FormItem } from '../../../utils/FormItem';
import WizardTitle from '../../wizard/components/wizard-edit-profile-title';
import WizardValidationError from '../../wizard/components/wizard-edit-profile-validation-error';
import { FormContext } from './form.context';
import JobStreamDiscipline from './jobstream-discipline.component';
import { JobContextEditor } from './total-comp-create-profile-context-editor';
import { useTCContext } from './total-comp-create-profile.provider';
import { useGetAllTreeValues } from './tree-helpers';
const { Option } = Select;
const { Text } = Typography;

interface BasicDetailsProps {}

export const BasicDetails: React.FC<BasicDetailsProps> = ({}) => {
  const getAllTreeValues = useGetAllTreeValues();
  const {
    isLoading,
    setIsLoading,
    jobProfileData,
    id,
    setPickerData,
    isCurrentVersion,
    validationStatus,
    setValidationStatus,
    // professionsData,
  } = useTCContext();

  const { id: urlId } = useParams();
  const { data: jobProfileMinimumRequirements } = useGetJobProfileMinimumRequirementsQuery();
  const employeeGroupIds: string[] = ['MGT', 'GEU', 'OEX', 'NUR', 'PEA', 'LGL'];

  const context = useContext(FormContext);
  if (!context) {
    throw new Error('Form context must be used within FormContext.Provider');
  }
  const { basicUseFormReturn, jobProfileUseFormReturn } = context; //professionalRegistrationRequirementsFieldArray

  const {
    // setValue: profileSetValue,
    trigger: triggerProfileValidation,
    reset: resetProfileForm,
  } = jobProfileUseFormReturn;

  const { data: treeData } = useGetGroupedClassificationsQuery({
    employee_group_ids: employeeGroupIds,
    effective_status: 'Active',
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
  } = basicUseFormReturn; //useFormContext<BasicDetailsValidationModel>();

  // const {
  //   fields: professionalRegistrationRequirementsFields,
  //   append: appendProfessionalRegistrationRequirement,
  //   remove: removeProfessionalRegistrationRequirement,
  // } = professionalRegistrationRequirementsFieldArray;

  const transformToTreeData = useCallback((groupedClassifications: any) => {
    const transformItem = (item: any) => {
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

  const ministriesData = useGetJobProfilesDraftsMinistriesQuery().data?.jobProfilesDraftsMinistries;
  const { data: allMinistriesData } = useGetOrganizationsQuery();

  // job store number validation
  // const jobStoreNumber = watch('jobStoreNumber');
  const jobStoreNumber = useWatch({
    control,
    name: 'jobStoreNumber',
  });

  const originalJobStoreNumber = useWatch({
    control,
    name: 'originalJobStoreNumber',
    defaultValue: '',
  });

  // setValue('originalJobStoreNumber', 'testt');

  const {
    fields: employeeClassificationGroupsFields,
    append: appendEmployeeGroup,
    remove: removeEmployeeGroup,
    update: updateEmployeeGroup,
    replace: replaceEmployeeClassificationGroups,
  } = useFieldArray({
    control,
    name: 'employeeClassificationGroups',
  });

  // set initial data
  useEffect(() => {
    // console.log('jobProfileData: ', jobProfileData);
    if (jobProfileData) {
      // Basic Details Form

      setValue('title.text', jobProfileData.jobProfile.title as string);
      setValue('jobStoreNumber', jobProfileData.jobProfile.number.toString());
      setValue('originalJobStoreNumber', jobProfileData.jobProfile.number.toString());

      const rawClassification =
        jobProfileData.jobProfile?.classifications
          ?.map((c: any) => {
            return {
              employeeGroup: c.classification.employee_group_id,
              classification: `${c.classification.id}.${c.classification.employee_group_id}.${c.classification.peoplesoft_id}`,
            };
          })
          .sort((a: any, b: any) => {
            if (a.employeeGroup === 'OEX') return 1;
            if (b.employeeGroup === 'OEX') return -1;
            return 0;
          }) ?? null;

      // console.log('rawClassification: ', rawClassification);
      if (rawClassification != null) {
        replaceEmployeeClassificationGroups(rawClassification);
      } else {
        setValue('employeeClassificationGroups', []);
      }

      setValue('jobRole', jobProfileData.jobProfile?.role?.id);

      if (jobProfileData.jobProfile.role_type) setValue('role', jobProfileData.jobProfile.role_type.id);

      if (jobProfileData.jobProfile?.scopes) {
        setValue(
          'scopeOfResponsibility',
          jobProfileData.jobProfile.scopes.map((s: any) => s.scope.id),
        );
      }

      setValue('classificationReviewRequired', jobProfileData.jobProfile.review_required);
      setValue('jobContext', jobProfileData.jobProfile.context);

      const allReportsToValue = jobProfileData.jobProfile.all_reports_to;
      setValue('all_reports_to', allReportsToValue);

      if (allReportsToValue) {
        // If 'all_reports_to' is true, set 'reportToRelationship' to all possible values EXCEPT current classification
        const allValues = getAllTreeValues(treeDataConverted);
        let filteredReportToRelationship = allValues;
        if (rawClassification)
          filteredReportToRelationship = allValues.filter((r: string) =>
            rawClassification.find((raw: any) => raw.classification == r),
          );
        // Update the 'reportToRelationship' form variable

        setValue('reportToRelationship', filteredReportToRelationship);
      } else {
        // If 'all_reports_to' is false, set 'reportToRelationship' to specific values
        setValue(
          'reportToRelationship',
          jobProfileData.jobProfile.reports_to.map((r: any) => {
            const { id, employee_group_id, peoplesoft_id } = r.classification;
            return `${id}.${employee_group_id}.${peoplesoft_id}`;
          }),
        );
      }

      setValue(
        'ministries',
        jobProfileData.jobProfile.organizations.map((org: any) => org.organization.id),
      );

      triggerBasicDetailsValidation();
    } else {
      // no profile data - select all ministries as that's the default setting
      const allValues = allMinistriesData?.organizations?.map((m) => m?.id?.toString() ?? '') || [];
      setValue('ministries', allValues);
    }
  }, [
    jobProfileData,
    // setValue,
    treeDataConverted,
    ministriesData,
    allMinistriesData,
    getAllTreeValues,
    triggerBasicDetailsValidation,
    // useWatch,
  ]);

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

  // const prevProfessionsData = useRef(professionsData);

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
      // console.log('setting next number: ', nextNumberData.nextAvailableJobProfileNumber);
      setValue('jobStoreNumber', nextNumberData.nextAvailableJobProfileNumber.toString());
    }
  }, [nextNumberData, setValue]);

  // Function to fetch the next available number
  const fetchNextNumber = useCallback(async () => {
    // console.log('fetchNextNumber hook');

    // Trigger the query to get the next available number

    if (originalJobStoreNumber) {
      setValue('jobStoreNumber', originalJobStoreNumber);
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
  }, [getNextAvailableNumber, setValue, setFetchingNextNumber, originalJobStoreNumber]);

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

  // Update local state when URL parameter changes
  useEffect(() => {
    if (!urlId) {
      const allValues = allMinistriesData?.organizations?.map((m) => m?.id?.toString() ?? '') || [];
      setValue('ministries', allValues);
    }
  }, [urlId, setValue, allMinistriesData]);

  useEffect(() => {
    const numberValue = parseInt(jobStoreNumber, 10);
    const originalNumberValue = parseInt(originalJobStoreNumber, 10);

    // currently selected value is equal to the original value already set for the profile -
    // mark the field as valid
    if (numberValue === originalNumberValue) {
      // console.log('set valid and tgrigger validation');
      setValidationStatus('valid');
      setTimeout(() => {
        triggerBasicDetailsValidation();
      }, 100);
      return;
    }

    // user typed something other than a number - mark the field as invalid
    if (isNaN(numberValue)) {
      setValidationStatus('invalid');
      setTimeout(() => {
        triggerBasicDetailsValidation();
      }, 100);
    } else {
      // check if the number is available
      checkNumberAvailability(numberValue)
        .then(({ data }) => {
          setValidationStatus(data?.isJobProfileNumberAvailable ? 'valid' : 'invalid');
          setTimeout(() => {
            triggerBasicDetailsValidation();
          }, 100);
        })
        .catch(() => {
          setValidationStatus('invalid'); // handle error case
          setTimeout(() => {
            triggerBasicDetailsValidation();
          }, 100);
        });
    }
  }, [jobStoreNumber, nextNumberData, checkNumberAvailability, originalJobStoreNumber, triggerBasicDetailsValidation]);

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
  const selectedEmployeeClassificationGroups = watch('employeeClassificationGroups');

  const findFilterClassifications = (index: number) => {
    const otherIndex = index ? 0 : 1;
    const [other_id, other_employee_group_id, other_peoplesoft_id] = (
      selectedEmployeeClassificationGroups.at(otherIndex)?.classification ?? ''
    ).split('.');
    const selectedClassification = selectedEmployeeClassificationGroups.at(index)?.classification;
    const [id, employee_group_id, peoplesoft_id] = (selectedClassification ?? '').split('.');

    const otherClassificationGroup = classificationsData?.classifications.find(
      (cl) =>
        other_id == cl.id && other_employee_group_id == cl.employee_group_id && other_peoplesoft_id == cl.peoplesoft_id,
    );
    const classificationGroup = classificationsData?.classifications.find(
      (cl) => id == cl.id && employee_group_id == cl.employee_group_id && peoplesoft_id == cl.peoplesoft_id,
    );

    const otherClassifications = otherClassificationGroup
      ? classificationsData?.classifications.filter(
          (cl) =>
            otherClassificationGroup?.employee_group_id != cl.employee_group_id &&
            otherClassificationGroup?.code == cl.code,
        )
      : employee_group_id != null
        ? classificationsData?.classifications.filter(
            (cl) => employee_group_id != cl.employee_group_id && classificationGroup?.code == cl.code,
          )
        : classificationsData?.classifications.filter(
            (cl) =>
              selectedEmployeeClassificationGroups.at(index)?.employeeGroup != cl.employee_group_id &&
              classificationGroup?.code == cl.code,
          );
    return otherClassifications;
  };
  const addGeneralEmployeeGroup = () => {
    const index = selectedEmployeeClassificationGroups.length ? 1 : 0;
    if (
      selectedEmployeeClassificationGroups.length == 0 ||
      selectedEmployeeClassificationGroups.at(0)?.classification == null
    ) {
      appendEmployeeGroup({
        employeeGroup: null,
        classification: null,
      });
      return;
    }
    const otherClassifications = findFilterClassifications(index);
    switch (otherClassifications?.length) {
      case 0:
        message.warning(
          `No classification found in a general classification group for the corresponding Schedule A Classification.`,
        );
        break;
      case 1:
        appendEmployeeGroup({
          employeeGroup: otherClassifications[0].employee_group_id,
          classification: `${otherClassifications[0].id}.${otherClassifications[0].employee_group_id}.${otherClassifications[0].peoplesoft_id}`,
        });
        break;
      default: {
        appendEmployeeGroup({
          employeeGroup: null,
          classification: null,
        });
      }
    }
  };

  // Function to add a Schedule A (OEX) classification based on the currently selected classification
  const addScheduleA = () => {
    // Get the first selected classification from the array
    const selectedClassification = selectedEmployeeClassificationGroups.at(0)?.classification;

    // Find the full classification object in the classificationsData
    const classification = classificationsData?.classifications.find(
      (c) =>
        c.id == selectedClassification?.split('.')[0] &&
        c.employee_group_id == selectedClassification?.split('.')[1] &&
        c.peoplesoft_id == selectedClassification?.split('.')[2],
    );

    if (classification) {
      // If a classification is found, look for a corresponding OEX classification
      const oexClassification = classificationsData?.classifications.find(
        (c) => c.employee_group_id == 'OEX' && c.grade == classification.grade && c.code == classification.code,
      );

      if (oexClassification) {
        // If a corresponding OEX classification is found, append it to the employee groups
        const classificationString = `${oexClassification.id}.${oexClassification.employee_group_id}.${oexClassification.peoplesoft_id}`;
        appendEmployeeGroup({
          employeeGroup: 'OEX',
          classification: classificationString,
        });
        handleClassificationChange(classificationString, 1);
      } else {
        // If no corresponding OEX classification is found, show a warning message
        message.warning('No Schedule A classification found for the corresponding general employee group.');
      }
    } else {
      // If no classification is found (or none selected), append an OEX group with null classification
      appendEmployeeGroup({
        employeeGroup: 'OEX',
        classification: null,
      });
    }
  };
  const allReportsTo = watch('all_reports_to');

  // user deleted last item - re-add a blank one
  if (selectedProfession?.length == 0) {
    append({ jobFamily: -1, jobStreams: [] });
  }

  const { data: jobFamiliesData } = useGetJobFamiliesQuery();
  const { data: jobProfileStreamsData } = useGetJobProfileStreamsQuery();

  // Function to filter job streams based on selected job family
  const getJobStreamsForFamily = useCallback(
    (jobFamilyId: number) => {
      return jobProfileStreamsData?.jobProfileStreams.filter((stream) => stream.job_family_id === jobFamilyId) || [];
    },
    [jobProfileStreamsData],
  );

  // END BASIC DETAILS FORM

  const { data: classificationsData } = useGetFilteredClassificationsQuery();

  // PICKER DATA
  const { data: pickerData, refetch: refetchPickerData } = useGetRequirementsWithoutReadOnlyQuery(
    {
      jobFamilyIds: selectedProfession.map((p: any) => p.jobFamily),
      jobFamilyStreamIds: selectedProfession.map((p: any) => p.jobStreams).flat(),
      classifications: classificationsData?.classifications.filter(
        (cl) =>
          selectedEmployeeClassificationGroups.at(0)?.classification?.split('.')[0] == cl.id &&
          selectedEmployeeClassificationGroups.at(0)?.classification?.split('.')[1] == cl.employee_group_id &&
          selectedEmployeeClassificationGroups.at(0)?.classification?.split('.')[2] == cl.peoplesoft_id,
      ) as ClassificationModel[],
      ministryIds: selectedMinistry,
      jobFamilyWithNoStream: selectedProfession
        .filter((p: any) => p.jobStreams.length === 0)
        .map((p: any) => p.jobFamily),
      excludeProfileId: jobProfileData?.jobProfile.id,
    },
    {
      skip: !classificationsData || !selectedEmployeeClassificationGroups,
    },
  );

  useEffect(() => {
    if (pickerData) setPickerData(pickerData);
  }, [pickerData]);

  useEffect(() => {
    classificationsData && refetchPickerData();
  }, [classificationsData, refetchPickerData]);

  // Handler for classification change
  const handleClassificationChange = (newValue: string | null, index: number) => {
    // console.log('handleClassificationChange newValue: ', newValue, ', index: ', index);
    // if this classification exists in reportToRelationship, remove it
    const [id, employee_group_id, peoplesoft_id] = (newValue ?? '').split('.');
    const classification = `${id}.${employee_group_id}.${peoplesoft_id}`;
    const currentReportToRelationship = getBasicDetailsValues('reportToRelationship');
    const filteredReportToRelationship = currentReportToRelationship.filter((r: string) => r !== classification);
    setValue('reportToRelationship', filteredReportToRelationship);

    // if all reports-to is checked, this maintains a correct list of all values in response to changes in classifications
    if (allReportsTo) handleSelectAllReportTo(allReportsTo);

    // This block handles the logic when a new classification value is selected and there are multiple classification groups
    if (newValue != null && selectedEmployeeClassificationGroups.length > 1) {
      // Determine the index of the other classification group
      // This assumes there are only two groups (index 0 and 1)
      const otherIndex = index ? 0 : 1;

      // Find classifications for the other group that match the current filter criteria
      // This likely uses a function that filters classifications based on some criteria
      const otherClassifications = findFilterClassifications(otherIndex);

      // Handle different scenarios based on the number of matching classifications found
      switch (otherClassifications?.length) {
        case 0:
          // If no matching classifications, remove the other employee group
          // This helps maintain consistency when no valid classifications are available
          removeEmployeeGroup(otherIndex);
          break;
        case 1:
          // If exactly one matching classification, update the other group with this classification
          // This ensures that when there's only one valid option, it's automatically selected
          updateEmployeeGroup(otherIndex, {
            employeeGroup: otherClassifications[0].employee_group_id,
            classification: `${otherClassifications[0].id}.${otherClassifications[0].employee_group_id}.${otherClassifications[0].peoplesoft_id}`,
          });
          break;
        default: {
          // If multiple matching classifications, update the other group with the first matching employee group and null classification
          // This keeps the employee group but clears the specific classification when multiple options are available
          otherClassifications &&
            otherClassifications?.length > 1 &&
            updateEmployeeGroup(otherIndex, {
              employeeGroup: otherClassifications[0].employee_group_id,
              classification: null,
            });
        }
      }

      // If no matching classifications are found after the update, remove the other employee group
      // This is a final check to ensure consistency, possibly redundant with the case 0 above
      !findFilterClassifications(otherIndex)?.length && removeEmployeeGroup(otherIndex);
    }

    updateMinimumRequirementsAndProfRegs();
  };

  // Tree-select for report-to relationship
  const { SHOW_CHILD } = TreeSelect;

  //employee group selector
  const { data: employeeGroupData } = useGetEmployeeGroupsQuery({
    ids: employeeGroupIds,
  });

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

  const handleMinistriesChange = () => {
    setTimeout(() => {
      // console.log(
      //   'refetching with: ',
      //   selectedProfession.map((p) => p.jobFamily),
      // );
      refetchPickerData().then(() => {
        // console.log(
        //   'refetched, updateProfessionalRegistrationrequirements, professionalRequirementsPickerData now: ',
        //   professionalRequirementsPickerData,
        //   r,
        // );
        // updateProfessionalRegistrationrequirements(r.data);
      });
    }, 0);
  };

  const handleJobFamilyChange = async () => {
    // console.log('handleJobFamilyChange');
    setTimeout(() => {
      // console.log(
      //   'refetching with: ',
      //   selectedProfession.map((p) => p.jobFamily),
      // );
      refetchPickerData().then(() => {
        // console.log(
        //   'refetched, updateProfessionalRegistrationrequirements, professionalRequirementsPickerData now: ',
        //   r.data,
        // );
        // updateProfessionalRegistrationrequirements(r.data);
      });
    }, 0);
  };

  const updateMinimumRequirementsAndProfRegs = () => {
    // updateMinimumRequirementsFromClassification(classification);

    setTimeout(() => {
      refetchPickerData().then(() => {
        // updateProfessionalRegistrationrequirements(r.data);
      });
    }, 0);
  };

  // const updateMinimumRequirementsFromClassification = (classification: string) => {
  //   const [id, employee_group_id, peoplesoft_id] = classification.split('.');
  //   if (classification) {
  //     const selectedClassification = classificationsData?.classifications.find(
  //       (c) => id === c.id && employee_group_id === c.employee_group_id && peoplesoft_id === c.peoplesoft_id,
  //     );

  //     if (jobProfileMinimumRequirements && selectedClassification) {
  //       const filteredRequirements = jobProfileMinimumRequirements.jobProfileMinimumRequirements
  //         .filter((req: any) => req.grade === selectedClassification.grade)
  //         .map((req: any) => ({
  //           text: req.requirement,
  //           nonEditable: false,
  //           is_significant: true,
  //           tc_is_readonly: true,
  //         }));

  //       // console.log('filteredRequirements: ', filteredRequirements);
  //       // Update the educationAndWorkExperiences field array
  //       profileSetValue('education', filteredRequirements);
  //     }
  //   }
  // };

  const showWarningModal = (onOk: any, onCancel: any) => {
    Modal.confirm({
      title: 'Warning',
      content:
        "Changing 'Classification' may result in report-to relationship getting updated to exclude this classification. Are you sure you want to continue?",
      onOk,
      onCancel,
    });
  };

  // user changed classificaiton or job family - update the professional requirements based on the new selection
  // const updateProfessionalRegistrationrequirements = (professionalRequirementsPickerDataIn?: any) => {
  //   const useProfessionalRequirementsPickerData = professionalRequirementsPickerDataIn || pickerData;

  //   if (!useProfessionalRequirementsPickerData) return;

  //   // NEW

  //   // console.log('NEW - adding professional registrations automatically');

  //   // Find items with non-null classification - these should be added automatically based on classification selection
  //   const itemsWithClassification =
  //     useProfessionalRequirementsPickerData.requirementsWithoutReadOnly.professionalRegistrationRequirements.filter(
  //       (comp: any) => comp.classification !== null,
  //     );

  //   // console.log(
  //   //   'data.requirementsWithoutReadOnly: ',
  //   //   useProfessionalRequirementsPickerData.requirementsWithoutReadOnly,
  //   // );
  //   // console.log('itemsWithClassification: ', itemsWithClassification);

  //   // Add items with non-null classification to the fields array
  //   const newFields = itemsWithClassification.map((item: any) => ({
  //     tc_is_readonly: true,
  //     // ensure newly added items are set as non-editable and significant
  //     // ('nonEditable' gets converted to is_readonly when sent to the server)
  //     nonEditable: true,
  //     is_significant: true,
  //     text: item.text,
  //   }));

  //   // console.log('newFields: ', newFields);

  //   // console.log('filtering new fields over fields: ', professionalRegistrationRequirementsFields);
  //   // Filter out items that already exist in the fields array
  //   const uniqueNewFields = newFields.filter(
  //     (newField: any) =>
  //       !professionalRegistrationRequirementsFields.some(
  //         (field: any) => field.text === newField.text && field.tc_is_readonly === true,
  //       ),
  //   );
  //   // console.log('addAction: ', uniqueNewFields);

  //   // Add the unique new fields to the existing fields array

  //   const timeoutId = setTimeout(() => {
  //     // console.log('append: ', uniqueNewFields);
  //     appendProfessionalRegistrationRequirement(uniqueNewFields);
  //     triggerProfileValidation();
  //   }, 0);
  //   return () => {
  //     clearTimeout(timeoutId);
  //   };

  //   // END NEW
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // };

  const filterTreeData = (data: any) => {
    // Filter out the selected classifications from the tree data
    const ret = data
      .filter((item: any) => {
        // for every selected classification check if this reports-to item matches
        const foundResult = selectedEmployeeClassificationGroups.find((c: any) => {
          const classificationFound = `${c.classification?.split('.')[0]}.${
            c.classification?.split('.')[1]
          }.${c.classification?.split('.')[2]}`;
          return classificationFound == item.id;
        });

        const include =
          item.id == null ||
          !foundResult ||
          // if there are no classification selected, make sure we don't filter anything (otherwise filters everything)
          selectedEmployeeClassificationGroups.length === 0;

        return include;
      })
      .map((item: any) => ({
        ...item,
        children: item.children ? filterTreeData(item.children) : [],
      }));
    return ret;
  };

  // user removed family or stream - remove the professional requirements that no longer apply
  // const handleStreamOrFamilyRemoval = useCallback(() => {
  //   if (!pickerData) return;

  //   // console.log('==REMOVAL handleStreamOrFamilyRemoval');

  //   // // Get the updated list of professional registrations that would appear in the pick list
  //   // console.log('professionalRequirementsPickerData:', professionalRequirementsPickerData);
  //   // console.log('professionalRegistrationRequirementsFields: ', professionalRegistrationRequirementsFields);

  //   // console.log('professionsFields??:', professionsFields);

  //   const jobFamilyIds = selectedProfession.map((p: any) => p.jobFamily);
  //   const jobFamilyStreamIds = selectedProfession.map((p: any) => p.jobStreams).flat();

  //   // console.log('jobFamilyIds: ', jobFamilyIds);
  //   // console.log('jobFamilyStreamIds: ', jobFamilyStreamIds);

  //   // console.log('calculating idsToRemove');
  //   const idsToRemove = professionalRegistrationRequirementsFields
  //     .filter((field: any) => {
  //       // console.log('checking field: ', field);
  //       if (field.tc_is_readonly) {
  //         // console.log('is readonly');
  //         const item = pickerData.requirementsWithoutReadOnly.professionalRegistrationRequirements.find(
  //           (data: any) => data.text === field.text,
  //         );

  //         // console.log('found item by text: ', item);

  //         if (item) {
  //           const itemJobFamilies = item.jobFamilies.map((jf: any) => jf.id);
  //           const itemStreams = item.streams.map((s: any) => s.id);

  //           // console.log('itemJobFamilies: ', itemJobFamilies, jobFamilyIds);
  //           // console.log('itemStreams: ', itemStreams, jobFamilyStreamIds);

  //           const jobFamilyWithNoStream = selectedProfession
  //             .filter((p: any) => p.jobStreams.length === 0)
  //             .map((p: any) => p.jobFamily);
  //           // console.log('jobFamilyWithNoStream: ', jobFamilyWithNoStream);

  //           const isJobFamilyAllowed = itemJobFamilies.some((jf: any) => jobFamilyIds.includes(jf));
  //           let isStreamAllowed = itemStreams.some((s: any) => jobFamilyStreamIds.includes(s));

  //           // console.log('isJobFamilyAllowed: ', isJobFamilyAllowed);
  //           // console.log('isStreamAllowed: ', isStreamAllowed);

  //           // make an exception for job family with no stream
  //           if (!isStreamAllowed) {
  //             // console.log('checking jobFamilyWithNoStream');
  //             isStreamAllowed = jobFamilyWithNoStream.some((jf: any) => itemJobFamilies.includes(jf));
  //             // console.log('isStreamAllowed now: ', isStreamAllowed);
  //           }

  //           // if this item has classification set, then it was auto-added
  //           // check separately if classification matches
  //           // additionally, if the item also has job family set, ensure that matches as well

  //           if (item.classification) {
  //             // console.log('classificaiton present');
  //             const itemClassificationId = item.classification.id;
  //             const itemClassificationEmployeeGroup = item.classification.employee_group_id;
  //             const itemJobFamilies = item.jobFamilies;

  //             // const selectedClassification = selectedClassificationId?.split('.')[0];
  //             // const selectedEmployeeGroup = selectedClassificationId?.split('.')[1];

  //             // console.log('itemClassificationId: ', itemClassificationId);
  //             // console.log('selectedClassification: ', selectedClassification);

  //             const isClassificationAllowed = selectedEmployeeClassificationGroups.find(
  //               (ecg: any) => ecg.classification?.split('.')[0] == itemClassificationId,
  //             )
  //               ? true
  //               : false; //itemClassificationId === selectedClassification;
  //             const isEmployeeGroupAllowed = selectedEmployeeClassificationGroups.find(
  //               (ecg: any) => ecg.employeeGroup == itemClassificationEmployeeGroup,
  //             )
  //               ? true
  //               : false;

  //             // if job families are present, check that
  //             const isJobFamilyAllowed =
  //               itemJobFamilies.length === 0 || itemJobFamilies.some((jf: any) => jobFamilyIds.includes(jf.id));

  //             // console.log('isClassificationAllowed: ', isClassificationAllowed);
  //             // console.log('isEmployeeGroupAllowed: ', isEmployeeGroupAllowed);
  //             // console.log('isJobFamilyAllowed: ', isJobFamilyAllowed);

  //             return !(isClassificationAllowed && isEmployeeGroupAllowed && isJobFamilyAllowed);
  //           }

  //           return !(isJobFamilyAllowed && isStreamAllowed);
  //         } else {
  //           // console.log('item not found');
  //           // item was not found - likely because we re-fetched the picklist data and it's no longer in the list
  //           return true;
  //         }
  //       }
  //       return false;
  //     })
  //     .map((field: any) => field.text);

  //   // console.log('idsToRemove: ', idsToRemove);

  //   const indexesToRemove = idsToRemove.map((text: any) =>
  //     professionalRegistrationRequirementsFields.findIndex((field: any) => field.tc_is_readonly && field.text === text),
  //   );

  //   // console.log('REMOVING indexesToRemove: ', indexesToRemove);
  //   // Remove the professional registrations that no longer apply
  //   // per documentaion this should work without timeout, however for some reason it doesn't
  //   // delay removal
  //   if (indexesToRemove.length > 0) {
  //     const timeoutId = setTimeout(() => {
  //       removeProfessionalRegistrationRequirement(indexesToRemove);
  //       triggerProfileValidation();
  //     }, 0);
  //     return () => {
  //       clearTimeout(timeoutId);
  //     };
  //   }
  //   // refetchProfessionalRequirementsPickerData();
  // }, [
  //   pickerData,
  //   selectedProfession,
  //   professionalRegistrationRequirementsFields,
  //   selectedEmployeeClassificationGroups,
  //   removeProfessionalRegistrationRequirement,
  //   triggerProfileValidation,
  // ]);

  // useEffect(() => {
  // console.log('selectedProfession change');
  // const hasRemoval = (prev: any, current: any) => {
  //   if (!prev || !current) return false;
  //   if (prev.length > current.length) return true;
  //   return prev.some((prevItem: any, index: any) => {
  //     const currentItem = current[index];
  //     if (!currentItem) return true;
  //     if (prevItem.jobFamily !== currentItem.jobFamily) return true;
  //     return prevItem.jobStreams.length > currentItem.jobStreams.length;
  //   });
  // };

  // const removed = hasRemoval(prevProfessionsData.current, selectedProfession);
  // console.log('removed: ', prevProfessionsData.current, selectedProfession, removed);
  // if (removed) {
  //   handleStreamOrFamilyRemoval();
  // }

  // Update the ref with the new value
  // console.log('SET: ', prevProfessionsData.current, selectedProfession);
  //   prevProfessionsData.current = JSON.parse(JSON.stringify(selectedProfession));
  // }, [selectedProfession, handleStreamOrFamilyRemoval]);

  const [basicFormErrors, setBasicFormErrors] = useState<any>({});

  useEffect(() => {
    setBasicFormErrors(basicFormState.errors);
  }, [basicFormState.errors]);

  const setAllReportToRelationships = useCallback(
    (isChecked: boolean) => {
      // Get all values for 'reportToRelationship' if isChecked is true, else an empty array
      const allValues = isChecked ? getAllTreeValues(treeDataConverted) : [];

      // filter out the selected classification
      let filteredReportToRelationship = allValues;
      if (selectedEmployeeClassificationGroups) {
        filteredReportToRelationship = allValues.filter(
          (r: string) => !selectedEmployeeClassificationGroups.find((ecg: any) => ecg.classification == r),
        );
      }
      // Update the 'reportToRelationship' form variable

      setValue('reportToRelationship', filteredReportToRelationship);
    },
    [getAllTreeValues, treeDataConverted, selectedEmployeeClassificationGroups, setValue],
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
  }, [handleSelectAllReportTo, allReportsTo]);

  useEffect(() => {
    if (
      !ministriesData ||
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
      setIsLoading(true);
    else setIsLoading(false);
  }, [
    ministriesData,
    allMinistriesData,
    jobFamiliesData,
    jobProfileStreamsData,
    treeData,
    employeeGroupData,
    classificationsData,
    jobRolesData,
    jobProfileScopes,
    jobProfileMinimumRequirements,
    setIsLoading,
  ]);

  const getClassificationsForEmployeeGroup = useCallback(
    (index: number) => {
      const selected = selectedEmployeeClassificationGroups.at(index);

      const classification = classificationsData?.classifications.find(
        (cl) =>
          selected?.classification?.split('.')[0] == cl.id &&
          selected?.classification?.split('.')[1] == cl.employee_group_id &&
          selected?.classification?.split('.')[2] == cl.peoplesoft_id,
      );
      let list;
      if (selectedEmployeeClassificationGroups.length > 1 && index == 1) {
        const otherClassification = classificationsData?.classifications.find(
          (cl) =>
            selectedEmployeeClassificationGroups.at(0)?.classification?.split('.')[0] == cl.id &&
            selectedEmployeeClassificationGroups.at(0)?.classification?.split('.')[1] == cl.employee_group_id &&
            selectedEmployeeClassificationGroups.at(0)?.classification?.split('.')[2] == cl.peoplesoft_id,
        );
        list =
          otherClassification == undefined
            ? classificationsData?.classifications.filter((c) => c.employee_group_id == selected?.employeeGroup)
            : selected?.employeeGroup == 'OEX'
              ? classificationsData?.classifications.filter(
                  (c) => c.employee_group_id == classification?.employee_group_id && classification.code == c.code,
                )
              : classificationsData?.classifications.filter(
                  (c) => c.employee_group_id == selected?.employeeGroup && otherClassification?.code == c.code,
                );
      } else {
        list = classificationsData?.classifications.filter((c) => c.employee_group_id == selected?.employeeGroup);
      }

      return list;
    },
    [classificationsData?.classifications, selectedEmployeeClassificationGroups],
  );

  if (isLoading) return <LoadingSpinnerWithMessage />;

  return (
    <>
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
            <Card title="JobStore Number" style={{ marginTop: 16 }} bordered={false} className="custom-card">
              <Row justify="start">
                <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                  {isCurrentVersion ? (
                    <>
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
                    </>
                  ) : (
                    <span>{jobStoreNumber}</span>
                  )}
                </Col>
              </Row>
            </Card>

            <Card title="Classification" style={{ marginTop: 16 }} bordered={false}>
              {isCurrentVersion ? (
                <>
                  <Form.Item label="Employee groups" labelCol={{ className: 'card-label' }} className="label-only" />
                  <div style={{ marginBottom: '1.5rem' }}>
                    You must assign this profile to at least one classification.
                  </div>
                  {employeeClassificationGroupsFields.map((field, index: number) => (
                    <div key={field.id}>
                      <Row justify="start">
                        <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                          <div key={field.id}>
                            <Form.Item
                              label={
                                selectedEmployeeClassificationGroups.at(index)?.employeeGroup == 'OEX'
                                  ? 'Schedule A group '
                                  : 'General employee group'
                              }
                              style={{ marginBottom: '0.5rem' }}
                            >
                              <>
                                <Controller
                                  name={`employeeClassificationGroups.${index}.employeeGroup`}
                                  control={control}
                                  render={({ field: { onChange, onBlur, value } }) => {
                                    return (
                                      <Row gutter={8} wrap={false}>
                                        <Col flex="auto">
                                          <Select
                                            placeholder="Choose an employee group"
                                            disabled={
                                              selectedEmployeeClassificationGroups.at(index)?.employeeGroup == 'OEX'
                                            }
                                            onChange={(newValue) => {
                                              if (selectedEmployeeClassificationGroups[index].employeeGroup) {
                                                showWarningModal(
                                                  () => {
                                                    setValue(
                                                      `employeeClassificationGroups.${index}.employeeGroup`,
                                                      newValue,
                                                    );
                                                    setValue(
                                                      `employeeClassificationGroups.${index}.classification`,

                                                      null,
                                                    );
                                                    onChange(newValue);
                                                  },
                                                  () => {
                                                    // User canceled the change
                                                  },
                                                );
                                              } else {
                                                {
                                                  setValue(
                                                    `employeeClassificationGroups.${index}.employeeGroup`,
                                                    newValue,
                                                  );
                                                  setValue(
                                                    `employeeClassificationGroups.${index}.classification`,

                                                    null,
                                                  );
                                                  onChange(newValue);
                                                }
                                              }
                                              triggerBasicDetailsValidation();
                                            }}
                                            onBlur={onBlur}
                                            value={value}
                                            style={{ width: '100%' }}
                                            options={employeeGroupData?.employeeGroups
                                              .filter((group) => {
                                                if (
                                                  selectedEmployeeClassificationGroups.at(0)?.employeeGroup == 'OEX' &&
                                                  selectedEmployeeClassificationGroups.at(0)?.classification &&
                                                  index == 1
                                                ) {
                                                  const selectedOEX = selectedEmployeeClassificationGroups.at(0);

                                                  const oexClassification = classificationsData?.classifications.find(
                                                    (cl) =>
                                                      selectedOEX?.classification?.split('.')[0] == cl.id &&
                                                      selectedOEX?.classification?.split('.')[1] ==
                                                        cl.employee_group_id &&
                                                      selectedOEX?.classification?.split('.')[2] == cl.peoplesoft_id,
                                                  );
                                                  return (
                                                    group.id != 'OEX' &&
                                                    classificationsData?.classifications.find(
                                                      (c) =>
                                                        c.employee_group_id == group.id &&
                                                        c.code == oexClassification?.code,
                                                    )
                                                  );
                                                }
                                                return group.id != 'OEX';
                                              })
                                              .map((group) => ({
                                                label: group.id,
                                                value: group.id,
                                              }))}
                                          />
                                        </Col>
                                        <Col>
                                          <Button
                                            onClick={() => {
                                              // Modal.confirm({
                                              //   title: 'Confirmation',
                                              //   content:
                                              //     "Removing classification may result in updates to some of the system generated fields in the 'Job Profile' page. Are you sure you want to continue?",
                                              //   onOk: () => {
                                              removeEmployeeGroup(index);

                                              handleClassificationChange(null, index);
                                              triggerBasicDetailsValidation();
                                              //   },
                                              // });
                                            }}
                                            icon={<DeleteOutlined />}
                                          ></Button>
                                        </Col>
                                      </Row>
                                    );
                                  }}
                                />
                              </>
                            </Form.Item>
                          </div>
                        </Col>
                      </Row>
                      <Row justify="start">
                        <Col xs={24} sm={24} md={24} lg={18} xl={16}>
                          <Form.Item
                            label="Classification"
                            style={{
                              borderLeft: '2px solid rgba(5, 5, 5, 0.06)',
                              paddingLeft: '1rem',
                            }}
                          >
                            <>
                              <Controller
                                name={`employeeClassificationGroups.${index}.classification`}
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => {
                                  return (
                                    <>
                                      <Select
                                        placeholder="Choose a classification"
                                        onChange={(newValue) => {
                                          if (
                                            selectedEmployeeClassificationGroups[index].classification &&
                                            selectedEmployeeClassificationGroups[index].classification != newValue
                                          ) {
                                            showWarningModal(
                                              () => {
                                                onChange(newValue);
                                                handleClassificationChange(newValue, index);
                                                triggerBasicDetailsValidation();
                                              },
                                              () => {
                                                // User canceled the change
                                              },
                                            );
                                          } else {
                                            // selecting classification for the first time
                                            // - ensure that the minimum requirements and professional registrations are updated
                                            onChange(newValue);
                                            // const [id, employee_group_id, peoplesoft_id] = (newValue ?? '').split('.');
                                            // const classification = `${id}.${employee_group_id}.${peoplesoft_id}`;
                                            updateMinimumRequirementsAndProfRegs();
                                          }
                                          triggerBasicDetailsValidation();
                                        }}
                                        onBlur={onBlur}
                                        value={value}
                                        style={{ width: '100%' }}
                                        showSearch
                                        filterOption={(input, option) => {
                                          if (!option) return false;
                                          const { name, id } = option;

                                          return (
                                            name.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                                            id.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                          );
                                        }}
                                        options={getClassificationsForEmployeeGroup(index)?.map(
                                          ({ id, employee_group_id, peoplesoft_id, name }) => ({
                                            label: (
                                              <div>
                                                {' '}
                                                {employee_group_id != 'OEX' ? name : name + ' '}{' '}
                                                <span style={{ color: '#9F9D9C' }}>{'(' + id + ')'}</span>
                                              </div>
                                            ),
                                            value: `${id}.${employee_group_id}.${peoplesoft_id}`,
                                            name,
                                            id,
                                          }),
                                        )}
                                      />

                                      {selectedEmployeeClassificationGroups.at(index)?.employeeGroup == 'OEX' && (
                                        <div style={{ color: '#9F9D9C' }}>
                                          Please make sure you select the Schedule A job code (denoted in brackets)
                                        </div>
                                      )}
                                    </>
                                  );
                                }}
                              />
                            </>
                          </Form.Item>
                        </Col>
                      </Row>{' '}
                      <Divider className="hr-reduced-margin" />
                    </div>
                  ))}

                  <>
                    <WizardValidationError formErrors={basicFormErrors} fieldName="employeeClassificationGroups" />
                    <Row>
                      <Col>
                        <Form.Item>
                          <Button
                            type="link"
                            onClick={() => {
                              addGeneralEmployeeGroup();
                              triggerBasicDetailsValidation();
                            }}
                            icon={<PlusOutlined />}
                            disabled={
                              selectedEmployeeClassificationGroups.find((sec: any) => sec.employeeGroup != 'OEX') !=
                              undefined
                            }
                          >
                            Add a general classification
                          </Button>
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item>
                          <Button
                            type="link"
                            onClick={() => {
                              addScheduleA();
                              triggerBasicDetailsValidation();
                            }}
                            icon={<PlusOutlined />}
                            disabled={
                              selectedEmployeeClassificationGroups.find((sec: any) => sec.employeeGroup == 'OEX') !=
                              undefined
                            }
                          >
                            Add a Schedule A classification
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </>
                </>
              ) : (
                <>
                  {employeeClassificationGroupsFields.map((item) => {
                    const [id, group_id, peoplesoft_id] = item?.classification?.split('.') ?? [null, null, null];
                    if (!id) return null;
                    const classificationName =
                      classificationsData?.classifications.find(
                        (c) => c.id === id && c.peoplesoft_id === peoplesoft_id && c.employee_group_id === group_id,
                      )?.name || 'Not found';
                    return (
                      <div key={item.id}>
                        {classificationName} ({item.employeeGroup})
                      </div>
                    );
                  })}
                </>
              )}
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
                                            !selectedProfession.map((p: any) => p.jobFamily).includes(jf.id) ||
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
                                        // Modal.confirm({
                                        //   title: 'Confirmation',
                                        //   content:
                                        //     'Removing job family or stream may result in removal of some of the fields selected from pick lists in the Job Profile page. Are you sure you want to continue?',
                                        //   onOk: () => {
                                        remove(index);
                                        // removing last one - append blank
                                        if (selectedProfession?.length === 1) {
                                          append({ jobFamily: -1, jobStreams: [] });
                                        }
                                        handleJobFamilyChange();
                                        triggerBasicDetailsValidation();
                                        //   },
                                        // });
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
                          <b>{jobProfileData?.jobProfile.jobFamilies[index].jobFamily.name}</b>
                        </Typography.Text>
                        {/*
                            
                            fix this to display all
                            
                            
                            */}
                        {jobProfileData?.jobProfile.streams.map((streamItem: any) => (
                          <Typography.Text key={streamItem.stream.id} style={{ marginBottom: '5px', display: 'block' }}>
                            {streamItem.stream.name}
                          </Typography.Text>
                        ))}
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

                  {isCurrentVersion && <WizardValidationError formErrors={basicFormErrors} fieldName="professions" />}
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
                                  if (selectedEmployeeClassificationGroups) {
                                    filteredReportToRelationship = allValues.filter(
                                      (r: string) =>
                                        !selectedEmployeeClassificationGroups.find(
                                          (ecg: any) => ecg.classification == r,
                                        ),
                                    );
                                  }

                                  if (filteredReportToRelationship.length === selectedItems.length)
                                    setValue('all_reports_to', true);
                                  else setValue('all_reports_to', false);
                                  triggerBasicDetailsValidation();
                                }}
                                autoClearSearchValue={false}
                                // todo: do the filtering externally, wasn't able to do it because of inifinite render loop
                                treeData={filterTreeData(treeDataConverted)}
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
                          jobProfileData?.jobProfile.reports_to.map((r: any) => <Tag>{r.classification.code}</Tag>)
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
                      <>{jobProfileData?.jobProfile.scopes.map((s: any) => <Tag>{s.scope.name}</Tag>)}</>
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
                              />
                            </>
                          )}
                        />
                        <WizardValidationError formErrors={basicFormErrors} fieldName="ministries" />
                      </>
                    ) : (
                      <>{jobProfileData?.jobProfile.organizations.map((o: any) => <Tag>{o.organization.name}</Tag>)}</>
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

            <JobContextEditor
              control={control}
              isCurrentVersion={isCurrentVersion}
              jobProfileData={jobProfileData}
              triggerBasicDetailsValidation={triggerBasicDetailsValidation}
              basicFormErrors={basicFormErrors}
            />
          </Form>
        </Col>
      </Row>
    </>
  );
};
