import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';

@InputType()
export class JobProfileProfessionalDesignationScalarWhereInput {
  @Field(() => [JobProfileProfessionalDesignationScalarWhereInput], { nullable: true })
  AND?: Array<JobProfileProfessionalDesignationScalarWhereInput>;

  @Field(() => [JobProfileProfessionalDesignationScalarWhereInput], { nullable: true })
  OR?: Array<JobProfileProfessionalDesignationScalarWhereInput>;

  @Field(() => [JobProfileProfessionalDesignationScalarWhereInput], { nullable: true })
  NOT?: Array<JobProfileProfessionalDesignationScalarWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  job_profile_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  professional_designation_id?: IntFilter;
}
