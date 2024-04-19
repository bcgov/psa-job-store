import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileHistoryCreateInput } from './job-profile-history-create.input';

@ArgsType()
export class CreateOneJobProfileHistoryArgs {
  @Field(() => JobProfileHistoryCreateInput, { nullable: false })
  @Type(() => JobProfileHistoryCreateInput)
  data!: JobProfileHistoryCreateInput;
}
