import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileHistoryCreateInput } from './job-profile-history-create.input';
import { JobProfileHistoryUpdateInput } from './job-profile-history-update.input';
import { JobProfileHistoryWhereUniqueInput } from './job-profile-history-where-unique.input';

@ArgsType()
export class UpsertOneJobProfileHistoryArgs {
  @Field(() => JobProfileHistoryWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileHistoryWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileHistoryWhereUniqueInput, 'id'>;

  @Field(() => JobProfileHistoryCreateInput, { nullable: false })
  @Type(() => JobProfileHistoryCreateInput)
  create!: JobProfileHistoryCreateInput;

  @Field(() => JobProfileHistoryUpdateInput, { nullable: false })
  @Type(() => JobProfileHistoryUpdateInput)
  update!: JobProfileHistoryUpdateInput;
}
