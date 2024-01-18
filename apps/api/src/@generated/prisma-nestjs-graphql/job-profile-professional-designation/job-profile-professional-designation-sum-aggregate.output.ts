import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class JobProfileProfessionalDesignationSumAggregate {
  @Field(() => Int, { nullable: true })
  job_profile_id?: number;

  @Field(() => Int, { nullable: true })
  professional_designation_id?: number;
}
