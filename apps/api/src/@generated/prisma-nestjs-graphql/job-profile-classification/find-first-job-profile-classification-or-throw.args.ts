import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileClassificationWhereInput } from './job-profile-classification-where.input';
import { Type } from 'class-transformer';
import { JobProfileClassificationOrderByWithRelationAndSearchRelevanceInput } from './job-profile-classification-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileClassificationWhereUniqueInput } from './job-profile-classification-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileClassificationScalarFieldEnum } from './job-profile-classification-scalar-field.enum';

@ArgsType()
export class FindFirstJobProfileClassificationOrThrowArgs {
  @Field(() => JobProfileClassificationWhereInput, { nullable: true })
  @Type(() => JobProfileClassificationWhereInput)
  where?: JobProfileClassificationWhereInput;

  @Field(() => [JobProfileClassificationOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileClassificationOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileClassificationWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileClassificationWhereUniqueInput, 'classification_id_job_profile_id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobProfileClassificationScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobProfileClassificationScalarFieldEnum>;
}
