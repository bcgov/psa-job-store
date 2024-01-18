import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileProfessionalDesignationWhereInput } from './job-profile-professional-designation-where.input';

@InputType()
export class JobProfileProfessionalDesignationListRelationFilter {
  @Field(() => JobProfileProfessionalDesignationWhereInput, { nullable: true })
  every?: JobProfileProfessionalDesignationWhereInput;

  @Field(() => JobProfileProfessionalDesignationWhereInput, { nullable: true })
  some?: JobProfileProfessionalDesignationWhereInput;

  @Field(() => JobProfileProfessionalDesignationWhereInput, { nullable: true })
  none?: JobProfileProfessionalDesignationWhereInput;
}
