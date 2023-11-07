import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyMembership } from './behavioural-competency-membership.enum';

@InputType()
export class EnumBehaviouralCompetencyMembershipFilter {
  @Field(() => BehaviouralCompetencyMembership, { nullable: true })
  equals?: keyof typeof BehaviouralCompetencyMembership;

  @Field(() => [BehaviouralCompetencyMembership], { nullable: true })
  in?: Array<keyof typeof BehaviouralCompetencyMembership>;

  @Field(() => [BehaviouralCompetencyMembership], { nullable: true })
  notIn?: Array<keyof typeof BehaviouralCompetencyMembership>;

  @Field(() => EnumBehaviouralCompetencyMembershipFilter, { nullable: true })
  not?: EnumBehaviouralCompetencyMembershipFilter;
}
