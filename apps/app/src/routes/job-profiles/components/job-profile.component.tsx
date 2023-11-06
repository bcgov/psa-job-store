/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined } from '@ant-design/icons';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Descriptions, DescriptionsProps, Form, Grid, Input, List, Select, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Type } from 'class-transformer';
import { IsNotEmpty, Length, ValidateNested } from 'class-validator';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import {
  ClassificationModel,
  GetClassificationsResponse,
  useLazyGetClassificationsQuery,
} from '../../../redux/services/graphql-api/classification.api';
import { JobProfileModel, useLazyGetJobProfileQuery } from '../../../redux/services/graphql-api/job-profile.api';
import { FormItem } from '../../../utils/FormItem';
import WizardControls from '../../wizard/components/wizard-controls.component';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface ConfigProps {
  isEditable?: boolean;
}

interface JobProfileProps {
  profileData?: any;
  id?: string; // The id is optional, as it can also be retrieved from the params
  config?: ConfigProps;
  submitHandler?: SubmitHandler<Record<string, any>>;
  submitText?: string;
  showBackButton?: boolean;
  receivedClassificationsDataCallback?: (data: GetClassificationsResponse) => void;
}

class BehaviouralCompetency {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}

class JobProfileValidationModel {
  id: number;

  @Length(2, 500)
  title: string;

  // @IsNotEmpty({ message: 'Classification is required.' })
  // @ValidateNested()
  // @Type(() => Classification)
  classification: number | null;

  @Length(2, 500)
  context: string;

  @Length(2, 500)
  overview: string;

  required_accountabilities: Array<{ value: string }>;

  optional_accountabilities: Array<{ value: string }>;

  requirements: Array<{ value: string }>;

  @ValidateNested({ each: true })
  @Type(() => BehaviouralCompetency)
  behavioural_competencies: { behavioural_competency: BehaviouralCompetency }[];

  test?: Array<{ value: string }>;
}

