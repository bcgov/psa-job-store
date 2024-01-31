import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileClassificationWhereInput } from './job-profile-classification-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyJobProfileClassificationArgs {
  @Field(() => JobProfileClassificationWhereInput, { nullable: true })
  @Type(() => JobProfileClassificationWhereInput)
  where?: JobProfileClassificationWhereInput;
}
