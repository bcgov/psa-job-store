import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationUncheckedUpdateManyInput } from './job-profile-professional-designation-unchecked-update-many.input';
import { Type } from 'class-transformer';
import { JobProfileProfessionalDesignationWhereInput } from './job-profile-professional-designation-where.input';

@ArgsType()
export class UpdateManyJobProfileProfessionalDesignationArgs {
  @Field(() => JobProfileProfessionalDesignationUncheckedUpdateManyInput, { nullable: false })
  @Type(() => JobProfileProfessionalDesignationUncheckedUpdateManyInput)
  data!: JobProfileProfessionalDesignationUncheckedUpdateManyInput;

  @Field(() => JobProfileProfessionalDesignationWhereInput, { nullable: true })
  @Type(() => JobProfileProfessionalDesignationWhereInput)
  where?: JobProfileProfessionalDesignationWhereInput;
}
