/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined } from '@ant-design/icons';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Descriptions, DescriptionsProps, Form, Grid, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Type } from 'class-transformer';
import { IsNotEmpty, Length, ValidateNested } from 'class-validator';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { useGetJobProfileQuery } from '../../../redux/services/graphql-api/job-profile.api';
import { FormItem } from '../../../utils/FormItem';

// const { Text } = Typography;
const { useBreakpoint } = Grid;

interface ConfigProps {
  isEditable?: boolean;
}

interface JobProfileProps {
  id?: string; // The id is optional, as it can also be retrieved from the params
  config?: ConfigProps;
}

class BehaviouralCompetency {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}

class JobProfileValidationModel {
  @Length(2, 30)
  title: string;

  @IsNotEmpty({ message: 'Classification is required.' })
  classification: string;

  @Length(2, 30)
  context: string;

  @Length(2, 30)
  overview: string;

  required_accountabilities: string[];

  optional_accountabilities: string[];

  requirements: string[];

  @ValidateNested({ each: true })
  @Type(() => BehaviouralCompetency)
  behavioural_competencies: BehaviouralCompetency[];
}

export const JobProfile: React.FC<JobProfileProps> = ({ id, config }) => {
  const params = useParams();
  const resolvedId = id ?? params.id; // Use the prop if available, otherwise use the param
  if (!resolvedId) throw new Error('No ID');

  const { data, isLoading, error } = useGetJobProfileQuery({ id: +resolvedId });
  console.log('data: ', data);
  const screens = useBreakpoint();

  const renderField = (fieldKey: string, displayValue: any, editableComponent: JSX.Element) => {
    // console.log('renderField: ', fieldKey);
    if (config?.isEditable ?? false) {
      // console.log('rendering..');
      return editableComponent;
    }
    return displayValue;
  };

  const resolver = classValidatorResolver(JobProfileValidationModel);
  const { register, control, handleSubmit, reset } = useForm<JobProfileValidationModel>({
    resolver,
    defaultValues: {
      title: data?.jobProfile.title,
      context: data?.jobProfile.context,
      overview: data?.jobProfile.overview,
      // todo: uncomment once API is complete
      // classification:data?.jobProfile.classification.occupation_group.name + ' ' + data?.jobProfile.classification.grid.name,
      // required_accountabilities: data?.jobProfile.accountabilities.required || [],
      // optional_accountabilities: data?.jobProfile.accountabilities.optional || [],
      // requirements: data?.jobProfile.requirements || [],
      // behavioural_competencies: data?.jobProfile.behavioural_competencies || [],
    },
    mode: 'onChange',
  });

  // Reset form with fetched data once it's available
  useEffect(() => {
    console.log('useEffect', data, isLoading);
    if (data && !isLoading) {
      console.log('resetting title: ', data?.jobProfile.title, 'context: ', data?.jobProfile.context);
      reset({
        title: data?.jobProfile.title,
        context: data?.jobProfile.context,
        overview: data?.jobProfile.overview,
        // todo: uncomment once API is complete
        // classification:data?.jobProfile.classification.occupation_group.name + ' ' + data?.jobProfile.classification.grid.name,
        // required_accountabilities: data?.jobProfile.accountabilities.required || [],
        // optional_accountabilities: data?.jobProfile.accountabilities.optional || [],
        // requirements: data?.jobProfile.requirements || [],
        // behavioural_competencies: data?.jobProfile.behavioural_competencies || [],
      });
    }
  }, [data, isLoading, reset]);

  const classificationOptions = ['Option1', 'Option2', 'Clerk 9'];

  // todo: uncomment once API is complete
  // const { fields, append, remove } = useFieldArray<any>({
  //   control,
  //   name: 'required_accountabilities' as any,
  // });

  // const {
  //   fields: opt_fields,
  //   append: opt_append,
  //   remove: opt_remove,
  // } = useFieldArray<any>({
  //   control,
  //   name: 'optional_accountabilities' as any,
  // });

  // const {
  //   fields: requirements_fields,
  //   append: requirements_append,
  //   remove: requirements_remove,
  // } = useFieldArray<any>({
  //   control,
  //   name: 'requirements' as any,
  // });

  // const {
  //   fields: competencyFields,
  //   append: competencyAppend,
  //   remove: competencyRemove,
  // } = useFieldArray({
  //   control,
  //   name: 'behavioural_competencies',
  // });

  if (isLoading) {
    return <p>Loading...</p>; // or render a spinner/loader
  }

  const items: DescriptionsProps['items'] = [
    {
      key: 'title',
      label: 'Title',
      children: renderField(
        'title',
        data?.jobProfile.title,
        <FormItem name="title" control={control}>
          <Input />
        </FormItem>,
      ),
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'classification',
      label: 'Classification',
      children: '',
      // children: renderField(
      //   'classification',
      //   `${data?.jobProfile.classification.occupation_group.name} ${data?.jobProfile.classification.grid.name}`,
      //   <FormItem name="classification" control={control}>
      //     <Select {...register('classification')}>
      //       {classificationOptions.map((option) => (
      //         <Select.Option value={option} key={option}>
      //           {option}
      //         </Select.Option>
      //       ))}
      //     </Select>
      //   </FormItem>,
      // ),
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'number',
      label: 'Job Store #',
      children: data?.jobProfile.number,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'updated_at',
      label: 'Last Updated',
      children: <div />,
      // children: dayjs(data?.jobProfile.updated_at).format('MMMM D, YYYY @ h:mm:ss A'),

      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'context',
      label: 'Job Context',
      children: renderField(
        'context',
        data?.jobProfile.context,
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
        'overview',
        data?.jobProfile.overview,
        <FormItem name="overview" control={control}>
          <TextArea />
        </FormItem>,
      ),
      span: 24,
    },
    {
      key: 'required_accountabilities',
      label: 'Required Accountabilities',
      children: (
        <ul>{/* {data?.jobProfile.accountabilities.required.map((accountability) => <li>{accountability}</li>)} */}</ul>
      ),
      // children: renderField(
      //   'required_accountabilities',
      //   <ul>{data?.jobProfile.accountabilities.required.map((accountability) => <li>{accountability}</li>)}</ul>,
      //   <>
      //     <List
      //       dataSource={fields}
      //       renderItem={(field, index) => (
      //         <List.Item style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      //           <FormItem
      //             name={`required_accountabilities.${index}`}
      //             control={control}
      //             style={{ flex: 1, marginRight: '10px' }}
      //           >
      //             <TextArea defaultValue={(field as any).value} style={{ width: '100%' }} />
      //           </FormItem>

      //           <Button type="primary" danger onClick={() => remove(index)}>
      //             Delete
      //           </Button>
      //         </List.Item>
      //       )}
      //     />

      //     <Button
      //       type="dashed"
      //       onClick={() => {
      //         append('');
      //       }}
      //       style={{ marginTop: '20px' }}
      //     >
      //       Add Accountability
      //     </Button>
      //   </>,
      // ),
      span: 24,
    },
    {
      key: 'optional_accountabilities',
      label: 'Optional Accountabilities',
      children: (
        <ul>{/* {data?.jobProfile.accountabilities.optional.map((accountability) => <li>{accountability}</li>)} */}</ul>
      ),
      // children: renderField(
      //   'optional_accountabilities',
      //   <ul>{data?.jobProfile.accountabilities.optional.map((accountability) => <li>{accountability}</li>)}</ul>,
      //   <>
      //     <List
      //       dataSource={opt_fields}
      //       renderItem={(field, index) => (
      //         <List.Item style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      //           <FormItem
      //             name={`optional_accountabilities.${index}`}
      //             control={control}
      //             style={{ flex: 1, marginRight: '10px' }}
      //           >
      //             <TextArea defaultValue={(field as any).value} style={{ width: '100%' }} />
      //           </FormItem>

      //           <Button type="primary" danger onClick={() => opt_remove(index)}>
      //             Delete
      //           </Button>
      //         </List.Item>
      //       )}
      //     />

      //     <Button
      //       type="dashed"
      //       onClick={() => {
      //         opt_append('');
      //       }}
      //       style={{ marginTop: '20px' }}
      //     >
      //       Add Optional Accountability
      //     </Button>
      //   </>,
      // ),
      span: 24,
    },
    {
      key: 'requirements',
      label: 'Minimum Job Requirements',
      children: <ul>{/* {data?.jobProfile.requirements.map((requirement) => <li>{requirement}</li>)} */}</ul>,
      // children: renderField(
      //   'requirements',
      //   <ul>{data?.jobProfile?.requirements.map((requirement) => <li>{requirement}</li>)}</ul>,
      //   <>
      //     <List
      //       dataSource={requirements_fields}
      //       renderItem={(field, index) => (
      //         <List.Item style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      //           <FormItem name={`requirements.${index}`} control={control} style={{ flex: 1, marginRight: '10px' }}>
      //             <TextArea defaultValue={(field as any).value} style={{ width: '100%' }} />
      //           </FormItem>

      //           <Button type="primary" danger onClick={() => requirements_remove(index)}>
      //             Delete
      //           </Button>
      //         </List.Item>
      //       )}
      //     />

      //     <Button
      //       type="dashed"
      //       onClick={() => {
      //         requirements_append('');
      //       }}
      //       style={{ marginTop: '20px' }}
      //     >
      //       Add Requirement
      //     </Button>
      //   </>,
      // ),
      span: 24,
    },
    {
      key: 'behavioural_competencies',
      label: 'Behavioural Competencies',
      children: (
        <ul>
          {/* {data?.jobProfile.behavioural_competencies.map((competency) => (
            <li>
              <Text strong>{competency.name}</Text> {competency.description}
            </li>
          ))} */}
        </ul>
      ),
      // children: renderField(
      //   'behavioural_competencies',
      //   <ul>
      //     {data?.jobProfile?.behavioural_competencies.map((competency) => (
      //       <li>
      //         <Text strong>{competency.name}</Text> {competency.description}
      //       </li>
      //     ))}
      //   </ul>,
      //   <>
      //     <List
      //       dataSource={competencyFields}
      //       renderItem={(item, index) => (
      //         <List.Item style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      //           <FormItem
      //             name={`behavioural_competencies.${index}.name`}
      //             control={control}
      //             style={{ flex: 1, marginRight: '10px' }}
      //           >
      //             <Input defaultValue={item.name} placeholder="Name" style={{ width: '100%' }} />
      //           </FormItem>

      //           <FormItem
      //             name={`behavioural_competencies.${index}.description`}
      //             control={control}
      //             style={{ flex: 2, marginRight: '10px' }}
      //           >
      //             <TextArea defaultValue={item.description} placeholder="Description" style={{ width: '100%' }} />
      //           </FormItem>

      //           <Button type="primary" danger onClick={() => competencyRemove(index)}>
      //             Delete
      //           </Button>
      //         </List.Item>
      //       )}
      //     />
      //     <Button
      //       type="dashed"
      //       onClick={() => competencyAppend({ name: '', description: '' })}
      //       style={{ marginTop: '20px' }}
      //     >
      //       Add Competency
      //     </Button>
      //   </>,
      // ),
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
        }}
      />
    </>
  );

  return config?.isEditable ? (
    <Form
      onFinish={handleSubmit((data) => {
        console.log(data);
      })}
    >
      {renderContent()}
    </Form>
  ) : (
    renderContent()
  );
};
