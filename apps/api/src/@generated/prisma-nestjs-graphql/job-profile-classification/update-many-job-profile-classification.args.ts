import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileClassificationUncheckedUpdateManyInput } from './job-profile-classification-unchecked-update-many.input';
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
