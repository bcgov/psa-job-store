import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyWhereInput } from './job-profile-behavioural-competency-where.input';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput } from './job-profile-behavioural-competency-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyScalarFieldEnum } from './job-profile-behavioural-competency-scalar-field.enum';

@ArgsType()
export class FindFirstJobProfileBehaviouralCompetencyOrThrowArgs {
  @Field(() => JobProfileBehaviouralCompetencyWhereInput, { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyWhereInput)
  where?: JobProfileBehaviouralCompetencyWhereInput;

  @Field(() => [JobProfileBehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileBehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileBehaviouralCompetencyWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileBehaviouralCompetencyWhereUniqueInput, 'behavioural_competency_id_job_profile_id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [JobProfileBehaviouralCompetencyScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof JobProfileBehaviouralCompetencyScalarFieldEnum>;
}
