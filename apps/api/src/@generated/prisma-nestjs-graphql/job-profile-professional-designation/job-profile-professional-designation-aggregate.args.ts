import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationWhereInput } from './job-profile-professional-designation-where.input';
import { Type } from 'class-transformer';
import { JobProfileProfessionalDesignationOrderByWithRelationAndSearchRelevanceInput } from './job-profile-professional-designation-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileProfessionalDesignationWhereUniqueInput } from './job-profile-professional-designation-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationCountAggregateInput } from './job-profile-professional-designation-count-aggregate.input';
import { JobProfileProfessionalDesignationAvgAggregateInput } from './job-profile-professional-designation-avg-aggregate.input';
import { JobProfileProfessionalDesignationSumAggregateInput } from './job-profile-professional-designation-sum-aggregate.input';
import { JobProfileProfessionalDesignationMinAggregateInput } from './job-profile-professional-designation-min-aggregate.input';
import { JobProfileProfessionalDesignationMaxAggregateInput } from './job-profile-professional-designation-max-aggregate.input';

@ArgsType()
export class JobProfileProfessionalDesignationAggregateArgs {
  @Field(() => JobProfileProfessionalDesignationWhereInput, { nullable: true })
  @Type(() => JobProfileProfessionalDesignationWhereInput)
  where?: JobProfileProfessionalDesignationWhereInput;

  @Field(() => [JobProfileProfessionalDesignationOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileProfessionalDesignationOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileProfessionalDesignationWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<
    JobProfileProfessionalDesignationWhereUniqueInput,
    'job_profile_id_professional_designation_id'
  >;

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
