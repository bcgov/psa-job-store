import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkScalarWhereInput } from './job-profile-job-family-link-scalar-where.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobProfileInput } from './job-profile-job-family-link-unchecked-update-many-without-job-profile.input';

@InputType()
export class JobProfileJobFamilyLinkUpdateManyWithWhereWithoutJobProfileInput {
  @Field(() => JobProfileJobFamilyLinkScalarWhereInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkScalarWhereInput)
  where!: JobProfileJobFamilyLinkScalarWhereInput;

  @Field(() => JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobProfileInput, { nullable: false })
  @Type(() => JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobProfileInput)
  data!: JobProfileJobFamilyLinkUncheckedUpdateManyWithoutJobProfileInput;
}
