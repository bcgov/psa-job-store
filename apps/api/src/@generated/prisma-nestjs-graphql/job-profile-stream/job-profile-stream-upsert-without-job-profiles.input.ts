import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileStreamCreateWithoutJobProfilesInput } from './job-profile-stream-create-without-job-profiles.input';
import { JobProfileStreamUpdateWithoutJobProfilesInput } from './job-profile-stream-update-without-job-profiles.input';
import { JobProfileStreamWhereInput } from './job-profile-stream-where.input';

@InputType()
export class JobProfileStreamUpsertWithoutJobProfilesInput {
  @Field(() => JobProfileStreamUpdateWithoutJobProfilesInput, { nullable: false })
  @Type(() => JobProfileStreamUpdateWithoutJobProfilesInput)
  update!: JobProfileStreamUpdateWithoutJobProfilesInput;

  @Field(() => JobProfileStreamCreateWithoutJobProfilesInput, { nullable: false })
  @Type(() => JobProfileStreamCreateWithoutJobProfilesInput)
  create!: JobProfileStreamCreateWithoutJobProfilesInput;

  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  @Type(() => JobProfileStreamWhereInput)
  where?: JobProfileStreamWhereInput;
}
