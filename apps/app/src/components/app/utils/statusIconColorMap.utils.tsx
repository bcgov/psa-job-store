import {
  CheckCircleFilled,
  ClockCircleFilled,
  CloseSquareOutlined,
  FundFilled,
  WarningFilled,
} from '@ant-design/icons';

export type StatusIconColorMap = {
  [key: string]: {
    icon: React.ReactElement;
    color: string;
    text: string;
    textColor: string;
  };
};

export const statusIconColorMap: StatusIconColorMap = {
  DRAFT: { icon: <></>, color: 'gray', text: 'Draft', textColor: '#000' },
  REVIEW: { icon: <FundFilled />, color: '#FF4D4F', text: 'Review', textColor: '#A8071A' },
  ACTION_REQUIRED: { icon: <WarningFilled />, color: '#FA8C16', text: 'Action required', textColor: '#AD4E00' },
  COMPLETED: { icon: <CheckCircleFilled />, color: '#52C41A', text: 'Completed', textColor: '#237804' },
  VERIFICATION: { icon: <ClockCircleFilled />, color: '#722ED1', text: 'Verification', textColor: '#391085' },
  CANCELLED: { icon: <CloseSquareOutlined />, color: '#444', text: 'Cancelled', textColor: '#444' },
};
