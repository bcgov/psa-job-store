import { Button } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface WizardControlsProps {
  submitText?: string;
  showBackButton?: boolean;
  onNextClick?: () => void;
}

const WizardControls: FC<WizardControlsProps> = ({ submitText = 'Submit', showBackButton = true, onNextClick }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
      {showBackButton ? <Button onClick={handleBackClick}>Go Back</Button> : <div></div>}
      {onNextClick ? (
        <Button type="primary" onClick={onNextClick}>
          {submitText}
        </Button>
      ) : (
        <Button type="primary" htmlType="submit">
          {submitText}
        </Button>
      )}
    </div>
  );
};

export default WizardControls;
