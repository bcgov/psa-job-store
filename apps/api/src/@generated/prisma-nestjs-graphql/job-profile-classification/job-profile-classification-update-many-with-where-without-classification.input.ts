import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileClassificationScalarWhereInput } from './job-profile-classification-scalar-where.input';
import { Type } from 'class-transformer';
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
