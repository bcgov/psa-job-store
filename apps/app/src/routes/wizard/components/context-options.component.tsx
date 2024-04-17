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
  index: number;
  isReadonly: boolean;
  isDisabled: boolean;
  isCustom: boolean;
  isEdited: boolean;
  ariaLabel: string;
  handleReset: (index: number) => void;
  handleAddBack: (index: number) => void;
  handleRemove: (index: number) => void;
  confirmRemoveModal?: (action: () => void) => void; // Accepts a function that shows a modal and takes a callback function
}

export const ContextOptions: React.FC<ContextOptionsProps> = ({
  index,
  isReadonly,
  isDisabled,
  isCustom,
  isEdited,
  ariaLabel,
  handleReset,
  handleAddBack,
  handleRemove,
  confirmRemoveModal,
}) => {
  const tooltipTitle = isReadonly ? 'Required' : '';
  const items: MenuProps['items'] = [];
  if (!isCustom && isEdited)
    items.push({
      label: 'Reset Changes',
      key: 'reset',
      icon: <RedoOutlined />,
    });

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
  const onClick: MenuProps['onClick'] = ({ key }) => {
    doAction(key);
  };

  const doAction = (key: string) => {
    console.log('clicked', key);
    switch (key) {
      case 'reset':
        //resetField
        handleReset(index);
        // trigger();
        break;
      case 'add':
        console.log('add');
        handleAddBack(index);
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

  const icon = isDisabled ? (
    <PlusOutlined style={{ color: '#000000' }} />
  ) : (
    <DeleteOutlined style={isReadonly ? {} : { color: '#000000' }} />
  );
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
              data-testid={isDisabled ? `undo-remove-accountability-${index}` : `remove-accountability-${index}`}
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
        data-testid={isDisabled ? `undo-remove-accountability-${index}` : `remove-accountability-${index}`}
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
