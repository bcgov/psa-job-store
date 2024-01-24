import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileContextWhereInput } from './job-profile-context-where.input';
import { Type } from 'class-transformer';
import { JobProfileContextOrderByWithRelationAndSearchRelevanceInput } from './job-profile-context-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileContextWhereUniqueInput } from './job-profile-context-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileContextScalarFieldEnum } from './job-profile-context-scalar-field.enum';

@ArgsType()
export class FindFirstJobProfileContextOrThrowArgs {
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
