import {
  DeleteOutlined,
  EllipsisOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Tooltip } from 'antd';
import './wizard-page-wrapper.component.css';

interface ContextOptionsProps {
  index: number; // The index of the item
  isReadonly: boolean; // Indicates if the item is read-only
  isDisabled: boolean; // Indicates if the item is disabled
  isCustom: boolean; // Indicates if the item is custom
  isEdited: boolean; // Indicates if the item has been edited
  ariaLabel: string; // The aria-label for accessibility
  testId: string; // The test ID for testing purposes
  handleReset: (index: number) => void; // Function to handle resetting the item
  handleAddBack: (index: number) => void; // Function to handle adding the item back
  handleRemove: (index: number) => void; // Function to handle removing the item
  confirmRemoveModal?: (action: () => void) => void; // Optional function to show a confirmation modal before removing the item
}

export const ContextOptions: React.FC<ContextOptionsProps> = ({
  index,
  isReadonly,
  isDisabled,
  isCustom,
  isEdited,
  ariaLabel,
  testId,
  handleReset,
  handleAddBack,
  handleRemove,
  confirmRemoveModal,
}) => {
  // Set the tooltip title based on the read-only state
  const tooltipTitle = isReadonly ? 'Required' : '';

  // Initialize an empty array for menu items
  const items: MenuProps['items'] = [];

  // Add the "Reset Changes" menu item if the item is not custom and has been edited
  if (!isCustom && isEdited)
    items.push({
      label: 'Reset Changes',
      key: 'reset',
      icon: <RedoOutlined />,
    });

  // Add the "Add" or "Remove" menu item based on the disabled state
  isDisabled
    ? items.push({
        label: 'Add',
        key: 'add',
        icon: <PlusCircleOutlined />,
      })
    : items.push({
        label: 'Remove',
        key: 'remove',
        icon: <MinusCircleOutlined />,
      });

  // Handle the menu item click event
  const onClick: MenuProps['onClick'] = ({ key }) => {
    doAction(key);
  };

  // Perform the action based on the clicked menu item key
  const doAction = (key: string) => {
    switch (key) {
      case 'reset':
        // Handle resetting the item
        handleReset(index);
        break;
      case 'add':
        // Handle adding the item back
        handleAddBack(index);
        break;
      case 'remove':
        // Handle removing the item
        if (confirmRemoveModal) {
          // Show a confirmation modal before removing the item
          confirmRemoveModal(() => handleRemove(index));
        } else {
          // Remove the item without confirmation
          handleRemove(index);
        }
        break;
    }
  };

  // Set the icon based on the disabled state
  const icon = isDisabled ? (
    <PlusOutlined style={{ color: '#000000' }} />
  ) : (
    <DeleteOutlined style={isReadonly ? {} : { color: '#000000' }} />
  );

  // Render the context options based on the number of menu items
  return items.length > 1 ? (
    <Tooltip title={tooltipTitle} overlayStyle={!isReadonly ? { display: 'none' } : undefined}>
      <Dropdown menu={{ items, onClick }} trigger={['click']}>
        <div
          style={{
            color: 'black',
            background: 'white',
            height: 20,
            textAlign: 'center',
            lineHeight: '20px',
          }}
        >
          <Tooltip title={tooltipTitle} overlayStyle={!isReadonly ? { display: 'none' } : undefined}>
            <Button
              data-testid={isDisabled ? `undo-remove-${testId}-${index}` : `remove-${testId}-${index}`}
              aria-label={ariaLabel}
              icon={<EllipsisOutlined />}
              disabled={isReadonly}
              style={{ marginLeft: '10px' }}
            ></Button>
          </Tooltip>
        </div>
      </Dropdown>
    </Tooltip>
  ) : (
    <Tooltip title={tooltipTitle} overlayStyle={!isReadonly ? { display: 'none' } : undefined}>
      <Button
        data-testid={isDisabled ? `undo-remove-${testId}-${index}` : `remove-${testId}-${index}`}
        className="remove-item-btn"
        icon={icon}
        aria-label={ariaLabel}
        onClick={() => {
          isDisabled ? doAction('add') : doAction('remove');
        }}
        disabled={isReadonly}
        style={{ marginLeft: '10px' }}
      />
    </Tooltip>
  );
};
