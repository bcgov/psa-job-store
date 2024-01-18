import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileProfessionalDesignationJob_profile_idProfessional_designation_idCompoundUniqueInput {
  @Field(() => Int, { nullable: false })
  job_profile_id!: number;

  @Field(() => Int, { nullable: false })
  professional_designation_id!: number;
}
