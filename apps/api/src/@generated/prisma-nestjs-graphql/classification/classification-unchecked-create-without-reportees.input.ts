import { Field, InputType } from '@nestjs/graphql';
import { JobProfileClassificationUncheckedCreateNestedManyWithoutClassificationInput } from '../job-profile-classification/job-profile-classification-unchecked-create-nested-many-without-classification.input';

@InputType()
export class ClassificationUncheckedCreateWithoutReporteesInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  peoplesoft_id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  employee_group_id!: string;

  @Field(() => String, { nullable: false })
  grade!: string;

  @Field(() => String, { nullable: false })
  effective_status!: string;

  @Field(() => Date, { nullable: false })
  effective_date!: Date | string;

  @Field(() => JobProfileClassificationUncheckedCreateNestedManyWithoutClassificationInput, { nullable: true })
  job_profiles?: JobProfileClassificationUncheckedCreateNestedManyWithoutClassificationInput;
}
