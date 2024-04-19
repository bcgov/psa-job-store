import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyUpdateWithoutJobProfilesInput } from './job-profile-job-family-update-without-job-profiles.input';
import { JobProfileJobFamilyWhereInput } from './job-profile-job-family-where.input';

@InputType()
export class JobProfileJobFamilyUpdateToOneWithWhereWithoutJobProfilesInput {
  @Field(() => JobProfileJobFamilyWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereInput)
  where?: JobProfileJobFamilyWhereInput;

  @Field(() => JobProfileJobFamilyUpdateWithoutJobProfilesInput, { nullable: false })
  @Type(() => JobProfileJobFamilyUpdateWithoutJobProfilesInput)
  data!: JobProfileJobFamilyUpdateWithoutJobProfilesInput;
}
