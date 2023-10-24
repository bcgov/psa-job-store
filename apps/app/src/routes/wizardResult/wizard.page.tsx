import { Button, Col, Result, Row, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/app/page-header.component';
import { WizardSteps } from '../wizard/components/wizard-steps.component';

// class User {
//   @Length(2, 30)
//   username: string;

//   @IsEmail()
//   email: string;
// }

// const resolver = classValidatorResolver(User);

export const WizardResultPage = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<User>({ resolver });

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  };

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <PageHeader title="Review and submit" subTitle="Review the profile before creating a new position" />
        <div style={{ margin: '0 1rem  1rem' }}>
          <Row justify="center">
            <Col xs={24} md={22} lg={18}>
              <WizardSteps current={3}></WizardSteps>
              <Result
                status="success"
                title="Your position has been created."
                subTitle={
                  <div>
                    <div>Position: Program Assistant (L9)</div>
                    <br />
                    <div>Position #: 12345678</div>
                    <br />
                    <div>
                      We have submitted a hiring request for this position. A recruiter will reach out to you shortly.
                    </div>
                  </div>
                }
                extra={[
                  <Button type="primary" key="console" onClick={handleClick}>
                    Go to Dashboard
                  </Button>,
                ]}
              />
              {/* <form onSubmit={handleSubmit((data) => console.log(data))}>
            <input type="text" {...register('username')} />
            {errors.username && <span>{errors.username.message}</span>}
            <input type="text" {...register('email')} />
            {errors.email && <span>{errors.email.message}</span>}
            <input type="submit" value="Submit" />
          </form> */}
            </Col>
          </Row>
        </div>
      </Space>
    </>
  );
};
