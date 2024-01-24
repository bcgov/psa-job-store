import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileStreamLinkCreateManyInput } from './job-profile-stream-link-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobProfileStreamLinkArgs {
  @Field(() => [JobProfileStreamLinkCreateManyInput], { nullable: false })
  @Type(() => JobProfileStreamLinkCreateManyInput)
  data!: Array<JobProfileStreamLinkCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
