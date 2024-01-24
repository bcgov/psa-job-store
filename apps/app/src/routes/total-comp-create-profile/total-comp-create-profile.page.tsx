/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
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
  Modal,
  Radio,
  Row,
  Select,
  Switch,
  Tabs,
  Tooltip,
  TreeSelect,
  Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MinistriesSelect from '../../components/app/common/components/ministries-select.component';
import '../../components/app/common/css/filtered-table.page.css';
import { PageHeader } from '../../components/app/page-header.component';
import {
  useGetClassificationsQuery,
  useGetGroupedClassificationsQuery,
} from '../../redux/services/graphql-api/classification.api';
import { useGetEmployeeGroupsQuery } from '../../redux/services/graphql-api/employee-group.api';
import { useGetJobFamiliesQuery } from '../../redux/services/graphql-api/job-family.api';
import { useGetJobProfileMinimumRequirementsQuery } from '../../redux/services/graphql-api/job-profile-minimum-requirements.api';
import { useGetJobProfileScopesQuery } from '../../redux/services/graphql-api/job-profile-scope';
import { useGetJobProfileStreamsQuery } from '../../redux/services/graphql-api/job-profile-stream';
import { CreateJobProfileInput } from '../../redux/services/graphql-api/job-profile-types';
import {
  useCreateJobProfileMutation,
  useGetJobProfilesDraftsCareerGroupsQuery,
  useGetJobProfilesDraftsMinistriesQuery,
  useLazyGetNextAvailableJobProfileNumberQuery,
  useLazyIsJobProfileNumberAvailableQuery,
} from '../../redux/services/graphql-api/job-profile.api';
import { useGetJobRolesQuery } from '../../redux/services/graphql-api/job-role.api';
import { FormItem } from '../../utils/FormItem';
import ContentWrapper from '../home/components/content-wrapper.component';
import { IsIndigenousCompetency } from '../wizard/components/is-indigenous-competency.component';
import BehaviouralComptencyPicker, {
  BehaviouralCompetencyData,
} from '../wizard/components/wizard-behavioural-comptency-picker';
import ReorderButtons from './components/reorder-buttons';
import './total-comp-published-profies.page.css';

const { Option } = Select;
const { Text } = Typography;

