import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyUpdateWithoutJobProfilesInput } from './job-profile-job-family-update-without-job-profiles.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyCreateWithoutJobProfilesInput } from './job-profile-job-family-create-without-job-profiles.input';
import { JobProfileJobFamilyWhereInput } from './job-profile-job-family-where.input';

@InputType()
export class JobProfileJobFamilyUpsertWithoutJobProfilesInput {
  @Field(() => JobProfileJobFamilyUpdateWithoutJobProfilesInput, { nullable: false })
  @Type(() => JobProfileJobFamilyUpdateWithoutJobProfilesInput)
  update!: JobProfileJobFamilyUpdateWithoutJobProfilesInput;

  @Field(() => JobProfileJobFamilyCreateWithoutJobProfilesInput, { nullable: false })
  @Type(() => JobProfileJobFamilyCreateWithoutJobProfilesInput)
  create!: JobProfileJobFamilyCreateWithoutJobProfilesInput;

  @Field(() => JobProfileJobFamilyWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereInput)
  where?: JobProfileJobFamilyWhereInput;
}
