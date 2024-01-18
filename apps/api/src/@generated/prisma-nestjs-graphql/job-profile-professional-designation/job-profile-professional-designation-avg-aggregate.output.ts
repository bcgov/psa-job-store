import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class JobProfileProfessionalDesignationAvgAggregate {
  @Field(() => Float, { nullable: true })
  job_profile_id?: number;

  @Field(() => Float, { nullable: true })
  professional_designation_id?: number;
}
