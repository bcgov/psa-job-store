import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileHistoryCreateManyInput } from './job-profile-history-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobProfileHistoryArgs {
  @Field(() => [JobProfileHistoryCreateManyInput], { nullable: false })
  @Type(() => JobProfileHistoryCreateManyInput)
  data!: Array<JobProfileHistoryCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
