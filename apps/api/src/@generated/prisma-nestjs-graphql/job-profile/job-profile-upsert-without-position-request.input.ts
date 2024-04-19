import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutPosition_requestInput } from './job-profile-create-without-position-request.input';
import { JobProfileUpdateWithoutPosition_requestInput } from './job-profile-update-without-position-request.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpsertWithoutPosition_requestInput {
  @Field(() => JobProfileUpdateWithoutPosition_requestInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutPosition_requestInput)
  update!: JobProfileUpdateWithoutPosition_requestInput;

  @Field(() => JobProfileCreateWithoutPosition_requestInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutPosition_requestInput)
  create!: JobProfileCreateWithoutPosition_requestInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;
}
