import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MinistryCreateWithoutBehaviouralCompetencyInput } from './ministry-create-without-behavioural-competency.input';
import { Type } from 'class-transformer';
import { MinistryCreateOrConnectWithoutBehaviouralCompetencyInput } from './ministry-create-or-connect-without-behavioural-competency.input';
import { MinistryUpsertWithoutBehaviouralCompetencyInput } from './ministry-upsert-without-behavioural-competency.input';
import { MinistryWhereInput } from './ministry-where.input';
import { Prisma } from '@prisma/client';
import { MinistryWhereUniqueInput } from './ministry-where-unique.input';
import { MinistryUpdateToOneWithWhereWithoutBehaviouralCompetencyInput } from './ministry-update-to-one-with-where-without-behavioural-competency.input';

@InputType()
export class MinistryUpdateOneWithoutBehaviouralCompetencyNestedInput {
  @Field(() => MinistryCreateWithoutBehaviouralCompetencyInput, { nullable: true })
  @Type(() => MinistryCreateWithoutBehaviouralCompetencyInput)
  create?: MinistryCreateWithoutBehaviouralCompetencyInput;

  @Field(() => MinistryCreateOrConnectWithoutBehaviouralCompetencyInput, { nullable: true })
  @Type(() => MinistryCreateOrConnectWithoutBehaviouralCompetencyInput)
  connectOrCreate?: MinistryCreateOrConnectWithoutBehaviouralCompetencyInput;

  @Field(() => MinistryUpsertWithoutBehaviouralCompetencyInput, { nullable: true })
  @Type(() => MinistryUpsertWithoutBehaviouralCompetencyInput)
  upsert?: MinistryUpsertWithoutBehaviouralCompetencyInput;

  @Field(() => MinistryWhereInput, { nullable: true })
  @Type(() => MinistryWhereInput)
  disconnect?: MinistryWhereInput;

  @Field(() => MinistryWhereInput, { nullable: true })
  @Type(() => MinistryWhereInput)
  delete?: MinistryWhereInput;

  @Field(() => MinistryWhereUniqueInput, { nullable: true })
  @Type(() => MinistryWhereUniqueInput)
  connect?: Prisma.AtLeast<MinistryWhereUniqueInput, 'id'>;

  @Field(() => MinistryUpdateToOneWithWhereWithoutBehaviouralCompetencyInput, { nullable: true })
  @Type(() => MinistryUpdateToOneWithWhereWithoutBehaviouralCompetencyInput)
  update?: MinistryUpdateToOneWithWhereWithoutBehaviouralCompetencyInput;
}
