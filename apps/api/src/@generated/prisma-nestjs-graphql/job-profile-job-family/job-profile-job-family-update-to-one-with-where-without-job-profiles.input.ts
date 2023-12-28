import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyWhereInput } from './job-profile-job-family-where.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyUpdateWithoutJob_profilesInput } from './job-profile-job-family-update-without-job-profiles.input';

@InputType()
export class JobProfileJobFamilyUpdateToOneWithWhereWithoutJob_profilesInput {
  @Field(() => JobProfileJobFamilyWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereInput)
  where?: JobProfileJobFamilyWhereInput;

  @Field(() => JobProfileJobFamilyUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileJobFamilyUpdateWithoutJob_profilesInput)
  data!: JobProfileJobFamilyUpdateWithoutJob_profilesInput;
}
