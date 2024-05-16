// AddButton.tsx
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

interface AddButtonProps {
  testId: string;
  onClick: () => void;
  children: React.ReactNode;
}

const WizardEditAddButton: React.FC<AddButtonProps> = ({ testId, onClick, children }) => {
  return (
    <Button
      data-testid={testId}
      type="link"
      icon={<PlusOutlined aria-hidden />}
      className="addButton"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default WizardEditAddButton;
