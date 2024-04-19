import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileContextCreateWithoutJob_profileInput } from './job-profile-context-create-without-job-profile.input';
import { JobProfileContextUpdateWithoutJob_profileInput } from './job-profile-context-update-without-job-profile.input';
import { JobProfileContextWhereInput } from './job-profile-context-where.input';

@InputType()
export class JobProfileContextUpsertWithoutJob_profileInput {
  @Field(() => JobProfileContextUpdateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileContextUpdateWithoutJob_profileInput)
  update!: JobProfileContextUpdateWithoutJob_profileInput;

  @Field(() => JobProfileContextCreateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileContextCreateWithoutJob_profileInput)
  create!: JobProfileContextCreateWithoutJob_profileInput;

  @Field(() => JobProfileContextWhereInput, { nullable: true })
  @Type(() => JobProfileContextWhereInput)
  where?: JobProfileContextWhereInput;
}
