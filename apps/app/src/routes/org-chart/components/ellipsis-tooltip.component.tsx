import { Tooltip } from 'antd';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface EllipsisTooltipProps {
  children: ReactNode;
}

export const EllipsisTooltip: React.FC<EllipsisTooltipProps> = ({ children }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const { offsetWidth, scrollWidth } = textRef.current;
        setIsTruncated(scrollWidth > offsetWidth);
      }
    };

    checkTruncation();
    // Recheck truncation when window resizes
    window.addEventListener('resize', checkTruncation);

    return () => {
      window.removeEventListener('resize', checkTruncation);
    };
  }, [children]);

  return (
    <div ref={textRef} style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
      {isTruncated ? <Tooltip title={children}>{children}</Tooltip> : children}
    </div>
  );
};
