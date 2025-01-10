import { message } from 'antd';
import copy from 'copy-to-clipboard';

interface UseCopyLinkProps {
  baseUrl: string;
  id?: string | number;
  isTestUser?: boolean;
  onCopySuccess?: () => void;
}

export const useCopyLink = ({ baseUrl, id, isTestUser = false, onCopySuccess }: UseCopyLinkProps) => {
  const handleCopy = () => {
    const linkToCopy = `${window.location.origin}${baseUrl}${id}`;

    if (!isTestUser) {
      copy(linkToCopy);
      message.success('Link copied to clipboard!');
    }

    if (onCopySuccess) {
      onCopySuccess();
    }
  };

  return { handleCopy };
};
