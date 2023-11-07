import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { BehaviouralCompetencyUpdateInput } from './behavioural-competency-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { BehaviouralCompetencyWhereUniqueInput } from './behavioural-competency-where-unique.input';

@ArgsType()
export class UpdateOneBehaviouralCompetencyArgs {
  @Field(() => BehaviouralCompetencyUpdateInput, { nullable: false })
  @Type(() => BehaviouralCompetencyUpdateInput)
  data!: BehaviouralCompetencyUpdateInput;

  @Field(() => BehaviouralCompetencyWhereUniqueInput, { nullable: false })
  @Type(() => BehaviouralCompetencyWhereUniqueInput)
  where!: Prisma.AtLeast<BehaviouralCompetencyWhereUniqueInput, 'id'>;
}
