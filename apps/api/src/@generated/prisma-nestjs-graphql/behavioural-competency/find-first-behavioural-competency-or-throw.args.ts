import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { BehaviouralCompetencyWhereInput } from './behavioural-competency-where.input';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput } from './behavioural-competency-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { BehaviouralCompetencyWhereUniqueInput } from './behavioural-competency-where-unique.input';
import { Int } from '@nestjs/graphql';
import { BehaviouralCompetencyScalarFieldEnum } from './behavioural-competency-scalar-field.enum';

@ArgsType()
export class FindFirstBehaviouralCompetencyOrThrowArgs {
  @Field(() => BehaviouralCompetencyWhereInput, { nullable: true })
  @Type(() => BehaviouralCompetencyWhereInput)
  where?: BehaviouralCompetencyWhereInput;

  @Field(() => [BehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<BehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => BehaviouralCompetencyWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<BehaviouralCompetencyWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [BehaviouralCompetencyScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof BehaviouralCompetencyScalarFieldEnum>;
}
