import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileHistoryUpdateInput } from './job-profile-history-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { JobProfileHistoryWhereUniqueInput } from './job-profile-history-where-unique.input';

@ArgsType()
export class UpdateOneJobProfileHistoryArgs {
  @Field(() => JobProfileHistoryUpdateInput, { nullable: false })
  @Type(() => JobProfileHistoryUpdateInput)
  data!: JobProfileHistoryUpdateInput;

  @Field(() => JobProfileHistoryWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileHistoryWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileHistoryWhereUniqueInput, 'id'>;
}
