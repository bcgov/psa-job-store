import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ProfessionalDesignationWhereInput } from './professional-designation-where.input';
import { Type } from 'class-transformer';
import { ProfessionalDesignationOrderByWithAggregationInput } from './professional-designation-order-by-with-aggregation.input';
import { ProfessionalDesignationScalarFieldEnum } from './professional-designation-scalar-field.enum';
import { ProfessionalDesignationScalarWhereWithAggregatesInput } from './professional-designation-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { ProfessionalDesignationCountAggregateInput } from './professional-designation-count-aggregate.input';
import { ProfessionalDesignationAvgAggregateInput } from './professional-designation-avg-aggregate.input';
import { ProfessionalDesignationSumAggregateInput } from './professional-designation-sum-aggregate.input';
import { ProfessionalDesignationMinAggregateInput } from './professional-designation-min-aggregate.input';
import { ProfessionalDesignationMaxAggregateInput } from './professional-designation-max-aggregate.input';

@ArgsType()
export class ProfessionalDesignationGroupByArgs {
  @Field(() => ProfessionalDesignationWhereInput, { nullable: true })
  @Type(() => ProfessionalDesignationWhereInput)
  where?: ProfessionalDesignationWhereInput;

  @Field(() => [ProfessionalDesignationOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<ProfessionalDesignationOrderByWithAggregationInput>;

  @Field(() => [ProfessionalDesignationScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof ProfessionalDesignationScalarFieldEnum>;

  @Field(() => ProfessionalDesignationScalarWhereWithAggregatesInput, { nullable: true })
  having?: ProfessionalDesignationScalarWhereWithAggregatesInput;

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
