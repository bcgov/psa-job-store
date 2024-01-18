import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationWhereInput } from './job-profile-professional-designation-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyJobProfileProfessionalDesignationArgs {
  @Field(() => JobProfileProfessionalDesignationWhereInput, { nullable: true })
  @Type(() => JobProfileProfessionalDesignationWhereInput)
  where?: JobProfileProfessionalDesignationWhereInput;
}
