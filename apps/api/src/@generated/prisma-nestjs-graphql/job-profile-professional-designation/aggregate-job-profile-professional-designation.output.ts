import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationCountAggregate } from './job-profile-professional-designation-count-aggregate.output';
import { JobProfileProfessionalDesignationAvgAggregate } from './job-profile-professional-designation-avg-aggregate.output';
import { JobProfileProfessionalDesignationSumAggregate } from './job-profile-professional-designation-sum-aggregate.output';
import { JobProfileProfessionalDesignationMinAggregate } from './job-profile-professional-designation-min-aggregate.output';
import { JobProfileProfessionalDesignationMaxAggregate } from './job-profile-professional-designation-max-aggregate.output';

@ObjectType()
export class AggregateJobProfileProfessionalDesignation {
  @Field(() => JobProfileProfessionalDesignationCountAggregate, { nullable: true })
  _count?: JobProfileProfessionalDesignationCountAggregate;

  @Field(() => JobProfileProfessionalDesignationAvgAggregate, { nullable: true })
  _avg?: JobProfileProfessionalDesignationAvgAggregate;

  @Field(() => JobProfileProfessionalDesignationSumAggregate, { nullable: true })
  _sum?: JobProfileProfessionalDesignationSumAggregate;

  @Field(() => JobProfileProfessionalDesignationMinAggregate, { nullable: true })
  _min?: JobProfileProfessionalDesignationMinAggregate;

  @Field(() => JobProfileProfessionalDesignationMaxAggregate, { nullable: true })
  _max?: JobProfileProfessionalDesignationMaxAggregate;
}
