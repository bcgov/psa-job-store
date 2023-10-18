/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Descriptions, DescriptionsProps, Grid, Typography } from 'antd';
import dayjs from 'dayjs';
import { Link, useParams } from 'react-router-dom';
import data from '../job-profiles.json';

const { Text } = Typography;
const { useBreakpoint } = Grid;

export const JobProfile = () => {
  const params = useParams();
  const jobProfile = () => data.find((d) => d.id === params.id);
  const screens = useBreakpoint();

  const items: DescriptionsProps['items'] = [
    {
      key: 'title',
      label: 'Title',
      children: jobProfile()?.title,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'classification',
      label: 'Classification',
      children: `${jobProfile()?.classification.occupation_group.name} ${jobProfile()?.classification.grid.name}`,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'number',
      label: 'Job Store #',
      children: jobProfile()?.number,
      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'updated_at',
      label: 'Last Updated',
      children: dayjs(jobProfile()?.updated_at).format('MMMM D, YYYY @ h:mm:ss A'),

      span: { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 },
    },
    {
      key: 'context',
      label: 'Job Context',
      children: jobProfile()?.context,
      span: 24,
    },
    {
      key: 'overview',
      label: 'Job Overview',
      children: jobProfile()?.overview,
      span: 24,
    },
    {
      key: 'required_accountabilities',
      label: 'Required Accountabilities',
      children: <ul>{jobProfile()?.accountabilities.required.map((accountability) => <li>{accountability}</li>)}</ul>,
      span: 24,
    },
    {
      key: 'optional_accountabilities',
      label: 'Optional Accountabilities',
      children: <ul>{jobProfile()?.accountabilities.optional.map((accountability) => <li>{accountability}</li>)}</ul>,
      span: 24,
    },
    {
      key: 'requirements',
      label: 'Minimum Job Requirements',
      children: <ul>{jobProfile()?.requirements.map((requirement) => <li>{requirement}</li>)}</ul>,
      span: 24,
    },
    {
      key: 'behavioural_competencies',
      label: 'Behavioural Competencies',
      children: (
        <ul>
          {jobProfile()?.behavioural_competencies.map((competency) => (
            <li>
              <Text strong>{competency.name}</Text> {competency.description}
            </li>
          ))}
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
        }}
      />
    </>
  );
};
