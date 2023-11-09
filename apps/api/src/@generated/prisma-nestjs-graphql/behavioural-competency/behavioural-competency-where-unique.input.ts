import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { BehaviouralCompetencyWhereInput } from './behavioural-competency-where.input';
import { IntFilter } from '../prisma/int-filter.input';
import { EnumBehaviouralCompetencyMembershipFilter } from '../prisma/enum-behavioural-competency-membership-filter.input';
import { EnumBehaviouralCompetencyGroupFilter } from '../prisma/enum-behavioural-competency-group-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileBehaviouralCompetencyListRelationFilter } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-list-relation-filter.input';
import { MinistryRelationFilter } from '../ministry/ministry-relation-filter.input';

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

  @Field(() => IntFilter, { nullable: true })
  ministry_id?: IntFilter;

  @Field(() => EnumBehaviouralCompetencyMembershipFilter, { nullable: true })
  membership?: EnumBehaviouralCompetencyMembershipFilter;

  @Field(() => EnumBehaviouralCompetencyGroupFilter, { nullable: true })
  group?: EnumBehaviouralCompetencyGroupFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  description?: StringFilter;

  @Field(() => JobProfileBehaviouralCompetencyListRelationFilter, { nullable: true })
  job_profiles?: JobProfileBehaviouralCompetencyListRelationFilter;

  @Field(() => MinistryRelationFilter, { nullable: true })
  ministry?: MinistryRelationFilter;
}
