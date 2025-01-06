import { UserAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { PositionProvider, usePosition } from '../../../components/app/common/contexts/position.context';
import { Elements } from '../interfaces/elements.interface';

const NaiveCreatePositionButton = ({
  departmentId,
  elements,
  positionIsVacant,
  supervisorId,
}: CreatePositionButtonProps) => {
  const { createNewPosition } = usePosition();
  // const { getNodes } = useReactFlow();
  // const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick={async () => {
        // setIsLoading(true);
        try {
          // await new Promise((resolve) => setTimeout(resolve, 300));
          // const png = await generatePNGBase64(getNodes);
          await createNewPosition({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            reportingPositionId: supervisorId as any,
            selectedDepartment: departmentId,
            orgChartData: elements,
            // svg: png,
          });
        } finally {
          // setIsLoading(false);
        }
      }}
      id={`create-button-${supervisorId}`}
      icon={<UserAddOutlined aria-hidden />}
      data-testid="create-direct-report-button"
      style={{ borderRadius: 0, border: 'none', width: '100%' }}
      type="default"
      tabIndex={-1}
      // loading={isLoading}
    >
      Create new direct report
    </Button>
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
