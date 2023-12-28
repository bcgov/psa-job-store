import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileClassificationCreateNestedManyWithoutClassificationInput } from '../job-profile-classification/job-profile-classification-create-nested-many-without-classification.input';

@InputType()
export class ClassificationCreateWithoutReporteesInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileClassificationCreateNestedManyWithoutClassificationInput, { nullable: true })
  job_profiles?: JobProfileClassificationCreateNestedManyWithoutClassificationInput;
}
