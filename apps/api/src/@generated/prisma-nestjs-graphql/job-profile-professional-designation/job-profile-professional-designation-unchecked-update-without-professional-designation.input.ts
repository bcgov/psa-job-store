import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileProfessionalDesignationUncheckedUpdateWithoutProfessional_designationInput {
  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
