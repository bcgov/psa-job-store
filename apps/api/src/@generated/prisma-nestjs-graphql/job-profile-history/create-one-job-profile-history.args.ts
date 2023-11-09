import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileHistoryCreateInput } from './job-profile-history-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobProfileHistoryArgs {
  @Field(() => JobProfileHistoryCreateInput, { nullable: false })
  @Type(() => JobProfileHistoryCreateInput)
  data!: JobProfileHistoryCreateInput;
}
