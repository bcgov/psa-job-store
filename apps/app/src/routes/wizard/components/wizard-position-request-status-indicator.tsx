import { Space } from 'antd';
import React from 'react';
import { statusIconColorMap } from '../../../components/app/common/utils/statusIconColorMap.utils';
import './wizard-position-request-status-indicator.css';

interface StatusIndicatorProps {
  status: string;
  colorText?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, colorText = true }) => {
  // const [role, setRole] = useState<string | null>(null);
  // const auth = useAuth();

  // useEffect(() => {
  //   // console.log('auth.user: ', auth.user);
  //   const roles = auth.user?.profile['client_roles'];
  //   if (roles && (roles as string[]).includes('total-compensation')) {
  //     setRole('total-compensation');
  //   } else if (roles && (roles as string[]).includes('classification')) {
  //     setRole('classification');
  //   } else if (roles && (roles as string[]).includes('hiring-manager')) {
  //     setRole('hiring-manager');
  //   } else {
  //     setRole('user');
  //   }
  // }, [auth]);

  const statusDetails = statusIconColorMap[status];

  if (!statusDetails) return null;

  return (
    <Space>
      <span className="status-dot" style={{ backgroundColor: statusDetails.color }} />
      <span style={colorText ? { color: statusDetails.textColor } : {}} data-testid={`status-${status}`}>
        {statusDetails.text}
      </span>
    </Space>
  );
};

export default StatusIndicator;
