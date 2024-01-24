import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileClassificationScalarWhereInput } from './job-profile-classification-scalar-where.input';
import { Type } from 'class-transformer';
import { JobProfileClassificationUncheckedUpdateManyWithoutJob_profileInput } from './job-profile-classification-unchecked-update-many-without-job-profile.input';

@InputType()
export class JobProfileClassificationUpdateManyWithWhereWithoutJob_profileInput {
  @Field(() => JobProfileClassificationScalarWhereInput, { nullable: false })
  @Type(() => JobProfileClassificationScalarWhereInput)
  where!: JobProfileClassificationScalarWhereInput;

  @Field(() => JobProfileClassificationUncheckedUpdateManyWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileClassificationUncheckedUpdateManyWithoutJob_profileInput)
  data!: JobProfileClassificationUncheckedUpdateManyWithoutJob_profileInput;
}
