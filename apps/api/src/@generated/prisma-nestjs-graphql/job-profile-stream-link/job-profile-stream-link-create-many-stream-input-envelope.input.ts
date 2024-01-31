import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamLinkCreateManyStreamInput } from './job-profile-stream-link-create-many-stream.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileStreamLinkCreateManyStreamInputEnvelope {
  @Field(() => [JobProfileStreamLinkCreateManyStreamInput], { nullable: false })
  @Type(() => JobProfileStreamLinkCreateManyStreamInput)
  data!: Array<JobProfileStreamLinkCreateManyStreamInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
