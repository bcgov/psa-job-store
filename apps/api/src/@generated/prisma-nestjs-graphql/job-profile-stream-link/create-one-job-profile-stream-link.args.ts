import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileStreamLinkCreateInput } from './job-profile-stream-link-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobProfileStreamLinkArgs {
  @Field(() => JobProfileStreamLinkCreateInput, { nullable: false })
  @Type(() => JobProfileStreamLinkCreateInput)
  data!: JobProfileStreamLinkCreateInput;
}
