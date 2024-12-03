// AddButton.tsx
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import SignificantAdd from '../../../assets/significant-add.svg';

interface AddButtonProps {
  testId: string;
  onClick: () => void;
  isSignificant: boolean;
  children: React.ReactNode;
}

const WizardEditAddButton: React.FC<AddButtonProps> = ({ testId, onClick, isSignificant, children }) => {
  const icon = isSignificant ? <img src={SignificantAdd} alt="Error" /> : <PlusOutlined aria-hidden />;
  return (
    <Button data-testid={testId} type="link" icon={icon} className="addButton" onClick={onClick}>
      {children}
    </Button>
  );
};

export default WizardEditAddButton;