export const JobProfile: React.FC<JobProfileProps> = ({
  id,
  profileData,
  config,
  submitHandler,
  submitText,
  showBackButton,
  receivedClassificationsDataCallback,
}) => {
  const params = useParams();
  const resolvedId = id ?? params.id; // Using prop ID or param ID
  const screens = useBreakpoint();

  // If neither resolvedId nor profileData is present, throw an error
  if (!resolvedId && !profileData) throw new Error('No ID');

  // Using the lazy query to have control over when the fetch action is dispatched
  // (not dispatching if profileData was already provided)
  const [triggerGetJobProfile, { data, isLoading }] = useLazyGetJobProfileQuery();
  const [triggerGetClassificationData, { data: classificationsData, isLoading: classificationsDataIsLoading }] =
    useLazyGetClassificationsQuery();

  // State to hold the effectiveData which can be from profileData prop or fetched from API
  const initialData = profileData ?? null;
  const [effectiveData, setEffectiveData] = useState<JobProfileModel | null>(initialData);

  useEffect(() => {
    // If profileData exists, use it to set the form state
    if (profileData) {
      setEffectiveData(profileData);
    } else if (!profileData && resolvedId) {
      // If no profileData is provided and an id exists, fetch the data
      triggerGetJobProfile({ id: +resolvedId });
    }
    triggerGetClassificationData(); // get data to populate classification dropdown. Todo: cache this?
  }, [resolvedId, profileData, triggerGetJobProfile, triggerGetClassificationData]);

  // useEffect to set effectiveData when data is fetched from the API
  useEffect(() => {
    if (!profileData && data && !isLoading) {
      // Only set effectiveData from fetched data if profileData is not provided
      setEffectiveData(data.jobProfile);
    }
  }, [data, isLoading, profileData]);

  useEffect(() => {
    if (classificationsData && !classificationsDataIsLoading && receivedClassificationsDataCallback) {
      receivedClassificationsDataCallback(classificationsData);
    }
  }, [classificationsData, classificationsDataIsLoading, receivedClassificationsDataCallback]);

  const { register, control, reset } = useForm<JobProfileValidationModel>({
    resolver: classValidatorResolver(JobProfileValidationModel),
    mode: 'onChange',
  });

  // todo: usage of this approach is undesirable, however it fixes various render issues
  // that appear to be linked with the custom FormItem component. Ideally eliminate the usage
  // of this state
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    if (effectiveData && !isLoading && classificationsData) {
      const classificationId = effectiveData?.classification
        ? classificationsData.classifications.find(
            (c) =>
              c.occupation_group.id === effectiveData.classification?.occupation_group.id &&
              c.grid.id === effectiveData.classification.grid.id,
          )?.id
        : null;

      reset({
        id: effectiveData?.id,
        title: effectiveData?.title,
        context: effectiveData?.context,
        overview: effectiveData?.overview,
        classification: classificationId,
        // array fileds are required to be nested in objects, so wrap string values in {value: item}
        required_accountabilities: effectiveData?.accountabilities.required
          ? effectiveData.accountabilities.required.map((item) => ({ value: item }))
          : [],
        optional_accountabilities: effectiveData?.accountabilities.optional
          ? effectiveData.accountabilities.optional.map((item) => ({ value: item }))
          : [],
        requirements: effectiveData?.requirements ? effectiveData.requirements.map((item) => ({ value: item })) : [],
        behavioural_competencies: effectiveData?.behavioural_competencies || [],
      });
    }
    setRenderKey((prevKey) => prevKey + 1);
  }, [effectiveData, isLoading, classificationsData, reset]);

  const renderField = (displayValue: any, editableComponent: JSX.Element) =>
    config?.isEditable ?? false ? editableComponent : displayValue;

  // Required Accountability Fields

  const {
    fields: acc_req_fields,
    append: acc_req_append,
    remove: acc_req_remove,
  } = useFieldArray<any>({
    control,
    name: 'required_accountabilities' as any,
  });

  // Optional Accountability Fields
  const {
    fields: acc_opt_fields,
    append: acc_opt_append,
    remove: acc_opt_remove,
  } = useFieldArray<any>({
    control,
    name: 'optional_accountabilities' as any,
  });

  const {
    fields: requirement_fields,
    append: requirement_append,
    remove: requirement_remove,
  } = useFieldArray<any>({
    control,
    name: 'requirements' as any,
  });

  if (isLoading || renderKey === 0) {
    return <p>Loading...</p>; // or render a spinner/loader
  }

  const items: DescriptionsProps['items'] = [
    {
      key: 'title',
      label: 'Title',
      children: renderField(
        effectiveData?.title,
        // <input type="text" {...register('title')}></input>,
        <FormItem name="title" control={control}>
          <Input />
        </FormItem>,
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'classification',
      label: 'Classification',
      children: renderField(
        `${effectiveData?.classification?.occupation_group.name} ${effectiveData?.classification?.grid.name}`,
        <FormItem name="classification" control={control}>
          <Select {...register('classification')}>
            {classificationsData?.classifications.map((classification: ClassificationModel) => (
              <Select.Option value={classification.id} key={classification.id}>
                {`${classification.occupation_group.name} ${classification.grid.name}`}
              </Select.Option>
            ))}
          </Select>
        </FormItem>,
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'number',
      label: 'Job Store #',
      children: effectiveData?.number,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'updated_at',
      label: 'Last Updated',
      children: <div />,
      // children: dayjs(effectiveData?.updated_at).format('MMMM D, YYYY @ h:mm:ss A'),

      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'context',
      label: 'Job Context',
      children: renderField(
        effectiveData?.context,
        // <input type="text" {...register('context')}></input>,
        <FormItem name="context" control={control}>
          <TextArea />
        </FormItem>,
      ),
      span: 24,
    },
    {
      key: 'overview',
      label: 'Job Overview',
      children: renderField(
        effectiveData?.overview,
        // <input type="text" {...register('overview')}></input>,
        <FormItem name="overview" control={control}>
          <TextArea />
        </FormItem>,
      ),
      span: 24,
    },
    {
      key: 'required_accountabilities',
      label: config?.isEditable ? (
        <div>
          Required Accountabilities
          <p style={{ fontWeight: 'initial', marginTop: '1rem' }}>
            ⚠️ Removing required accountabilities <strong>may</strong> trigger a classification review
          </p>
        </div>
      ) : (
        'Required Accountabilities'
      ),
      children: renderField(
        <ul>{effectiveData?.accountabilities.required.map((accountability) => <li>{accountability}</li>)}</ul>,
        <>
          <List
            dataSource={acc_req_fields}
            renderItem={(_field, index) => (
              <List.Item style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <FormItem
                  name={`required_accountabilities.${index}.value`}
                  control={control}
                  style={{ flex: 1, marginRight: '10px' }}
                >
                  <TextArea style={{ width: '100%' }} />
                </FormItem>

                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    acc_req_remove(index);
                    setRenderKey((prevKey) => prevKey + 1); // fixes issue where deleting item doesn't render properly
                  }}
                >
                  Delete
                </Button>
              </List.Item>
            )}
          />

          <Button
            type="dashed"
            onClick={() => {
              acc_req_append({ value: '' });
            }}
            style={{ marginTop: '20px' }}
          >
            Add Accountability
          </Button>
        </>,
      ),
      span: 24,
    },
    {
      key: 'optional_accountabilities',
      label: 'Optional Accountabilities',
      children: renderField(
        <ul>{effectiveData?.accountabilities.optional.map((accountability) => <li>{accountability}</li>)}</ul>,
        <>
          <List
            dataSource={acc_opt_fields}
            renderItem={(_field, index) => (
              <List.Item style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <FormItem
                  name={`optional_accountabilities.${index}.value`}
                  control={control}
                  style={{ flex: 1, marginRight: '10px' }}
                >
                  <TextArea style={{ width: '100%' }} />
                </FormItem>

                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    acc_opt_remove(index);
                    setRenderKey((prevKey) => prevKey + 1); // fixes issue where deleting item doesn't render properly
                  }}
                >
                  Delete
                </Button>
              </List.Item>
            )}
          />

          <Button
            type="dashed"
            onClick={() => {
              acc_opt_append({ value: '' });
            }}
            style={{ marginTop: '20px' }}
          >
            Add Optional Accountability
          </Button>
        </>,
      ),
      span: 24,
    },
    {
      key: 'requirements',
      label: config?.isEditable ? (
        <div>
          Minimum Job Requirements
          <p style={{ fontWeight: 'initial', marginTop: '1rem' }}>
            ⚠️ Significant changes to this area <strong>may</strong> trigger a classification review
          </p>
        </div>
      ) : (
        'Minimum Job Requirements'
      ),
      children: renderField(
        <ul>{effectiveData?.requirements.map((requirement) => <li>{requirement}</li>)}</ul>,
        <>
          <List
            dataSource={requirement_fields}
            renderItem={(_field, index) => (
              <List.Item style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <FormItem
                  name={`requirements.${index}.value`}
                  control={control}
                  style={{ flex: 1, marginRight: '10px' }}
                >
                  <TextArea style={{ width: '100%' }} />
                </FormItem>

                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    requirement_remove(index);
                    setRenderKey((prevKey) => prevKey + 1); // fixes issue where deleting item doesn't render properly
                  }}
                >
                  Delete
                </Button>
              </List.Item>
            )}
          />

          <Button
            type="dashed"
            onClick={() => {
              requirement_append({ value: '' });
            }}
            style={{ marginTop: '20px' }}
          >
            Add Requirement
          </Button>
        </>,
      ),
      span: 24,
    },
    {
      key: 'behavioural_competencies',
      label: 'Behavioural Competencies',
      children: (
        <ul>
          {(effectiveData?.behavioural_competencies ?? []).map(
            ({ behavioural_competency: { name, description } }, index) => {
              return (
                <li key={index}>
                  {/* Displaying the competency name and description */}
                  <Text strong>{name}</Text> {description}
                  {config?.isEditable && (
                    <>
                      {/* Hidden field to store the id */}
                      <FormItem
                        name={`behavioural_competencies.${index}.behavioural_competency.id`}
                        control={control}
                        hidden
                      >
                        <Input />
                      </FormItem>
                      {/* Hidden fields for editing */}
                      <FormItem
                        hidden
                        name={`behavioural_competencies.${index}.behavioural_competency.name`}
                        control={control}
                        style={{ flex: 1, marginRight: '10px' }}
                      >
                        <Input placeholder="Name" style={{ width: '100%' }} />
                      </FormItem>
                      <FormItem
                        hidden
                        name={`behavioural_competencies.${index}.behavioural_competency.description`}
                        control={control}
                        style={{ flex: 2, marginRight: '10px' }}
                      >
                        <TextArea placeholder="Description" style={{ width: '100%' }} />
                      </FormItem>
                    </>
                  )}
                </li>
              );
            },
          )}
        </ul>
      ),
      span: 24,
    },
  ];

  const renderContent = () => (
    <>
      {screens.xl === false ? (
        <Link to="/job-profiles">
          <ArrowLeftOutlined /> Back to Search Results
        </Link>
      ) : (
        <div />
      )}
      <Descriptions
        bordered
        column={24}
        items={items}
        labelStyle={{
          fontWeight: 700,
          width: '100px',
          verticalAlign: 'top',
        }}
      />
    </>
  );

  // function rerender() {
  //   setRenderKey((prevKey) => prevKey + 1);
  // }

  return config?.isEditable ? (
    <>
      {/* <button onClick={rerender}>Re-render</button> */}
      <Form
        key={renderKey}
        onFinish={(data) => {
          if (submitHandler) submitHandler(data);
        }}
      >
        <FormItem name="id" control={control} hidden>
          <Input />
        </FormItem>
        {renderContent()}
        <WizardControls submitText={submitText} showBackButton={showBackButton} />
      </Form>
    </>
  ) : (
    renderContent()
  );
};
