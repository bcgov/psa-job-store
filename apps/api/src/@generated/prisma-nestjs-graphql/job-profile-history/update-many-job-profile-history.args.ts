import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileHistoryUpdateManyMutationInput } from './job-profile-history-update-many-mutation.input';
import { Type } from 'class-transformer';
import { JobProfileHistoryWhereInput } from './job-profile-history-where.input';

@ArgsType()
export class UpdateManyJobProfileHistoryArgs {
  @Field(() => JobProfileHistoryUpdateManyMutationInput, { nullable: false })
  @Type(() => JobProfileHistoryUpdateManyMutationInput)
  data!: JobProfileHistoryUpdateManyMutationInput;

  @Field(() => JobProfileHistoryWhereInput, { nullable: true })
  @Type(() => JobProfileHistoryWhereInput)
  where?: JobProfileHistoryWhereInput;
}
