import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfessionalDesignationUpdateOneRequiredWithoutJob_profilesNestedInput } from '../professional-designation/professional-designation-update-one-required-without-job-profiles-nested.input';

@InputType()
export class JobProfileProfessionalDesignationUpdateWithoutJob_profileInput {
  @Field(() => ProfessionalDesignationUpdateOneRequiredWithoutJob_profilesNestedInput, { nullable: true })
  professional_designation?: ProfessionalDesignationUpdateOneRequiredWithoutJob_profilesNestedInput;
}
