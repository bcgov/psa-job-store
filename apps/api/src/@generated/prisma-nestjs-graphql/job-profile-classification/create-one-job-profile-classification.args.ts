import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileClassificationCreateInput } from './job-profile-classification-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobProfileClassificationArgs {
  @Field(() => JobProfileClassificationCreateInput, { nullable: false })
  @Type(() => JobProfileClassificationCreateInput)
  data!: JobProfileClassificationCreateInput;
}
