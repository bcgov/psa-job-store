import { PageHeader } from '@ant-design/pro-layout';
import { Button, Col, Row, Space } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { JobProfile } from '../job-profiles/components/job-profile.component';
import { WizardSteps } from '../wizard/components/wizard-steps.component';

// class User {
//   @Length(2, 30)
//   username: string;

//   @IsEmail()
//   email: string;
// }

// const resolver = classValidatorResolver(User);

// export const WizardPage = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<User>({ resolver });

//   return (
//     <>
//       <Space direction="vertical" style={{ width: '100%' }} size="large">
//         <PageHeader title="Wizard" subTitle="Find a Job Profile which suits your needs" />
//         <div style={{ margin: '0 1rem' }}>
//           <form onSubmit={handleSubmit((data) => console.log(data))}>
//             <input type="text" {...register('username')} />
//             {errors.username && <span>{errors.username.message}</span>}
//             <input type="text" {...register('email')} />
//             {errors.email && <span>{errors.email.message}</span>}
//             <input type="submit" value="Submit" />
//           </form>
//         </div>
//       </Space>
//     </>
//   );
// };

interface IFormInput {
  firstName: string;
  lastName: string;
}

export const WizardReviewPage = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm<IFormInput>();
  // const { actions } = useStateMachine({ updateAction });

  const onSubmit: SubmitHandler<IFormInput> = () => {
    // actions.updateAction(data);
    navigate('/wizard-result');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <PageHeader title="Review and submit" subTitle="Review the profile before creating a new position" />
      <div style={{ margin: '0 1rem 1rem' }}>
        <Row justify="center">
          <Col xs={24} md={22} lg={18}>
            <WizardSteps current={1}></WizardSteps>
            <JobProfile id="a0539fb2-938a-48b9-9ddb-3f9e7a508b09" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button onClick={handleBackClick}>Go Back</Button>
                <Button type="primary" htmlType="submit">
                  Create Position
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </Space>
  );
};
