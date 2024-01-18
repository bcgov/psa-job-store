import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ProfessionalDesignationCountAggregate } from './professional-designation-count-aggregate.output';
import { ProfessionalDesignationAvgAggregate } from './professional-designation-avg-aggregate.output';
import { ProfessionalDesignationSumAggregate } from './professional-designation-sum-aggregate.output';
import { ProfessionalDesignationMinAggregate } from './professional-designation-min-aggregate.output';
import { ProfessionalDesignationMaxAggregate } from './professional-designation-max-aggregate.output';

@ObjectType()
export class ProfessionalDesignationGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  employee_group_id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => ProfessionalDesignationCountAggregate, { nullable: true })
  _count?: ProfessionalDesignationCountAggregate;

  @Field(() => ProfessionalDesignationAvgAggregate, { nullable: true })
  _avg?: ProfessionalDesignationAvgAggregate;

  @Field(() => ProfessionalDesignationSumAggregate, { nullable: true })
  _sum?: ProfessionalDesignationSumAggregate;

  @Field(() => ProfessionalDesignationMinAggregate, { nullable: true })
  _min?: ProfessionalDesignationMinAggregate;

  @Field(() => ProfessionalDesignationMaxAggregate, { nullable: true })
  _max?: ProfessionalDesignationMaxAggregate;
}
