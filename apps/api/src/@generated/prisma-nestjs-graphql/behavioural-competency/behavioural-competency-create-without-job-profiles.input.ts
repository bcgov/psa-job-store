import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyMembership } from '../prisma/behavioural-competency-membership.enum';
import { BehaviouralCompetencyGroup } from '../prisma/behavioural-competency-group.enum';
import { MinistryCreateNestedOneWithoutBehaviouralCompetencyInput } from '../ministry/ministry-create-nested-one-without-behavioural-competency.input';

@InputType()
export class BehaviouralCompetencyCreateWithoutJob_profilesInput {
  @Field(() => BehaviouralCompetencyMembership, { nullable: false })
  membership!: keyof typeof BehaviouralCompetencyMembership;

  @Field(() => BehaviouralCompetencyGroup, { nullable: false })
  group!: keyof typeof BehaviouralCompetencyGroup;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => MinistryCreateNestedOneWithoutBehaviouralCompetencyInput, { nullable: true })
  ministry?: MinistryCreateNestedOneWithoutBehaviouralCompetencyInput;
}
