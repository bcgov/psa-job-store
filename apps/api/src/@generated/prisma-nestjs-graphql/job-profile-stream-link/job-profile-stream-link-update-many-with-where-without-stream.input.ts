import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileStreamLinkScalarWhereInput } from './job-profile-stream-link-scalar-where.input';
import { JobProfileStreamLinkUncheckedUpdateManyWithoutStreamInput } from './job-profile-stream-link-unchecked-update-many-without-stream.input';

@InputType()
export class JobProfileStreamLinkUpdateManyWithWhereWithoutStreamInput {
  @Field(() => JobProfileStreamLinkScalarWhereInput, { nullable: false })
  @Type(() => JobProfileStreamLinkScalarWhereInput)
  where!: JobProfileStreamLinkScalarWhereInput;

  @Field(() => JobProfileStreamLinkUncheckedUpdateManyWithoutStreamInput, { nullable: false })
  @Type(() => JobProfileStreamLinkUncheckedUpdateManyWithoutStreamInput)
  data!: JobProfileStreamLinkUncheckedUpdateManyWithoutStreamInput;
}
