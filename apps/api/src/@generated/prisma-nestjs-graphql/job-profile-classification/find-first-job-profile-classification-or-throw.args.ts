import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileClassificationOrderByWithRelationAndSearchRelevanceInput } from './job-profile-classification-order-by-with-relation-and-search-relevance.input';
import { JobProfileClassificationScalarFieldEnum } from './job-profile-classification-scalar-field.enum';
import { JobProfileClassificationWhereUniqueInput } from './job-profile-classification-where-unique.input';
import { JobProfileClassificationWhereInput } from './job-profile-classification-where.input';

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
