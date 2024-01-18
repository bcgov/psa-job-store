import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationCreateManyProfessional_designationInput } from './job-profile-professional-designation-create-many-professional-designation.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileProfessionalDesignationCreateManyProfessional_designationInputEnvelope {
  @Field(() => [JobProfileProfessionalDesignationCreateManyProfessional_designationInput], { nullable: false })
  @Type(() => JobProfileProfessionalDesignationCreateManyProfessional_designationInput)
  data!: Array<JobProfileProfessionalDesignationCreateManyProfessional_designationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
