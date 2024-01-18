import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedOneWithoutDesignationsInput } from '../job-profile/job-profile-create-nested-one-without-designations.input';

@InputType()
export class JobProfileProfessionalDesignationCreateWithoutProfessional_designationInput {
  @Field(() => JobProfileCreateNestedOneWithoutDesignationsInput, { nullable: false })
  job_profile!: JobProfileCreateNestedOneWithoutDesignationsInput;
}
