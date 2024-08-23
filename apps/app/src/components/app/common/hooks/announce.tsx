// src/hooks/useAnnounce.ts

import { useCallback, useState } from 'react';

interface AnnounceOptions {
  politeness?: 'polite' | 'assertive';
  timeout?: number;
}

const useAnnounce = (options: AnnounceOptions = {}) => {
  const { timeout = 3000 } = options;
  const [announcement, setAnnouncement] = useState('');

  const announce = useCallback(
    (message: string) => {
      setAnnouncement(message);
      setTimeout(() => setAnnouncement(''), timeout);
    },
    [timeout],
  );

  return { announce, announcement };
};

export default useAnnounce;
