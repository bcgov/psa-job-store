import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileStreamUpdateWithoutJobProfilesInput } from './job-profile-stream-update-without-job-profiles.input';
import { JobProfileStreamWhereInput } from './job-profile-stream-where.input';

@InputType()
export class JobProfileStreamUpdateToOneWithWhereWithoutJobProfilesInput {
  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  @Type(() => JobProfileStreamWhereInput)
  where?: JobProfileStreamWhereInput;

  @Field(() => JobProfileStreamUpdateWithoutJobProfilesInput, { nullable: false })
  @Type(() => JobProfileStreamUpdateWithoutJobProfilesInput)
  data!: JobProfileStreamUpdateWithoutJobProfilesInput;
}
