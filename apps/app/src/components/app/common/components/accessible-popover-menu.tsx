/* eslint-disable @typescript-eslint/no-explicit-any */
import { Popover } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import React, { ReactNode, forwardRef, useEffect, useRef, useState } from 'react';
import './accessible-popover-menu.css';

interface AccessiblePopoverMenuProps {
  triggerButton: ReactNode;
  content: ReactNode;
  ariaLabel?: string;
  padding?: string;
  buttonId?: string;
  compact?: boolean;
  placement?: TooltipPlacement;
  arrow?: boolean;
}

const AccessiblePopoverMenu: React.FC<AccessiblePopoverMenuProps> = ({
  triggerButton,
  content,
  ariaLabel = 'Open menu',
  padding,
  buttonId,
  compact,
  placement,
  arrow,
}) => {
  const [visible, setVisible] = useState(false);

  const ellipsisRef = useRef<any>(null);
  const contentRef = useRef<any>(null);

  const handleVisibleChange = (isVisible: boolean) => {
    // console.log('handleVisibleChange: ', isVisible);
    // Update the visibility based on user interaction
    setVisible(isVisible);

    // only focus back on the button in response to escape key
    // on click it should focus on whatever the user is clicking (for example input box)
    // if (!isVisible && ellipsisRef.current) {
    //   ellipsisRef.current.focus();
    // }
  };

  const handlePopoverOpen = (visible: any) => {
    // console.log('handlePopoverOpen: ', visible);
    if (visible) {
      setTimeout(() => {
        const popover = contentRef.current?.querySelector(`.ant-menu-item:not(.ant-menu-item-disabled)`);
        // console.log('focusing on: ', popover);
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

  const TriggerButtonWrapper = forwardRef<HTMLDivElement, { children: ReactNode; buttonId?: string }>(
    ({ children, buttonId, ...props }, ref) => (
      <div
        {...props}
        id={buttonId}
        ref={ref}
        style={{ cursor: 'pointer', display: 'inline-flex' }}
        tabIndex={0}
        role="button"
        aria-label={ariaLabel}
        data-testid="popover-trigger"
        className="popover-trigger"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleVisibleChange(!visible);
            handlePopoverOpen(!visible);
          }
        }}
      >
        {children}
      </div>
    ),
  );

  const ContentWrapper = forwardRef<HTMLDivElement, { children: ReactNode }>(({ children, ...props }, ref) => (
    // onClick prevents menu from staying open when clicking on the menu items
    <div {...props} ref={ref} onClick={() => setVisible(false)}>
      {children}
    </div>
  ));

  // console.log('placement: ', placement);

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
      placement={placement ?? 'bottom'}
      overlayInnerStyle={{ padding: padding }}
      overlayClassName={compact ? 'compact-popover' : ''}
      arrow={arrow ?? true}
    >
      {/* add ref to triggerButton, e.g. ref={(el) => (ellipsisRef.current = el)} */}
      <TriggerButtonWrapper ref={ellipsisRef} buttonId={buttonId}>
        {triggerButton}
      </TriggerButtonWrapper>
    </Popover>
  );
};

export default AccessiblePopoverMenu;
