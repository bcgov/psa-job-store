import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfessionalDesignationCreateNestedOneWithoutJob_profilesInput } from '../professional-designation/professional-designation-create-nested-one-without-job-profiles.input';

@InputType()
export class JobProfileProfessionalDesignationCreateWithoutJob_profileInput {
  @Field(() => ProfessionalDesignationCreateNestedOneWithoutJob_profilesInput, { nullable: false })
  professional_designation!: ProfessionalDesignationCreateNestedOneWithoutJob_profilesInput;
}
