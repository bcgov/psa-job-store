import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateOneRequiredWithoutReports_toNestedInput } from '../job-profile/job-profile-update-one-required-without-reports-to-nested.input';

@InputType()
export class JobProfileReportsToUpdateWithoutClassificationInput {
  @Field(() => JobProfileUpdateOneRequiredWithoutReports_toNestedInput, { nullable: true })
  job_profile?: JobProfileUpdateOneRequiredWithoutReports_toNestedInput;
}
