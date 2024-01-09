import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileClassificationUpdateManyWithoutClassificationNestedInput } from '../job-profile-classification/job-profile-classification-update-many-without-classification-nested.input';

@InputType()
export class ClassificationUpdateWithoutReporteesInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  peoplesoft_id?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  effective_status?: string;

  @Field(() => Date, { nullable: true })
  effective_date?: Date | string;

  @Field(() => JobProfileClassificationUpdateManyWithoutClassificationNestedInput, { nullable: true })
  job_profiles?: JobProfileClassificationUpdateManyWithoutClassificationNestedInput;
}
