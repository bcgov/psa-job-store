import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyCreateWithoutMinistryInput } from './behavioural-competency-create-without-ministry.input';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyCreateOrConnectWithoutMinistryInput } from './behavioural-competency-create-or-connect-without-ministry.input';
import { BehaviouralCompetencyCreateManyMinistryInputEnvelope } from './behavioural-competency-create-many-ministry-input-envelope.input';
import { Prisma } from '@prisma/client';
import { BehaviouralCompetencyWhereUniqueInput } from './behavioural-competency-where-unique.input';

@InputType()
export class BehaviouralCompetencyUncheckedCreateNestedManyWithoutMinistryInput {
  @Field(() => [BehaviouralCompetencyCreateWithoutMinistryInput], { nullable: true })
  @Type(() => BehaviouralCompetencyCreateWithoutMinistryInput)
  create?: Array<BehaviouralCompetencyCreateWithoutMinistryInput>;

  @Field(() => [BehaviouralCompetencyCreateOrConnectWithoutMinistryInput], { nullable: true })
  @Type(() => BehaviouralCompetencyCreateOrConnectWithoutMinistryInput)
  connectOrCreate?: Array<BehaviouralCompetencyCreateOrConnectWithoutMinistryInput>;

  @Field(() => BehaviouralCompetencyCreateManyMinistryInputEnvelope, { nullable: true })
  @Type(() => BehaviouralCompetencyCreateManyMinistryInputEnvelope)
  createMany?: BehaviouralCompetencyCreateManyMinistryInputEnvelope;

  @Field(() => [BehaviouralCompetencyWhereUniqueInput], { nullable: true })
  @Type(() => BehaviouralCompetencyWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<BehaviouralCompetencyWhereUniqueInput, 'id'>>;
}
