import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateOneRequiredWithoutDependent_job_profilesNestedInput } from '../classification/classification-update-one-required-without-dependent-job-profiles-nested.input';
import { JobProfileUpdateOneRequiredWithoutReports_toNestedInput } from '../job-profile/job-profile-update-one-required-without-reports-to-nested.input';

@InputType()
export class JobProfileReportsToUpdateInput {
  @Field(() => ClassificationUpdateOneRequiredWithoutDependent_job_profilesNestedInput, { nullable: true })
  classification?: ClassificationUpdateOneRequiredWithoutDependent_job_profilesNestedInput;

  @Field(() => JobProfileUpdateOneRequiredWithoutReports_toNestedInput, { nullable: true })
  job_profile?: JobProfileUpdateOneRequiredWithoutReports_toNestedInput;
}
