import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileContextCreateWithoutJob_profileInput } from './job-profile-context-create-without-job-profile.input';
import { JobProfileContextWhereUniqueInput } from './job-profile-context-where-unique.input';

@InputType()
export class JobProfileContextCreateOrConnectWithoutJob_profileInput {
  @Field(() => JobProfileContextWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileContextWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileContextWhereUniqueInput, 'id' | 'job_profile_id'>;

  @Field(() => JobProfileContextCreateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileContextCreateWithoutJob_profileInput)
  create!: JobProfileContextCreateWithoutJob_profileInput;
}
