import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { MinistryWhereUniqueInput } from './ministry-where-unique.input';
import { Type } from 'class-transformer';
import { MinistryCreateWithoutBehaviouralCompetencyInput } from './ministry-create-without-behavioural-competency.input';

@InputType()
export class MinistryCreateOrConnectWithoutBehaviouralCompetencyInput {
  @Field(() => MinistryWhereUniqueInput, { nullable: false })
  @Type(() => MinistryWhereUniqueInput)
  where!: Prisma.AtLeast<MinistryWhereUniqueInput, 'id'>;

  @Field(() => MinistryCreateWithoutBehaviouralCompetencyInput, { nullable: false })
  @Type(() => MinistryCreateWithoutBehaviouralCompetencyInput)
  create!: MinistryCreateWithoutBehaviouralCompetencyInput;
}
