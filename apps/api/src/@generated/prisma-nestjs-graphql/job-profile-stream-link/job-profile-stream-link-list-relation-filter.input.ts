import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamLinkWhereInput } from './job-profile-stream-link-where.input';

@InputType()
export class JobProfileStreamLinkListRelationFilter {
  @Field(() => JobProfileStreamLinkWhereInput, { nullable: true })
  every?: JobProfileStreamLinkWhereInput;

  @Field(() => JobProfileStreamLinkWhereInput, { nullable: true })
  some?: JobProfileStreamLinkWhereInput;

  @Field(() => JobProfileStreamLinkWhereInput, { nullable: true })
  none?: JobProfileStreamLinkWhereInput;
}
