import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutPosition_requestInput } from './job-profile-update-without-position-request.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpdateToOneWithWhereWithoutPosition_requestInput {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => JobProfileUpdateWithoutPosition_requestInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutPosition_requestInput)
  data!: JobProfileUpdateWithoutPosition_requestInput;
}
