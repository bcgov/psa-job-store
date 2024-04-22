import { Field, InputType } from '@nestjs/graphql';
import { ClassificationUpdateOneRequiredWithoutReporteesNestedInput } from '../classification/classification-update-one-required-without-reportees-nested.input';
import { JobProfileUpdateOneRequiredWithoutReports_toNestedInput } from '../job-profile/job-profile-update-one-required-without-reports-to-nested.input';

@InputType()
export class JobProfileReportsToUpdateInput {
  @Field(() => ClassificationUpdateOneRequiredWithoutReporteesNestedInput, { nullable: true })
  classification?: ClassificationUpdateOneRequiredWithoutReporteesNestedInput;

  @Field(() => JobProfileUpdateOneRequiredWithoutReports_toNestedInput, { nullable: true })
  job_profile?: JobProfileUpdateOneRequiredWithoutReports_toNestedInput;
}
