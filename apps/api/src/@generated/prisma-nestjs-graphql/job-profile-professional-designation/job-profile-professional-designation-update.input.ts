import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateOneRequiredWithoutDesignationsNestedInput } from '../job-profile/job-profile-update-one-required-without-designations-nested.input';
import { ProfessionalDesignationUpdateOneRequiredWithoutJob_profilesNestedInput } from '../professional-designation/professional-designation-update-one-required-without-job-profiles-nested.input';

@InputType()
export class JobProfileProfessionalDesignationUpdateInput {
  @Field(() => JobProfileUpdateOneRequiredWithoutDesignationsNestedInput, { nullable: true })
  job_profile?: JobProfileUpdateOneRequiredWithoutDesignationsNestedInput;

  @Field(() => ProfessionalDesignationUpdateOneRequiredWithoutJob_profilesNestedInput, { nullable: true })
  professional_designation?: ProfessionalDesignationUpdateOneRequiredWithoutJob_profilesNestedInput;
}
