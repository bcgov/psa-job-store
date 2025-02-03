import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const LinkButton = ({ to, children, ...props }: any) => {
  const navigate = useNavigate();

  return (
    <Button
      type="link"
      style={{ padding: '0' }}
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
