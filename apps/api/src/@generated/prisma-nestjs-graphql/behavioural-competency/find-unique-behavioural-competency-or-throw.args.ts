import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyWhereUniqueInput } from './behavioural-competency-where-unique.input';

@ArgsType()
export class FindUniqueBehaviouralCompetencyOrThrowArgs {
  @Field(() => BehaviouralCompetencyWhereUniqueInput, { nullable: false })
  @Type(() => BehaviouralCompetencyWhereUniqueInput)
  where!: Prisma.AtLeast<BehaviouralCompetencyWhereUniqueInput, 'id'>;
}
