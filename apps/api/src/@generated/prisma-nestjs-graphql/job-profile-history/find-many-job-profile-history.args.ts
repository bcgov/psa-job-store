import { ArgsType, Field, HideField, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileHistoryOrderByWithRelationAndSearchRelevanceInput } from './job-profile-history-order-by-with-relation-and-search-relevance.input';
import { JobProfileHistoryScalarFieldEnum } from './job-profile-history-scalar-field.enum';
import { JobProfileHistoryWhereUniqueInput } from './job-profile-history-where-unique.input';
import { JobProfileHistoryWhereInput } from './job-profile-history-where.input';

@ArgsType()
export class FindManyJobProfileHistoryArgs {
  @Field(() => JobProfileHistoryWhereInput, { nullable: true })
  @Type(() => JobProfileHistoryWhereInput)
  where?: JobProfileHistoryWhereInput;

  @Field(() => [JobProfileHistoryOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileHistoryOrderByWithRelationAndSearchRelevanceInput>;

  @HideField()
  cursor?: Prisma.AtLeast<JobProfileHistoryWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @HideField()
  distinct?: Array<keyof typeof JobProfileHistoryScalarFieldEnum>;
}
