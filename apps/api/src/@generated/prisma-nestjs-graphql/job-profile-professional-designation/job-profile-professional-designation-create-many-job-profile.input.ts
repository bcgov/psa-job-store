import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileProfessionalDesignationCreateManyJob_profileInput {
  @Field(() => Int, { nullable: false })
  professional_designation_id!: number;
}
