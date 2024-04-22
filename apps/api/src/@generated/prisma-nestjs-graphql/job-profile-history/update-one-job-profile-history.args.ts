import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileHistoryUpdateInput } from './job-profile-history-update.input';
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
