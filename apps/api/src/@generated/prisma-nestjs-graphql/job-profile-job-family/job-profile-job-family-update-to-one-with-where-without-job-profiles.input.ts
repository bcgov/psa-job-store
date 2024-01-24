import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyWhereInput } from './job-profile-job-family-where.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyUpdateWithoutJobProfilesInput } from './job-profile-job-family-update-without-job-profiles.input';

@InputType()
export class JobProfileJobFamilyUpdateToOneWithWhereWithoutJobProfilesInput {
  @Field(() => JobProfileJobFamilyWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereInput)
  where?: JobProfileJobFamilyWhereInput;

  @Field(() => JobProfileJobFamilyUpdateWithoutJobProfilesInput, { nullable: false })
  @Type(() => JobProfileJobFamilyUpdateWithoutJobProfilesInput)
  data!: JobProfileJobFamilyUpdateWithoutJobProfilesInput;
}
