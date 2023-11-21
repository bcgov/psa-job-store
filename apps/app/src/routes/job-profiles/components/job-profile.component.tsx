/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Descriptions, DescriptionsProps, Grid, Typography } from 'antd';
import { Type } from 'class-transformer';
import { IsNotEmpty, Length, ValidateNested } from 'class-validator';
import { diff_match_patch } from 'diff-match-patch';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  JobProfileModel,
  TrackedFieldArrayItem,
  useLazyGetJobProfileQuery,
} from '../../../redux/services/graphql-api/job-profile.api';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface JobProfileProps {
  profileData?: any;
  id?: string; // The id is optional, as it can also be retrieved from the params
  onProfileLoad?: (profileData: JobProfileModel) => void;
  showBackToResults?: boolean;
  showDiff?: boolean;
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

export class JobProfileValidationModel {
  id: number;

  number: number;

  @Length(2, 500)
  title: string;

  // @IsNotEmpty({ message: 'Classification is required.' })
  // @ValidateNested()
  // @Type(() => Classification)
  classification: string | null;

  @Length(2, 500)
  context: string;

  @Length(2, 500)
  overview: string;

  required_accountabilities: (TrackedFieldArrayItem | ValueString)[];

  optional_accountabilities: (TrackedFieldArrayItem | ValueString)[];

  requirements: (TrackedFieldArrayItem | ValueString)[];

  @ValidateNested({ each: true })
  @Type(() => BehaviouralCompetency)
  behavioural_competencies: { behavioural_competency: BehaviouralCompetency }[];
}

export const JobProfile: React.FC<JobProfileProps> = ({
  id,
  profileData,
  onProfileLoad,
  showBackToResults = true,
  showDiff = false,
}) => {
  const params = useParams();
  const resolvedId = id ?? params.id; // Using prop ID or param ID
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

  const compareData = (original, modified) => {
    if (typeof original === 'string' && typeof modified === 'string') {
      const dmp = new diff_match_patch();
      const diff = dmp.diff_main(original, modified);
      dmp.diff_cleanupSemantic(diff); // Improves the quality of the diff

      return diff.map(([operation, text], index) => {
        const style = {};
        if (operation === 1) {
          // Insertion
          style.backgroundColor = 'lightgreen';
        } else if (operation === -1) {
          // Deletion
          style.backgroundColor = 'salmon';
        }

        return (
          <span key={index} style={style}>
            {text}
          </span>
        );
      });
    }
    // Add logic for array data
  };

  const compareLists = (original, modified) => {
    const maxLength = Math.max(original.length, modified.length);
    const comparisonResult = [];
    const dmp = new diff_match_patch();

    for (let i = 0; i < maxLength; i++) {
      const originalItem = original[i] ? (typeof original[i] === 'string' ? original[i] : original[i].value) : '';
      const modifiedItem = modified[i]
        ? typeof modified[i] === 'string'
          ? modified[i]
          : modified[i].disabled
          ? ''
          : modified[i].value
        : '';

      if (originalItem || modifiedItem) {
        const diff = dmp.diff_main(originalItem, modifiedItem);
        dmp.diff_cleanupSemantic(diff);

        comparisonResult.push(
          <li key={i}>
            {diff.map(([operation, text], index) => {
              const style = {};
              if (operation === 1) {
                // Insertion
                style.backgroundColor = 'lightgreen';
              } else if (operation === -1) {
                // Deletion
                style.backgroundColor = 'salmon';
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

  const compareCompetencies = (original, modified) => {
    const allNames = new Set([...original.map((item) => item.name), ...modified.map((item) => item.name)]);
    const comparisonResult = [];

    allNames.forEach((name) => {
      const originalItem = original.find((item) => item.name === name);
      const modifiedItem = modified.find((item) => item.name === name);

      if (originalItem && modifiedItem) {
        // Item unmodified
        comparisonResult.push(
          <li key={name}>
            <Text strong>{originalItem.name}</Text> {originalItem.description}
          </li>,
        );
      } else if (originalItem && !modifiedItem) {
        // Item removed
        comparisonResult.push(
          <li key={name} style={{ backgroundColor: 'salmon' }}>
            <Text strong>{originalItem.name}</Text> {originalItem.description}
          </li>,
        );
      } else if (!originalItem && modifiedItem) {
        // Item added
        comparisonResult.push(
          <li key={name} style={{ backgroundColor: 'lightgreen' }}>
            <Text strong>{modifiedItem.name}</Text> {modifiedItem.description}
          </li>,
        );
      }
    });

    return comparisonResult;
  };

  if (isLoading) {
    return <p aria-live="polite">Loading job profile...</p>;
  }

  const items: DescriptionsProps['items'] = [
    {
      key: 'title',
      label: 'Title',
      children: showDiff && originalData ? compareData(originalData.title, effectiveData?.title) : effectiveData?.title,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'classification',
      label: 'Classification',
      children: <div>{`${effectiveData?.classification?.code}`}</div>,
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
      children:
        showDiff && originalData ? compareData(originalData.context, effectiveData?.context) : effectiveData?.context,
      span: 24,
    },
    {
      key: 'overview',
      label: 'Job Overview',
      children:
        showDiff && originalData
          ? compareData(originalData.overview, effectiveData?.overview)
          : effectiveData?.overview,
      span: 24,
    },
    {
      key: 'required_accountabilities',
      label: 'Required Accountabilities',
      children: (
        <ul>
          {showDiff && originalData
            ? compareLists(originalData.accountabilities.required, effectiveData?.accountabilities.required)
            : effectiveData?.accountabilities.required.map((accountability, index) => {
                if (typeof accountability === 'string') {
                  return <li key={index}>{accountability}</li>;
                }
                if (accountability.disabled) {
                  return null;
                }
                return <li key={accountability.value}>{accountability.value}</li>;
              })}
        </ul>
      ),
      span: 24,
    },
    {
      key: 'optional_accountabilities',
      label: 'Optional Accountabilities',
      children: (
        <ul>
          {showDiff && originalData
            ? compareLists(originalData.accountabilities.optional, effectiveData?.accountabilities.optional)
            : effectiveData?.accountabilities.optional.map((accountability, index) => {
                if (typeof accountability === 'string') {
                  return <li key={index}>{accountability}</li>;
                }
                if (accountability.disabled) {
                  return null;
                }
                return <li key={accountability.value}>{accountability.value}</li>;
              })}
        </ul>
      ),
      span: 24,
    },
    {
      key: 'requirements',
      label: 'Minimum Job Requirements',
      children: (
        <ul>
          {showDiff && originalData
            ? compareLists(originalData.requirements, effectiveData?.requirements)
            : effectiveData?.requirements.map((requirement, index) => {
                if (typeof requirement === 'string') {
                  return <li key={index}>{requirement}</li>;
                }
                if (requirement.disabled) {
                  return null;
                }
                return <li key={requirement.value}>{requirement.value}</li>;
              })}
        </ul>
      ),
      span: 24,
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
      span: 24,
    },
  ];

  return (
    <>
      {screens.xl === false && showBackToResults ? (
        <nav aria-label="Breadcrumb">
          <Link to="/job-profiles">
            <ArrowLeftOutlined aria-hidden="true" /> Back to Search Results
          </Link>
        </nav>
      ) : (
        <div />
      )}
      <Descriptions
        aria-hidden="true"
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
          <p>{effectiveData?.title}</p>

          <h3>Classification</h3>
          <p>{`${effectiveData?.classification?.code}`}</p>

          <h3>Job Store #</h3>
          <p>{effectiveData?.number}</p>

          <h3>Last Updated</h3>
          <p>{/* last updated info */}</p>

          <h3>Job Context</h3>
          <p>{effectiveData?.context}</p>

          <h3>Job Overview</h3>
          <p>{effectiveData?.overview}</p>

          <h3>Required Accountabilities</h3>
          <ul>
            {effectiveData?.accountabilities.required.map((accountability, index) => {
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
          </ul>

          <h3>Optional Accountabilities</h3>
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
          </ul>

          <h3>Minimum Job Requirements</h3>
          <ul>
            {effectiveData?.requirements.map((requirement, index) => {
              if (typeof requirement === 'string') {
                return <li key={index}>{requirement}</li>;
              }

              if (requirement.disabled) {
                return null;
              }

              return <li key={requirement.value}>{requirement.value}</li>;
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
    </>
  );
};
