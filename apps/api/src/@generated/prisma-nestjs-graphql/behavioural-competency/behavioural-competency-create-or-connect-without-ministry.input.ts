import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { BehaviouralCompetencyWhereUniqueInput } from './behavioural-competency-where-unique.input';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyCreateWithoutMinistryInput } from './behavioural-competency-create-without-ministry.input';

@InputType()
export class BehaviouralCompetencyCreateOrConnectWithoutMinistryInput {
  @Field(() => BehaviouralCompetencyWhereUniqueInput, { nullable: false })
  @Type(() => BehaviouralCompetencyWhereUniqueInput)
  where!: Prisma.AtLeast<BehaviouralCompetencyWhereUniqueInput, 'id'>;

  @Field(() => BehaviouralCompetencyCreateWithoutMinistryInput, { nullable: false })
  @Type(() => BehaviouralCompetencyCreateWithoutMinistryInput)
  create!: BehaviouralCompetencyCreateWithoutMinistryInput;
}
