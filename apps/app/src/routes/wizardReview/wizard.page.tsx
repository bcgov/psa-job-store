import { Space } from 'antd';
import { PageHeader } from '../../components/app/page-header.component';

// class User {
//   @Length(2, 30)
//   username: string;

//   @IsEmail()
//   email: string;
// }

// const resolver = classValidatorResolver(User);

export const WizardReviewPage = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<User>({ resolver });

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <PageHeader title="Wizard" subTitle="Find a Job Profile which suits your needs" />
        <div style={{ margin: '0 1rem' }}>
          Page 2
          {/* <form onSubmit={handleSubmit((data) => console.log(data))}>
            <input type="text" {...register('username')} />
            {errors.username && <span>{errors.username.message}</span>}
            <input type="text" {...register('email')} />
            {errors.email && <span>{errors.email.message}</span>}
            <input type="submit" value="Submit" />
          </form> */}
        </div>
      </Space>
    </>
  );
};
