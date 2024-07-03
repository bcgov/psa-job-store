import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Modal } from 'antd';
import React from 'react';

interface ContextOptionsReadonlyProps {
  isReadonly: boolean;
  onEdit: () => void;
  onRemove: () => void;
}

export const ContextOptionsReadonly: React.FC<ContextOptionsReadonlyProps> = ({ isReadonly, onEdit, onRemove }) => {
  const showEditConfirmation = () => {
    Modal.confirm({
      title: 'Convert to Editable',
      content: 'Are you sure you want to make this field editable?',
      onOk: () => {
        onEdit();
      },
    });
  };

  if (isReadonly) {
    const items = [
      {
        key: 'edit',
        label: 'Edit',
        icon: <EditOutlined />,
        onClick: showEditConfirmation,
      },
      {
        key: 'remove',
        label: 'Remove',
        icon: <DeleteOutlined />,
        onClick: onRemove,
      },
    ];

    return (
      <Dropdown menu={{ items }} trigger={['click']}>
        <Button icon={<EllipsisOutlined />} />
      </Dropdown>
    );
  }

  return <Button icon={<DeleteOutlined />} onClick={onRemove} />;
};
