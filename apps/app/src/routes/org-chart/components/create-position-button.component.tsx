import { UserAddOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { PositionProvider, usePosition } from '../../../components/app/common/contexts/position.context';
import { Elements } from '../interfaces/elements.interface';

const NaiveCreatePositionButton = ({
  departmentId,
  elements,
  positionIsVacant,
  supervisorId,
}: CreatePositionButtonProps) => {
  const { createNewPosition } = usePosition();

  return (
    <Tooltip
      title={positionIsVacant ? "You can't create a new position which reports to a vacant position." : undefined}
    >
      <Button
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={async () => await createNewPosition(supervisorId as any, departmentId, elements)}
        disabled={positionIsVacant}
        icon={<UserAddOutlined />}
        data-testid="create-direct-report-button"
        style={{ borderRadius: 0, border: 'none', width: '100%' }}
        type="default"
      >
        Create new direct report
      </Button>
    </Tooltip>
  );
};

export interface CreatePositionButtonProps {
  departmentId: string;
  elements: Elements;
  positionIsVacant: boolean;
  supervisorId: string;
}

export const CreatePositionButton = (props: CreatePositionButtonProps) => {
  return (
    <PositionProvider>
      <NaiveCreatePositionButton {...props} />
    </PositionProvider>
  );
};
