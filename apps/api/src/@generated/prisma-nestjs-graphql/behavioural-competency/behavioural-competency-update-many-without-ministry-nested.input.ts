import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyCreateWithoutMinistryInput } from './behavioural-competency-create-without-ministry.input';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyCreateOrConnectWithoutMinistryInput } from './behavioural-competency-create-or-connect-without-ministry.input';
import { BehaviouralCompetencyUpsertWithWhereUniqueWithoutMinistryInput } from './behavioural-competency-upsert-with-where-unique-without-ministry.input';
import { BehaviouralCompetencyCreateManyMinistryInputEnvelope } from './behavioural-competency-create-many-ministry-input-envelope.input';
import { Prisma } from '@prisma/client';
import { BehaviouralCompetencyWhereUniqueInput } from './behavioural-competency-where-unique.input';
import { BehaviouralCompetencyUpdateWithWhereUniqueWithoutMinistryInput } from './behavioural-competency-update-with-where-unique-without-ministry.input';
import { BehaviouralCompetencyUpdateManyWithWhereWithoutMinistryInput } from './behavioural-competency-update-many-with-where-without-ministry.input';
import { BehaviouralCompetencyScalarWhereInput } from './behavioural-competency-scalar-where.input';

@InputType()
export class BehaviouralCompetencyUpdateManyWithoutMinistryNestedInput {
  @Field(() => [BehaviouralCompetencyCreateWithoutMinistryInput], { nullable: true })
  @Type(() => BehaviouralCompetencyCreateWithoutMinistryInput)
  create?: Array<BehaviouralCompetencyCreateWithoutMinistryInput>;

  @Field(() => [BehaviouralCompetencyCreateOrConnectWithoutMinistryInput], { nullable: true })
  @Type(() => BehaviouralCompetencyCreateOrConnectWithoutMinistryInput)
  connectOrCreate?: Array<BehaviouralCompetencyCreateOrConnectWithoutMinistryInput>;

  @Field(() => [BehaviouralCompetencyUpsertWithWhereUniqueWithoutMinistryInput], { nullable: true })
  @Type(() => BehaviouralCompetencyUpsertWithWhereUniqueWithoutMinistryInput)
  upsert?: Array<BehaviouralCompetencyUpsertWithWhereUniqueWithoutMinistryInput>;

  @Field(() => BehaviouralCompetencyCreateManyMinistryInputEnvelope, { nullable: true })
  @Type(() => BehaviouralCompetencyCreateManyMinistryInputEnvelope)
  createMany?: BehaviouralCompetencyCreateManyMinistryInputEnvelope;

  @Field(() => [BehaviouralCompetencyWhereUniqueInput], { nullable: true })
  @Type(() => BehaviouralCompetencyWhereUniqueInput)
  set?: Array<Prisma.AtLeast<BehaviouralCompetencyWhereUniqueInput, 'id'>>;

  @Field(() => [BehaviouralCompetencyWhereUniqueInput], { nullable: true })
  @Type(() => BehaviouralCompetencyWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<BehaviouralCompetencyWhereUniqueInput, 'id'>>;

  @Field(() => [BehaviouralCompetencyWhereUniqueInput], { nullable: true })
  @Type(() => BehaviouralCompetencyWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<BehaviouralCompetencyWhereUniqueInput, 'id'>>;

  @Field(() => [BehaviouralCompetencyWhereUniqueInput], { nullable: true })
  @Type(() => BehaviouralCompetencyWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<BehaviouralCompetencyWhereUniqueInput, 'id'>>;

  @Field(() => [BehaviouralCompetencyUpdateWithWhereUniqueWithoutMinistryInput], { nullable: true })
  @Type(() => BehaviouralCompetencyUpdateWithWhereUniqueWithoutMinistryInput)
  update?: Array<BehaviouralCompetencyUpdateWithWhereUniqueWithoutMinistryInput>;

  @Field(() => [BehaviouralCompetencyUpdateManyWithWhereWithoutMinistryInput], { nullable: true })
  @Type(() => BehaviouralCompetencyUpdateManyWithWhereWithoutMinistryInput)
  updateMany?: Array<BehaviouralCompetencyUpdateManyWithWhereWithoutMinistryInput>;

  @Field(() => [BehaviouralCompetencyScalarWhereInput], { nullable: true })
  @Type(() => BehaviouralCompetencyScalarWhereInput)
  deleteMany?: Array<BehaviouralCompetencyScalarWhereInput>;
}
