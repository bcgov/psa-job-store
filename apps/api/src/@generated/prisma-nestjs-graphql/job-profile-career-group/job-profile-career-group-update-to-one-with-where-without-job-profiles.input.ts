import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCareerGroupWhereInput } from './job-profile-career-group-where.input';
import { Type } from 'class-transformer';
import { JobProfileCareerGroupUpdateWithoutJob_profilesInput } from './job-profile-career-group-update-without-job-profiles.input';

@InputType()
export class JobProfileCareerGroupUpdateToOneWithWhereWithoutJob_profilesInput {
  @Field(() => JobProfileCareerGroupWhereInput, { nullable: true })
  @Type(() => JobProfileCareerGroupWhereInput)
  where?: JobProfileCareerGroupWhereInput;

  @Field(() => JobProfileCareerGroupUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileCareerGroupUpdateWithoutJob_profilesInput)
  data!: JobProfileCareerGroupUpdateWithoutJob_profilesInput;
}
