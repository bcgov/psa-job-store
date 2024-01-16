/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeleteOutlined, DownOutlined, PlusOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Divider, Form, Input, Radio, Row, Select, Switch, Tabs, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { CSSProperties, useCallback, useMemo } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../components/app/common/css/filtered-table.page.css';
import { PageHeader } from '../../components/app/page-header.component';
import {
  useGetJobProfilesDraftsCareerGroupsQuery,
  useGetJobProfilesDraftsMinistriesQuery,
} from '../../redux/services/graphql-api/job-profile.api';
import { FormItem } from '../../utils/FormItem';
import ContentWrapper from '../home/components/content-wrapper.component';
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

  const { control, handleSubmit, watch, setValue, register } = useForm({
    defaultValues: {
      jobTitle: '',
      jobStoreNumber: '',
      employeeGroup: '',
      classification: '',
      jobRole: '',
      professions: [{ jobFamily: '', jobStreams: [] }],
      role: 'individualContributor',
      reportToRelationship: [],
      scopeOfResponsibility: '',
      ministries: [],
      otherFunctions: false,
      jobContext: '',
    },
    // resolver: zodResolver(schema)
  });

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
    append({ jobFamily: '', jobStreams: [] });
    // setValue('professions', [{ jobFamily: '', jobStreams: [] }]);
  }

  // Dummy data for professions and job streams
  const professions = ['Administration', 'Finance'];
  const jobStreams: any = useMemo(
    () => ({
      Administration: ['Administrative Support', 'Clerical', 'Office Management'],
      Finance: ['Financial Analysis', 'Accounting', 'Auditing'],
    }),
    [],
  );

  // This function would filter available job streams based on the selected profession
  const getAvailableJobStreams = useCallback(
    (profession: any) => {
      return jobStreams[profession] || [];
    },
    [jobStreams],
  );

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
    register: profileRegister,
    getValues: profileGetValues,
  } = useForm({
    defaultValues: {
      overview: '',
      accountabilities: [{ text: '', nonEditable: false }],
      markAllNonEditable: false,
    },
  });

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
    profileSetValue('accountabilities', updatedAccountabilities);
  };

  // Watch for changes in the mark all non-editable checkbox
  // profileWatch((value, { name, type }) => {
  //   console.log('watch? : ', value, name);
  //   if (name === 'markAllNonEditable') {
  //     updateNonEditable(value.markAllNonEditable);
  //   }
  // });

  const markAllNonEditable = profileWatch('markAllNonEditable');
  // END PROFILE FORM

  const tabItems = [
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
                <Card title="Overview" bordered={false} className="custom-card">
                  <Row justify="start">
                    <Col xs={24} sm={12} md={10} lg={8} xl={8}>
                      <Form.Item labelCol={{ className: 'card-label' }}>
                        {/* Form.Item for cosmetic purposes */}
                        <Controller
                          name="overview"
                          control={profileControl}
                          render={({ field: { onChange, onBlur, value, ref } }) => (
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

                <Card title="Accountabilities" style={{ marginTop: 16 }} bordered={false}>
                  <Row justify="start">
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                      <Form.Item
                        label={
                          <Row justify="space-between" align="bottom">
                            <Col>
                              <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}></div>
                              Accountabilities
                            </Col>
                            <Col>
                              <Form.Item>
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
                                    >
                                      Mark all as non-editable
                                    </Checkbox>
                                  )}
                                ></Controller>
                              </Form.Item>
                            </Col>
                          </Row>
                        }
                        labelCol={{ className: 'card-label' }}
                      >
                        {accountabilitiesFields.map((field, index) => (
                          <Row align="middle" key={field.id} gutter={16} className="accountability-row">
                            <Col flex="none" className="reorder-controls">
                              <Button
                                disabled={index === 0}
                                onClick={() => handleMove(index, 'up')}
                                icon={<UpOutlined />}
                              />
                              <Button
                                disabled={index === accountabilitiesFields.length - 1}
                                onClick={() => handleMove(index, 'down')}
                                icon={<DownOutlined />}
                              />
                            </Col>
                            <Col flex="auto">
                              <Form.Item>
                                <Controller
                                  control={profileControl}
                                  name={`accountabilities.${index}.text`}
                                  render={({ field }) => <Input {...field} />}
                                />
                              </Form.Item>
                            </Col>
                            <Col flex="none">
                              <Form.Item>
                                <Controller
                                  name={`accountabilities.${index}.nonEditable`}
                                  control={profileControl}
                                  render={({ field: { onChange, onBlur, value, ref } }) => {
                                    console.log('render checkbox: ', value);
                                    return (
                                      <Checkbox
                                        onChange={onChange} // send value to hook form
                                        checked={value}
                                      />
                                    );
                                  }}
                                />
                              </Form.Item>
                            </Col>
                            <Col flex="none">
                              <Button
                                type="primary"
                                icon={<DeleteOutlined />}
                                onClick={() => removeAccountability(index)}
                              />
                            </Col>
                          </Row>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => appendAccountability({ text: '', nonEditable: markAllNonEditable })}
                            icon={<PlusOutlined />}
                          >
                            Add another accountability
                          </Button>
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  </Row>
                </Card>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit Profile
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </>
      ),
    },
    {
      key: '1',
      label: 'Basic details',
      children: (
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
                      <Input placeholder="Ex.: 1001" aria-label="JobStore Number" />
                    </FormItem>
                  </Col>
                </Row>
              </Card>

              <Card title="Classification" style={{ marginTop: 16 }} bordered={false}>
                <Row justify="start">
                  <Col xs={24} sm={12} md={10} lg={8} xl={8}>
                    <Form.Item label="Employee group" labelCol={{ className: 'card-label' }}>
                      {/* Form.Item for cosmetic purposes */}
                      <Controller
                        name="employeeGroup"
                        control={control}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                          <Select
                            placeholder="Choose an employee group"
                            onChange={onChange} // send value to hook form
                            onBlur={onBlur} // notify when input is touched/blur
                            style={{ width: '100%' }}
                          >
                            {/* Options should be rendered dynamically based on your data */}
                            <Option value="group1">Group 1</Option>
                            <Option value="group2">Group 2</Option>
                            {/* ...other options */}
                          </Select>
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
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                          <Select
                            placeholder="Choose a classification"
                            onChange={onChange} // send value to hook form
                            onBlur={onBlur} // notify when input is touched/blur
                          >
                            {/* Options should be rendered dynamically based on your data */}
                            <Option value="classification1">Classification 1</Option>
                            <Option value="classification2">Classification 2</Option>
                            {/* ...other options */}
                          </Select>
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
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                          <Select
                            placeholder="Choose a job role"
                            onChange={onChange} // send value to hook form
                            onBlur={onBlur} // notify when input is touched/blur
                          >
                            {/* Options should be rendered dynamically based on your data */}
                            <Option value="jobRole1">Job role 1</Option>
                            <Option value="jobRole2">Job role 2</Option>
                            {/* ...other options */}
                          </Select>
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
                            render={({ field: { onChange, onBlur, value, ref } }) => (
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
                                    {professions.map((profession) => (
                                      <Option key={profession} value={profession}>
                                        {profession}
                                      </Option>
                                    ))}
                                  </Select>
                                </Col>
                                <Col>
                                  <Button
                                    disabled={index == 0 && selectedProfession[index]?.jobFamily == ''}
                                    onClick={() => {
                                      remove(index);
                                      // removing last one - append blank
                                      if (selectedProfession.length == 1) {
                                        append({ jobFamily: '', jobStreams: [] });
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
                        {selectedProfession[index]?.jobFamily != '' && (
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
                                  >
                                    {getAvailableJobStreams(selectedProfession[index]?.jobFamily)?.map(
                                      (stream: any) => (
                                        <Option key={stream} value={stream}>
                                          {stream}
                                        </Option>
                                      ),
                                    )}
                                  </Select>
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
                          append({ jobFamily: '', jobStreams: [] });
                        }}
                        block
                        icon={<PlusOutlined />}
                        disabled={selectedProfession[0]?.jobFamily == ''}
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
                            <Radio value="individualContributor">Individual Contributor</Radio>
                            <Radio value="peopleLeader">People Leader</Radio>
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
                          <Select {...field} placeholder="Choose all the positions this role should report to">
                            {/* Options here */}
                          </Select>
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
                        render={({ field }) => (
                          <Select placeholder="Choose the scope of responsibility">{/* Options here */}</Select>
                        )}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Divider className="hr-reduced-margin" />

                <Row justify="start">
                  <Col xs={24} sm={12} md={10} lg={8} xl={8}>
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
                        render={({ field }) => (
                          <Select {...field} mode="multiple" placeholder="Choose a ministry">
                            {/* Dynamically render Options here based on fetched data */}
                          </Select>
                        )}
                      />
                      <Text type="secondary">
                        If selected, this role would be available only for those specific ministries.
                      </Text>
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
                        name="otherFunctions"
                        control={control}
                        render={({ field: { onChange, value, name, ref } }) => (
                          <Switch checked={value} onChange={onChange} ref={ref} />
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

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      ),
    },
    {
      key: '4',
      label: 'Actions',
      children: (
        <>
          <Row justify="center">
            <Col xs={24} sm={24} md={24} lg={20} xl={16}>
              actions
            </Col>
          </Row>
        </>
      ),
    },
  ];

  if (!ministriesData || !careerGroupData) return <>Loading..</>;

  return (
    <>
      <PageHeader title="New profile" subTitle="New profile" />

      <ContentWrapper>
        <Tabs
          defaultActiveKey="2"
          items={tabItems}
          tabBarStyle={{ backgroundColor: '#fff', margin: '0 -1rem', padding: '0 1rem 0px 1rem' }}
        />
      </ContentWrapper>
    </>
  );
};
