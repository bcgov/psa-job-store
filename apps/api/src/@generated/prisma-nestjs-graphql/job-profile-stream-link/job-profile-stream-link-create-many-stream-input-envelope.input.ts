import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkCreateManyStreamInput } from './job-profile-stream-link-create-many-stream.input';

@InputType()
export class JobProfileStreamLinkCreateManyStreamInputEnvelope {
  @Field(() => [JobProfileStreamLinkCreateManyStreamInput], { nullable: false })
  @Type(() => JobProfileStreamLinkCreateManyStreamInput)
  data!: Array<JobProfileStreamLinkCreateManyStreamInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
