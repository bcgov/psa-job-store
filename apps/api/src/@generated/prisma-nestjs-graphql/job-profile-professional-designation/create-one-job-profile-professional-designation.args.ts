import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationCreateInput } from './job-profile-professional-designation-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobProfileProfessionalDesignationArgs {
  @Field(() => JobProfileProfessionalDesignationCreateInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationCreateInput)
  data!: JobProfileProfessionalDesignationCreateInput;
}
