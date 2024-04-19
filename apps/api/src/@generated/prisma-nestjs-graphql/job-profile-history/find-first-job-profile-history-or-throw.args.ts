import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileHistoryOrderByWithRelationAndSearchRelevanceInput } from './job-profile-history-order-by-with-relation-and-search-relevance.input';
import { JobProfileHistoryScalarFieldEnum } from './job-profile-history-scalar-field.enum';
import { JobProfileHistoryWhereUniqueInput } from './job-profile-history-where-unique.input';
import { JobProfileHistoryWhereInput } from './job-profile-history-where.input';

@ArgsType()
export class FindFirstJobProfileHistoryOrThrowArgs {
  @Field(() => JobProfileHistoryWhereInput, { nullable: true })
  @Type(() => JobProfileHistoryWhereInput)
  where?: JobProfileHistoryWhereInput;

  @Field(() => [JobProfileHistoryOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileHistoryOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileHistoryWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileHistoryWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobProfileHistoryScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobProfileHistoryScalarFieldEnum>;
}
