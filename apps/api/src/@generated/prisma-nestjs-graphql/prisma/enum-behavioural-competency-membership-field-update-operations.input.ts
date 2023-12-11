import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyMembership } from './behavioural-competency-membership.enum';

@InputType()
export class EnumBehaviouralCompetencyMembershipFieldUpdateOperationsInput {
  @Field(() => BehaviouralCompetencyMembership, { nullable: true })
  set?: keyof typeof BehaviouralCompetencyMembership;
}
