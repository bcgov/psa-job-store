import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileClassificationUncheckedUpdateManyInput } from './job-profile-classification-unchecked-update-many.input';
import { Type } from 'class-transformer';
import { JobProfileClassificationWhereInput } from './job-profile-classification-where.input';

@ArgsType()
export class UpdateManyJobProfileClassificationArgs {
  @Field(() => JobProfileClassificationUncheckedUpdateManyInput, { nullable: false })
  @Type(() => JobProfileClassificationUncheckedUpdateManyInput)
  data!: JobProfileClassificationUncheckedUpdateManyInput;

  @Field(() => JobProfileClassificationWhereInput, { nullable: true })
  @Type(() => JobProfileClassificationWhereInput)
  where?: JobProfileClassificationWhereInput;
}
