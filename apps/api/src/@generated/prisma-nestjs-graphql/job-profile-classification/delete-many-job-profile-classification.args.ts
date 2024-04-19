import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileClassificationWhereInput } from './job-profile-classification-where.input';

@ArgsType()
export class DeleteManyJobProfileClassificationArgs {
  @Field(() => JobProfileClassificationWhereInput, { nullable: true })
  @Type(() => JobProfileClassificationWhereInput)
  where?: JobProfileClassificationWhereInput;
}
