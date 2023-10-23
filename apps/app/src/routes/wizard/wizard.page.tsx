import { PageHeader } from '@ant-design/pro-layout';
import { Button, Col, Row, Space } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { JobProfilesPage } from '../job-profiles/job-profiles.page';
import { WizardSteps } from './components/wizard-steps.component';

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

export const WizardPage = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm<IFormInput>();
  // const { actions } = useStateMachine({ updateAction });

  const onSubmit: SubmitHandler<IFormInput> = () => {
    // actions.updateAction(data);
    navigate('/wizard-review');
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <PageHeader title="Choose a job profile" subTitle="Choose a job profile to modify for the new positions" />
      <div style={{ margin: '0 1rem 1rem' }}>
        <Row justify="center">
          <Col xs={24} md={22} lg={18}>
            <WizardSteps current={0}></WizardSteps>
            <JobProfilesPage></JobProfilesPage>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <input {...register('firstName')} />
          <input {...register('lastName')} /> */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <div></div>
                <Button type="primary" htmlType="submit">
                  Next
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </Space>
  );
};
