import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyOrderByWithRelationAndSearchRelevanceInput } from './behavioural-competency-order-by-with-relation-and-search-relevance.input';
import { BehaviouralCompetencyScalarFieldEnum } from './behavioural-competency-scalar-field.enum';
import { BehaviouralCompetencyWhereUniqueInput } from './behavioural-competency-where-unique.input';
import { BehaviouralCompetencyWhereInput } from './behavioural-competency-where.input';

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
