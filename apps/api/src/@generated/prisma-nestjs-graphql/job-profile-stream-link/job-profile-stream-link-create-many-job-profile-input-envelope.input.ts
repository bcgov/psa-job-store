import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkCreateManyJobProfileInput } from './job-profile-stream-link-create-many-job-profile.input';

@InputType()
export class JobProfileStreamLinkCreateManyJobProfileInputEnvelope {
  @Field(() => [JobProfileStreamLinkCreateManyJobProfileInput], { nullable: false })
  @Type(() => JobProfileStreamLinkCreateManyJobProfileInput)
  data!: Array<JobProfileStreamLinkCreateManyJobProfileInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
