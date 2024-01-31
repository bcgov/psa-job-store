import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamLinkCreateManyJobProfileInput } from './job-profile-stream-link-create-many-job-profile.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileStreamLinkCreateManyJobProfileInputEnvelope {
  @Field(() => [JobProfileStreamLinkCreateManyJobProfileInput], { nullable: false })
  @Type(() => JobProfileStreamLinkCreateManyJobProfileInput)
  data!: Array<JobProfileStreamLinkCreateManyJobProfileInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
