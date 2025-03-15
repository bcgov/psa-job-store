// src/components/job-profile/DuplicateButton.tsx
import { Button, Menu, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDuplicateJobProfileMutation } from '../../../redux/services/graphql-api/job-profile.api';

interface DuplicateButtonProps {
  profileId?: number;
  version?: number;
  redirectLink: string;
  variant?: 'button' | 'menuItem';
  buttonText?: string;
  isArchived?: boolean;
  state?: string;
}

export const DuplicateButton = ({
  profileId,
  version,
  redirectLink,
  variant = 'button',
  buttonText = 'Duplicate job profile',
  isArchived = false,
  state = 'DRAFT',
}: DuplicateButtonProps) => {
  const navigate = useNavigate();
  const [duplicateJobProfile] = useDuplicateJobProfileMutation();

  const handleDuplicate = async () => {
    if (!profileId || !version) return;

    const res = await duplicateJobProfile({
      jobProfileId: profileId,
      jobProfileVersion: version,
    }).unwrap();

    // Always redirect to drafts if duplicating an archived or published profile
    const targetLink = isArchived || state === 'PUBLISHED' ? '/job-profiles/manage/draft/' : redirectLink;
    navigate(`${targetLink}${res.duplicateJobProfile}`);
  };

  if (variant === 'menuItem') {
    return (
      <Menu.Item key="duplicate" onClick={handleDuplicate}>
        <div style={{ padding: '5px 0' }}>
          Duplicate
          <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
            Create a copy of this job profile.{' '}
          </Typography.Text>
        </div>
      </Menu.Item>
    );
  }

  return (
    <Button type="primary" style={{ marginTop: 10 }} onClick={handleDuplicate}>
      {buttonText}
    </Button>
  );
};
