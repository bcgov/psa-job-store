import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyMembership } from '../prisma/behavioural-competency-membership.enum';
import { BehaviouralCompetencyGroup } from '../prisma/behavioural-competency-group.enum';
import { MinistryUpdateOneWithoutBehaviouralCompetencyNestedInput } from '../ministry/ministry-update-one-without-behavioural-competency-nested.input';

@InputType()
export class BehaviouralCompetencyUpdateWithoutJob_profilesInput {
  @Field(() => BehaviouralCompetencyMembership, { nullable: true })
  membership?: keyof typeof BehaviouralCompetencyMembership;

  @Field(() => BehaviouralCompetencyGroup, { nullable: true })
  group?: keyof typeof BehaviouralCompetencyGroup;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => MinistryUpdateOneWithoutBehaviouralCompetencyNestedInput, { nullable: true })
  ministry?: MinistryUpdateOneWithoutBehaviouralCompetencyNestedInput;
}
