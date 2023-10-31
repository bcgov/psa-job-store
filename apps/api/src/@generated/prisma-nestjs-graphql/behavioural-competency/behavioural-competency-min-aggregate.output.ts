import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { BehaviouralCompetencyMembership } from '../prisma/behavioural-competency-membership.enum';
import { BehaviouralCompetencyGroup } from '../prisma/behavioural-competency-group.enum';

@ObjectType()
export class BehaviouralCompetencyMinAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  ministry_id?: number;

  @Field(() => BehaviouralCompetencyMembership, { nullable: true })
  membership?: keyof typeof BehaviouralCompetencyMembership;

  @Field(() => BehaviouralCompetencyGroup, { nullable: true })
  group?: keyof typeof BehaviouralCompetencyGroup;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
