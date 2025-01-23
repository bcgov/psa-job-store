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
}

export const DuplicateButton = ({
  profileId,
  version,
  redirectLink,
  variant = 'button',
  buttonText = 'Duplicate job profile',
}: DuplicateButtonProps) => {
  const navigate = useNavigate();
  const [duplicateJobProfile] = useDuplicateJobProfileMutation();

  const handleDuplicate = async () => {
    if (!profileId || !version) return;

    const res = await duplicateJobProfile({
      jobProfileId: profileId,
      jobProfileVersion: version,
    }).unwrap();

    navigate(`${redirectLink}${res.duplicateJobProfile}`);
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
