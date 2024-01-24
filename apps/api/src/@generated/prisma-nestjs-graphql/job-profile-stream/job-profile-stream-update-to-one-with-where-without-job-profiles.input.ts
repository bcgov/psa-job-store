import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamWhereInput } from './job-profile-stream-where.input';
import { Type } from 'class-transformer';
import { JobProfileStreamUpdateWithoutJobProfilesInput } from './job-profile-stream-update-without-job-profiles.input';

@InputType()
export class JobProfileStreamUpdateToOneWithWhereWithoutJobProfilesInput {
  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  @Type(() => JobProfileStreamWhereInput)
  where?: JobProfileStreamWhereInput;

  @Field(() => JobProfileStreamUpdateWithoutJobProfilesInput, { nullable: false })
  @Type(() => JobProfileStreamUpdateWithoutJobProfilesInput)
  data!: JobProfileStreamUpdateWithoutJobProfilesInput;
}
