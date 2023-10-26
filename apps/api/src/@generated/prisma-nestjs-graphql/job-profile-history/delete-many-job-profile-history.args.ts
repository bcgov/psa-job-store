import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileHistoryWhereInput } from './job-profile-history-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyJobProfileHistoryArgs {
  @Field(() => JobProfileHistoryWhereInput, { nullable: true })
  @Type(() => JobProfileHistoryWhereInput)
  where?: JobProfileHistoryWhereInput;
}
