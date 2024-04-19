import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput } from './job-profile-behavioural-competency-order-by-with-relation-and-search-relevance.input';
import { JobProfileBehaviouralCompetencyScalarFieldEnum } from './job-profile-behavioural-competency-scalar-field.enum';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';
import { JobProfileBehaviouralCompetencyWhereInput } from './job-profile-behavioural-competency-where.input';

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
