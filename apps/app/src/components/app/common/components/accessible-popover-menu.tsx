/* eslint-disable @typescript-eslint/no-explicit-any */
import { Popover } from 'antd';
import React, { ReactNode, forwardRef, useEffect, useRef, useState } from 'react';

interface AcessiblePopoverMenuProps {
  triggerButton: ReactNode;
  content: ReactNode;
  ariaLabel?: string;
  padding?: string;
}

const AcessiblePopoverMenu: React.FC<AcessiblePopoverMenuProps> = ({
  triggerButton,
  content,
  ariaLabel = 'Open menu',
  padding,
}) => {
  const [visible, setVisible] = useState(false);

  const ellipsisRef = useRef<any>(null);
  const contentRef = useRef<any>(null);

  const handleVisibleChange = (isVisible: boolean) => {
    // console.log('handleVisibleChange: ', isVisible);
    // Update the visibility based on user interaction
    setVisible(isVisible);

    if (!isVisible && ellipsisRef.current) {
      ellipsisRef.current.focus();
    }
  };

  const handlePopoverOpen = (visible: any) => {
    if (visible) {
      setTimeout(() => {
        const popover = contentRef.current?.querySelector(`.ant-menu-item:not(.ant-menu-item-disabled)`);
        if (popover) {
          const popoverElement = popover as HTMLElement;
          popoverElement.focus();
        }
      }, 100);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'Escape') {
        if (visible) {
          setVisible(false);
          // Focus back on the corresponding ellipsis button
          // console.log('focusing back on ellipsis button: ', ellipsisRef.current);
          setTimeout(() => {
            ellipsisRef.current.focus();
          }, 100);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible]);

  const TriggerButtonWrapper = forwardRef<HTMLDivElement, { children: ReactNode }>(({ children, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      style={{ cursor: 'pointer', display: 'inline-flex' }}
      tabIndex={0}
      role="button"
      aria-label={ariaLabel}
      data-testid="popover-trigger"
    >
      {children}
    </div>
  ));

  const ContentWrapper = forwardRef<HTMLDivElement, { children: ReactNode }>(({ children, ...props }, ref) => (
    <div {...props} ref={ref}>
      {children}
    </div>
  ));

  // console.log('open: ', visible);
  return (
    <Popover
      open={visible}
      onOpenChange={(visible) => {
        // console.log('onOpenChange: ', visible);
        handleVisibleChange(visible);
        handlePopoverOpen(visible);
      }}
      content={<ContentWrapper ref={contentRef}>{content}</ContentWrapper>}
      trigger="click"
      placement="bottom"
      overlayInnerStyle={{ padding: padding }}
    >
      {/* add ref to triggerButton, e.g. ref={(el) => (ellipsisRef.current = el)} */}
      <TriggerButtonWrapper ref={ellipsisRef}>{triggerButton}</TriggerButtonWrapper>
    </Popover>
  );
};

export default AcessiblePopoverMenu;
