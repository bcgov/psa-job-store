import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedOneWithoutDesignationsInput } from '../job-profile/job-profile-create-nested-one-without-designations.input';
import { ProfessionalDesignationCreateNestedOneWithoutJob_profilesInput } from '../professional-designation/professional-designation-create-nested-one-without-job-profiles.input';

@InputType()
export class JobProfileProfessionalDesignationCreateInput {
  @Field(() => JobProfileCreateNestedOneWithoutDesignationsInput, { nullable: false })
  job_profile!: JobProfileCreateNestedOneWithoutDesignationsInput;

  @Field(() => ProfessionalDesignationCreateNestedOneWithoutJob_profilesInput, { nullable: false })
  professional_designation!: ProfessionalDesignationCreateNestedOneWithoutJob_profilesInput;
}
