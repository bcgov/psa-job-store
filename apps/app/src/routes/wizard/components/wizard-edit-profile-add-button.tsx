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
  sectionSignificant?: boolean;
}

const WizardEditAddButton: React.FC<AddButtonProps> = ({ 
  testId, 
  onClick, 
  isSignificant, 
  children,
  sectionSignificant = true
}) => {
  const showSignificantIcon = isSignificant && sectionSignificant;
  const icon = showSignificantIcon ? <img aria-hidden src={SignificantAdd} alt="Error" /> : <PlusOutlined aria-hidden />;
  return (
    <Button data-testid={testId} type="link" icon={icon} className="addButton" onClick={onClick}>
      <span style={{ paddingLeft: '7px' }}>{children}</span>
    </Button>
  );
};

export default WizardEditAddButton;
