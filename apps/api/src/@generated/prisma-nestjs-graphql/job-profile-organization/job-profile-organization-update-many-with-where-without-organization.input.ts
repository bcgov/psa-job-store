import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileOrganizationScalarWhereInput } from './job-profile-organization-scalar-where.input';
import { Type } from 'class-transformer';
import { JobProfileOrganizationUncheckedUpdateManyWithoutOrganizationInput } from './job-profile-organization-unchecked-update-many-without-organization.input';

@InputType()
export class JobProfileOrganizationUpdateManyWithWhereWithoutOrganizationInput {
  @Field(() => JobProfileOrganizationScalarWhereInput, { nullable: false })
  @Type(() => JobProfileOrganizationScalarWhereInput)
  where!: JobProfileOrganizationScalarWhereInput;

  @Field(() => JobProfileOrganizationUncheckedUpdateManyWithoutOrganizationInput, { nullable: false })
  @Type(() => JobProfileOrganizationUncheckedUpdateManyWithoutOrganizationInput)
  data!: JobProfileOrganizationUncheckedUpdateManyWithoutOrganizationInput;
}
