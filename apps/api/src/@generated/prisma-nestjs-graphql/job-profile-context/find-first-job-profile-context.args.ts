import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileContextOrderByWithRelationAndSearchRelevanceInput } from './job-profile-context-order-by-with-relation-and-search-relevance.input';
import { JobProfileContextScalarFieldEnum } from './job-profile-context-scalar-field.enum';
import { JobProfileContextWhereUniqueInput } from './job-profile-context-where-unique.input';
import { JobProfileContextWhereInput } from './job-profile-context-where.input';

@ArgsType()
export class FindFirstJobProfileContextArgs {
  @Field(() => JobProfileContextWhereInput, { nullable: true })
  @Type(() => JobProfileContextWhereInput)
  where?: JobProfileContextWhereInput;

  @Field(() => [JobProfileContextOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileContextOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileContextWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileContextWhereUniqueInput, 'id' | 'job_profile_id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobProfileContextScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobProfileContextScalarFieldEnum>;
}
