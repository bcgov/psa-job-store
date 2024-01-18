import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ProfessionalDesignationCountAggregate } from './professional-designation-count-aggregate.output';
import { ProfessionalDesignationAvgAggregate } from './professional-designation-avg-aggregate.output';
import { ProfessionalDesignationSumAggregate } from './professional-designation-sum-aggregate.output';
import { ProfessionalDesignationMinAggregate } from './professional-designation-min-aggregate.output';
import { ProfessionalDesignationMaxAggregate } from './professional-designation-max-aggregate.output';

@ObjectType()
export class AggregateProfessionalDesignation {
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
