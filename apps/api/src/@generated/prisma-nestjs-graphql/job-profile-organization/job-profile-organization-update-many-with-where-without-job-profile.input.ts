import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileOrganizationScalarWhereInput } from './job-profile-organization-scalar-where.input';
import { Type } from 'class-transformer';
import { JobProfileOrganizationUncheckedUpdateManyWithoutJob_profileInput } from './job-profile-organization-unchecked-update-many-without-job-profile.input';

@InputType()
export class JobProfileOrganizationUpdateManyWithWhereWithoutJob_profileInput {
  @Field(() => JobProfileOrganizationScalarWhereInput, { nullable: false })
  @Type(() => JobProfileOrganizationScalarWhereInput)
  where!: JobProfileOrganizationScalarWhereInput;

  @Field(() => JobProfileOrganizationUncheckedUpdateManyWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileOrganizationUncheckedUpdateManyWithoutJob_profileInput)
  data!: JobProfileOrganizationUncheckedUpdateManyWithoutJob_profileInput;
}
