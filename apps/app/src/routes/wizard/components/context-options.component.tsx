import {
  DeleteOutlined,
  EllipsisOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { Button, Menu, Tooltip } from 'antd';
import React from 'react';
import RemoveSignificant from '../../../assets/significant-delete.svg';

import AccessiblePopoverMenu from '../../../components/app/common/components/accessible-popover-menu';
import './wizard-page-wrapper.component.css';

interface ContextOptionsProps {
  index: number;
  isReadonly: boolean;
  isDisabled: boolean;
  isCustom: boolean;
  isEdited: boolean;
  isSignificant: boolean;
  removeAriaLabel: string;
  id: string;
  handleReset: (index: number) => void;
  handleAddBack: (index: number) => void;
  handleRemove: (index: number) => void;
  confirmRemoveModal?: (action: () => void) => void;
  focusFallback: string;
}

export const ContextOptions: React.FC<ContextOptionsProps> = ({
  index,
  isReadonly,
  isDisabled,
  isCustom,
  isEdited,
  isSignificant,
  removeAriaLabel,
  id,
  handleReset,
  handleAddBack,
  handleRemove,
  confirmRemoveModal,
  focusFallback,
}) => {
  const tooltipTitle = isReadonly ? 'Required' : isCustom ? 'Remove' : 'Delete';

  const focusOnInput = () => {
    // normally when popover closes we focus back on the button that openned it
    // it may happen that this button goes away altogether, so focus on input field instead
    if (focusFallback) {
      // console.log('focusing on fallback: ', document.querySelector(`[name="${focusFallback}"]`));
      setTimeout(() => {
        (document.querySelector(`[name="${focusFallback}"]`) as HTMLElement)?.focus();
      }, 100);
    }
  };

  const doAction = (key: string) => {
    switch (key) {
      case 'reset':
        // todo: if the modal hasn't been shown, it will get shown on focus,
        // (for example when user came back to edit form next session)
        // this may be confusing
        handleReset(index);
        focusOnInput();
        break;
      case 'add':
        // todo: if the modal hasn't been shown, it will get shown on focus,
        // (for example when user came back to edit form next session)
        // this may be confusing
        handleAddBack(index);
        focusOnInput();
        break;
      case 'remove':
        if (confirmRemoveModal) {
          confirmRemoveModal(() => handleRemove(index));
        } else {
          handleRemove(index);
        }
        break;
    }
  };

  let icon = isDisabled ? (
    // !isSignificant ? (
    <PlusOutlined style={{ color: '#000000' }} />
  ) : // user can tell it's significant because of orange outline
  // ) : (
  //   <span role="img" aria-label="plus" className="anticon anticon-plus">
  //     <img src={AddSignificant} alt="Add" />
  //   </span>
  // )
  !isSignificant || isCustom ? (
    <DeleteOutlined />
  ) : (
    <span role="img" aria-label="delete" className="anticon anticon-delete">
      <img style={{ width: '16px', height: '16px', alignItems: 'center' }} src={RemoveSignificant} alt="Remove" />
    </span>
  );

  if (isReadonly) if (!isDisabled) icon = <DeleteOutlined />;

  const MenuContent = () => (
    <Menu>
      {!isCustom && isEdited && (
        <Menu.Item key="reset" icon={<RedoOutlined aria-hidden />} onClick={() => doAction('reset')}>
          Reset Changes
        </Menu.Item>
      )}
      {isDisabled ? (
        <Menu.Item key="add" icon={<PlusCircleOutlined aria-hidden />} onClick={() => doAction('add')}>
          Add
        </Menu.Item>
      ) : (
        <Menu.Item key="remove" icon={<MinusCircleOutlined aria-hidden />} onClick={() => doAction('remove')}>
          Remove
        </Menu.Item>
      )}
    </Menu>
  );

  const hasMultipleOptions = !isCustom && isEdited;

  return (
    //
    <>
      {hasMultipleOptions ? (
        <AccessiblePopoverMenu
          placement="bottomRight"
          compact
          ariaLabel={`open options for ${id} ${index}`}
          triggerButton={
            <Button
              id={`${id}-${index}-ellipsis-menu`}
              data-testid={isDisabled ? `undo-remove-${id}-${index}` : `remove-${id}-${index}`}
              icon={<EllipsisOutlined aria-hidden />}
              disabled={isReadonly}
              style={{ marginLeft: '10px' }}
            />
          }
          content={<MenuContent />}
        />
      ) : (
        <Tooltip title={tooltipTitle}>
          <Button
            data-testid={isDisabled ? `undo-remove-${id}-${index}` : `remove-${id}-${index}`}
            className="remove-item-btn"
            icon={icon}
            aria-label={removeAriaLabel}
            onClick={() => {
              if (isDisabled) {
                doAction('add');
              } else {
                if (!isCustom) {
                  // this button will change into "...", so we need to focus on it
                  setTimeout(() => {
                    // console.log('focusing on: ', document.getElementById(`${id}-${index}-ellipsis-menu`));
                    document.getElementById(`${id}-${index}-ellipsis-menu`)?.focus();
                  }, 100);
                }
                doAction('remove');
              }
            }}
            disabled={isReadonly}
            style={{ marginLeft: '10px' }}
          />
        </Tooltip>
      )}
    </>
  );
};
