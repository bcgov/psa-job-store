import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyListRelationFilter } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-list-relation-filter.input';
import { EnumBehaviouralCompetencyCategoryFilter } from '../prisma/enum-behavioural-competency-category-filter.input';
import { EnumBehaviouralCompetencyTypeFilter } from '../prisma/enum-behavioural-competency-type-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { BehaviouralCompetencyWhereInput } from './behavioural-competency-where.input';

@InputType()
export class BehaviouralCompetencyWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [BehaviouralCompetencyWhereInput], { nullable: true })
  AND?: Array<BehaviouralCompetencyWhereInput>;

  @Field(() => [BehaviouralCompetencyWhereInput], { nullable: true })
  OR?: Array<BehaviouralCompetencyWhereInput>;

  @Field(() => [BehaviouralCompetencyWhereInput], { nullable: true })
  NOT?: Array<BehaviouralCompetencyWhereInput>;

  @Field(() => EnumBehaviouralCompetencyTypeFilter, { nullable: true })
  type?: EnumBehaviouralCompetencyTypeFilter;

  @Field(() => EnumBehaviouralCompetencyCategoryFilter, { nullable: true })
  category?: EnumBehaviouralCompetencyCategoryFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  description?: StringFilter;

  @Field(() => JobProfileBehaviouralCompetencyListRelationFilter, { nullable: true })
  job_profiles?: JobProfileBehaviouralCompetencyListRelationFilter;
}
