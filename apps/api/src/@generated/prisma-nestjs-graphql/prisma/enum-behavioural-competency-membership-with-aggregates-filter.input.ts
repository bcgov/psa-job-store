import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyMembership } from './behavioural-competency-membership.enum';
import { IntFilter } from './int-filter.input';
import { EnumBehaviouralCompetencyMembershipFilter } from './enum-behavioural-competency-membership-filter.input';

@InputType()
export class EnumBehaviouralCompetencyMembershipWithAggregatesFilter {
  @Field(() => BehaviouralCompetencyMembership, { nullable: true })
  equals?: keyof typeof BehaviouralCompetencyMembership;

  @Field(() => [BehaviouralCompetencyMembership], { nullable: true })
  in?: Array<keyof typeof BehaviouralCompetencyMembership>;

  @Field(() => [BehaviouralCompetencyMembership], { nullable: true })
  notIn?: Array<keyof typeof BehaviouralCompetencyMembership>;

  @Field(() => EnumBehaviouralCompetencyMembershipWithAggregatesFilter, { nullable: true })
  not?: EnumBehaviouralCompetencyMembershipWithAggregatesFilter;

  @Field(() => IntFilter, { nullable: true })
  _count?: IntFilter;

  @Field(() => EnumBehaviouralCompetencyMembershipFilter, { nullable: true })
  _min?: EnumBehaviouralCompetencyMembershipFilter;

  @Field(() => EnumBehaviouralCompetencyMembershipFilter, { nullable: true })
  _max?: EnumBehaviouralCompetencyMembershipFilter;
}
