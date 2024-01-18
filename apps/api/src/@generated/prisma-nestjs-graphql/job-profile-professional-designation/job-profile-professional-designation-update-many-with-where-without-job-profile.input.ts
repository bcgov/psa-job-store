import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationScalarWhereInput } from './job-profile-professional-designation-scalar-where.input';
import { Type } from 'class-transformer';
import { JobProfileProfessionalDesignationUncheckedUpdateManyWithoutJob_profileInput } from './job-profile-professional-designation-unchecked-update-many-without-job-profile.input';

@InputType()
export class JobProfileProfessionalDesignationUpdateManyWithWhereWithoutJob_profileInput {
  @Field(() => JobProfileProfessionalDesignationScalarWhereInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationScalarWhereInput)
  where!: JobProfileProfessionalDesignationScalarWhereInput;

  @Field(() => JobProfileProfessionalDesignationUncheckedUpdateManyWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationUncheckedUpdateManyWithoutJob_profileInput)
  data!: JobProfileProfessionalDesignationUncheckedUpdateManyWithoutJob_profileInput;
}
