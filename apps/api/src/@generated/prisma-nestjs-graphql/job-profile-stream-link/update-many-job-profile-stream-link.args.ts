import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileStreamLinkUncheckedUpdateManyInput } from './job-profile-stream-link-unchecked-update-many.input';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkWhereInput } from './job-profile-stream-link-where.input';

@ArgsType()
export class UpdateManyJobProfileStreamLinkArgs {
  @Field(() => JobProfileStreamLinkUncheckedUpdateManyInput, { nullable: false })
  @Type(() => JobProfileStreamLinkUncheckedUpdateManyInput)
  data!: JobProfileStreamLinkUncheckedUpdateManyInput;

  @Field(() => JobProfileStreamLinkWhereInput, { nullable: true })
  @Type(() => JobProfileStreamLinkWhereInput)
  where?: JobProfileStreamLinkWhereInput;
}
