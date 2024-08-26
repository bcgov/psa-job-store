import { Navigate, NavigateProps, generatePath, useParams } from 'react-router-dom';

export const Redirect = ({ to, ...props }: NavigateProps) => {
  const params = useParams();

  return <Navigate to={generatePath(to.toString(), params)} {...props} />;
};
