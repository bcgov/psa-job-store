import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileHistoryWhereUniqueInput } from './job-profile-history-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueJobProfileHistoryOrThrowArgs {
  @Field(() => JobProfileHistoryWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileHistoryWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileHistoryWhereUniqueInput, 'id'>;
}
