import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateOneRequiredWithoutDependent_job_profilesNestedInput } from '../classification/classification-update-one-required-without-dependent-job-profiles-nested.input';

@InputType()
export class JobProfileReportsToUpdateWithoutJob_profileInput {
  @Field(() => ClassificationUpdateOneRequiredWithoutDependent_job_profilesNestedInput, { nullable: true })
  classification?: ClassificationUpdateOneRequiredWithoutDependent_job_profilesNestedInput;
}
