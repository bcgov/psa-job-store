import { UserAddOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useReactFlow } from 'reactflow';
import { PositionProvider, usePosition } from '../../../components/app/common/contexts/position.context';
import { Elements } from '../interfaces/elements.interface';
import { generateSVG } from './org-chart/download-button.component';

const NaiveCreatePositionButton = ({
  departmentId,
  elements,
  positionIsVacant,
  supervisorId,
}: CreatePositionButtonProps) => {
  const { createNewPosition } = usePosition();
  const { getNodes } = useReactFlow();

  return (
    <Tooltip
      title={positionIsVacant ? "You can't create a new position which reports to a vacant position." : undefined}
    >
      <Button
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={async () => {
          const svg = await generateSVG(getNodes);
          await createNewPosition({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            reportingPositionId: supervisorId as any,
            selectedDepartment: departmentId,
            orgChartData: elements,
            svg: btoa(svg),
          });
        }}
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
