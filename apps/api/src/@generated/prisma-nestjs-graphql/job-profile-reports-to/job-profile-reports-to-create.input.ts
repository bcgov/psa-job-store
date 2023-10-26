import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateNestedOneWithoutDependent_job_profilesInput } from '../classification/classification-create-nested-one-without-dependent-job-profiles.input';
import { JobProfileCreateNestedOneWithoutReports_toInput } from '../job-profile/job-profile-create-nested-one-without-reports-to.input';

@InputType()
export class JobProfileReportsToCreateInput {
  @Field(() => ClassificationCreateNestedOneWithoutDependent_job_profilesInput, { nullable: false })
  classification!: ClassificationCreateNestedOneWithoutDependent_job_profilesInput;

  @Field(() => JobProfileCreateNestedOneWithoutReports_toInput, { nullable: false })
  job_profile!: JobProfileCreateNestedOneWithoutReports_toInput;
}
