import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileClassificationUncheckedUpdateManyWithoutClassificationNestedInput } from '../job-profile-classification/job-profile-classification-unchecked-update-many-without-classification-nested.input';
import { JobProfileReportsToUncheckedUpdateManyWithoutClassificationNestedInput } from '../job-profile-reports-to/job-profile-reports-to-unchecked-update-many-without-classification-nested.input';

@InputType()
export class ClassificationUncheckedUpdateWithoutEmployee_groupInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  peoplesoft_id?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  grade?: string;

  @Field(() => String, { nullable: true })
  effective_status?: string;

  @Field(() => Date, { nullable: true })
  effective_date?: Date | string;

  @Field(() => JobProfileClassificationUncheckedUpdateManyWithoutClassificationNestedInput, { nullable: true })
  job_profiles?: JobProfileClassificationUncheckedUpdateManyWithoutClassificationNestedInput;

  @Field(() => JobProfileReportsToUncheckedUpdateManyWithoutClassificationNestedInput, { nullable: true })
  reportees?: JobProfileReportsToUncheckedUpdateManyWithoutClassificationNestedInput;
}
