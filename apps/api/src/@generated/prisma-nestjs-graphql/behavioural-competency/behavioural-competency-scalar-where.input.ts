import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { EnumBehaviouralCompetencyMembershipFilter } from '../prisma/enum-behavioural-competency-membership-filter.input';
import { EnumBehaviouralCompetencyGroupFilter } from '../prisma/enum-behavioural-competency-group-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class BehaviouralCompetencyScalarWhereInput {
  @Field(() => [BehaviouralCompetencyScalarWhereInput], { nullable: true })
  AND?: Array<BehaviouralCompetencyScalarWhereInput>;

  @Field(() => [BehaviouralCompetencyScalarWhereInput], { nullable: true })
  OR?: Array<BehaviouralCompetencyScalarWhereInput>;

  @Field(() => [BehaviouralCompetencyScalarWhereInput], { nullable: true })
  NOT?: Array<BehaviouralCompetencyScalarWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

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
}
