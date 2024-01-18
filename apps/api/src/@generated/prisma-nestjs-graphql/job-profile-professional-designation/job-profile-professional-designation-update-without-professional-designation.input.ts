import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateOneRequiredWithoutDesignationsNestedInput } from '../job-profile/job-profile-update-one-required-without-designations-nested.input';

@InputType()
export class JobProfileProfessionalDesignationUpdateWithoutProfessional_designationInput {
  @Field(() => JobProfileUpdateOneRequiredWithoutDesignationsNestedInput, { nullable: true })
  job_profile?: JobProfileUpdateOneRequiredWithoutDesignationsNestedInput;
}
