import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileHistoryWhereInput } from './job-profile-history-where.input';
import { Type } from 'class-transformer';
import { JobProfileHistoryOrderByWithRelationAndSearchRelevanceInput } from './job-profile-history-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileHistoryWhereUniqueInput } from './job-profile-history-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileHistoryScalarFieldEnum } from './job-profile-history-scalar-field.enum';

@ArgsType()
export class FindFirstJobProfileHistoryArgs {
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
