import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkScalarWhereInput } from './job-profile-job-family-link-scalar-where.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobFamilyInput } from './job-profile-job-family-link-unchecked-update-many-without-job-family.input';

@InputType()
export class JobProfileJobFamilyLinkUpdateManyWithWhereWithoutJobFamilyInput {
  @Field(() => JobProfileJobFamilyLinkScalarWhereInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkScalarWhereInput)
  where!: JobProfileJobFamilyLinkScalarWhereInput;

  @Field(() => JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobFamilyInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobFamilyInput)
  data!: JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobFamilyInput;
}
