import { Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import './wizard-position-request-status-indicator.css';

interface StatusIndicatorProps {
  status: string;
  colorText?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, colorText = true }) => {
  const [role, setRole] = useState<string | null>(null);
  const auth = useAuth();

  useEffect(() => {
    // console.log('auth.user: ', auth.user);
    const roles = auth.user?.profile['client_roles'];
    if (roles && (roles as string[]).includes('total-compensation')) {
      setRole('total-compensation');
    } else if (roles && (roles as string[]).includes('classification')) {
      setRole('classification');
    } else if (roles && (roles as string[]).includes('hiring-manager')) {
      setRole('hiring-manager');
    } else {
      setRole('user');
    }
  }, [auth]);

  const getColorForStatus = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'gray';
      case 'VERIFICATION':
        return '#722ED1';
      case 'COMPLETED':
        return '#52C41A';
      case 'CANCELLED':
        return '#444';
      case 'REVIEW':
        return '#FF4D4F';
      case 'ACTION_REQUIRED':
        return ' #FA8C16';
      default:
        return 'black';
    }
  };

  const getTextColorForStatus = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return '#000';
      case 'VERIFICATION':
        return '#391085';
      case 'COMPLETED':
        return '#237804';
      case 'CANCELLED':
        return '#444';
      case 'REVIEW':
        return '#A8071A';
      case 'ACTION_REQUIRED':
        return '#AD4E00';
      default:
        return 'black';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'Draft';
      case 'VERIFICATION':
        return 'Verification';
      case 'COMPLETED':
        return 'Completed';
      case 'CANCELLED':
        return 'Cancelled';
      case 'REVIEW':
        return 'Escalated';
      case 'ACTION_REQUIRED':
        return role == 'classification' ? 'Review required' : 'Action required';
      default:
        return 'Unknown';
    }
  };

  const color = getColorForStatus(status);

  return (
    <Space>
      <span className="status-dot" style={{ backgroundColor: color }} />
      <span style={colorText ? { color: getTextColorForStatus(status) } : {}} data-testid={`status-${status}`}>
        {getStatusLabel(status)}
      </span>
    </Space>
  );
};

export default StatusIndicator;
