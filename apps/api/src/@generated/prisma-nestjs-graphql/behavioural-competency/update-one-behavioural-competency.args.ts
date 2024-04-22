import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyUpdateInput } from './behavioural-competency-update.input';
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
