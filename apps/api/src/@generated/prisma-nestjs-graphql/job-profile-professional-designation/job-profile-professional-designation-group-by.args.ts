import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationWhereInput } from './job-profile-professional-designation-where.input';
import { Type } from 'class-transformer';
import { JobProfileProfessionalDesignationOrderByWithAggregationInput } from './job-profile-professional-designation-order-by-with-aggregation.input';
import { JobProfileProfessionalDesignationScalarFieldEnum } from './job-profile-professional-designation-scalar-field.enum';
import { JobProfileProfessionalDesignationScalarWhereWithAggregatesInput } from './job-profile-professional-designation-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationCountAggregateInput } from './job-profile-professional-designation-count-aggregate.input';
import { JobProfileProfessionalDesignationAvgAggregateInput } from './job-profile-professional-designation-avg-aggregate.input';
import { JobProfileProfessionalDesignationSumAggregateInput } from './job-profile-professional-designation-sum-aggregate.input';
import { JobProfileProfessionalDesignationMinAggregateInput } from './job-profile-professional-designation-min-aggregate.input';
import { JobProfileProfessionalDesignationMaxAggregateInput } from './job-profile-professional-designation-max-aggregate.input';

@ArgsType()
export class JobProfileProfessionalDesignationGroupByArgs {
  @Field(() => JobProfileProfessionalDesignationWhereInput, { nullable: true })
  @Type(() => JobProfileProfessionalDesignationWhereInput)
  where?: JobProfileProfessionalDesignationWhereInput;

  @Field(() => [JobProfileProfessionalDesignationOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<JobProfileProfessionalDesignationOrderByWithAggregationInput>;

  @Field(() => [JobProfileProfessionalDesignationScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof JobProfileProfessionalDesignationScalarFieldEnum>;

  @Field(() => JobProfileProfessionalDesignationScalarWhereWithAggregatesInput, { nullable: true })
  having?: JobProfileProfessionalDesignationScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileProfessionalDesignationCountAggregateInput, { nullable: true })
  _count?: JobProfileProfessionalDesignationCountAggregateInput;

  @Field(() => JobProfileProfessionalDesignationAvgAggregateInput, { nullable: true })
  _avg?: JobProfileProfessionalDesignationAvgAggregateInput;

  @Field(() => JobProfileProfessionalDesignationSumAggregateInput, { nullable: true })
  _sum?: JobProfileProfessionalDesignationSumAggregateInput;

  @Field(() => JobProfileProfessionalDesignationMinAggregateInput, { nullable: true })
  _min?: JobProfileProfessionalDesignationMinAggregateInput;

  @Field(() => JobProfileProfessionalDesignationMaxAggregateInput, { nullable: true })
  _max?: JobProfileProfessionalDesignationMaxAggregateInput;
}
