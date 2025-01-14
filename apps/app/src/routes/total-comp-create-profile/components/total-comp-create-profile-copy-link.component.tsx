// src/components/common/CopyLinkButton.tsx
import { CopyOutlined, LinkOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { useCopyLink } from './copy-link';

interface CopyLinkButtonProps {
  baseUrl: string;
  id?: string | number;
  isTestUser?: boolean;
  variant?: 'button' | 'menuItem';
  onCopySuccess?: () => void;
}

export const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({
  baseUrl,
  id,
  isTestUser,
  variant = 'button',
  onCopySuccess,
}) => {
  const { handleCopy } = useCopyLink({
    baseUrl,
    id,
    isTestUser,
    onCopySuccess,
  });

  if (variant === 'menuItem') {
    return (
      <div style={{ padding: '5px 0' }}>
        <div onClick={handleCopy}>
          Copy link <LinkOutlined />
        </div>
        <Typography.Text type="secondary" style={{ marginTop: '5px', display: 'block' }}>
          Invite others to review this profile.
        </Typography.Text>
      </div>
    );
  }

  return (
    <Button icon={<CopyOutlined />} onClick={handleCopy}>
      Copy URL
    </Button>
  );
};
