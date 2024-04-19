import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkCreateManyInput } from './job-profile-stream-link-create-many.input';

@ArgsType()
export class CreateManyJobProfileStreamLinkArgs {
  @Field(() => [JobProfileStreamLinkCreateManyInput], { nullable: false })
  @Type(() => JobProfileStreamLinkCreateManyInput)
  data!: Array<JobProfileStreamLinkCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
