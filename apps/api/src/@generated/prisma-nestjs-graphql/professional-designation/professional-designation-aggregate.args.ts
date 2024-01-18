import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProfessionalDesignationWhereInput } from './professional-designation-where.input';
import { Type } from 'class-transformer';
import { ProfessionalDesignationOrderByWithRelationAndSearchRelevanceInput } from './professional-designation-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { ProfessionalDesignationWhereUniqueInput } from './professional-designation-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ProfessionalDesignationCountAggregateInput } from './professional-designation-count-aggregate.input';
import { ProfessionalDesignationAvgAggregateInput } from './professional-designation-avg-aggregate.input';
import { ProfessionalDesignationSumAggregateInput } from './professional-designation-sum-aggregate.input';
import { ProfessionalDesignationMinAggregateInput } from './professional-designation-min-aggregate.input';
import { ProfessionalDesignationMaxAggregateInput } from './professional-designation-max-aggregate.input';

@ArgsType()
export class ProfessionalDesignationAggregateArgs {
  @Field(() => ProfessionalDesignationWhereInput, { nullable: true })
  @Type(() => ProfessionalDesignationWhereInput)
  where?: ProfessionalDesignationWhereInput;

  @Field(() => [ProfessionalDesignationOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<ProfessionalDesignationOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => ProfessionalDesignationWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ProfessionalDesignationWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => ProfessionalDesignationCountAggregateInput, { nullable: true })
  _count?: ProfessionalDesignationCountAggregateInput;

  @Field(() => ProfessionalDesignationAvgAggregateInput, { nullable: true })
  _avg?: ProfessionalDesignationAvgAggregateInput;

  @Field(() => ProfessionalDesignationSumAggregateInput, { nullable: true })
  _sum?: ProfessionalDesignationSumAggregateInput;

  @Field(() => ProfessionalDesignationMinAggregateInput, { nullable: true })
  _min?: ProfessionalDesignationMinAggregateInput;

  @Field(() => ProfessionalDesignationMaxAggregateInput, { nullable: true })
  _max?: ProfessionalDesignationMaxAggregateInput;
}
