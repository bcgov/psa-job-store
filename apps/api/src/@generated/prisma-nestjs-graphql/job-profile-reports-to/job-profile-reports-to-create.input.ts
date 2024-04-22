import { Field, InputType } from '@nestjs/graphql';
import { ClassificationCreateNestedOneWithoutReporteesInput } from '../classification/classification-create-nested-one-without-reportees.input';
import { JobProfileCreateNestedOneWithoutReports_toInput } from '../job-profile/job-profile-create-nested-one-without-reports-to.input';

@InputType()
export class JobProfileReportsToCreateInput {
  @Field(() => ClassificationCreateNestedOneWithoutReporteesInput, { nullable: false })
  classification!: ClassificationCreateNestedOneWithoutReporteesInput;

  @Field(() => JobProfileCreateNestedOneWithoutReports_toInput, { nullable: false })
  job_profile!: JobProfileCreateNestedOneWithoutReports_toInput;
}
