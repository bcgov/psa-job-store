import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileClassificationCreateInput } from './job-profile-classification-create.input';

@ArgsType()
export class CreateOneJobProfileClassificationArgs {
  @Field(() => JobProfileClassificationCreateInput, { nullable: false })
  @Type(() => JobProfileClassificationCreateInput)
  data!: JobProfileClassificationCreateInput;
}
