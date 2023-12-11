import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateManyWithoutClassificationNestedInput } from '../job-profile/job-profile-update-many-without-classification-nested.input';

@InputType()
export class ClassificationUpdateWithoutReporteesInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUpdateManyWithoutClassificationNestedInput, { nullable: true })
  job_profiles?: JobProfileUpdateManyWithoutClassificationNestedInput;
}
