import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileClassificationScalarWhereInput } from './job-profile-classification-scalar-where.input';
import { JobProfileClassificationUncheckedUpdateManyWithoutClassificationInput } from './job-profile-classification-unchecked-update-many-without-classification.input';

@InputType()
export class JobProfileClassificationUpdateManyWithWhereWithoutClassificationInput {
  @Field(() => JobProfileClassificationScalarWhereInput, { nullable: false })
  @Type(() => JobProfileClassificationScalarWhereInput)
  where!: JobProfileClassificationScalarWhereInput;

  @Field(() => JobProfileClassificationUncheckedUpdateManyWithoutClassificationInput, { nullable: false })
  @Type(() => JobProfileClassificationUncheckedUpdateManyWithoutClassificationInput)
  data!: JobProfileClassificationUncheckedUpdateManyWithoutClassificationInput;
}
