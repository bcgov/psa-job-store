import { Button, Col, Result, Row } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorDepartment from '../../assets/error-department.svg';
import ErrorPage from '../../assets/error-page.svg';
import ErrorProfile from '../../assets/error-profile.svg';
import ErrorRequest from '../../assets/error-request.svg';
import ErrorUser from '../../assets/error-user.svg';
import { NeedHelpComponent } from './need-help.component';

type entity = 'Page' | 'Profile' | 'Position request' | 'Department' | 'User';

interface NotFoundComponentProps {
  entity?: entity;
}

// const entites: Array<[{entity: entity, redirect: string}]> = [
const entites = [
  { entity: 'Page', redirect: '/', icon: ErrorPage },
  { entity: 'Profile', redirect: '/job-profiles', icon: ErrorProfile },
  { entity: 'Position request', redirect: '/requests/positions', icon: ErrorRequest },
  { entity: 'Department', redirect: '/departments', icon: ErrorDepartment },
  { entity: 'User', redirect: '/users', icon: ErrorUser },
];

export const NotFoundComponent: React.FC<NotFoundComponentProps> = ({ entity }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const parent = pathname.split('/').slice(0, -1).join('/') || '/';

  // const redirect = entites.find((e) => e.entity == entity)?.redirect ?? '/';
  const icon = entites.find((e) => e.entity == entity)?.icon ?? ErrorPage;
  const label = entity ?? 'Page';
  return (
    <Result
      title={label + ' not found'}
      subTitle={'Sorry, the ' + label.toLowerCase() + ' you were looking for does not exist.'}
      icon={<img src={icon} alt="Error" />}
      extra={
        <Row
          justify="center"
          align="middle"
          style={{ height: '100%', justifyContent: 'center', background: '#f5f5f5' }}
        >
          <Col span={12}>
            <NeedHelpComponent />
            <Button type="primary" onClick={() => navigate(parent)}>
              Back
            </Button>
          </Col>
        </Row>
      }
    />
  );
};

export default NotFoundComponent;
