import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamUpdateWithoutJob_profilesInput } from './job-profile-stream-update-without-job-profiles.input';
import { Type } from 'class-transformer';
import { JobProfileStreamCreateWithoutJob_profilesInput } from './job-profile-stream-create-without-job-profiles.input';
import { JobProfileStreamWhereInput } from './job-profile-stream-where.input';

@InputType()
export class JobProfileStreamUpsertWithoutJob_profilesInput {
  @Field(() => JobProfileStreamUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileStreamUpdateWithoutJob_profilesInput)
  update!: JobProfileStreamUpdateWithoutJob_profilesInput;

  @Field(() => JobProfileStreamCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileStreamCreateWithoutJob_profilesInput)
  create!: JobProfileStreamCreateWithoutJob_profilesInput;

  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  @Type(() => JobProfileStreamWhereInput)
  where?: JobProfileStreamWhereInput;
}
