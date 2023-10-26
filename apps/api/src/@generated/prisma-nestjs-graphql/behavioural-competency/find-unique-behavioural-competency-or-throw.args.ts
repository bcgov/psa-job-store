import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { BehaviouralCompetencyWhereUniqueInput } from './behavioural-competency-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueBehaviouralCompetencyOrThrowArgs {
  @Field(() => BehaviouralCompetencyWhereUniqueInput, { nullable: false })
  @Type(() => BehaviouralCompetencyWhereUniqueInput)
  where!: Prisma.AtLeast<BehaviouralCompetencyWhereUniqueInput, 'id'>;
}
