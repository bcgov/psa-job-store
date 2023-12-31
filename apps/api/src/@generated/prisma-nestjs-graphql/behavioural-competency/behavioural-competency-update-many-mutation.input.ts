import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyMembership } from '../prisma/behavioural-competency-membership.enum';
import { BehaviouralCompetencyGroup } from '../prisma/behavioural-competency-group.enum';

@InputType()
export class BehaviouralCompetencyUpdateManyMutationInput {
  @Field(() => BehaviouralCompetencyMembership, { nullable: true })
  membership?: keyof typeof BehaviouralCompetencyMembership;

  @Field(() => BehaviouralCompetencyGroup, { nullable: true })
  group?: keyof typeof BehaviouralCompetencyGroup;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
