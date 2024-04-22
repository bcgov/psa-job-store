import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkCreateInput } from './job-profile-stream-link-create.input';

@ArgsType()
export class CreateOneJobProfileStreamLinkArgs {
  @Field(() => JobProfileStreamLinkCreateInput, { nullable: false })
  @Type(() => JobProfileStreamLinkCreateInput)
  data!: JobProfileStreamLinkCreateInput;
}
