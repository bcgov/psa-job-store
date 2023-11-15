/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Descriptions, DescriptionsProps, Grid, Typography } from 'antd';
import { Type } from 'class-transformer';
import { IsNotEmpty, Length, ValidateNested } from 'class-validator';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { JobProfileModel, useLazyGetJobProfileQuery } from '../../../redux/services/graphql-api/job-profile.api';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface JobProfileProps {
  profileData?: any;
  id?: string; // The id is optional, as it can also be retrieved from the params
  onProfileLoad?: (profileData: JobProfileModel) => void;
}

class BehaviouralCompetency {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}

export class JobProfileValidationModel {
  id: number;

  number: number;

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
}

export const JobProfile: React.FC<JobProfileProps> = ({ id, profileData, onProfileLoad }) => {
  const params = useParams();
  const resolvedId = id ?? params.id; // Using prop ID or param ID
  const screens = useBreakpoint();

  // If neither resolvedId nor profileData is present, throw an error
  if (!resolvedId && !profileData) throw new Error('No ID');

  // Using the lazy query to have control over when the fetch action is dispatched
  // (not dispatching if profileData was already provided)
  const [triggerGetJobProfile, { data, isLoading }] = useLazyGetJobProfileQuery();

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
  }, [resolvedId, profileData, triggerGetJobProfile]);

  // useEffect to set effectiveData when data is fetched from the API
  useEffect(() => {
    if (!profileData && data && !isLoading) {
      // Only set effectiveData from fetched data if profileData is not provided
      if (onProfileLoad) onProfileLoad(data.jobProfile);

      setEffectiveData(data.jobProfile);
    }
  }, [data, isLoading, profileData, onProfileLoad]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const items: DescriptionsProps['items'] = [
    {
      key: 'title',
      label: 'Title',
      children: effectiveData?.title,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'classification',
      label: 'Classification',
      children: (
        <div>
          {`${effectiveData?.classification?.occupation_group.name} ${effectiveData?.classification?.grid.name}`}
        </div>
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
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'context',
      label: 'Job Context',
      children: effectiveData?.context,
      span: 24,
    },
    {
      key: 'overview',
      label: 'Job Overview',
      children: effectiveData?.overview,
      span: 24,
    },
    {
      key: 'required_accountabilities',
      label: 'Required Accountabilities',
      children: <ul>{effectiveData?.accountabilities.required.map((accountability) => <li>{accountability}</li>)}</ul>,
      span: 24,
    },
    {
      key: 'optional_accountabilities',
      label: 'Optional Accountabilities',
      children: <ul>{effectiveData?.accountabilities.optional.map((accountability) => <li>{accountability}</li>)}</ul>,
      span: 24,
    },
    {
      key: 'requirements',
      label: 'Minimum Job Requirements',
      children: <ul>{effectiveData?.requirements.map((requirement) => <li>{requirement}</li>)}</ul>,
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
                  <Text strong>{name}</Text> {description}
                </li>
              );
            },
          )}
        </ul>
      ),
      span: 24,
    },
  ];

  return (
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
        contentStyle={{
          verticalAlign: 'top',
        }}
      />
    </>
  );
};
