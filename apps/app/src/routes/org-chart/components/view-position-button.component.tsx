import { Button, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PositionInfoOutlined } from '../../../components/icons/position-info-outlined';

export interface ViewPositionButtonProps {
  positionRequestId?: number;
}
export const ViewPositionButton = ({ positionRequestId }: ViewPositionButtonProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate('/my-departments/position/' + positionRequestId);
      }}
    >
      <Tooltip
        placement="bottom"
        title={
          !positionRequestId ? 'Position details are only available for positions created in the Job Store.' : undefined
        }
      >
        <Button
          id={`view-button-${positionRequestId}`}
          disabled={!positionRequestId}
          style={{
            borderRadius: 0,
            border: 'none',
            width: '100%',
            display: 'inline-flex',
            gap: '8px',
          }}
          type="default"
          icon={<PositionInfoOutlined aria-hidden />}
        >
          View Position Details
        </Button>
      </Tooltip>
    </div>
  );
};
