import { Button, Col, Result, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import ErrorDepartment from '../../assets/error-department.svg';
import ErrorPage from '../../assets/error-page.svg';
import ErrorProfile from '../../assets/error-profile.svg';
import ErrorRequest from '../../assets/error-request.svg';
import ErrorUser from '../../assets/error-user.svg';
import { NeedHelpComponent } from './need-help.component';

type entity = 'page' | 'profile' | 'position request' | 'department' | 'user';

interface NotFoundComponentProps {
  entity?: entity;
}

// const entites: Array<[{entity: entity, redirect: string}]> = [
const entites = [
  { entity: 'page', redirect: '/', icon: ErrorPage },
  { entity: 'profile', redirect: '/job-profiles', icon: ErrorProfile },
  { entity: 'position request', redirect: '/requests/positions', icon: ErrorRequest },
  { entity: 'department', redirect: '/departments', icon: ErrorDepartment },
  { entity: 'user', redirect: '/users', icon: ErrorUser },
];

export const NotFoundComponent: React.FC<NotFoundComponentProps> = ({ entity }) => {
  const navigate = useNavigate();

  const redirect = entites.find((e) => e.entity == entity)?.redirect ?? '/';
  const icon = entites.find((e) => e.entity == entity)?.icon ?? ErrorPage;
  return (
    <Result
      title={'Not found'}
      subTitle={'Sorry, the ' + (entity ?? 'page') + ' you were looking for does not exist.'}
      icon={<img src={icon} alt="Error" />}
      extra={
        <Row
          justify="center"
          align="middle"
          style={{ height: '100%', justifyContent: 'center', background: '#f5f5f5' }}
        >
          <Col span={12}>
            <NeedHelpComponent />
            <Button type="primary" onClick={() => navigate(redirect)}>
              Back
            </Button>
          </Col>
        </Row>
      }
    />
  );
};

export default NotFoundComponent;
