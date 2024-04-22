import { Field, InputType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyListRelationFilter } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-list-relation-filter.input';
import { EnumBehaviouralCompetencyCategoryFilter } from '../prisma/enum-behavioural-competency-category-filter.input';
import { EnumBehaviouralCompetencyTypeFilter } from '../prisma/enum-behavioural-competency-type-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class BehaviouralCompetencyWhereInput {
  @Field(() => [BehaviouralCompetencyWhereInput], { nullable: true })
  AND?: Array<BehaviouralCompetencyWhereInput>;

  @Field(() => [BehaviouralCompetencyWhereInput], { nullable: true })
  OR?: Array<BehaviouralCompetencyWhereInput>;

  @Field(() => [BehaviouralCompetencyWhereInput], { nullable: true })
  NOT?: Array<BehaviouralCompetencyWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

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
