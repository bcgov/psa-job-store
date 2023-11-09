import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { BehaviouralCompetencyWhereUniqueInput } from './behavioural-competency-where-unique.input';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyCreateInput } from './behavioural-competency-create.input';
import { BehaviouralCompetencyUpdateInput } from './behavioural-competency-update.input';

@ArgsType()
export class UpsertOneBehaviouralCompetencyArgs {
  @Field(() => BehaviouralCompetencyWhereUniqueInput, { nullable: false })
  @Type(() => BehaviouralCompetencyWhereUniqueInput)
  where!: Prisma.AtLeast<BehaviouralCompetencyWhereUniqueInput, 'id'>;

  @Field(() => BehaviouralCompetencyCreateInput, { nullable: false })
  @Type(() => BehaviouralCompetencyCreateInput)
  create!: BehaviouralCompetencyCreateInput;

  @Field(() => BehaviouralCompetencyUpdateInput, { nullable: false })
  @Type(() => BehaviouralCompetencyUpdateInput)
  update!: BehaviouralCompetencyUpdateInput;
}