export const TotalCompCreateProfilePage = () => {
  // BASIC DETAILS FORM
  const ministriesData = useGetJobProfilesDraftsMinistriesQuery().data?.jobProfilesDraftsMinistries;
  const careerGroupData = useGetJobProfilesDraftsCareerGroupsQuery().data?.jobProfilesDraftsCareerGroups;

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

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues: getBasicDetailsValues,
  } = useForm({
    defaultValues: {
      jobTitle: '',
      jobStoreNumber: '',
      employeeGroup: null,
      classification: null,
      jobRole: null,
      professions: [{ jobFamily: -1, jobStreams: [] }],
      role: 1,
      reportToRelationship: [],
      scopeOfResponsibility: null,
      ministries: [],
      classificationReviewRequired: false,
      jobContext: '',
    },
    // resolver: zodResolver(schema)
  });

  // job store number validation
  const jobStoreNumber = watch('jobStoreNumber');
  const [validationStatus, setValidationStatus] = useState<string | null>(null);

  const [fetchingNextNumber, setFetchingNextNumber] = useState(false);
  const [checkNumberAvailability] = useLazyIsJobProfileNumberAvailableQuery();
  const [getNextAvailableNumber, { data: nextNumberData }] = useLazyGetNextAvailableJobProfileNumberQuery();

  // Fetch the next available number initially
  useEffect(() => {
    getNextAvailableNumber();
  }, [getNextAvailableNumber]);

  // Set the fetched number as the default value
  useEffect(() => {
    if (nextNumberData?.nextAvailableJobProfileNumber !== undefined) {
      setValue('jobStoreNumber', nextNumberData.nextAvailableJobProfileNumber.toString());
    }
  }, [nextNumberData, setValue]);

  // Function to fetch the next available number
  const fetchNextNumber = async () => {
    // Trigger the query to get the next available number
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
  };

  useEffect(() => {
    console.log('useEffect jobStoreNumber: ', jobStoreNumber);
    const numberValue = parseInt(jobStoreNumber, 10);
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
  }, [jobStoreNumber, nextNumberData, checkNumberAvailability]);

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

  // user deleted last item - re-add a blank one
  if (selectedProfession.length == 0) {
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

  //quill modules for rich text editing
  const quill_modules = {
    toolbar: [[{ list: 'ordered' }, { list: 'bullet' }], ['link'], [{ indent: '+1' }, { indent: '-1' }]],
  };

  // END BASIC DETAILS FORM

  // PROFILE FORM

  const {
    control: profileControl,
    handleSubmit: profileControlSubmit,
    watch: profileWatch,
    setValue: profileSetValue,
    getValues: getProfileValues,
  } = useForm({
    defaultValues: {
      overview: '',
      programOverview: '',
      accountabilities: [] as AccountabilityItem[],
      optionalAccountabilities: [] as TextItem[],
      educationAndWorkExperiences: [] as TextItem[],
      professionalRegistrationRequirements: [] as TextItem[],
      preferences: [] as TextItem[],
      knowledgeSkillsAbilities: [] as TextItem[],
      willingnessStatements: [] as TextItem[],
      securityScreenings: [] as TextItem[],
      behavioural_competencies: [] as BehaviouralCompetencyData[],
      markAllNonEditable: false,
    },
  });

  // required accountabilties
  interface AccountabilityItem {
    text: string;
    id?: string;
    nonEditable: boolean;
  }

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
    const updatedAccountabilities = accountabilitiesFields.map((field) => ({
      ...field,
      nonEditable: nonEditable,
    }));
    profileSetValue('accountabilities', updatedAccountabilities as AccountabilityItem[]);
  };

  const markAllNonEditable = profileWatch('markAllNonEditable');

  // optional accountabilties
  interface TextItem {
    text: string;
    id?: string;
  }

  const {
    fields: optionalAccountabilitiesFields,
    append: appendOptionalAccountability,
    remove: removeOptionalAccountability,
    move: moveOptionalAccountability,
  } = useFieldArray({
    control: profileControl,
    name: 'optionalAccountabilities',
  });

  const handleOptionalAccountabilityMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveOptionalAccountability(index, index - 1);
    } else {
      moveOptionalAccountability(index, index + 1);
    }
  };

  // education And Work Experience
  const {
    fields: educationAndWorkExperienceFields,
    append: appendEducationAndWorkExperience,
    remove: removeEducationAndWorkExperience,
    move: moveEducationAndWorkExperience,
  } = useFieldArray({
    control: profileControl,
    name: 'educationAndWorkExperiences',
  });

  const handleEducationAndWorkExperienceMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveEducationAndWorkExperience(index, index - 1);
    } else {
      moveEducationAndWorkExperience(index, index + 1);
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
    name: 'professionalRegistrationRequirements',
  });

  const handleProfessionalRegistrationRequirementsMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up') {
      moveProfessionalRegistrationRequirement(index, index - 1);
    } else {
      moveProfessionalRegistrationRequirement(index, index + 1);
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
    name: 'knowledgeSkillsAbilities',
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
    name: 'willingnessStatements',
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
    name: 'securityScreenings',
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

  const addBehaviouralCompetency = (competency: BehaviouralCompetencyData) => {
    behavioural_competencies_append(competency);
    setPickerVisible(false); // Hide picker after adding
  };

  // State to control visibility of the picker
  const [isPickerVisible, setPickerVisible] = useState(false);

  // Tree-select for report-to relationship
  const { SHOW_CHILD } = TreeSelect;
  const { data: treeData } = useGetGroupedClassificationsQuery({
    employee_group_ids: ['MGT', 'GEU', 'OEX'],
    effective_status: 'Active',
  });

  const transformToTreeData = (groupedClassifications: any) => {
    const transformItem = (item: any) => ({
      title: (item.groupName || item.name) + (item.employee_group_id ? ' (' + item.employee_group_id + ')' : ''),
      value: item.id || item.groupName,
      key: item.id || item.groupName,
      children: item.items?.map(transformItem),
    });

    return groupedClassifications.map(transformItem);
  };

  const treeDataConverted = treeData ? transformToTreeData(treeData.groupedClassifications) : [];

  const [selectAll, setSelectAll] = useState(false);

  const getAllTreeValues = (tree: any) => {
    const values: any = [];
    const getValues = (nodes: any) => {
      nodes.forEach((node: any) => {
        values.push(node.value);
        if (node.children) {
          getValues(node.children);
        }
      });
    };
    getValues(tree);
    return values;
  };

  const handleSelectAllReportTo = (isChecked: any) => {
    setSelectAll(isChecked);
    const allValues = isChecked ? getAllTreeValues(treeDataConverted) : [];
    setValue('reportToRelationship', allValues);
  };

  //employee group selector
  const { data: employeeGroupData } = useGetEmployeeGroupsQuery();

  // classifications selector data
  const { data: classificationsData } = useGetClassificationsQuery();

  // job role selector data
  const { data: jobRolesData } = useGetJobRolesQuery();

  // job profile scopes
  const { data: jobProfileScopes } = useGetJobProfileScopesQuery();

  const selectedScopeId = watch('scopeOfResponsibility');

  const selectedScopeDescription = useMemo(() => {
    return jobProfileScopes?.jobProfileScopes.find((scope) => scope.id === selectedScopeId)?.description || null;
  }, [selectedScopeId, jobProfileScopes]);

  // minimum requirements that change in reponse to classification changes
  const [isModalVisible, setIsModalVisible] = useState(false);
  const selectedClassificationId = watch('classification');

  const { data: jobProfileMinimumRequirements } = useGetJobProfileMinimumRequirementsQuery();

  // Handler for classification change
  const handleClassificationChange = (newValue: string | null) => {
    if (selectedClassificationId) {
      setIsModalVisible(true);
    } else {
      updateMinimumRequirementsFromClassification(newValue);
    }
  };

  const updateMinimumRequirementsFromClassification = (classId: string | null) => {
    if (classId) {
      const selectedClassification = classificationsData?.classifications.find(
        (classification) => classification.id === classId,
      );
      console.log('selectedClassification: ', selectedClassification);
      if (jobProfileMinimumRequirements && selectedClassification) {
        const filteredRequirements = jobProfileMinimumRequirements.jobProfileMinimumRequirements
          .filter((req) => req.grade === selectedClassification.grade)
          .map((req) => ({ text: req.requirement }));

        console.log('filteredRequirements: ', filteredRequirements);
        // Update the educationAndWorkExperiences field array
        profileSetValue('educationAndWorkExperiences', filteredRequirements);
      }
    }
  };
  // Handler for confirming classification change
  const handleConfirmChange = async () => {
    setIsModalVisible(false);
    updateMinimumRequirementsFromClassification(selectedClassificationId);
  };
  // END PROFILE FORM

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
              Profile’ page. Are you sure you want to continue?
            </p>
          </Modal>
          <Row justify="center" style={{ margin: '1rem 0' }}>
            <Col xs={24} sm={24} md={24} lg={20} xl={16}>
              <Form
                layout="vertical"
                onFinish={handleSubmit((data) => {
                  console.log(data);
                })}
              >
                <Card title="Job Title" bordered={false} className="custom-card">
                  <Row justify="start">
                    <Col xs={24} sm={12} md={10} lg={8} xl={8}>
                      <FormItem control={control} name="jobTitle">
                        <label style={srOnlyStyle} htmlFor="jobTitle">
                          Job Title
                        </label>
                        <Input placeholder="Ex.: Program Assistant" aria-label="Job Title" />
                      </FormItem>
                    </Col>
                  </Row>
                </Card>

                <Card title="JobStore Number" style={{ marginTop: 16 }} bordered={false} className="custom-card">
                  <Row justify="start">
                    <Col xs={24} sm={12} md={10} lg={8} xl={8}>
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
                    <Col xs={24} sm={12} md={10} lg={8} xl={8}>
                      <Form.Item label="Employee group" labelCol={{ className: 'card-label' }}>
                        <Controller
                          name="employeeGroup"
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              placeholder="Choose an employee group"
                              onChange={onChange}
                              onBlur={onBlur}
                              defaultValue={value}
                              style={{ width: '100%' }}
                              // Transforming data to required format for the Select options prop
                              options={employeeGroupData?.employeeGroups.map((group) => ({
                                label: group.id,
                                value: group.id,
                              }))}
                            />
                          )}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin" />

                  <Row justify="start">
                    <Col xs={24} sm={12} md={10} lg={8} xl={8}>
                      <Form.Item label="Classification" labelCol={{ className: 'card-label' }}>
                        {/* Form.Item for cosmetic purposes */}
                        <Controller
                          name="classification"
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              placeholder="Choose a classification"
                              onChange={(newValue) => {
                                onChange(newValue);
                                handleClassificationChange(newValue);
                              }}
                              onBlur={onBlur} // notify when input is touched/blur
                              defaultValue={value}
                              style={{ width: '100%' }}
                              showSearch={true}
                              filterOption={(input, option) => {
                                if (!option) return false;
                                return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                              }}
                              // Transforming data to required format for the Select options prop
                              options={classificationsData?.classifications.map((classification) => ({
                                label: classification.name,
                                value: classification.id,
                              }))}
                            ></Select>
                          )}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Card title="Type" style={{ marginTop: 16 }} bordered={false}>
                  <Row justify="start">
                    <Col xs={24} sm={12} md={10} lg={8} xl={8}>
                      <Form.Item label="Job role" labelCol={{ className: 'card-label' }}>
                        <Controller
                          name="jobRole"
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              placeholder="Choose a job role"
                              onChange={onChange}
                              onBlur={onBlur}
                              defaultValue={value}
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
                    <Col xs={24} sm={12} md={10} lg={8} xl={8}>
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
                              render={({ field: { onChange, onBlur } }) => (
                                <Row gutter={8} wrap={false}>
                                  <Col flex="auto">
                                    <Select
                                      onBlur={onBlur} // notify when input is touched/blur
                                      placeholder="Choose a profession"
                                      onChange={(value) => {
                                        // When profession changes, clear the jobStreams for this profession
                                        setValue(`professions.${index}.jobStreams`, []);
                                        onChange(value);
                                      }}
                                    >
                                      {/* Dynamically render profession options based on your data */}
                                      {jobFamiliesData?.jobFamilies.map((family) => (
                                        <Option key={family.id} value={family.id}>
                                          {family.name}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Col>
                                  <Col>
                                    <Button
                                      disabled={index == 0 && selectedProfession[index]?.jobFamily == -1}
                                      onClick={() => {
                                        remove(index);
                                        // removing last one - append blank
                                        if (selectedProfession.length == 1) {
                                          append({ jobFamily: -1, jobStreams: [] });
                                        }
                                      }}
                                      icon={<DeleteOutlined />}
                                    ></Button>
                                  </Col>
                                </Row>
                              )}
                            />
                          </Form.Item>

                          {/* Second level for job family/profession selector (select job stream/discipline) */}
                          {selectedProfession[index]?.jobFamily != -1 && (
                            <Form.Item
                              label="Job Streams / Disciplines"
                              labelCol={{ className: 'card-label' }}
                              style={{ borderLeft: '2px solid rgba(5, 5, 5, 0.06)', paddingLeft: '1rem' }}
                            >
                              <Controller
                                control={control}
                                name={`professions.${index}.jobStreams`}
                                render={({ field: field2 }) => {
                                  return (
                                    <Select
                                      {...field2}
                                      mode="multiple"
                                      placeholder="Select the job streams this role is part of"
                                      style={{ width: '100%' }}
                                      onChange={(selectedStreams) => {
                                        field2.onChange(selectedStreams);
                                      }}
                                      options={getJobStreamsForFamily(selectedProfession[index]?.jobFamily).map(
                                        (stream) => ({ label: stream.name, value: stream.id }),
                                      )}
                                    ></Select>
                                  );
                                }}
                              />
                            </Form.Item>
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
                          disabled={selectedProfession[0]?.jobFamily == -1}
                        >
                          Add another job family
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Card title="Additional information" style={{ marginTop: 16 }} bordered={false}>
                  <Row justify="start">
                    <Col xs={24} sm={12} md={10} lg={10} xl={10}>
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
                    <Col xs={24} sm={12} md={10} lg={8} xl={8}>
                      {/* Report-to relationship Select */}

                      <Form.Item label="Report-to relationship" labelCol={{ className: 'card-label' }}>
                        <Controller
                          name="reportToRelationship"
                          control={control}
                          render={({ field }) => (
                            <>
                              <Checkbox
                                onChange={(e) => handleSelectAllReportTo(e.target.checked)}
                                checked={selectAll}
                                style={{ marginBottom: '10px' }}
                              >
                                Select all
                              </Checkbox>
                              <TreeSelect
                                {...field}
                                treeData={treeDataConverted} // Replace with your data
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
                    <Col xs={24} sm={12} md={10} lg={8} xl={8}>
                      {/* Scope of Responsibility Select */}
                      <Form.Item label="Scope of Responsibility" labelCol={{ className: 'card-label' }}>
                        <Controller
                          name="scopeOfResponsibility"
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Select
                              placeholder="Choose the scope of responsibility"
                              onChange={onChange}
                              onBlur={onBlur}
                              defaultValue={value}
                              options={jobProfileScopes?.jobProfileScopes.map((scope) => ({
                                label: scope.name,
                                value: scope.id,
                              }))}
                            ></Select>
                          )}
                        />
                        <Typography.Text type="secondary">{selectedScopeDescription}</Typography.Text>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin" />

                  <Row justify="start">
                    <Col xs={24} sm={24} md={14} lg={14} xl={14}>
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
                          render={({ field: { onChange } }) => (
                            <>
                              <Text type="secondary" style={{ marginBottom: '5px', display: 'block' }}>
                                If selected, this role would be available only for those specific ministries.
                              </Text>
                              <MinistriesSelect isMultiSelect={true} onChange={onChange} />
                            </>
                          )}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin" />

                  <Row justify="start">
                    <Col xs={24} sm={12} md={10} lg={8} xl={8}>
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
                                Classification review required
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
                    <Col xs={24} sm={12} md={10} lg={10} xl={10}>
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
              <Form
                layout="vertical"
                onFinish={profileControlSubmit((data) => {
                  console.log('profile data: ', data);
                })}
              >
                <Card title="Job overview" bordered={false} className="custom-card">
                  <Row justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item labelCol={{ className: 'card-label' }}>
                        {/* Form.Item for cosmetic purposes */}
                        <Controller
                          name="overview"
                          control={profileControl}
                          render={({ field: { onChange, onBlur } }) => (
                            <TextArea
                              autoSize
                              placeholder="Provide an overview of the job profile"
                              aria-label="overview"
                              onChange={onChange} // send value to hook form
                              onBlur={onBlur} // notify when input is touched/blur
                            />
                          )}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Card title="Program overview" bordered={false} style={{ marginTop: 16 }} className="custom-card">
                  <Row justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item labelCol={{ className: 'card-label' }}>
                        {/* Form.Item for cosmetic purposes */}
                        <Controller
                          name="programOverview"
                          control={profileControl}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <>
                              <TextArea
                                maxLength={320}
                                autoSize
                                placeholder="Provide a program overview of the job profile"
                                aria-label="program overview"
                                onChange={onChange} // send value to hook form
                                onBlur={onBlur} // notify when input is touched/blur
                              />
                              <Typography.Paragraph
                                type="secondary"
                                style={{ textAlign: 'right', width: '100%', margin: '0' }}
                              >
                                {value.length} / 320
                              </Typography.Paragraph>
                            </>
                          )}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Card title="Accountabilities" style={{ marginTop: 16 }} bordered={false}>
                  {/* Required accountabilities */}
                  <Row justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                            <Col>Accountabilities</Col>
                            <Col>
                              <Form.Item style={{ margin: 0 }}>
                                <Controller
                                  control={profileControl}
                                  name="markAllNonEditable"
                                  render={({ field }) => (
                                    <Checkbox
                                      {...field}
                                      checked={markAllNonEditable}
                                      onChange={(e) => {
                                        field.onChange(e.target.checked);
                                        updateNonEditable(e.target.checked);
                                      }}
                                      disabled={accountabilitiesFields.length === 0}
                                    >
                                      Mark all as non-editable
                                    </Checkbox>
                                  )}
                                ></Controller>
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
                                          onChange={onChange} // send value to hook form
                                          checked={value}
                                        >
                                          Non-editable
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
                                      render={({ field }) => (
                                        <TextArea autoSize placeholder="Add an accountability" {...field} />
                                      )}
                                    />
                                  </Form.Item>
                                </Col>

                                <Col flex="none">
                                  <Button icon={<DeleteOutlined />} onClick={() => removeAccountability(index)} />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
                        <Form.Item>
                          <Button
                            type="link"
                            onClick={() => appendAccountability({ text: '', nonEditable: markAllNonEditable })}
                            icon={<PlusOutlined />}
                          >
                            Add an accountability
                          </Button>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin"></Divider>

                  {/* Optional accountabilities */}
                  <Row justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle">
                            <Col>Optional accountabilities</Col>
                          </Row>
                        }
                      >
                        {optionalAccountabilitiesFields.map((field, index) => (
                          <Row align="top" key={field.id} gutter={16} style={{ marginBottom: '1rem' }}>
                            {/* up/down controls */}
                            <Col flex="none" className="reorder-controls">
                              <ReorderButtons
                                index={index}
                                moveItem={handleOptionalAccountabilityMove}
                                upperDisabled={index === 0}
                                lowerDisabled={index === optionalAccountabilitiesFields.length - 1}
                              />
                            </Col>
                            <Col flex="auto">
                              <Row>{/* Non-editable checkbox */}</Row>
                              <Row gutter={10}>
                                <Col flex="auto">
                                  <Form.Item>
                                    <Controller
                                      control={profileControl}
                                      name={`optionalAccountabilities.${index}.text`}
                                      render={({ field }) => (
                                        <TextArea autoSize placeholder="Add an optional accountability" {...field} />
                                      )}
                                    />
                                  </Form.Item>
                                </Col>

                                <Col flex="none">
                                  <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() => removeOptionalAccountability(index)}
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
                        <Form.Item>
                          <Button
                            type="link"
                            onClick={() => appendOptionalAccountability({ text: '' })}
                            icon={<PlusOutlined />}
                          >
                            Add an optional accountability
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

                  {/* Education and work experience */}
                  <Row justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle">
                            <Col>Education and work experience</Col>
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
                              <Row>{/* Non-editable checkbox */}</Row>
                              <Row gutter={10}>
                                <Col flex="auto">
                                  <Form.Item>
                                    <Controller
                                      control={profileControl}
                                      name={`educationAndWorkExperiences.${index}.text`}
                                      render={({ field }) => (
                                        <TextArea autoSize placeholder="Add an optional accountability" {...field} />
                                      )}
                                    />
                                  </Form.Item>
                                </Col>

                                <Col flex="none">
                                  <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() => removeEducationAndWorkExperience(index)}
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
                        <Form.Item>
                          <Button
                            type="link"
                            onClick={() => appendEducationAndWorkExperience({ text: '' })}
                            icon={<PlusOutlined />}
                          >
                            Add an educational or work requirement
                          </Button>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider className="hr-reduced-margin"></Divider>

                  {/* Professional registration requirement */}
                  <Row justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle">
                            <Col>Professional registration requirement</Col>
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
                                      name={`professionalRegistrationRequirements.${index}.text`}
                                      render={({ field }) => (
                                        <TextArea
                                          autoSize
                                          placeholder="Add a professional registration requirement"
                                          {...field}
                                        />
                                      )}
                                    />
                                  </Form.Item>
                                </Col>

                                <Col flex="none">
                                  <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() => removeProfessionalRegistrationRequirement(index)}
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
                        <Form.Item>
                          <Button
                            type="link"
                            onClick={() => appendProfessionalRegistrationRequirement({ text: '' })}
                            icon={<PlusOutlined />}
                          >
                            Add a professional registration requirement
                          </Button>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Preferences */}
                  <Row justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
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
                                      render={({ field }) => (
                                        <TextArea autoSize placeholder="Add a preference" {...field} />
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
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
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
                                      name={`knowledgeSkillsAbilities.${index}.text`}
                                      render={({ field }) => (
                                        <TextArea
                                          autoSize
                                          placeholder="Add a knowledge, skill, or ability"
                                          {...field}
                                        />
                                      )}
                                    />
                                  </Form.Item>
                                </Col>

                                <Col flex="none">
                                  <Button
                                    icon={<DeleteOutlined />}
                                    onClick={() => removeKnowledgeSkillAbility(index)}
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
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
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
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
                                      name={`willingnessStatements.${index}.text`}
                                      render={({ field }) => (
                                        <TextArea
                                          autoSize
                                          placeholder="Add a willingness statement or proviso"
                                          {...field}
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
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        style={{ marginBottom: '0' }}
                        labelCol={{ className: 'full-width-label card-label' }}
                        label={
                          <Row justify="space-between" align="middle">
                            <Col>Security Screenings</Col>
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
                              <Row>{/* Non-editable checkbox */}</Row>
                              <Row gutter={10}>
                                <Col flex="auto">
                                  <Form.Item>
                                    <Controller
                                      control={profileControl}
                                      name={`securityScreenings.${index}.text`}
                                      render={({ field }) => (
                                        <TextArea
                                          autoSize
                                          placeholder="Add a security screenings requirement"
                                          {...field}
                                        />
                                      )}
                                    />
                                  </Form.Item>
                                </Col>

                                <Col flex="none">
                                  <Button icon={<DeleteOutlined />} onClick={() => removeSecurityScreening(index)} />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
                        <Form.Item>
                          <Button
                            type="link"
                            onClick={() => appendSecurityScreening({ text: '' })}
                            icon={<PlusOutlined />}
                          >
                            Add a security screenings requirement
                          </Button>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>

                <Card title="Behavioural competencies" style={{ marginTop: 16 }} bordered={false}>
                  {/* Behavioural competencies */}
                  <Row justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <>
                        <List
                          style={{ marginTop: '7px' }}
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
                              {/* Display behavioural competency name and description */}
                              <p style={{ flex: 1, marginRight: '10px', marginBottom: 0 }}>
                                <strong>
                                  {field.behavioural_competency.name}
                                  <IsIndigenousCompetency competency={field.behavioural_competency} />
                                </strong>
                                : {field.behavioural_competency.description}
                              </p>

                              {/* Trash icon/button for deletion */}
                              <Button
                                type="text" // No button styling, just the icon
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                  behavioural_competencies_remove(index);
                                }}
                                style={{
                                  border: 'none',
                                  padding: 0,
                                  color: '#D9D9D9',
                                }}
                              />

                              {/* Hidden fields to submit actual data */}
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
                        <Alert
                          role="note"
                          style={{ marginBottom: '10px', marginTop: '1rem', fontStyle: 'italic' }}
                          message="* denotes an Indigenous Behavioural Competency"
                          type="info"
                          showIcon
                        />

                        {isPickerVisible ? (
                          <BehaviouralComptencyPicker
                            onAdd={addBehaviouralCompetency}
                            onCancel={() => setPickerVisible(false)}
                            filterIds={behavioural_competencies_fields.map((b) => b.behavioural_competency.id)}
                            style={{ marginTop: '20px' }}
                          />
                        ) : (
                          <Button
                            type="link"
                            icon={<PlusOutlined />}
                            style={{ marginTop: '10px' }}
                            onClick={() => setPickerVisible(true)} // Show picker when "Add" button is clicked
                          >
                            Add a behavioural competency
                          </Button>
                        )}
                      </>
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
              <Card title="Save as Draft">
                <Typography.Text>Save your progress and come back later to make changes.</Typography.Text>
                <br></br>
                <Button type="primary" style={{ marginTop: 16 }}>
                  Save as Draft
                </Button>
              </Card>

              {/* Other Actions Card */}
              <Card style={{ marginTop: 24 }} title="Other Actions">
                <Typography.Title level={5}>Publish</Typography.Title>
                <Typography.Text>
                  Publish the job profile to the Job Store will allow hiring managers view the profile.
                </Typography.Text>
                <br></br>
                <Button type="primary" style={{ marginTop: 10 }}>
                  Publish Profile
                </Button>

                <Divider></Divider>

                <Typography.Title level={5}>Allow others to edit</Typography.Title>
                <Typography.Paragraph>
                  Share the URL with people who you would like to collaborate with (IDIR restricted).
                </Typography.Paragraph>
                <Typography.Text copyable>http://pjs-dev.apps.silver.devops.gov.bc.ca/wizard/edit/1</Typography.Text>

                <Divider></Divider>

                <Typography.Title level={5}>View all profiles</Typography.Title>
                <Typography.Text>View all profiles that you have created.</Typography.Text>
                <br></br>
                <Button style={{ marginTop: 10 }}>Go to Drafts</Button>
              </Card>
            </Col>
          </Row>
        </>
      ),
    },
  ];

  const [createJobProfile] = useCreateJobProfileMutation();

  async function submitJobProfileData(transformedData: CreateJobProfileInput) {
    try {
      const response = await createJobProfile(transformedData).unwrap();
      console.log('Job Profile Created ok: ', response);
    } catch (error) {
      console.error('Error creating job profile: ', error);
    }
  }

  function transformFormDataToApiSchema(formData: any): CreateJobProfileInput {
    return {
      title: formData.jobTitle,
      type: 'MINISTRY', // this gets set on the server
      number: parseInt(formData.jobStoreNumber, 10),
      overview: formData.overview,
      program_overview: formData.programOverview,
      review_required: formData.classificationReviewRequired,
      accountabilities: {
        required: formData.accountabilities.map((a: any) => a.text),
        optional: formData.optionalAccountabilities.map((a: any) => a.text),
      },
      requirements: formData.educationAndWorkExperiences.map((e: any) => e.text),
      professional_registration_requirements: formData.professionalRegistrationRequirements.map((p: any) => p.text),
      preferences: formData.preferences.map((p: any) => p.text),
      knowledge_skills_abilities: formData.knowledgeSkillsAbilities.map((k: any) => k.text),
      willingness_statements: formData.willingnessStatements.map((w: any) => w.text),
      security_screenings: formData.securityScreenings.map((s: any) => s.text),
      total_comp_create_form_misc: JSON.stringify({ markAllNonEditable: formData.markAllNonEditable }),
      behavioural_competencies: {
        create: formData.behavioural_competencies.map((bc: any) => ({
          behavioural_competency: { connect: { id: bc.behavioural_competency.id } },
        })),
      },
      classifications: {
        create: [
          {
            classification: { connect: { id: formData.classification } },
          },
        ],
      },
      organizations: {
        create: formData.ministries.map((orgId: any) => ({
          organization: { connect: { id: orgId } },
        })),
      },
      context: { create: { description: formData.jobContext } },
      role: { connect: { id: formData.jobRole } },
      role_type: { connect: { id: formData.role } },
      scope: { connect: { id: formData.scopeOfResponsibility } },
      jobFamilies: {
        create: formData.professions.map((pf: any) => ({
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
      reports_to: {
        create: formData.reportToRelationship.map((classificationId: any) => ({
          classification: { connect: { id: classificationId } },
        })),
      },
    };
  }

  const save = () => {
    console.log('save');
    const basicDetails = getBasicDetailsValues();
    const profileDetails = getProfileValues();

    const combinedData = {
      ...basicDetails,
      ...profileDetails,
    };

    console.log('Combined form data:', combinedData);

    const transformedData = transformFormDataToApiSchema(combinedData);
    console.log('transformedData: ', transformedData);
    submitJobProfileData(transformedData);
  };

  if (!ministriesData) return <>Loading..</>;

  return (
    <>
      <PageHeader
        title="New profile"
        subTitle="New profile"
        showButton1
        showButton2
        button2Text="Save as draft"
        button2Callback={save}
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
