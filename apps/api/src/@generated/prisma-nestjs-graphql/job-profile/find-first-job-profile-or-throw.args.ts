import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileOrderByWithRelationAndSearchRelevanceInput } from './job-profile-order-by-with-relation-and-search-relevance.input';
import { JobProfileScalarFieldEnum } from './job-profile-scalar-field.enum';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@ArgsType()
export class FindFirstJobProfileOrThrowArgs {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => [JobProfileOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobProfileScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobProfileScalarFieldEnum>;
}
