import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MinistryCreateWithoutBehaviouralCompetencyInput } from './ministry-create-without-behavioural-competency.input';
import { Type } from 'class-transformer';
import { MinistryCreateOrConnectWithoutBehaviouralCompetencyInput } from './ministry-create-or-connect-without-behavioural-competency.input';
import { Prisma } from '@prisma/client';
import { MinistryWhereUniqueInput } from './ministry-where-unique.input';

@InputType()
export class MinistryCreateNestedOneWithoutBehaviouralCompetencyInput {
  @Field(() => MinistryCreateWithoutBehaviouralCompetencyInput, { nullable: true })
  @Type(() => MinistryCreateWithoutBehaviouralCompetencyInput)
  create?: MinistryCreateWithoutBehaviouralCompetencyInput;

  @Field(() => MinistryCreateOrConnectWithoutBehaviouralCompetencyInput, { nullable: true })
  @Type(() => MinistryCreateOrConnectWithoutBehaviouralCompetencyInput)
  connectOrCreate?: MinistryCreateOrConnectWithoutBehaviouralCompetencyInput;

  @Field(() => MinistryWhereUniqueInput, { nullable: true })
  @Type(() => MinistryWhereUniqueInput)
  connect?: Prisma.AtLeast<MinistryWhereUniqueInput, 'id'>;
}
