import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamWhereInput } from './job-profile-stream-where.input';
import { Type } from 'class-transformer';
import { JobProfileStreamUpdateWithoutJob_profilesInput } from './job-profile-stream-update-without-job-profiles.input';

@InputType()
export class JobProfileStreamUpdateToOneWithWhereWithoutJob_profilesInput {
  @Field(() => JobProfileStreamWhereInput, { nullable: true })
  @Type(() => JobProfileStreamWhereInput)
  where?: JobProfileStreamWhereInput;

  @Field(() => JobProfileStreamUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileStreamUpdateWithoutJob_profilesInput)
  data!: JobProfileStreamUpdateWithoutJob_profilesInput;
}
