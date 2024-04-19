import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileHistoryCreateManyInput } from './job-profile-history-create-many.input';

@ArgsType()
export class CreateManyJobProfileHistoryArgs {
  @Field(() => [JobProfileHistoryCreateManyInput], { nullable: false })
  @Type(() => JobProfileHistoryCreateManyInput)
  data!: Array<JobProfileHistoryCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
