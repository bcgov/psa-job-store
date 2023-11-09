import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedOneWithoutReports_toInput } from '../job-profile/job-profile-create-nested-one-without-reports-to.input';

@InputType()
export class JobProfileReportsToCreateWithoutClassificationInput {
  @Field(() => JobProfileCreateNestedOneWithoutReports_toInput, { nullable: false })
  job_profile!: JobProfileCreateNestedOneWithoutReports_toInput;
}
