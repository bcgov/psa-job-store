import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyUpdateWithoutJob_profilesInput } from './job-profile-job-family-update-without-job-profiles.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyCreateWithoutJob_profilesInput } from './job-profile-job-family-create-without-job-profiles.input';
import { JobProfileJobFamilyWhereInput } from './job-profile-job-family-where.input';

@InputType()
export class JobProfileJobFamilyUpsertWithoutJob_profilesInput {
  @Field(() => JobProfileJobFamilyUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileJobFamilyUpdateWithoutJob_profilesInput)
  update!: JobProfileJobFamilyUpdateWithoutJob_profilesInput;

  @Field(() => JobProfileJobFamilyCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileJobFamilyCreateWithoutJob_profilesInput)
  create!: JobProfileJobFamilyCreateWithoutJob_profilesInput;

  @Field(() => JobProfileJobFamilyWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereInput)
  where?: JobProfileJobFamilyWhereInput;
}
