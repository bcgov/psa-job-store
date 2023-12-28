import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCareerGroupUpdateWithoutJob_profilesInput } from './job-profile-career-group-update-without-job-profiles.input';
import { Type } from 'class-transformer';
import { JobProfileCareerGroupCreateWithoutJob_profilesInput } from './job-profile-career-group-create-without-job-profiles.input';
import { JobProfileCareerGroupWhereInput } from './job-profile-career-group-where.input';

@InputType()
export class JobProfileCareerGroupUpsertWithoutJob_profilesInput {
  @Field(() => JobProfileCareerGroupUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileCareerGroupUpdateWithoutJob_profilesInput)
  update!: JobProfileCareerGroupUpdateWithoutJob_profilesInput;

  @Field(() => JobProfileCareerGroupCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileCareerGroupCreateWithoutJob_profilesInput)
  create!: JobProfileCareerGroupCreateWithoutJob_profilesInput;

  @Field(() => JobProfileCareerGroupWhereInput, { nullable: true })
  @Type(() => JobProfileCareerGroupWhereInput)
  where?: JobProfileCareerGroupWhereInput;
}
