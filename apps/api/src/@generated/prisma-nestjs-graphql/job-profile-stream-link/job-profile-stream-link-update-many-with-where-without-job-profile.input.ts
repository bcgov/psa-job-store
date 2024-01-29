import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamLinkScalarWhereInput } from './job-profile-stream-link-scalar-where.input';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkUncheckedUpdateManyWithoutJobProfileInput } from './job-profile-stream-link-unchecked-update-many-without-job-profile.input';

@InputType()
export class JobProfileStreamLinkUpdateManyWithWhereWithoutJobProfileInput {
  @Field(() => JobProfileStreamLinkScalarWhereInput, { nullable: false })
  @Type(() => JobProfileStreamLinkScalarWhereInput)
  where!: JobProfileStreamLinkScalarWhereInput;

  @Field(() => JobProfileStreamLinkUncheckedUpdateManyWithoutJobProfileInput, { nullable: false })
  @Type(() => JobProfileStreamLinkUncheckedUpdateManyWithoutJobProfileInput)
  data!: JobProfileStreamLinkUncheckedUpdateManyWithoutJobProfileInput;
}
