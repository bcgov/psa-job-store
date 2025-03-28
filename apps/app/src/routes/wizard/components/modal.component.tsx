/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UseFormTrigger } from 'react-hook-form';
import { JobProfileValidationModel } from '../../job-profiles/components/job-profile.component';

export interface WizardModalProps {
  title: string;
  alertShown: boolean;
  setShown: (shown: boolean) => void;
  action: () => void;
  actionType: string;
  showCancel: boolean;
  inputRef?: any;
  isSignificant?: boolean;
  dataTestId?: string;
  trigger?: UseFormTrigger<JobProfileValidationModel>;
  onClose?: () => void;
}

export const WizardModalComponent: React.FC<WizardModalProps> = ({
  title,
  alertShown,
  setShown,
  action,
  actionType,
  showCancel,
  inputRef,
  isSignificant,
  dataTestId,
  trigger,
  onClose,
}) => {
  const okPressed = useRef(false);
  const modalVisible = useRef(false);

  useEffect(() => {
    // console.log('modal useEffect');
    if (!alertShown && (isSignificant || isSignificant === undefined) && !modalVisible.current) {
      modalVisible.current = true;
      setShown(true);
      Modal.confirm({
        focusTriggerAfterClose: false,
        afterClose: () => {
          if (okPressed.current) {
            inputRef?.current?.focus();
          } else {
            // console.log('focusing on : ', document.querySelector(`#${cancelFocusId} a`), `#${cancelFocusId} a`);
            // (document.querySelector(`#${cancelFocusId} a`) as HTMLElement)?.focus();
            // console.log('actionType: ', actionType);
            if (actionType === 'focus') inputRef?.current?.blur();
            setShown(false);
          }
          onClose?.();
          modalVisible.current = false;
        },
        title: title,
        content: (
          <div role="alert" data-testid={dataTestId}>
            Amendments to the generic profile will require verification. If you would like to continue to make changes,
            please click proceed.
          </div>
        ),
        okText: 'Proceed',
        cancelText: 'Cancel',
        onOk: () => {
          okPressed.current = true;
          action();
          trigger?.();
        },
        onCancel: () => {
          Modal.destroyAll();
        },
        icon: <ExclamationCircleOutlined aria-hidden style={{ color: '#faad14' }} />,
        okButtonProps: { style: {} },
        cancelButtonProps: { style: showCancel ? {} : { display: 'none' } },
        autoFocusButton: null,
      });
    }
    // else if (alertShown) {
    //   console.log('alert already shown, calling action + trigger');
    //   action();
    //   trigger?.();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

interface UseModalActionsProps {
  title: string;
  alertShown: boolean;
  setAlertShown: (shown: boolean) => void;
  dataTestId: string;
  trigger?: UseFormTrigger<JobProfileValidationModel>;
  isSignificant: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useModalActions = ({
  title,
  alertShown,
  setAlertShown,
  dataTestId,
  trigger,
  isSignificant,
}: UseModalActionsProps) => {
  const [modalProps, setModalProps] = useState<WizardModalProps | null>(null);

  const showModal = useCallback(
    (props: Partial<Omit<WizardModalProps, 'action'>> & { action: () => void }) => {
      // console.log('showModal called');
      if (alertShown || !props.isSignificant) {
        // If alert is already shown or the item is not significant (either field or section),
        // just execute the action without showing the modal
        props.action();
        trigger?.();
        return;
      }

      setModalProps({
        title,
        alertShown,
        setShown: setAlertShown,
        showCancel: true,
        dataTestId,
        trigger,
        actionType: props.actionType ?? '',
        ...props,
      });
    },
    [title, alertShown, setAlertShown, dataTestId, trigger],
  );

  const closeModal = useCallback(() => {
    setModalProps(null);
  }, []);

  const handleRemoveModal = useCallback(
    ({ index, handleRemove, field }: { index: number; handleRemove: (index: number) => void; field: any }) => {
      // console.log('handleRemoveModal');
      showModal({
        action: () => handleRemove(index),
        actionType: 'remove',
        // Show modal if either the field is significant OR the section is significant
        // This ensures individually significant fields still trigger the modal
        // even if the section is marked as non-significant
        isSignificant: (field?.is_significant ?? true) && !field?.isCustom,
      });
    },
    [showModal, isSignificant],
  );

  const handleFocusModal = useCallback(
    ({ inputRef, field }: { inputRef: any; field: any }) => {
      showModal({
        action: () => {}, // Provide a no-op function as the action
        inputRef,
        actionType: 'focus',
        // Show modal if either the field is significant OR the section is significant
        // This ensures individually significant fields still trigger the modal
        // even if the section is marked as non-significant
        isSignificant: (field?.is_significant ?? true)&& !field?.isCustom,
      });
    },
    [showModal, isSignificant],
  );

  const handleAddModal = useCallback(
    (handleAdd: () => void) => {
      // console.log('handleAdd');
      showModal({
        action: handleAdd,
        actionType: 'add',
        // For adding new items, we still respect the section significance flag
        // since new items are affected by it
        isSignificant: isSignificant,
      });
    },
    [showModal, isSignificant],
  );

  return {
    modalProps,
    showModal,
    closeModal,
    handleRemoveModal,
    handleFocusModal,
    handleAddModal,
  };
};
